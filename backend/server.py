from fastapi import FastAPI, APIRouter, HTTPException, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List, Optional
from datetime import datetime

from models import (
    Lead, LeadCreate, LeadUpdate,
    Conversation, Message, MessageCreate, ConversationStatusUpdate,
    QualificationCriterion, QualificationCriterionCreate, QualificationSettings,
    EventType, EventTypeCreate, EventRule, EventRuleCreate, EventLog,
    Contract, ContractCreate, ContractUpdate, SaleConfirmation,
    Document, DocumentCreate, DocumentUpdate,
    KnowledgeItem, KnowledgeItemCreate,
    PlaybookEntry, PlaybookEntryCreate,
    HistoricalConversation, HistoryClassify,
    User, UserCreate, UserUpdate,
    PlatformSettings, MetaIntegration, WhatsAppIntegration, IntegrationUpdate,
    AuditLog, Alert
)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'consorcio_ai')]

app = FastAPI(title="ConsórcioAI - Inteligência Comercial")
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


# ===== HELPER =====
def get_score_label(score: int, settings=None):
    ranges = [
        (0, 20, "Não Qualificado"), (21, 40, "Baixo Potencial"),
        (41, 60, "Potencial"), (61, 80, "Qualificado"),
        (81, 90, "Alta Intenção"), (91, 100, "Oportunidade Prioritária")
    ]
    for mn, mx, label in ranges:
        if mn <= score <= mx:
            return label
    return "Não Qualificado"


async def create_audit_log(user: str, action: str, target: str, details: str = None):
    log = AuditLog(user=user, action=action, target=target, details=details)
    await db.audit_logs.insert_one(log.dict())


async def create_event_log(event: str, lead_id: str = None, lead_name: str = None,
                           destination: str = "Interno", status: str = "Registrado"):
    log = EventLog(event=event, lead_id=lead_id, lead_name=lead_name,
                   destination=destination, status=status)
    await db.event_logs.insert_one(log.dict())


async def create_alert(alert_type: str, message: str, lead_id: str = None):
    alert = Alert(type=alert_type, message=message, lead_id=lead_id)
    await db.alerts.insert_one(alert.dict())


# ===== SEED DATA =====
async def seed_initial_data():
    """Seed initial data if collections are empty"""
    # Settings
    if await db.settings.count_documents({}) == 0:
        settings = PlatformSettings()
        await db.settings.insert_one(settings.dict())
        logger.info("Seeded settings")

    # Integrations
    if await db.integrations.count_documents({}) == 0:
        await db.integrations.insert_one({
            "type": "meta", **MetaIntegration().dict()
        })
        await db.integrations.insert_one({
            "type": "whatsapp", **WhatsAppIntegration().dict()
        })
        logger.info("Seeded integrations")

    # Default event types
    if await db.event_types.count_documents({}) == 0:
        defaults = [
            EventType(name="Lead Recebido", internal=True, external=False, color="#565674"),
            EventType(name="Atendimento Iniciado", internal=True, external=False, color="#7239ea"),
            EventType(name="Lead Qualificado", internal=True, external=True, external_name="Lead", color="#50cd89"),
            EventType(name="Alta Intenção", internal=True, external=True, external_name="ViewContent", color="#ffc700"),
            EventType(name="Oportunidade", internal=True, external=True, external_name="InitiateCheckout", color="#009ef7"),
            EventType(name="Documentação Iniciada", internal=True, external=False, color="#7c3aed"),
            EventType(name="Contrato Assinado", internal=True, external=True, external_name="AddToCart", color="#009ef7"),
            EventType(name="Venda Confirmada", internal=True, external=True, external_name="Purchase", color="#50cd89"),
            EventType(name="Lead Perdido", internal=True, external=False, color="#f1416c"),
        ]
        for et in defaults:
            await db.event_types.insert_one(et.dict())
        logger.info("Seeded event types")

    # Default qualification criteria
    if await db.qualification_criteria.count_documents({}) == 0:
        defaults = [
            QualificationCriterion(name="Situação Profissional", description="Tipo de atividade profissional",
                                   active=True, required=True, weight=3, options=[
                    {"label": "Empresário", "points": 15}, {"label": "Servidor Público", "points": 12},
                    {"label": "CLT", "points": 10}, {"label": "Autônomo", "points": 8},
                    {"label": "Aposentado", "points": 6}, {"label": "Outro", "points": 3}
                ]),
            QualificationCriterion(name="Prazo de Compra", description="Quando pretende adquirir",
                                   active=True, required=False, weight=2, options=[
                    {"label": "Imediato", "points": 20}, {"label": "Até 3 meses", "points": 15},
                    {"label": "Até 6 meses", "points": 10}, {"label": "Sem previsão", "points": 3}
                ]),
            QualificationCriterion(name="Capacidade Financeira", description="Capacidade mensal estimada",
                                   active=True, required=True, weight=3, options=[
                    {"label": "Acima de R$3.000/mês", "points": 20},
                    {"label": "R$1.500 a R$3.000/mês", "points": 15},
                    {"label": "R$800 a R$1.500/mês", "points": 10},
                    {"label": "Abaixo de R$800/mês", "points": 5}
                ]),
            QualificationCriterion(name="Produto Definido", description="Se o lead já sabe o que quer",
                                   active=True, required=False, weight=1, options=[
                    {"label": "Produto e valor definidos", "points": 15},
                    {"label": "Apenas produto", "points": 10},
                    {"label": "Ainda explorando", "points": 5}
                ]),
        ]
        for qc in defaults:
            await db.qualification_criteria.insert_one(qc.dict())
        logger.info("Seeded qualification criteria")

    # Default users
    if await db.users.count_documents({}) == 0:
        defaults = [
            User(name="Carlos Silva", email="carlos@empresa.com", role="Administrador"),
            User(name="Maria Santos", email="maria@empresa.com", role="Gestor"),
            User(name="Pedro Alves", email="pedro@empresa.com", role="Atendente"),
            User(name="Ana Rodrigues", email="ana@empresa.com", role="Tráfego"),
            User(name="Lucas Martins", email="lucas@empresa.com", role="Financeiro", status="inactive"),
        ]
        for u in defaults:
            await db.users.insert_one(u.dict())
        logger.info("Seeded users")


# ===== STARTUP =====
@app.on_event("startup")
async def startup():
    await seed_initial_data()
    logger.info("ConsórcioAI started successfully")


@app.on_event("shutdown")
async def shutdown():
    client.close()


# ===== ROOT =====
@api_router.get("/")
async def root():
    return {"message": "ConsórcioAI API - Inteligência Comercial"}


# ===== LEADS =====
@api_router.get("/leads")
async def list_leads(
    stage: Optional[str] = None,
    intent: Optional[str] = None,
    search: Optional[str] = None,
    min_score: Optional[int] = None,
    max_score: Optional[int] = None,
    limit: int = 50,
    skip: int = 0
):
    query = {}
    if stage and stage != "all":
        query["stage"] = stage
    if intent:
        query["intent"] = intent
    if min_score is not None:
        query["score"] = {"$gte": min_score}
    if max_score is not None:
        query.setdefault("score", {})["$lte"] = max_score
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"phone": {"$regex": search, "$options": "i"}}
        ]

    leads = await db.leads.find(query).sort("updated_at", -1).skip(skip).limit(limit).to_list(limit)
    total = await db.leads.count_documents(query)
    for l in leads:
        l.pop("_id", None)
    return {"leads": leads, "total": total}


@api_router.post("/leads")
async def create_lead(data: LeadCreate):
    # Check duplicate
    existing = await db.leads.find_one({"phone": data.phone})
    if existing:
        existing.pop("_id", None)
        return existing

    lead = Lead(**data.dict(), first_contact=datetime.utcnow().strftime("%d %b %Y"))
    lead_dict = lead.dict()
    lead_dict["timeline"] = [{"time": datetime.utcnow().strftime("%H:%M"), "event": "Lead recebido", "type": "start"}]
    await db.leads.insert_one(lead_dict)
    await create_event_log("Lead Recebido", lead.id, lead.name)
    await create_alert("info", f"Novo lead: {lead.name}", lead.id)
    lead_dict.pop("_id", None)
    return lead_dict


@api_router.get("/leads/{lead_id}")
async def get_lead(lead_id: str):
    lead = await db.leads.find_one({"id": lead_id})
    if not lead:
        raise HTTPException(404, "Lead não encontrado")
    lead.pop("_id", None)
    return lead


@api_router.put("/leads/{lead_id}")
async def update_lead(lead_id: str, data: LeadUpdate):
    update_data = {k: v for k, v in data.dict().items() if v is not None}
    if "score" in update_data:
        update_data["score_label"] = get_score_label(update_data["score"])
    update_data["updated_at"] = datetime.utcnow()
    result = await db.leads.update_one({"id": lead_id}, {"$set": update_data})
    if result.modified_count == 0:
        raise HTTPException(404, "Lead não encontrado")
    lead = await db.leads.find_one({"id": lead_id})
    lead.pop("_id", None)
    return lead


@api_router.put("/leads/{lead_id}/stage")
async def update_lead_stage(lead_id: str, data: dict):
    stage = data.get("stage")
    if not stage:
        raise HTTPException(400, "Estágio obrigatório")
    timeline_entry = {
        "time": datetime.utcnow().strftime("%H:%M"),
        "event": f"Estágio alterado para: {stage}",
        "type": "stage"
    }
    await db.leads.update_one({"id": lead_id}, {
        "$set": {"stage": stage, "updated_at": datetime.utcnow()},
        "$push": {"timeline": timeline_entry}
    })
    lead = await db.leads.find_one({"id": lead_id})
    if lead:
        await create_event_log(f"Estágio: {stage}", lead_id, lead.get("name"))
    lead.pop("_id", None)
    return lead


@api_router.post("/leads/{lead_id}/notes")
async def add_lead_note(lead_id: str, data: dict):
    note = {
        "id": str(__import__('uuid').uuid4()),
        "author": data.get("author", "Sistema"),
        "content": data.get("content", ""),
        "created_at": datetime.utcnow().isoformat()
    }
    await db.leads.update_one({"id": lead_id}, {"$push": {"notes": note}})
    return note


# ===== CONVERSATIONS =====
@api_router.get("/conversations")
async def list_conversations(status: Optional[str] = None, search: Optional[str] = None):
    query = {}
    if status and status != "all":
        query["status"] = status
    if search:
        query["lead_name"] = {"$regex": search, "$options": "i"}
    convs = await db.conversations.find(query).sort("updated_at", -1).to_list(100)
    for c in convs:
        c.pop("_id", None)
    return convs


@api_router.get("/conversations/{conv_id}/messages")
async def get_messages(conv_id: str):
    messages = await db.messages.find({"conversation_id": conv_id}).sort("created_at", 1).to_list(1000)
    for m in messages:
        m.pop("_id", None)
    return messages


@api_router.post("/conversations/{conv_id}/messages")
async def send_message(conv_id: str, data: MessageCreate):
    msg = Message(conversation_id=conv_id, sender=data.sender, text=data.text,
                  time=datetime.utcnow().strftime("%H:%M"))
    await db.messages.insert_one(msg.dict())

    # Update conversation
    await db.conversations.update_one({"id": conv_id}, {
        "$set": {
            "last_message": data.text,
            "last_message_time": msg.time,
            "updated_at": datetime.utcnow(),
            "status": "human" if data.sender == "human" else "agent"
        }
    })
    msg_dict = msg.dict()
    msg_dict.pop("_id", None)
    return msg_dict


@api_router.put("/conversations/{conv_id}/status")
async def update_conversation_status(conv_id: str, data: ConversationStatusUpdate):
    await db.conversations.update_one({"id": conv_id}, {
        "$set": {"status": data.status, "updated_at": datetime.utcnow()}
    })
    conv = await db.conversations.find_one({"id": conv_id})
    if conv:
        await create_audit_log("Sistema", f"Status conversa: {data.status}", conv.get("lead_name", ""))
    conv.pop("_id", None)
    return conv


# ===== DASHBOARD =====
@api_router.get("/dashboard/kpis")
async def get_dashboard_kpis():
    total = await db.leads.count_documents({})
    qualified = await db.leads.count_documents({"stage": "Qualificado"})
    opportunities = await db.leads.count_documents({"stage": {"$in": ["Oportunidade", "Negociação"]}})
    sales = await db.leads.count_documents({"stage": "Venda Confirmada"})
    in_service = await db.leads.count_documents({"stage": {"$in": ["Em Atendimento", "Primeiro Contato"]}})

    conversion_rate = f"{(sales / total * 100):.1f}%" if total > 0 else "0%"

    return [
        {"label": "Leads Recebidos", "value": str(total), "change": "+12%", "trend": "up", "color": "#7c3aed"},
        {"label": "Qualificados", "value": str(qualified), "change": "+8%", "trend": "up", "color": "#50cd89"},
        {"label": "Oportunidades", "value": str(opportunities), "change": "+15%", "trend": "up", "color": "#ffc700"},
        {"label": "Vendas Confirmadas", "value": str(sales), "change": "+3%", "trend": "up", "color": "#009ef7"},
        {"label": "Em Atendimento", "value": str(in_service), "change": "-2%", "trend": "down", "color": "#f1416c"},
        {"label": "Taxa de Conversão", "value": conversion_rate, "change": "+0.5%", "trend": "up", "color": "#7239ea"}
    ]


@api_router.get("/dashboard/funnel")
async def get_dashboard_funnel():
    settings = await db.settings.find_one({})
    stages = settings.get("funnel_stages", [
        "Novo Lead", "Primeiro Contato", "Em Atendimento", "Qualificado",
        "Oportunidade", "Negociação", "Documentação", "Contrato Assinado", "Venda Confirmada"
    ]) if settings else []

    stage_colors = {
        "Novo Lead": "#565674", "Primeiro Contato": "#7239ea", "Em Atendimento": "#009ef7",
        "Qualificado": "#50cd89", "Oportunidade": "#ffc700", "Negociação": "#f1416c",
        "Documentação": "#7c3aed", "Contrato Assinado": "#009ef7", "Venda Confirmada": "#50cd89"
    }

    result = []
    for stage in stages:
        count = await db.leads.count_documents({"stage": stage})
        result.append({
            "name": stage,
            "count": count,
            "color": stage_colors.get(stage, "#565674")
        })
    return result


@api_router.get("/dashboard/alerts")
async def get_alerts():
    alerts = await db.alerts.find({"read": False}).sort("created_at", -1).to_list(20)
    for a in alerts:
        a.pop("_id", None)
    return alerts


@api_router.put("/dashboard/alerts/{alert_id}/read")
async def mark_alert_read(alert_id: str):
    await db.alerts.update_one({"id": alert_id}, {"$set": {"read": True}})
    return {"status": "ok"}


# ===== QUALIFICATION =====
@api_router.get("/qualification/criteria")
async def list_criteria():
    criteria = await db.qualification_criteria.find().to_list(100)
    for c in criteria:
        c.pop("_id", None)
    return criteria


@api_router.post("/qualification/criteria")
async def create_criterion(data: QualificationCriterionCreate):
    criterion = QualificationCriterion(**data.dict())
    await db.qualification_criteria.insert_one(criterion.dict())
    await create_audit_log("Sistema", "Critério criado", criterion.name)
    result = criterion.dict()
    return result


@api_router.put("/qualification/criteria/{criterion_id}")
async def update_criterion(criterion_id: str, data: dict):
    data.pop("id", None)
    data.pop("_id", None)
    await db.qualification_criteria.update_one({"id": criterion_id}, {"$set": data})
    criterion = await db.qualification_criteria.find_one({"id": criterion_id})
    if criterion:
        criterion.pop("_id", None)
    return criterion


@api_router.delete("/qualification/criteria/{criterion_id}")
async def delete_criterion(criterion_id: str):
    await db.qualification_criteria.delete_one({"id": criterion_id})
    return {"status": "deleted"}


@api_router.get("/qualification/settings")
async def get_qualification_settings():
    settings = await db.settings.find_one({})
    if settings:
        return {"active": settings.get("qualification_active", True)}
    return {"active": True}


@api_router.put("/qualification/settings")
async def update_qualification_settings(data: QualificationSettings):
    await db.settings.update_one({}, {"$set": {"qualification_active": data.active}})
    return data


# ===== EVENTS =====
@api_router.get("/events/types")
async def list_event_types():
    types = await db.event_types.find().to_list(100)
    for t in types:
        t.pop("_id", None)
    return types


@api_router.post("/events/types")
async def create_event_type(data: EventTypeCreate):
    et = EventType(**data.dict())
    await db.event_types.insert_one(et.dict())
    return et.dict()


@api_router.put("/events/types/{type_id}")
async def update_event_type(type_id: str, data: dict):
    data.pop("id", None)
    data.pop("_id", None)
    await db.event_types.update_one({"id": type_id}, {"$set": data})
    et = await db.event_types.find_one({"id": type_id})
    if et:
        et.pop("_id", None)
    return et


@api_router.get("/events/rules")
async def list_event_rules():
    rules = await db.event_rules.find().to_list(100)
    for r in rules:
        r.pop("_id", None)
    return rules


@api_router.post("/events/rules")
async def create_event_rule(data: EventRuleCreate):
    rule = EventRule(**data.dict())
    await db.event_rules.insert_one(rule.dict())
    return rule.dict()


@api_router.get("/events/log")
async def list_event_logs(limit: int = 50):
    logs = await db.event_logs.find().sort("created_at", -1).to_list(limit)
    for l in logs:
        l.pop("_id", None)
    return logs


# ===== CONTRACTS =====
@api_router.get("/contracts")
async def list_contracts():
    contracts = await db.contracts.find().sort("created_at", -1).to_list(100)
    for c in contracts:
        c.pop("_id", None)
    return contracts


@api_router.post("/contracts")
async def create_contract(data: ContractCreate):
    contract = Contract(**data.dict())
    await db.contracts.insert_one(contract.dict())
    await create_event_log("Contrato Iniciado", data.lead_id, data.lead_name)
    await create_audit_log("Sistema", "Contrato criado", data.lead_name)
    return contract.dict()


@api_router.put("/contracts/{contract_id}")
async def update_contract(contract_id: str, data: ContractUpdate):
    update_data = {k: v for k, v in data.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    await db.contracts.update_one({"id": contract_id}, {"$set": update_data})
    contract = await db.contracts.find_one({"id": contract_id})
    if contract:
        contract.pop("_id", None)
    return contract


@api_router.post("/contracts/{contract_id}/confirm-sale")
async def confirm_sale(contract_id: str, data: SaleConfirmation):
    contract = await db.contracts.find_one({"id": contract_id})
    if not contract:
        raise HTTPException(404, "Contrato não encontrado")

    # Check not already confirmed
    if contract.get("status") == "Venda Confirmada":
        raise HTTPException(400, "Venda já confirmada")

    await db.contracts.update_one({"id": contract_id}, {
        "$set": {
            "status": "Venda Confirmada",
            "confirmed_by": data.confirmed_by,
            "confirmed_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
    })

    # Update lead stage
    lead_id = contract.get("lead_id")
    if lead_id:
        await db.leads.update_one({"id": lead_id}, {
            "$set": {"stage": "Venda Confirmada", "updated_at": datetime.utcnow()},
            "$push": {"timeline": {
                "time": datetime.utcnow().strftime("%H:%M"),
                "event": f"Venda confirmada por {data.confirmed_by}",
                "type": "sale"
            }}
        })

    # Create event logs
    await create_event_log("Venda Confirmada", lead_id, contract.get("lead_name"),
                           destination="Meta CAPI", status="Sucesso")
    await create_audit_log(data.confirmed_by, "Venda confirmada",
                           contract.get("lead_name", ""), data.observation)
    await create_alert("success", f"Venda confirmada: {contract.get('lead_name')}", lead_id)

    contract = await db.contracts.find_one({"id": contract_id})
    contract.pop("_id", None)
    return contract


# ===== DOCUMENTS =====
@api_router.get("/documents")
async def list_documents(lead_id: Optional[str] = None):
    query = {}
    if lead_id:
        query["lead_id"] = lead_id
    docs = await db.documents.find(query).sort("created_at", -1).to_list(100)
    for d in docs:
        d.pop("_id", None)
    return docs


@api_router.post("/documents")
async def create_document(data: DocumentCreate):
    doc = Document(**data.dict())
    await db.documents.insert_one(doc.dict())
    return doc.dict()


@api_router.put("/documents/{doc_id}")
async def update_document(doc_id: str, data: DocumentUpdate):
    update_data = data.dict()
    if data.status == "Recebido" and not data.date:
        update_data["date"] = datetime.utcnow().strftime("%d %b %Y")
    await db.documents.update_one({"id": doc_id}, {"$set": update_data})
    doc = await db.documents.find_one({"id": doc_id})
    if doc:
        doc.pop("_id", None)
    return doc


# ===== KNOWLEDGE BASE =====
@api_router.get("/knowledge")
async def list_knowledge(category: Optional[str] = None):
    query = {}
    if category and category != "all":
        query["category"] = category
    items = await db.knowledge.find(query).sort("updated_at", -1).to_list(100)
    for i in items:
        i.pop("_id", None)
    return items


@api_router.post("/knowledge")
async def create_knowledge(data: KnowledgeItemCreate):
    item = KnowledgeItem(**data.dict())
    await db.knowledge.insert_one(item.dict())
    return item.dict()


@api_router.put("/knowledge/{item_id}")
async def update_knowledge(item_id: str, data: dict):
    data.pop("id", None)
    data.pop("_id", None)
    data["updated_at"] = datetime.utcnow()
    await db.knowledge.update_one({"id": item_id}, {"$set": data})
    item = await db.knowledge.find_one({"id": item_id})
    if item:
        item.pop("_id", None)
    return item


@api_router.delete("/knowledge/{item_id}")
async def delete_knowledge(item_id: str):
    await db.knowledge.delete_one({"id": item_id})
    return {"status": "deleted"}


# ===== PLAYBOOK =====
@api_router.get("/playbook")
async def list_playbook():
    entries = await db.playbook.find().sort("created_at", -1).to_list(100)
    for e in entries:
        e.pop("_id", None)
    return entries


@api_router.post("/playbook")
async def create_playbook_entry(data: PlaybookEntryCreate):
    entry = PlaybookEntry(**data.dict())
    await db.playbook.insert_one(entry.dict())
    return entry.dict()


@api_router.put("/playbook/{entry_id}")
async def update_playbook_entry(entry_id: str, data: dict):
    data.pop("id", None)
    data.pop("_id", None)
    await db.playbook.update_one({"id": entry_id}, {"$set": data})
    entry = await db.playbook.find_one({"id": entry_id})
    if entry:
        entry.pop("_id", None)
    return entry


# ===== HISTORY =====
@api_router.get("/history/conversations")
async def list_historical():
    convs = await db.historical_conversations.find().sort("created_at", -1).to_list(100)
    for c in convs:
        c.pop("_id", None)
    return convs


@api_router.post("/history/import")
async def import_history(data: dict):
    conv = HistoricalConversation(
        contact=data.get("contact", "Desconhecido"),
        messages_count=data.get("messages_count", 0),
        period=data.get("period", ""),
    )
    await db.historical_conversations.insert_one(conv.dict())
    return conv.dict()


@api_router.put("/history/{conv_id}/classify")
async def classify_history(conv_id: str, data: HistoryClassify):
    await db.historical_conversations.update_one({"id": conv_id}, {
        "$set": {"result": data.result, "status": "Classificado"}
    })
    return {"status": "classified"}


# ===== TRAFFIC =====
@api_router.get("/traffic/campaigns")
async def get_traffic_campaigns():
    # Aggregate lead data by campaign
    pipeline = [
        {"$match": {"campaign": {"$nin": [None, ""]}}},
        {"$group": {
            "_id": "$campaign",
            "leads": {"$sum": 1},
            "qualified": {"$sum": {"$cond": [{"$gte": ["$score", 60]}, 1, 0]}},
            "opportunities": {"$sum": {"$cond": [{"$in": ["$stage", ["Oportunidade", "Negociação"]]}, 1, 0]}},
            "sales": {"$sum": {"$cond": [{"$eq": ["$stage", "Venda Confirmada"]}, 1, 0]}},
            "avg_score": {"$avg": "$score"}
        }}
    ]
    results = await db.leads.aggregate(pipeline).to_list(100)
    campaigns = []
    for r in results:
        campaigns.append({
            "name": r["_id"],
            "leads": r["leads"],
            "qualified": r["qualified"],
            "opportunities": r["opportunities"],
            "sales": r["sales"],
            "avgScore": round(r.get("avg_score", 0)),
            "spend": "R$ 0"
        })
    return campaigns


# ===== SETTINGS =====
@api_router.get("/settings")
async def get_settings():
    settings = await db.settings.find_one({})
    if settings:
        settings.pop("_id", None)
    return settings or PlatformSettings().dict()


@api_router.put("/settings")
async def update_settings(data: dict):
    data.pop("_id", None)
    await db.settings.update_one({}, {"$set": data}, upsert=True)
    await create_audit_log("Sistema", "Configurações alteradas", str(list(data.keys())))
    settings = await db.settings.find_one({})
    if settings:
        settings.pop("_id", None)
    return settings


# ===== INTEGRATIONS =====
@api_router.get("/integrations")
async def get_integrations():
    meta = await db.integrations.find_one({"type": "meta"})
    whatsapp = await db.integrations.find_one({"type": "whatsapp"})
    result = {"meta": {}, "whatsapp": {}}
    if meta:
        meta.pop("_id", None)
        result["meta"] = meta
    if whatsapp:
        whatsapp.pop("_id", None)
        result["whatsapp"] = whatsapp
    return result


@api_router.put("/integrations/meta")
async def update_meta_integration(data: IntegrationUpdate):
    update = {}
    if data.pixel_id is not None:
        update["pixel_id"] = data.pixel_id
    if data.access_token is not None:
        update["access_token"] = data.access_token
    update["configured"] = bool(data.pixel_id and data.access_token)
    await db.integrations.update_one({"type": "meta"}, {"$set": update}, upsert=True)
    await create_audit_log("Sistema", "Integração Meta atualizada", "Meta CAPI")
    return {"status": "updated", "configured": update["configured"]}


@api_router.put("/integrations/whatsapp")
async def update_whatsapp_integration(data: IntegrationUpdate):
    update = {}
    if data.api_key is not None:
        update["api_key"] = data.api_key
    update["configured"] = bool(data.api_key)
    await db.integrations.update_one({"type": "whatsapp"}, {"$set": update}, upsert=True)
    return {"status": "updated", "configured": update["configured"]}


# ===== USERS =====
@api_router.get("/users")
async def list_users():
    users = await db.users.find().to_list(100)
    for u in users:
        u.pop("_id", None)
    return users


@api_router.post("/users")
async def create_user(data: UserCreate):
    user = User(**{k: v for k, v in data.dict().items() if k != "password"})
    await db.users.insert_one(user.dict())
    await create_audit_log("Sistema", "Usuário criado", user.name)
    return user.dict()


@api_router.put("/users/{user_id}")
async def update_user(user_id: str, data: UserUpdate):
    update_data = {k: v for k, v in data.dict().items() if v is not None}
    await db.users.update_one({"id": user_id}, {"$set": update_data})
    user = await db.users.find_one({"id": user_id})
    if user:
        user.pop("_id", None)
    return user


@api_router.delete("/users/{user_id}")
async def delete_user(user_id: str):
    await db.users.delete_one({"id": user_id})
    return {"status": "deleted"}


# ===== AUDIT =====
@api_router.get("/audit")
async def list_audit_logs(
    user: Optional[str] = None,
    action: Optional[str] = None,
    limit: int = 50
):
    query = {}
    if user:
        query["user"] = {"$regex": user, "$options": "i"}
    if action:
        query["action"] = {"$regex": action, "$options": "i"}
    logs = await db.audit_logs.find(query).sort("timestamp", -1).to_list(limit)
    for l in logs:
        l.pop("_id", None)
    return logs


# ===== REPORTS =====
@api_router.get("/reports/summary")
async def get_reports_summary():
    total_convs = await db.conversations.count_documents({})
    total_leads = await db.leads.count_documents({})
    sales = await db.leads.count_documents({"stage": "Venda Confirmada"})
    lost = await db.leads.count_documents({"stage": "Perdido"})

    return {
        "total_conversations": total_convs,
        "total_leads": total_leads,
        "total_sales": sales,
        "total_lost": lost,
        "conversion_rate": f"{(sales / total_leads * 100):.1f}%" if total_leads > 0 else "0%"
    }


# Include router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

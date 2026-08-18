from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
import uuid


def gen_id():
    return str(uuid.uuid4())


def now():
    return datetime.utcnow()


# ===== LEADS =====
class LeadCreate(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    origin: Optional[str] = None
    campaign: Optional[str] = None
    product: Optional[str] = "Indefinido"

class LeadUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    stage: Optional[str] = None
    score: Optional[int] = None
    intent: Optional[str] = None
    temperature: Optional[str] = None
    product: Optional[str] = None
    desired_value: Optional[str] = None
    profession: Optional[str] = None
    profession_confidence: Optional[str] = None
    profession_evidence: Optional[str] = None
    purchase_timeline: Optional[str] = None
    summary: Optional[str] = None
    loss_reason: Optional[str] = None

class Lead(BaseModel):
    id: str = Field(default_factory=gen_id)
    name: str
    phone: str
    email: Optional[str] = None
    score: int = 0
    score_label: str = "Não Qualificado"
    intent: str = "Baixa"
    temperature: str = "Frio"
    stage: str = "Novo Lead"
    product: str = "Indefinido"
    desired_value: Optional[str] = None
    profession: Optional[str] = None
    profession_confidence: Optional[str] = None
    profession_evidence: Optional[str] = None
    purchase_timeline: Optional[str] = None
    origin: Optional[str] = None
    campaign: Optional[str] = None
    first_contact: Optional[str] = None
    summary: Optional[str] = None
    loss_reason: Optional[str] = None
    criteria: List[Dict] = Field(default_factory=list)
    objections: List[Dict] = Field(default_factory=list)
    timeline: List[Dict] = Field(default_factory=list)
    notes: List[Dict] = Field(default_factory=list)
    documents: List[Dict] = Field(default_factory=list)
    created_at: datetime = Field(default_factory=now)
    updated_at: datetime = Field(default_factory=now)


# ===== CONVERSATIONS =====
class Message(BaseModel):
    id: str = Field(default_factory=gen_id)
    conversation_id: str
    sender: str  # "lead", "agent", "human"
    text: str
    type: str = "text"
    time: str = ""
    created_at: datetime = Field(default_factory=now)

class MessageCreate(BaseModel):
    text: str
    sender: str = "human"

class Conversation(BaseModel):
    id: str = Field(default_factory=gen_id)
    lead_id: str
    lead_name: str
    phone: str
    status: str = "agent"  # agent, human, paused, closed
    last_message: Optional[str] = None
    last_message_time: Optional[str] = None
    unread: int = 0
    created_at: datetime = Field(default_factory=now)
    updated_at: datetime = Field(default_factory=now)

class ConversationStatusUpdate(BaseModel):
    status: str


# ===== QUALIFICATION =====
class QualificationOption(BaseModel):
    label: str
    points: int

class QualificationCriterionCreate(BaseModel):
    name: str
    description: str = ""
    active: bool = True
    required: bool = False
    weight: int = 1
    options: List[QualificationOption] = Field(default_factory=list)

class QualificationCriterion(QualificationCriterionCreate):
    id: str = Field(default_factory=gen_id)
    created_at: datetime = Field(default_factory=now)

class QualificationSettings(BaseModel):
    active: bool


# ===== EVENTS =====
class EventTypeCreate(BaseModel):
    name: str
    internal: bool = True
    external: bool = False
    external_name: Optional[str] = None
    color: str = "#565674"

class EventType(EventTypeCreate):
    id: str = Field(default_factory=gen_id)

class EventRuleCreate(BaseModel):
    name: str
    conditions: str
    action: str
    active: bool = True

class EventRule(EventRuleCreate):
    id: str = Field(default_factory=gen_id)
    created_at: datetime = Field(default_factory=now)

class EventLog(BaseModel):
    id: str = Field(default_factory=gen_id)
    event: str
    lead_id: Optional[str] = None
    lead_name: Optional[str] = None
    destination: str = "Interno"
    status: str = "Registrado"
    details: Optional[str] = None
    created_at: datetime = Field(default_factory=now)


# ===== CONTRACTS =====
class ContractCreate(BaseModel):
    lead_id: str
    lead_name: str
    product: str
    value: str
    plan: Optional[str] = None
    notes: Optional[str] = None

class Contract(ContractCreate):
    id: str = Field(default_factory=gen_id)
    status: str = "Em Análise"
    confirmed_by: Optional[str] = None
    confirmed_at: Optional[datetime] = None
    created_at: datetime = Field(default_factory=now)
    updated_at: datetime = Field(default_factory=now)

class ContractUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None

class SaleConfirmation(BaseModel):
    confirmed_by: str
    observation: Optional[str] = None
    value: Optional[str] = None


# ===== DOCUMENTS =====
class DocumentCreate(BaseModel):
    lead_id: str
    lead_name: str
    doc_type: str
    contract_id: Optional[str] = None

class Document(DocumentCreate):
    id: str = Field(default_factory=gen_id)
    status: str = "Pendente"
    date: Optional[str] = None
    created_at: datetime = Field(default_factory=now)

class DocumentUpdate(BaseModel):
    status: str
    date: Optional[str] = None


# ===== KNOWLEDGE BASE =====
class KnowledgeItemCreate(BaseModel):
    category: str
    title: str
    content: str
    type: str = "official"

class KnowledgeItem(KnowledgeItemCreate):
    id: str = Field(default_factory=gen_id)
    updated_at: datetime = Field(default_factory=now)


# ===== PLAYBOOK =====
class PlaybookEntryCreate(BaseModel):
    situation: str
    context: str
    signals: List[str] = Field(default_factory=list)
    strategy: str
    approach: str
    avoid: str
    evidence: Optional[str] = None
    validated: bool = False

class PlaybookEntry(PlaybookEntryCreate):
    id: str = Field(default_factory=gen_id)
    created_at: datetime = Field(default_factory=now)


# ===== HISTORY =====
class HistoricalConversation(BaseModel):
    id: str = Field(default_factory=gen_id)
    contact: str
    messages_count: int = 0
    period: str = ""
    result: str = "Desconhecido"
    status: str = "Pendente"
    patterns: int = 0
    created_at: datetime = Field(default_factory=now)

class HistoryClassify(BaseModel):
    result: str


# ===== USERS =====
class UserCreate(BaseModel):
    name: str
    email: str
    role: str
    password: Optional[str] = None

class User(BaseModel):
    id: str = Field(default_factory=gen_id)
    name: str
    email: str
    role: str
    status: str = "active"
    created_at: datetime = Field(default_factory=now)

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    role: Optional[str] = None
    status: Optional[str] = None


# ===== SETTINGS =====
class PlatformSettings(BaseModel):
    agent_active: bool = True
    qualification_active: bool = True
    follow_up_active: bool = True
    score_ranges: List[Dict] = Field(default_factory=lambda: [
        {"min": 0, "max": 20, "label": "Não Qualificado", "color": "#565674"},
        {"min": 21, "max": 40, "label": "Baixo Potencial", "color": "#f1416c"},
        {"min": 41, "max": 60, "label": "Potencial", "color": "#ffc700"},
        {"min": 61, "max": 80, "label": "Qualificado", "color": "#50cd89"},
        {"min": 81, "max": 90, "label": "Alta Intenção", "color": "#009ef7"},
        {"min": 91, "max": 100, "label": "Oportunidade Prioritária", "color": "#7239ea"}
    ])
    funnel_stages: List[str] = Field(default_factory=lambda: [
        "Novo Lead", "Primeiro Contato", "Em Atendimento", "Em Diagnóstico",
        "Qualificado", "Oportunidade", "Simulação", "Negociação",
        "Documentação", "Contrato Iniciado", "Contrato Assinado",
        "Aguardando Confirmação", "Venda Confirmada", "Perdido", "Sem Interesse"
    ])


# ===== INTEGRATIONS =====
class MetaIntegration(BaseModel):
    pixel_id: Optional[str] = None
    access_token: Optional[str] = None
    configured: bool = False

class WhatsAppIntegration(BaseModel):
    api_key: Optional[str] = None
    configured: bool = False

class IntegrationUpdate(BaseModel):
    pixel_id: Optional[str] = None
    access_token: Optional[str] = None
    api_key: Optional[str] = None


# ===== AUDIT =====
class AuditLog(BaseModel):
    id: str = Field(default_factory=gen_id)
    user: str
    action: str
    target: str
    details: Optional[str] = None
    timestamp: datetime = Field(default_factory=now)


# ===== ALERTS =====
class Alert(BaseModel):
    id: str = Field(default_factory=gen_id)
    type: str  # warning, error, info, success
    message: str
    lead_id: Optional[str] = None
    read: bool = False
    created_at: datetime = Field(default_factory=now)

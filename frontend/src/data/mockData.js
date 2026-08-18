// Mock data for Plataforma de Inteligência Comercial - Consórcios

// ===== USER & AUTH =====
export const currentUser = {
  name: "Carlos Silva",
  username: "@carlos.silva",
  role: "Administrador",
  avatar: "https://preview.keenthemes.com/metronic8/demo43/assets/media/avatars/300-1.jpg"
};

// ===== NAVIGATION =====
export const sidebarSections = [
  {
    title: "Principal",
    items: [
      { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard", path: "/" },
      { id: "chat", label: "Atendimento", icon: "MessageCircle", path: "/atendimento", badge: 5 }
    ]
  },
  {
    title: "Comercial",
    items: [
      { id: "leads", label: "Leads", icon: "Users", path: "/leads" },
      { id: "funnel", label: "Funil", icon: "Filter", path: "/funil" },
      { id: "contracts", label: "Contratos", icon: "FileSignature", path: "/contratos" },
      { id: "documents", label: "Documentos", icon: "FolderOpen", path: "/documentos" }
    ]
  },
  {
    title: "Inteligência",
    items: [
      { id: "qualification", label: "Qualificação", icon: "Target", path: "/qualificacao" },
      { id: "events", label: "Eventos", icon: "Zap", path: "/eventos" },
      { id: "playbook", label: "Playbook", icon: "BookOpen", path: "/playbook" },
      { id: "knowledge", label: "Base de Conhecimento", icon: "Brain", path: "/conhecimento" }
    ]
  },
  {
    title: "Análise",
    items: [
      { id: "traffic", label: "Tráfego", icon: "BarChart3", path: "/trafego" },
      { id: "history", label: "Histórico", icon: "History", path: "/historico" },
      { id: "intelligence", label: "Relatórios", icon: "TrendingUp", path: "/relatorios" }
    ]
  },
  {
    title: "Administração",
    items: [
      { id: "settings", label: "Configurações", icon: "Settings", path: "/configuracoes" },
      { id: "integrations", label: "Integrações", icon: "Plug", path: "/integracoes" },
      { id: "users", label: "Usuários", icon: "UserCog", path: "/usuarios" },
      { id: "audit", label: "Auditoria", icon: "Shield", path: "/auditoria" }
    ]
  }
];

// ===== DASHBOARD KPIs =====
export const dashboardKPIs = [
  { label: "Leads Recebidos", value: "247", change: "+12%", trend: "up", color: "#7c3aed" },
  { label: "Qualificados", value: "89", change: "+8%", trend: "up", color: "#50cd89" },
  { label: "Oportunidades", value: "34", change: "+15%", trend: "up", color: "#ffc700" },
  { label: "Vendas Confirmadas", value: "12", change: "+3%", trend: "up", color: "#009ef7" },
  { label: "Em Atendimento", value: "43", change: "-2%", trend: "down", color: "#f1416c" },
  { label: "Taxa de Conversão", value: "4.8%", change: "+0.5%", trend: "up", color: "#7239ea" }
];

export const funnelStages = [
  { name: "Novo Lead", count: 87, color: "#565674" },
  { name: "Primeiro Contato", count: 64, color: "#7239ea" },
  { name: "Em Atendimento", count: 43, color: "#009ef7" },
  { name: "Qualificado", count: 32, color: "#50cd89" },
  { name: "Oportunidade", count: 21, color: "#ffc700" },
  { name: "Negociação", count: 15, color: "#f1416c" },
  { name: "Documentação", count: 8, color: "#7c3aed" },
  { name: "Contrato", count: 5, color: "#009ef7" },
  { name: "Venda Confirmada", count: 3, color: "#50cd89" }
];

export const recentLeads = [
  { id: 1, name: "Ana Paula Santos", phone: "(11) 98765-4321", stage: "Qualificado", score: 82, intent: "Alta", product: "Consórcio Auto - R$100k", time: "5 min atrás", unread: 2, status: "agent" },
  { id: 2, name: "Roberto Mendes", phone: "(21) 99876-5432", stage: "Negociação", score: 91, intent: "Alta", product: "Consórcio Imóvel - R$350k", time: "12 min atrás", unread: 0, status: "agent" },
  { id: 3, name: "Maria Clara Oliveira", phone: "(31) 97654-3210", stage: "Em Atendimento", score: 45, intent: "Média", product: "Consórcio Auto - R$60k", time: "23 min atrás", unread: 1, status: "human" },
  { id: 4, name: "João Pedro Lima", phone: "(41) 96543-2109", stage: "Primeiro Contato", score: 28, intent: "Baixa", product: "Indefinido", time: "1h atrás", unread: 3, status: "agent" },
  { id: 5, name: "Fernanda Costa", phone: "(51) 95432-1098", stage: "Documentação", score: 95, intent: "Alta", product: "Consórcio Imóvel - R$500k", time: "2h atrás", unread: 0, status: "agent" },
  { id: 6, name: "Lucas Almeida", phone: "(61) 94321-0987", stage: "Oportunidade", score: 73, intent: "Alta", product: "Consórcio Auto - R$80k", time: "3h atrás", unread: 0, status: "waiting" },
  { id: 7, name: "Patrícia Rocha", phone: "(71) 93210-9876", stage: "Novo Lead", score: 15, intent: "Baixa", product: "Indefinido", time: "4h atrás", unread: 1, status: "agent" },
  { id: 8, name: "Diego Ferreira", phone: "(81) 92109-8765", stage: "Perdido", score: 35, intent: "Baixa", product: "Consórcio Auto - R$45k", time: "1 dia atrás", unread: 0, status: "closed" }
];

// ===== CHAT DATA =====
export const chatConversations = [
  {
    id: 1,
    leadId: 1,
    leadName: "Ana Paula Santos",
    phone: "(11) 98765-4321",
    lastMessage: "Entendi, e como funciona a contemplação?",
    lastMessageTime: "10:42",
    unread: 2,
    status: "agent",
    stage: "Qualificado",
    score: 82,
    intent: "Alta",
    temperature: "Quente",
    avatar: null
  },
  {
    id: 2,
    leadId: 2,
    leadName: "Roberto Mendes",
    phone: "(21) 99876-5432",
    lastMessage: "Vou enviar os documentos ainda hoje",
    lastMessageTime: "10:35",
    unread: 0,
    status: "agent",
    stage: "Negociação",
    score: 91,
    intent: "Alta",
    temperature: "Quente",
    avatar: null
  },
  {
    id: 3,
    leadId: 3,
    leadName: "Maria Clara Oliveira",
    phone: "(31) 97654-3210",
    lastMessage: "Pode me explicar melhor sobre as parcelas?",
    lastMessageTime: "10:20",
    unread: 1,
    status: "human",
    stage: "Em Atendimento",
    score: 45,
    intent: "Média",
    temperature: "Morno",
    avatar: null
  },
  {
    id: 4,
    leadId: 4,
    leadName: "João Pedro Lima",
    phone: "(41) 96543-2109",
    lastMessage: "Oi, queria saber sobre consórcio",
    lastMessageTime: "09:58",
    unread: 3,
    status: "agent",
    stage: "Primeiro Contato",
    score: 28,
    intent: "Baixa",
    temperature: "Frio",
    avatar: null
  },
  {
    id: 5,
    leadId: 5,
    leadName: "Fernanda Costa",
    phone: "(51) 95432-1098",
    lastMessage: "Documentos enviados, aguardo retorno",
    lastMessageTime: "09:30",
    unread: 0,
    status: "agent",
    stage: "Documentação",
    score: 95,
    intent: "Alta",
    temperature: "Quente",
    avatar: null
  },
  {
    id: 6,
    leadId: 6,
    leadName: "Lucas Almeida",
    phone: "(61) 94321-0987",
    lastMessage: "Vou pensar e te retorno amanhã",
    lastMessageTime: "Ontem",
    unread: 0,
    status: "waiting",
    stage: "Oportunidade",
    score: 73,
    intent: "Alta",
    temperature: "Morno",
    avatar: null
  },
  {
    id: 7,
    leadId: 7,
    leadName: "Patrícia Rocha",
    phone: "(71) 93210-9876",
    lastMessage: "Boa tarde",
    lastMessageTime: "Ontem",
    unread: 1,
    status: "agent",
    stage: "Novo Lead",
    score: 15,
    intent: "Baixa",
    temperature: "Frio",
    avatar: null
  }
];

export const chatMessages = {
  1: [
    { id: 1, sender: "lead", text: "Oi, boa tarde!", time: "10:02", type: "text" },
    { id: 2, sender: "lead", text: "Queria saber sobre consórcio pra carro", time: "10:02", type: "text" },
    { id: 3, sender: "lead", text: "Na faixa de 100 mil", time: "10:03", type: "text" },
    { id: 4, sender: "agent", text: "Boa tarde, Ana! Tudo bem? 😊", time: "10:05", type: "text" },
    { id: 5, sender: "agent", text: "Consórcio pra veículo nessa faixa é bem procurado. Você já tem alguma ideia do modelo que gostaria?", time: "10:05", type: "text" },
    { id: 6, sender: "lead", text: "Tô pensando num SUV, talvez um Compass ou T-Cross", time: "10:08", type: "text" },
    { id: 7, sender: "agent", text: "Ótimas opções! Com carta de 100 mil você consegue encaixar bem. Você pretende usar o consórcio pra compra planejada ou precisa do veículo mais urgente?", time: "10:10", type: "text" },
    { id: 8, sender: "lead", text: "Pode ser planejado mesmo, não tenho pressa", time: "10:14", type: "text" },
    { id: 9, sender: "agent", text: "Perfeito, isso ajuda bastante na escolha do plano. Me conta uma coisa, você trabalha registrada ou tem empresa própria?", time: "10:16", type: "text" },
    { id: 10, sender: "lead", text: "Tenho uma loja de roupas, sou empresária", time: "10:20", type: "text" },
    { id: 11, sender: "agent", text: "Que legal! Ter empresa própria facilita bastante o processo. Deixa eu te explicar como funciona a mecânica do consórcio pra você entender direitinho...", time: "10:22", type: "text" },
    { id: 12, sender: "agent", text: "No consórcio você entra num grupo, paga parcelas mensais e todo mês tem assembleia onde alguém é contemplado. Pode ser por sorteio ou por lance.", time: "10:23", type: "text" },
    { id: 13, sender: "lead", text: "E se eu quiser antecipar?", time: "10:30", type: "text" },
    { id: 14, sender: "agent", text: "Aí você pode dar lances! Funciona como um leilão: você oferece um valor e quem der o maior lance é contemplado naquela assembleia. Muita gente consegue entre 3 a 6 meses.", time: "10:32", type: "text" },
    { id: 15, sender: "lead", text: "Entendi, e como funciona a contemplação?", time: "10:42", type: "text" }
  ],
  2: [
    { id: 1, sender: "lead", text: "Bom dia!", time: "09:00", type: "text" },
    { id: 2, sender: "agent", text: "Bom dia, Roberto! Como está?", time: "09:02", type: "text" },
    { id: 3, sender: "lead", text: "Bem! Sobre a proposta que conversamos ontem do imóvel de 350 mil", time: "09:03", type: "text" },
    { id: 4, sender: "agent", text: "Sim, lembro! A simulação que te enviei ficou boa pra você?", time: "09:05", type: "text" },
    { id: 5, sender: "lead", text: "Ficou sim. Quero avançar. O que preciso fazer?", time: "09:10", type: "text" },
    { id: 6, sender: "agent", text: "Excelente decisão, Roberto! Vamos precisar de alguns documentos: RG ou CNH, comprovante de renda e comprovante de endereço.", time: "09:12", type: "text" },
    { id: 7, sender: "lead", text: "Vou enviar os documentos ainda hoje", time: "10:35", type: "text" }
  ]
};

// ===== LEAD CONTEXT DATA =====
export const leadContextData = {
  1: {
    id: 1,
    name: "Ana Paula Santos",
    phone: "(11) 98765-4321",
    email: "ana.santos@email.com",
    score: 82,
    scoreLabel: "Qualificado",
    intent: "Alta",
    temperature: "Quente",
    stage: "Qualificado",
    product: "Consórcio Auto",
    desiredValue: "R$ 100.000",
    profession: "Empresária",
    professionConfidence: "Alta",
    professionEvidence: "Lead informou possuir loja de roupas",
    purchaseTimeline: "Planejado (sem pressa)",
    origin: "Meta Ads - Campanha Auto Premium",
    firstContact: "15 Jul 2026",
    criteria: [
      { name: "Situação Profissional", value: "Empresária", points: 15, confidence: "Alta" },
      { name: "Capacidade Financeira", value: "Média-Alta", points: 12, confidence: "Média" },
      { name: "Intenção de Compra", value: "Planejada", points: 10, confidence: "Alta" },
      { name: "Produto Definido", value: "Sim", points: 8, confidence: "Alta" },
      { name: "Valor Definido", value: "R$ 100k", points: 10, confidence: "Alta" }
    ],
    objections: [
      { type: "Contemplação", status: "Pendente", context: "Perguntou como funciona a contemplação" }
    ],
    timeline: [
      { time: "10:42", event: "Objeção identificada: contemplação", type: "objection" },
      { time: "10:20", event: "Critério identificado: Empresária (+15 pts)", type: "qualification" },
      { time: "10:14", event: "Intenção: compra planejada", type: "info" },
      { time: "10:08", event: "Produto definido: SUV ~R$100k", type: "info" },
      { time: "10:02", event: "Atendimento iniciado", type: "start" },
      { time: "10:02", event: "Lead recebido", type: "start" }
    ],
    summary: "Empresária, dona de loja de roupas. Busca consórcio de veículo (SUV) na faixa de R$100 mil. Compra planejada, sem urgência. Demonstrou interesse e engajamento. Objeção sobre contemplação ainda pendente.",
    notes: [],
    documents: []
  }
};

// ===== QUALIFICATION CRITERIA =====
export const qualificationCriteria = [
  {
    id: 1, name: "Situação Profissional", description: "Tipo de atividade profissional do lead",
    active: true, required: true, weight: 3,
    options: [
      { label: "Empresário", points: 15 },
      { label: "Servidor Público", points: 12 },
      { label: "CLT", points: 10 },
      { label: "Autônomo", points: 8 },
      { label: "Aposentado", points: 6 },
      { label: "Outro", points: 3 }
    ]
  },
  {
    id: 2, name: "Prazo de Compra", description: "Quando pretende adquirir o bem",
    active: true, required: false, weight: 2,
    options: [
      { label: "Imediato", points: 20 },
      { label: "Até 3 meses", points: 15 },
      { label: "Até 6 meses", points: 10 },
      { label: "Sem previsão", points: 3 }
    ]
  },
  {
    id: 3, name: "Capacidade Financeira", description: "Capacidade mensal de pagamento estimada",
    active: true, required: true, weight: 3,
    options: [
      { label: "Acima de R$3.000/mês", points: 20 },
      { label: "R$1.500 a R$3.000/mês", points: 15 },
      { label: "R$800 a R$1.500/mês", points: 10 },
      { label: "Abaixo de R$800/mês", points: 5 }
    ]
  },
  {
    id: 4, name: "Produto Definido", description: "Se o lead já sabe o que quer",
    active: true, required: false, weight: 1,
    options: [
      { label: "Produto e valor definidos", points: 15 },
      { label: "Apenas produto", points: 10 },
      { label: "Ainda explorando", points: 5 }
    ]
  }
];

// ===== EVENTS =====
export const eventTypes = [
  { id: 1, name: "Lead Recebido", internal: true, external: false, color: "#565674" },
  { id: 2, name: "Atendimento Iniciado", internal: true, external: false, color: "#7239ea" },
  { id: 3, name: "Lead Qualificado", internal: true, external: true, externalName: "Lead", color: "#50cd89" },
  { id: 4, name: "Alta Intenção", internal: true, external: true, externalName: "ViewContent", color: "#ffc700" },
  { id: 5, name: "Oportunidade", internal: true, external: true, externalName: "InitiateCheckout", color: "#009ef7" },
  { id: 6, name: "Documentação Iniciada", internal: true, external: false, color: "#7c3aed" },
  { id: 7, name: "Contrato Assinado", internal: true, external: true, externalName: "AddToCart", color: "#009ef7" },
  { id: 8, name: "Venda Confirmada", internal: true, external: true, externalName: "Purchase", color: "#50cd89" },
  { id: 9, name: "Lead Perdido", internal: true, external: false, color: "#f1416c" }
];

// ===== TRAFFIC DATA =====
export const trafficCampaigns = [
  { id: 1, name: "Campanha Auto Premium", leads: 87, qualified: 34, opportunities: 12, contracts: 4, sales: 2, avgScore: 68, spend: "R$ 4.500" },
  { id: 2, name: "Campanha Imóvel SP", leads: 52, qualified: 28, opportunities: 15, contracts: 6, sales: 3, avgScore: 75, spend: "R$ 6.200" },
  { id: 3, name: "Campanha Geral Brasil", leads: 108, qualified: 27, opportunities: 7, contracts: 2, sales: 1, avgScore: 42, spend: "R$ 3.800" }
];

// ===== CONTRACTS =====
export const contracts = [
  { id: 1, leadName: "Fernanda Costa", product: "Consórcio Imóvel", value: "R$ 500.000", status: "Documentação", createdAt: "10 Jul 2026" },
  { id: 2, leadName: "Roberto Mendes", product: "Consórcio Imóvel", value: "R$ 350.000", status: "Negociação", createdAt: "12 Jul 2026" },
  { id: 3, leadName: "Ana Paula Santos", product: "Consórcio Auto", value: "R$ 100.000", status: "Em Análise", createdAt: "15 Jul 2026" }
];

// ===== ALERTS =====
export const alerts = [
  { id: 1, type: "warning", message: "Lead de alta intenção aguardando: Ana Paula Santos", time: "5 min" },
  { id: 2, type: "error", message: "Intervenção solicitada: Maria Clara Oliveira", time: "23 min" },
  { id: 3, type: "info", message: "Documentação incompleta: Fernanda Costa", time: "2h" },
  { id: 4, type: "success", message: "Contrato assinado: Roberto Mendes", time: "3h" }
];

// ===== LOSS REASONS =====
export const lossReasons = [
  "Sem interesse", "Sem capacidade", "Apenas pesquisando", "Preço",
  "Prazo", "Desistência", "Não respondeu", "Concorrente",
  "Documentação", "Atendimento inadequado", "Outro"
];

// ===== SCORE RANGES =====
export const scoreRanges = [
  { min: 0, max: 20, label: "Não Qualificado", color: "#565674" },
  { min: 21, max: 40, label: "Baixo Potencial", color: "#f1416c" },
  { min: 41, max: 60, label: "Potencial", color: "#ffc700" },
  { min: 61, max: 80, label: "Qualificado", color: "#50cd89" },
  { min: 81, max: 90, label: "Alta Intenção", color: "#009ef7" },
  { min: 91, max: 100, label: "Oportunidade Prioritária", color: "#7239ea" }
];

// ===== USERS =====
export const teamUsers = [
  { id: 1, name: "Carlos Silva", email: "carlos@empresa.com", role: "Administrador", status: "active" },
  { id: 2, name: "Maria Santos", email: "maria@empresa.com", role: "Gestor", status: "active" },
  { id: 3, name: "Pedro Alves", email: "pedro@empresa.com", role: "Atendente", status: "active" },
  { id: 4, name: "Ana Rodrigues", email: "ana@empresa.com", role: "Tráfego", status: "active" },
  { id: 5, name: "Lucas Martins", email: "lucas@empresa.com", role: "Financeiro", status: "inactive" }
];

export const userRoles = [
  { id: "admin", name: "Administrador", description: "Acesso completo" },
  { id: "manager", name: "Gestor", description: "Acompanhamento comercial e operação" },
  { id: "traffic", name: "Tráfego", description: "Métricas e eventos de mídia" },
  { id: "attendant", name: "Atendente", description: "Atendimentos permitidos" },
  { id: "finance", name: "Financeiro", description: "Confirmação de vendas" }
];

// ===== KNOWLEDGE BASE =====
export const knowledgeItems = [
  { id: 1, category: "Produtos", title: "Consórcio de Automóveis", content: "Cartas de crédito de R$30.000 a R$200.000...", type: "official", updatedAt: "10 Jul 2026" },
  { id: 2, category: "Produtos", title: "Consórcio de Imóveis", content: "Cartas de crédito de R$100.000 a R$1.000.000...", type: "official", updatedAt: "10 Jul 2026" },
  { id: 3, category: "Processos", title: "Documentação Necessária", content: "RG/CNH, comprovante de renda, comprovante de endereço...", type: "official", updatedAt: "08 Jul 2026" },
  { id: 4, category: "FAQ", title: "O que é contemplação?", content: "A contemplação acontece quando o consorciado...", type: "official", updatedAt: "05 Jul 2026" },
  { id: 5, category: "FAQ", title: "Como funciona o lance?", content: "O lance é uma oferta de valor para antecipar...", type: "official", updatedAt: "05 Jul 2026" },
  { id: 6, category: "Objeções", title: "Demora para contemplação", content: "Estratégia: explicar que existem lances...", type: "learned", updatedAt: "12 Jul 2026" }
];

// ===== AUDIT LOG =====
export const auditLogs = [
  { id: 1, user: "Carlos Silva", action: "Venda confirmada", target: "Roberto Mendes", timestamp: "15 Jul 2026, 14:30" },
  { id: 2, user: "Maria Santos", action: "Score alterado manualmente", target: "João Pedro Lima (28→35)", timestamp: "15 Jul 2026, 11:20" },
  { id: 3, user: "Sistema", action: "Evento enviado à Meta", target: "Lead Qualificado - Ana Paula Santos", timestamp: "15 Jul 2026, 10:52" },
  { id: 4, user: "Pedro Alves", action: "Intervenção humana", target: "Maria Clara Oliveira", timestamp: "15 Jul 2026, 10:20" },
  { id: 5, user: "Carlos Silva", action: "Critério de qualificação alterado", target: "Prazo de Compra", timestamp: "14 Jul 2026, 16:45" }
];

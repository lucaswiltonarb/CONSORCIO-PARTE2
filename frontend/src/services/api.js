import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const api = axios.create({
  baseURL: API,
  headers: { 'Content-Type': 'application/json' }
});

// ===== LEADS =====
export const fetchLeads = (params = {}) => api.get('/leads', { params });
export const createLead = (data) => api.post('/leads', data);
export const fetchLead = (id) => api.get(`/leads/${id}`);
export const updateLead = (id, data) => api.put(`/leads/${id}`, data);
export const updateLeadStage = (id, stage) => api.put(`/leads/${id}/stage`, { stage });
export const addLeadNote = (id, data) => api.post(`/leads/${id}/notes`, data);

// ===== CONVERSATIONS =====
export const fetchConversations = (params = {}) => api.get('/conversations', { params });
export const fetchMessages = (convId) => api.get(`/conversations/${convId}/messages`);
export const sendMessage = (convId, data) => api.post(`/conversations/${convId}/messages`, data);
export const updateConversationStatus = (convId, status) => api.put(`/conversations/${convId}/status`, { status });

// ===== DASHBOARD =====
export const fetchDashboardKPIs = () => api.get('/dashboard/kpis');
export const fetchDashboardFunnel = () => api.get('/dashboard/funnel');
export const fetchAlerts = () => api.get('/dashboard/alerts');
export const markAlertRead = (id) => api.put(`/dashboard/alerts/${id}/read`);

// ===== QUALIFICATION =====
export const fetchCriteria = () => api.get('/qualification/criteria');
export const createCriterion = (data) => api.post('/qualification/criteria', data);
export const updateCriterion = (id, data) => api.put(`/qualification/criteria/${id}`, data);
export const deleteCriterion = (id) => api.delete(`/qualification/criteria/${id}`);
export const fetchQualificationSettings = () => api.get('/qualification/settings');
export const updateQualificationSettings = (data) => api.put('/qualification/settings', data);

// ===== EVENTS =====
export const fetchEventTypes = () => api.get('/events/types');
export const createEventType = (data) => api.post('/events/types', data);
export const updateEventType = (id, data) => api.put(`/events/types/${id}`, data);
export const fetchEventRules = () => api.get('/events/rules');
export const createEventRule = (data) => api.post('/events/rules', data);
export const fetchEventLogs = (limit = 50) => api.get('/events/log', { params: { limit } });

// ===== CONTRACTS =====
export const fetchContracts = () => api.get('/contracts');
export const createContract = (data) => api.post('/contracts', data);
export const updateContract = (id, data) => api.put(`/contracts/${id}`, data);
export const confirmSale = (id, data) => api.post(`/contracts/${id}/confirm-sale`, data);

// ===== DOCUMENTS =====
export const fetchDocuments = (leadId = null) => api.get('/documents', { params: leadId ? { lead_id: leadId } : {} });
export const createDocument = (data) => api.post('/documents', data);
export const updateDocument = (id, data) => api.put(`/documents/${id}`, data);

// ===== KNOWLEDGE BASE =====
export const fetchKnowledge = (category = null) => api.get('/knowledge', { params: category ? { category } : {} });
export const createKnowledge = (data) => api.post('/knowledge', data);
export const updateKnowledge = (id, data) => api.put(`/knowledge/${id}`, data);
export const deleteKnowledge = (id) => api.delete(`/knowledge/${id}`);

// ===== PLAYBOOK =====
export const fetchPlaybook = () => api.get('/playbook');
export const createPlaybookEntry = (data) => api.post('/playbook', data);
export const updatePlaybookEntry = (id, data) => api.put(`/playbook/${id}`, data);

// ===== HISTORY =====
export const fetchHistoricalConversations = () => api.get('/history/conversations');
export const importHistory = (data) => api.post('/history/import', data);
export const classifyHistory = (id, result) => api.put(`/history/${id}/classify`, { result });

// ===== TRAFFIC =====
export const fetchTrafficCampaigns = () => api.get('/traffic/campaigns');

// ===== SETTINGS =====
export const fetchSettings = () => api.get('/settings');
export const updateSettings = (data) => api.put('/settings', data);

// ===== INTEGRATIONS =====
export const fetchIntegrations = () => api.get('/integrations');
export const updateMetaIntegration = (data) => api.put('/integrations/meta', data);
export const updateWhatsAppIntegration = (data) => api.put('/integrations/whatsapp', data);

// ===== USERS =====
export const fetchUsers = () => api.get('/users');
export const createUser = (data) => api.post('/users', data);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/users/${id}`);

// ===== AUDIT =====
export const fetchAuditLogs = (params = {}) => api.get('/audit', { params });

// ===== REPORTS =====
export const fetchReportsSummary = () => api.get('/reports/summary');

export default api;

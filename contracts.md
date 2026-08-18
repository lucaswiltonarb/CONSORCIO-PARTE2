# Contracts - API & Integration Guide

## API Endpoints

### Leads
- `GET /api/leads` - List leads (filters: stage, score, intent, search, origin)
- `POST /api/leads` - Create lead
- `GET /api/leads/{id}` - Get lead 360° profile
- `PUT /api/leads/{id}` - Update lead
- `PUT /api/leads/{id}/stage` - Update lead stage
- `PUT /api/leads/{id}/score` - Manual score adjustment

### Conversations
- `GET /api/conversations` - List conversations (filters: status, unread)
- `GET /api/conversations/{id}/messages` - Get messages
- `POST /api/conversations/{id}/messages` - Send message (human intervention)
- `PUT /api/conversations/{id}/status` - Change mode (agent/human/paused)

### Dashboard
- `GET /api/dashboard/kpis` - KPI aggregations
- `GET /api/dashboard/funnel` - Funnel stage counts
- `GET /api/dashboard/alerts` - Active alerts

### Qualification
- `GET /api/qualification/criteria` - List criteria
- `POST /api/qualification/criteria` - Create criterion
- `PUT /api/qualification/criteria/{id}` - Update criterion
- `DELETE /api/qualification/criteria/{id}` - Delete criterion
- `PUT /api/qualification/settings` - Toggle qualification on/off

### Events
- `GET /api/events/types` - Event types
- `POST /api/events/types` - Create event type
- `GET /api/events/rules` - Event rules
- `POST /api/events/rules` - Create rule
- `GET /api/events/log` - Event log

### Contracts
- `GET /api/contracts` - List contracts
- `POST /api/contracts` - Create contract
- `PUT /api/contracts/{id}` - Update contract
- `POST /api/contracts/{id}/confirm-sale` - Confirm sale (auth required)

### Documents
- `GET /api/documents` - List documents
- `POST /api/documents` - Track document
- `PUT /api/documents/{id}` - Update document status

### Knowledge Base
- `GET /api/knowledge` - List items
- `POST /api/knowledge` - Add item
- `PUT /api/knowledge/{id}` - Update item
- `DELETE /api/knowledge/{id}` - Delete item

### Traffic
- `GET /api/traffic/campaigns` - Campaign metrics
- `GET /api/traffic/quality` - Quality analysis

### History
- `GET /api/history/conversations` - Historical conversations
- `POST /api/history/import` - Import conversations
- `POST /api/history/{id}/classify` - Classify result

### Settings
- `GET /api/settings` - Get settings
- `PUT /api/settings` - Update settings

### Integrations
- `GET /api/integrations` - Get integration configs
- `PUT /api/integrations/meta` - Update Meta config
- `PUT /api/integrations/whatsapp` - Update WhatsApp config

### Users
- `GET /api/users` - List users
- `POST /api/users` - Create user
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Audit
- `GET /api/audit` - List audit logs (filters: user, action, date)

### Playbook
- `GET /api/playbook` - List playbook entries
- `POST /api/playbook` - Create entry
- `PUT /api/playbook/{id}` - Update/validate entry

## Mock Data to Replace
All data in `/app/frontend/src/data/mockData.js` should be replaced with API calls.

## Frontend Integration
- Replace mock imports with API calls using axios
- Use REACT_APP_BACKEND_URL for all API calls
- Implement loading states and error handling

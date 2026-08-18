import React, { useState, useRef, useEffect } from 'react';
import {
  Search, Phone, MoreVertical, Send, Paperclip, Smile,
  Bot, User, UserCheck, Clock, AlertCircle, ChevronRight,
  Pause, Play, MessageSquare, Star, ArrowRight, Info,
  Target, Zap, FileText, StickyNote, Plus
} from 'lucide-react';
import { chatConversations, chatMessages, leadContextData } from '../data/mockData';

const statusIcons = {
  agent: { icon: Bot, color: '#7c3aed', label: 'Agente' },
  human: { icon: UserCheck, color: '#50cd89', label: 'Humano' },
  waiting: { icon: Clock, color: '#ffc700', label: 'Aguardando' },
  closed: { icon: Pause, color: '#565674', label: 'Encerrado' }
};

const temperatureColors = {
  'Quente': '#f1416c',
  'Morno': '#ffc700',
  'Frio': '#009ef7'
};

const ConversationItem = ({ conversation, isSelected, onClick }) => {
  const StatusIcon = statusIcons[conversation.status]?.icon || Bot;
  const statusColor = statusIcons[conversation.status]?.color || '#565674';
  const initials = conversation.leadName.split(' ').map(n => n[0]).join('').slice(0, 2);

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-start gap-3 p-3 rounded-lg transition-all duration-200 text-left ${
        isSelected
          ? 'bg-[#7c3aed]/15 border border-[#7c3aed]/30'
          : 'hover:bg-[#2b2b40] border border-transparent'
      }`}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-[#2b2b40] flex items-center justify-center text-[#cdcdde] text-sm font-bold">
          {initials}
        </div>
        <div
          className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center border-2"
          style={{ backgroundColor: '#1b1b29', borderColor: '#1b1b29' }}
        >
          <StatusIcon size={10} style={{ color: statusColor }} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <span className={`text-sm font-semibold truncate ${
            isSelected ? 'text-[#cdcdde]' : 'text-[#cdcdde]'
          }`}>
            {conversation.leadName}
          </span>
          <span className="text-[10px] text-[#565674] flex-shrink-0 ml-2">
            {conversation.lastMessageTime}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-[#7e8299] truncate pr-2">{conversation.lastMessage}</p>
          {conversation.unread > 0 && (
            <span className="bg-[#7c3aed] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
              {conversation.unread}
            </span>
          )}
        </div>
        {/* Stage badge */}
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#2b2b40] text-[#7e8299] font-medium">
            {conversation.stage}
          </span>
          <span className="text-[10px] text-[#565674]">
            Score: {conversation.score}
          </span>
        </div>
      </div>
    </button>
  );
};

const ChatBubble = ({ message, isLead }) => (
  <div className={`flex ${isLead ? 'justify-start' : 'justify-end'} mb-3`}>
    <div
      className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
        isLead
          ? 'bg-[#2b2b40] text-[#cdcdde] rounded-tl-md'
          : 'bg-[#7c3aed] text-white rounded-tr-md'
      }`}
    >
      <p>{message.text}</p>
      <div className={`text-[10px] mt-1 ${isLead ? 'text-[#565674]' : 'text-white/60'}`}>
        {message.time}
        {!isLead && <span className="ml-1">• Agente IA</span>}
      </div>
    </div>
  </div>
);

const LeadContextPanel = ({ lead }) => {
  const [activeTab, setActiveTab] = useState('info');
  if (!lead) return null;

  const tabs = [
    { id: 'info', label: 'Info', icon: Info },
    { id: 'criteria', label: 'Critérios', icon: Target },
    { id: 'events', label: 'Timeline', icon: Zap },
    { id: 'notes', label: 'Notas', icon: StickyNote }
  ];

  return (
    <div className="w-full h-full flex flex-col" style={{ backgroundColor: '#1b1b29' }}>
      {/* Lead header */}
      <div className="p-4 border-b border-[#232334]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-[#2b2b40] flex items-center justify-center text-[#cdcdde] font-bold text-lg">
            {lead.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <h3 className="text-[#cdcdde] font-bold text-sm">{lead.name}</h3>
            <p className="text-[#565674] text-xs">{lead.phone}</p>
          </div>
        </div>

        {/* Score & indicators */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg p-2.5" style={{ backgroundColor: '#232334' }}>
            <div className="text-[10px] text-[#565674] mb-0.5">Score</div>
            <div className="text-lg font-bold text-[#50cd89]">{lead.score}</div>
            <div className="text-[10px] text-[#50cd89] font-medium">{lead.scoreLabel}</div>
          </div>
          <div className="rounded-lg p-2.5" style={{ backgroundColor: '#232334' }}>
            <div className="text-[10px] text-[#565674] mb-0.5">Intenção</div>
            <div className="text-lg font-bold text-[#ffc700]">{lead.intent}</div>
            <div className="text-[10px] font-medium" style={{ color: temperatureColors[lead.temperature] }}>
              {lead.temperature}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#232334]">
        {tabs.map((tab) => {
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center gap-1 py-2.5 text-[10px] font-semibold transition-colors ${
                activeTab === tab.id
                  ? 'text-[#7c3aed] border-b-2 border-[#7c3aed]'
                  : 'text-[#565674] hover:text-[#7e8299]'
              }`}
            >
              <TabIcon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'info' && (
          <div className="space-y-3">
            <InfoRow label="Produto" value={lead.product} />
            <InfoRow label="Valor Pretendido" value={lead.desiredValue} />
            <InfoRow label="Profissão" value={lead.profession} badge={lead.professionConfidence} />
            <InfoRow label="Prazo" value={lead.purchaseTimeline} />
            <InfoRow label="Estágio" value={lead.stage} />
            <InfoRow label="Origem" value={lead.origin} />
            <InfoRow label="Primeiro Contato" value={lead.firstContact} />
            {/* Summary */}
            <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: '#232334' }}>
              <div className="text-[10px] text-[#565674] font-semibold uppercase mb-1.5">Resumo</div>
              <p className="text-xs text-[#7e8299] leading-relaxed">{lead.summary}</p>
            </div>
          </div>
        )}

        {activeTab === 'criteria' && (
          <div className="space-y-2">
            {lead.criteria.map((c, i) => (
              <div key={i} className="p-3 rounded-lg" style={{ backgroundColor: '#232334' }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-[#cdcdde] font-semibold">{c.name}</span>
                  <span className="text-xs text-[#50cd89] font-bold">+{c.points} pts</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#7e8299]">{c.value}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    c.confidence === 'Alta' ? 'bg-[#50cd89]/15 text-[#50cd89]' : 'bg-[#ffc700]/15 text-[#ffc700]'
                  }`}>
                    {c.confidence}
                  </span>
                </div>
              </div>
            ))}
            {/* Objections */}
            {lead.objections.length > 0 && (
              <div className="mt-3">
                <div className="text-[10px] text-[#565674] font-semibold uppercase mb-2">Objeções</div>
                {lead.objections.map((o, i) => (
                  <div key={i} className="p-3 rounded-lg border border-[#ffc700]/20" style={{ backgroundColor: 'rgba(255,199,0,0.05)' }}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-[#ffc700] font-semibold">{o.type}</span>
                      <span className="text-[10px] text-[#ffc700]">{o.status}</span>
                    </div>
                    <p className="text-xs text-[#7e8299]">{o.context}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'events' && (
          <div className="space-y-0">
            {lead.timeline.map((event, i) => (
              <div key={i} className="flex gap-3 pb-4 relative">
                {i < lead.timeline.length - 1 && (
                  <div className="absolute left-[7px] top-5 bottom-0 w-px bg-[#232334]" />
                )}
                <div className={`w-4 h-4 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center ${
                  event.type === 'start' ? 'bg-[#50cd89]' :
                  event.type === 'qualification' ? 'bg-[#7c3aed]' :
                  event.type === 'objection' ? 'bg-[#ffc700]' :
                  'bg-[#009ef7]'
                }`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
                <div>
                  <p className="text-xs text-[#cdcdde] leading-snug">{event.event}</p>
                  <span className="text-[10px] text-[#565674]">{event.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'notes' && (
          <div>
            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-dashed border-[#323248] text-[#565674] hover:text-[#7c3aed] hover:border-[#7c3aed] transition-colors text-sm">
              <Plus size={16} />
              Adicionar nota
            </button>
            <div className="mt-4 text-center">
              <p className="text-xs text-[#565674]">Nenhuma nota adicionada</p>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-3 border-t border-[#232334] flex gap-2">
        <button className="flex-1 py-2 rounded-lg text-xs font-semibold bg-[#7c3aed]/15 text-[#7c3aed] hover:bg-[#7c3aed]/25 transition-colors">
          Assumir Conversa
        </button>
        <button className="flex-1 py-2 rounded-lg text-xs font-semibold bg-[#ffc700]/15 text-[#ffc700] hover:bg-[#ffc700]/25 transition-colors">
          Pausar Agente
        </button>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value, badge }) => (
  <div className="flex items-start justify-between">
    <span className="text-[11px] text-[#565674] font-medium">{label}</span>
    <div className="text-right">
      <span className="text-xs text-[#cdcdde] font-medium">{value}</span>
      {badge && (
        <span className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded font-medium ${
          badge === 'Alta' ? 'bg-[#50cd89]/15 text-[#50cd89]' : 'bg-[#ffc700]/15 text-[#ffc700]'
        }`}>
          {badge}
        </span>
      )}
    </div>
  </div>
);

const Chat = () => {
  const [selectedConversation, setSelectedConversation] = useState(chatConversations[0]);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showContext, setShowContext] = useState(true);
  const messagesEndRef = useRef(null);

  const messages = chatMessages[selectedConversation?.id] || [];
  const leadContext = leadContextData[selectedConversation?.leadId];

  const filteredConversations = chatConversations.filter(c => {
    const matchSearch = c.leadName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === 'all' || c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedConversation]);

  const handleSend = () => {
    if (!message.trim()) return;
    setMessage('');
  };

  return (
    <div className="flex rounded-xl overflow-hidden h-[calc(100vh-160px)]" style={{ backgroundColor: '#1b1b29' }}>
      {/* Left - Conversation List */}
      <div className="w-[320px] flex-shrink-0 border-r border-[#232334] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-[#232334]">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[#cdcdde] font-bold text-base">Atendimentos</h2>
            <span className="bg-[#7c3aed]/15 text-[#7c3aed] text-xs font-bold px-2 py-1 rounded-md">
              {chatConversations.length}
            </span>
          </div>
          {/* Search */}
          <div className="relative mb-3">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#565674]" />
            <input
              type="text"
              placeholder="Buscar conversa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm text-[#cdcdde] placeholder-[#565674] border-0 outline-none focus:ring-1 focus:ring-[#7c3aed]"
              style={{ backgroundColor: '#232334' }}
            />
          </div>
          {/* Filters */}
          <div className="flex gap-1">
            {[{ id: 'all', label: 'Todos' }, { id: 'agent', label: 'Agente' }, { id: 'human', label: 'Humano' }, { id: 'waiting', label: 'Aguardando' }].map(f => (
              <button
                key={f.id}
                onClick={() => setFilterStatus(f.id)}
                className={`px-2.5 py-1.5 rounded-md text-[11px] font-semibold transition-colors ${
                  filterStatus === f.id
                    ? 'bg-[#7c3aed]/15 text-[#7c3aed]'
                    : 'text-[#565674] hover:text-[#7e8299] hover:bg-[#2b2b40]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {filteredConversations.map((conv) => (
            <ConversationItem
              key={conv.id}
              conversation={conv}
              isSelected={selectedConversation?.id === conv.id}
              onClick={() => setSelectedConversation(conv)}
            />
          ))}
        </div>
      </div>

      {/* Center - Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat header */}
        <div className="flex items-center justify-between p-4 border-b border-[#232334]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#2b2b40] flex items-center justify-center text-[#cdcdde] text-sm font-bold">
              {selectedConversation?.leadName.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <h3 className="text-[#cdcdde] font-semibold text-sm">{selectedConversation?.leadName}</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#565674]">{selectedConversation?.phone}</span>
                <span className="w-1 h-1 rounded-full bg-[#323248]" />
                <span className="text-[10px] font-medium" style={{ color: statusIcons[selectedConversation?.status]?.color }}>
                  {statusIcons[selectedConversation?.status]?.label}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowContext(!showContext)}
              className={`p-2 rounded-lg transition-colors ${
                showContext ? 'bg-[#7c3aed]/15 text-[#7c3aed]' : 'text-[#565674] hover:text-[#cdcdde] hover:bg-[#2b2b40]'
              }`}
            >
              <Info size={18} />
            </button>
            <button className="p-2 rounded-lg text-[#565674] hover:text-[#cdcdde] hover:bg-[#2b2b40] transition-colors">
              <Phone size={18} />
            </button>
            <button className="p-2 rounded-lg text-[#565674] hover:text-[#cdcdde] hover:bg-[#2b2b40] transition-colors">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1" style={{ backgroundColor: '#151521' }}>
          {/* Date separator */}
          <div className="flex items-center justify-center mb-4">
            <span className="text-[10px] text-[#565674] bg-[#1b1b29] px-3 py-1 rounded-full">Hoje</span>
          </div>
          {messages.map((msg) => (
            <ChatBubble key={msg.id} message={msg} isLead={msg.sender === 'lead'} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-[#232334]">
          <div className="flex items-center gap-3">
            <button className="text-[#565674] hover:text-[#7c3aed] transition-colors">
              <Paperclip size={20} />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Intervir na conversa..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="w-full px-4 py-3 rounded-xl text-sm text-[#cdcdde] placeholder-[#565674] border-0 outline-none focus:ring-1 focus:ring-[#7c3aed]"
                style={{ backgroundColor: '#232334' }}
              />
            </div>
            <button className="text-[#565674] hover:text-[#ffc700] transition-colors">
              <Smile size={20} />
            </button>
            <button
              onClick={handleSend}
              className="w-10 h-10 rounded-xl bg-[#7c3aed] hover:bg-[#6c2bd9] text-white flex items-center justify-center transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Right - Lead Context */}
      {showContext && (
        <div className="w-[300px] flex-shrink-0 border-l border-[#232334] hidden xl:block">
          <LeadContextPanel lead={leadContext} />
        </div>
      )}
    </div>
  );
};

export default Chat;

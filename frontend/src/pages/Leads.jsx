import React, { useState, useEffect } from 'react';
import {
  Search, Filter, ChevronDown, ArrowRight, Plus, Download,
  SlidersHorizontal, MoreVertical, Star, Phone, MessageCircle
} from 'lucide-react';
import { recentLeads as defaultLeads, scoreRanges } from '../data/mockData';
import { fetchLeads } from '../services/api';

const stageColors = {
  'Novo Lead': '#565674', 'Primeiro Contato': '#7239ea', 'Em Atendimento': '#009ef7',
  'Qualificado': '#50cd89', 'Oportunidade': '#ffc700', 'Negociação': '#f1416c',
  'Documentação': '#7c3aed', 'Contrato': '#009ef7', 'Venda Confirmada': '#50cd89', 'Perdido': '#f1416c'
};

const getScoreColor = (score) => {
  const range = scoreRanges.find(r => score >= r.min && score <= r.max);
  return range?.color || '#565674';
};

const getScoreLabel = (score) => {
  const range = scoreRanges.find(r => score >= r.min && score <= r.max);
  return range?.label || 'Desconhecido';
};

const Leads = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState('all');
  const [allLeads, setAllLeads] = useState(defaultLeads);

  useEffect(() => {
    const loadLeads = async () => {
      try {
        const res = await fetchLeads({ limit: 50 });
        if (res.data?.leads?.length) setAllLeads(res.data.leads);
      } catch (e) {
        console.error('Failed to load leads:', e);
      }
    };
    loadLeads();
  }, []);

  const stages = ['all', 'Novo Lead', 'Primeiro Contato', 'Em Atendimento', 'Qualificado', 'Oportunidade', 'Negociação', 'Documentação', 'Perdido'];

  const filteredLeads = allLeads.filter(l => {
    const matchSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase()) || l.phone.includes(searchQuery);
    const matchStage = selectedStage === 'all' || l.stage === selectedStage;
    return matchSearch && matchStage;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-[#cdcdde] font-bold text-xl">Leads</h2>
          <p className="text-[#565674] text-sm">Gerencie todos os leads da operação</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-[#7e8299] hover:text-[#cdcdde] transition-colors" style={{ backgroundColor: '#1b1b29' }}>
            <Download size={16} />
            Exportar
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#7c3aed] text-white hover:bg-[#6c2bd9] transition-colors">
            <Plus size={16} />
            Novo Lead
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl p-4" style={{ backgroundColor: '#1b1b29' }}>
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#565674]" />
            <input
              type="text"
              placeholder="Buscar por nome, telefone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm text-[#cdcdde] placeholder-[#565674] border-0 outline-none focus:ring-1 focus:ring-[#7c3aed]"
              style={{ backgroundColor: '#232334' }}
            />
          </div>

          {/* Stage filter */}
          <div className="flex flex-wrap gap-1">
            {stages.map(stage => (
              <button
                key={stage}
                onClick={() => setSelectedStage(stage)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                  selectedStage === stage
                    ? 'bg-[#7c3aed]/15 text-[#7c3aed]'
                    : 'text-[#565674] hover:text-[#7e8299] hover:bg-[#2b2b40]'
                }`}
              >
                {stage === 'all' ? 'Todos' : stage}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lead cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {filteredLeads.map((lead) => {
          const sColor = stageColors[lead.stage] || '#565674';
          const scoreColor = getScoreColor(lead.score);
          const scoreLabel = getScoreLabel(lead.score);
          const initials = lead.name.split(' ').map(n => n[0]).join('').slice(0, 2);

          return (
            <div
              key={lead.id}
              className="rounded-xl p-4 transition-all duration-200 hover:scale-[1.01] cursor-pointer group"
              style={{ backgroundColor: '#1b1b29' }}
            >
              {/* Top */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#2b2b40] flex items-center justify-center text-[#cdcdde] text-sm font-bold">
                    {initials}
                  </div>
                  <div>
                    <h4 className="text-[#cdcdde] font-semibold text-sm group-hover:text-[#7c3aed] transition-colors">{lead.name}</h4>
                    <p className="text-[11px] text-[#565674]">{lead.phone}</p>
                  </div>
                </div>
                <button className="text-[#565674] hover:text-[#cdcdde] transition-colors opacity-0 group-hover:opacity-100">
                  <MoreVertical size={16} />
                </button>
              </div>

              {/* Stage & Score */}
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold" style={{ backgroundColor: `${sColor}18`, color: sColor }}>
                  {lead.stage}
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${scoreColor}15` }}>
                    <span className="text-xs font-bold" style={{ color: scoreColor }}>{lead.score}</span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="space-y-1.5 mb-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#565674]">Intenção</span>
                  <span className={`text-[11px] font-semibold ${
                    lead.intent === 'Alta' ? 'text-[#50cd89]' :
                    lead.intent === 'Média' ? 'text-[#ffc700]' : 'text-[#565674]'
                  }`}>{lead.intent}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#565674]">Produto</span>
                  <span className="text-[11px] text-[#7e8299]">{lead.product}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#565674]">Score</span>
                  <span className="text-[11px] font-medium" style={{ color: scoreColor }}>{scoreLabel}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3 border-t border-[#232334]">
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-semibold bg-[#7c3aed]/10 text-[#7c3aed] hover:bg-[#7c3aed]/20 transition-colors">
                  <MessageCircle size={13} />
                  Conversa
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-semibold bg-[#2b2b40] text-[#7e8299] hover:text-[#cdcdde] transition-colors">
                  <ArrowRight size={13} />
                  Perfil 360°
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Leads;

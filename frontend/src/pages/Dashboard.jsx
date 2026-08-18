import React, { useState, useEffect } from 'react';
import {
  TrendingUp, TrendingDown, Users, Target, Zap, DollarSign,
  MessageCircle, AlertTriangle, CheckCircle, Clock, ArrowRight,
  BarChart3, Activity, Loader2
} from 'lucide-react';
import { dashboardKPIs as defaultKPIs, funnelStages as defaultFunnel, recentLeads as defaultLeads, alerts as defaultAlerts, trafficCampaigns as defaultCampaigns } from '../data/mockData';
import { fetchDashboardKPIs, fetchDashboardFunnel, fetchAlerts, fetchLeads, fetchTrafficCampaigns } from '../services/api';

const trendIcons = { up: TrendingUp, down: TrendingDown };

const KPICard = ({ kpi }) => {
  const TrendIcon = trendIcons[kpi.trend];
  return (
    <div className="rounded-xl p-5 transition-all duration-200 hover:scale-[1.02]" style={{ backgroundColor: '#1b1b29' }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-[#565674] font-semibold uppercase tracking-wide">{kpi.label}</span>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${kpi.color}15` }}>
          <Activity size={16} style={{ color: kpi.color }} />
        </div>
      </div>
      <div className="text-2xl font-bold text-[#cdcdde] mb-1">{kpi.value}</div>
      <div className="flex items-center gap-1">
        <TrendIcon size={14} className={kpi.trend === 'up' ? 'text-[#50cd89]' : 'text-[#f1416c]'} />
        <span className={`text-xs font-semibold ${kpi.trend === 'up' ? 'text-[#50cd89]' : 'text-[#f1416c]'}`}>
          {kpi.change}
        </span>
        <span className="text-xs text-[#565674] ml-1">vs mês anterior</span>
      </div>
    </div>
  );
};

const FunnelChart = ({ stages = [] }) => {
  const maxCount = Math.max(...stages.map(s => s.count), 1);
  return (
    <div className="rounded-xl p-6" style={{ backgroundColor: '#1b1b29' }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-[#cdcdde] font-bold text-base">Funil Comercial</h3>
          <p className="text-[#565674] text-xs mt-1">Distribuição atual dos leads</p>
        </div>
        <button className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#7e8299] hover:text-[#cdcdde] transition-colors" style={{ backgroundColor: '#2b2b40' }}>
          Ver detalhes
        </button>
      </div>
      <div className="space-y-3">
        {stages.map((stage) => (
          <div key={stage.name} className="flex items-center gap-3">
            <span className="text-xs text-[#7e8299] w-[130px] truncate text-right">{stage.name}</span>
            <div className="flex-1 h-7 rounded-lg overflow-hidden" style={{ backgroundColor: '#232334' }}>
              <div
                className="h-full rounded-lg flex items-center px-3 transition-all duration-700"
                style={{
                  backgroundColor: `${stage.color}30`,
                  width: `${(stage.count / maxCount) * 100}%`,
                  borderLeft: `3px solid ${stage.color}`
                }}
              >
                <span className="text-xs font-bold" style={{ color: stage.color }}>{stage.count}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const stageColors = {
  'Novo Lead': '#565674', 'Primeiro Contato': '#7239ea', 'Em Atendimento': '#009ef7',
  'Qualificado': '#50cd89', 'Oportunidade': '#ffc700', 'Negociação': '#f1416c',
  'Documentação': '#7c3aed', 'Perdido': '#f1416c'
};

const statusLabels = {
  agent: { label: 'Agente', color: '#7c3aed' },
  human: { label: 'Humano', color: '#50cd89' },
  waiting: { label: 'Aguardando', color: '#ffc700' },
  closed: { label: 'Encerrado', color: '#565674' }
};

const RecentLeadsTable = ({ leads = [] }) => (
  <div className="rounded-xl" style={{ backgroundColor: '#1b1b29' }}>
    <div className="flex items-center justify-between p-6 pb-4">
      <div>
        <h3 className="text-[#cdcdde] font-bold text-base">Leads Recentes</h3>
        <p className="text-[#565674] text-xs mt-1">Últimos leads recebidos</p>
      </div>
      <button className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#7e8299] hover:text-[#cdcdde] transition-colors" style={{ backgroundColor: '#2b2b40' }}>
        Ver todos
      </button>
    </div>
    <div className="px-6 pb-4 overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-[#565674] text-[11px] font-semibold uppercase">
            <th className="text-left pb-3">Lead</th>
            <th className="text-left pb-3">Estágio</th>
            <th className="text-center pb-3">Score</th>
            <th className="text-center pb-3">Intenção</th>
            <th className="text-left pb-3">Produto</th>
            <th className="text-center pb-3">Status</th>
            <th className="text-right pb-3 w-10"></th>
          </tr>
        </thead>
        <tbody>
          {(leads || []).slice(0, 6).map((lead) => {
            const sColor = stageColors[lead.stage] || '#565674';
            const sLabel = statusLabels[lead.status] || statusLabels.agent;
            return (
              <tr key={lead.id} className="border-t border-[#232334] hover:bg-[#232334]/50 transition-colors">
                <td className="py-3">
                  <div className="text-sm text-[#cdcdde] font-semibold">{lead.name}</div>
                  <div className="text-[11px] text-[#565674]">{lead.time}</div>
                </td>
                <td className="py-3">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold" style={{ backgroundColor: `${sColor}18`, color: sColor }}>
                    {lead.stage}
                  </span>
                </td>
                <td className="py-3 text-center">
                  <span className="text-sm font-bold text-[#cdcdde]">{lead.score}</span>
                </td>
                <td className="py-3 text-center">
                  <span className={`text-xs font-semibold ${
                    lead.intent === 'Alta' ? 'text-[#50cd89]' :
                    lead.intent === 'Média' ? 'text-[#ffc700]' : 'text-[#565674]'
                  }`}>
                    {lead.intent}
                  </span>
                </td>
                <td className="py-3">
                  <span className="text-xs text-[#7e8299]">{lead.product}</span>
                </td>
                <td className="py-3 text-center">
                  <span className="text-[11px] font-semibold" style={{ color: sLabel.color }}>
                    {sLabel.label}
                  </span>
                </td>
                <td className="py-3 text-right">
                  <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[#2b2b40] transition-colors">
                    <ArrowRight size={14} className="text-[#565674]" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

const AlertsPanel = ({ alerts = [] }) => {
  const alertIcons = {
    warning: { icon: AlertTriangle, color: '#ffc700' },
    error: { icon: AlertTriangle, color: '#f1416c' },
    info: { icon: Clock, color: '#009ef7' },
    success: { icon: CheckCircle, color: '#50cd89' }
  };

  return (
    <div className="rounded-xl p-5" style={{ backgroundColor: '#1b1b29' }}>
      <h3 className="text-[#cdcdde] font-bold text-base mb-4">Alertas</h3>
      <div className="space-y-3">
        {alerts.map((alert) => {
          const alertConfig = alertIcons[alert.type];
          const Icon = alertConfig.icon;
          return (
            <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: '#232334' }}>
              <Icon size={16} style={{ color: alertConfig.color }} className="mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#cdcdde] leading-snug">{alert.message}</p>
                <span className="text-[10px] text-[#565674] mt-1">{alert.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const TrafficOverview = ({ campaigns = [] }) => (
  <div className="rounded-xl p-6" style={{ backgroundColor: '#1b1b29' }}>
    <div className="flex items-center justify-between mb-5">
      <div>
        <h3 className="text-[#cdcdde] font-bold text-base">Qualidade do Tráfego</h3>
        <p className="text-[#565674] text-xs mt-1">Performance por campanha</p>
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-[#565674] text-[11px] font-semibold uppercase">
            <th className="text-left pb-3">Campanha</th>
            <th className="text-center pb-3">Leads</th>
            <th className="text-center pb-3">Qualificados</th>
            <th className="text-center pb-3">Oportunidades</th>
            <th className="text-center pb-3">Vendas</th>
            <th className="text-center pb-3">Score Médio</th>
            <th className="text-right pb-3">Investimento</th>
          </tr>
        </thead>
        <tbody>
          {(campaigns || defaultCampaigns).map((c) => (
            <tr key={c.id} className="border-t border-[#232334]">
              <td className="py-3 text-sm text-[#cdcdde] font-medium">{c.name}</td>
              <td className="py-3 text-center text-sm text-[#7e8299]">{c.leads}</td>
              <td className="py-3 text-center text-sm text-[#50cd89] font-semibold">{c.qualified}</td>
              <td className="py-3 text-center text-sm text-[#ffc700] font-semibold">{c.opportunities}</td>
              <td className="py-3 text-center text-sm text-[#7c3aed] font-bold">{c.sales}</td>
              <td className="py-3 text-center text-sm text-[#cdcdde]">{c.avgScore}</td>
              <td className="py-3 text-right text-sm text-[#7e8299]">{c.spend}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const Dashboard = () => {
  const [kpis, setKpis] = useState(defaultKPIs);
  const [funnel, setFunnel] = useState(defaultFunnel);
  const [alertsList, setAlerts] = useState(defaultAlerts);
  const [leads, setLeads] = useState(defaultLeads);
  const [campaigns, setCampaigns] = useState(defaultCampaigns);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [kpiRes, funnelRes, alertsRes, leadsRes] = await Promise.allSettled([
          fetchDashboardKPIs(),
          fetchDashboardFunnel(),
          fetchAlerts(),
          fetchLeads({ limit: 6 })
        ]);
        if (kpiRes.status === 'fulfilled' && kpiRes.value.data?.length) setKpis(kpiRes.value.data);
        if (funnelRes.status === 'fulfilled' && funnelRes.value.data?.length) setFunnel(funnelRes.value.data);
        if (alertsRes.status === 'fulfilled') setAlerts(alertsRes.value.data || []);
        if (leadsRes.status === 'fulfilled' && leadsRes.value.data?.leads?.length) setLeads(leadsRes.value.data.leads);
        
        try {
          const campRes = await fetchTrafficCampaigns();
          if (campRes.data?.length) setCampaigns(campRes.data);
        } catch(e) {}
      } catch (e) {
        console.error('Dashboard load error:', e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="space-y-5">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {kpis.map((kpi) => (
          <KPICard key={kpi.label} kpi={kpi} />
        ))}
      </div>

      {/* Funnel + Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <FunnelChart stages={funnel} />
        </div>
        <div>
          <AlertsPanel alerts={alertsList} />
        </div>
      </div>

      {/* Recent Leads */}
      <RecentLeadsTable leads={leads} />

      {/* Traffic Overview */}
      <TrafficOverview campaigns={campaigns} />
    </div>
  );
};

export default Dashboard;

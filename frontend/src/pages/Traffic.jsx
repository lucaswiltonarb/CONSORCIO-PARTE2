import React from 'react';
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Users, Target } from 'lucide-react';
import { trafficCampaigns } from '../data/mockData';

const Traffic = () => {
  const totalLeads = trafficCampaigns.reduce((s, c) => s + c.leads, 0);
  const totalSales = trafficCampaigns.reduce((s, c) => s + c.sales, 0);
  const avgScore = Math.round(trafficCampaigns.reduce((s, c) => s + c.avgScore, 0) / trafficCampaigns.length);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-[#cdcdde] font-bold text-xl">Visão de Tráfego</h2>
        <p className="text-[#565674] text-sm">Qualidade real dos leads por campanha</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[{ label: 'Total Leads', value: totalLeads, color: '#7c3aed', icon: Users },
          { label: 'Vendas', value: totalSales, color: '#50cd89', icon: DollarSign },
          { label: 'Score Médio', value: avgScore, color: '#ffc700', icon: Target },
          { label: 'Conversão', value: `${((totalSales / totalLeads) * 100).toFixed(1)}%`, color: '#009ef7', icon: TrendingUp }
        ].map(k => (
          <div key={k.label} className="rounded-xl p-4" style={{ backgroundColor: '#1b1b29' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#565674] font-semibold">{k.label}</span>
              <k.icon size={16} style={{ color: k.color }} />
            </div>
            <div className="text-2xl font-bold" style={{ color: k.color }}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Campaign comparison */}
      <div className="rounded-xl p-6" style={{ backgroundColor: '#1b1b29' }}>
        <h3 className="text-[#cdcdde] font-bold text-base mb-5">Comparação por Campanha</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-[#565674] text-[11px] font-semibold uppercase">
                <th className="text-left pb-3">Campanha</th>
                <th className="text-center pb-3">Leads</th>
                <th className="text-center pb-3">Qualificados</th>
                <th className="text-center pb-3">% Qualif.</th>
                <th className="text-center pb-3">Oportunidades</th>
                <th className="text-center pb-3">Vendas</th>
                <th className="text-center pb-3">Score Médio</th>
                <th className="text-right pb-3">Investimento</th>
                <th className="text-right pb-3">CPA</th>
              </tr>
            </thead>
            <tbody>
              {trafficCampaigns.map((c) => {
                const qualPct = ((c.qualified / c.leads) * 100).toFixed(0);
                const cpa = c.sales > 0 ? `R$ ${(parseFloat(c.spend.replace(/[^0-9.]/g, '').replace(',', '')) / c.sales).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}` : '-';
                return (
                  <tr key={c.id} className="border-t border-[#232334]">
                    <td className="py-3 text-sm text-[#cdcdde] font-medium">{c.name}</td>
                    <td className="py-3 text-center text-sm text-[#7e8299]">{c.leads}</td>
                    <td className="py-3 text-center text-sm text-[#50cd89] font-semibold">{c.qualified}</td>
                    <td className="py-3 text-center">
                      <span className={`text-sm font-semibold ${parseInt(qualPct) > 40 ? 'text-[#50cd89]' : parseInt(qualPct) > 25 ? 'text-[#ffc700]' : 'text-[#f1416c]'}`}>{qualPct}%</span>
                    </td>
                    <td className="py-3 text-center text-sm text-[#ffc700] font-semibold">{c.opportunities}</td>
                    <td className="py-3 text-center text-sm text-[#7c3aed] font-bold">{c.sales}</td>
                    <td className="py-3 text-center text-sm text-[#cdcdde]">{c.avgScore}</td>
                    <td className="py-3 text-right text-sm text-[#7e8299]">{c.spend}</td>
                    <td className="py-3 text-right text-sm text-[#cdcdde] font-medium">{cpa}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quality insight */}
      <div className="rounded-xl p-5 border border-dashed border-[#7239ea]/30" style={{ backgroundColor: 'rgba(114,57,234,0.05)' }}>
        <h4 className="text-sm text-[#7c3aed] font-bold mb-2">Insight de Qualidade</h4>
        <p className="text-xs text-[#7e8299] leading-relaxed">
          A <strong className="text-[#cdcdde]">Campanha Imóvel SP</strong> apresenta o maior score médio (75) e a melhor taxa de qualificação (54%), 
          sugerindo leads de melhor qualidade. Já a <strong className="text-[#cdcdde]">Campanha Geral Brasil</strong> gera maior volume, 
          mas com score médio significativamente menor (42). Considere otimizar o público desta campanha.
        </p>
      </div>
    </div>
  );
};

export default Traffic;

import React from 'react';
import { TrendingUp, BarChart3, PieChart, Activity } from 'lucide-react';

const Reports = () => {
  const insights = [
    { title: 'Objeções mais comuns', items: ['Contemplação (42%)', 'Preço da parcela (28%)', 'Prazo (18%)', 'Preferência por financiamento (12%)'] },
    { title: 'Dúvidas mais frequentes', items: ['Como funciona o lance?', 'Quando sou contemplado?', 'Posso desistir?', 'Qual o valor da parcela?'] },
    { title: 'Características de compradores', items: ['Empresários (38%)', 'CLT com renda > R$5k (27%)', 'Servidores públicos (20%)', 'Autônomos (15%)'] },
    { title: 'Motivos de perda', items: ['Não respondeu (35%)', 'Sem capacidade (22%)', 'Apenas pesquisando (18%)', 'Concorrente (15%)', 'Preço (10%)'] }
  ];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-[#cdcdde] font-bold text-xl">Relatórios e Insights</h2>
        <p className="text-[#565674] text-sm">Inteligência extraída das conversas e operação</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[{ label: 'Conversas Analisadas', value: '834', color: '#7c3aed' },
          { label: 'Tempo Médio até Venda', value: '12 dias', color: '#009ef7' },
          { label: 'Interações Médias', value: '24 msgs', color: '#ffc700' },
          { label: 'Taxa Abandono', value: '32%', color: '#f1416c' }
        ].map(s => (
          <div key={s.label} className="rounded-xl p-4" style={{ backgroundColor: '#1b1b29' }}>
            <span className="text-xs text-[#565674] font-semibold">{s.label}</span>
            <div className="text-2xl font-bold mt-1" style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {insights.map((insight) => (
          <div key={insight.title} className="rounded-xl p-5" style={{ backgroundColor: '#1b1b29' }}>
            <h3 className="text-[#cdcdde] font-bold text-sm mb-3">{insight.title}</h3>
            <div className="space-y-2">
              {insight.items.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold" style={{ backgroundColor: '#232334', color: '#7e8299' }}>{i + 1}</div>
                  <span className="text-xs text-[#7e8299]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;

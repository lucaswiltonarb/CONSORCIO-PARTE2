import React, { useState } from 'react';
import { History, Upload, CheckCircle, Clock, AlertCircle, BarChart3, MessageSquare } from 'lucide-react';

const historicalData = [
  { id: 1, contact: 'Cliente A', messages: 234, period: 'Jan-Mar 2026', result: 'Venda', status: 'Processado', patterns: 5 },
  { id: 2, contact: 'Cliente B', messages: 87, period: 'Fev 2026', result: 'Perdido', status: 'Processado', patterns: 2 },
  { id: 3, contact: 'Cliente C', messages: 156, period: 'Mar 2026', result: 'Venda', status: 'Processado', patterns: 4 },
  { id: 4, contact: 'Cliente D', messages: 45, period: 'Abr 2026', result: 'Desconhecido', status: 'Pendente', patterns: 0 },
  { id: 5, contact: 'Cliente E', messages: 312, period: 'Jan-Jun 2026', result: 'Venda', status: 'Processado', patterns: 7 },
];

const HistoryPage = () => {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#cdcdde] font-bold text-xl">Histórico de Conversas</h2>
          <p className="text-[#565674] text-sm">Importe e analise conversas históricas do especialista</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#7c3aed] text-white hover:bg-[#6c2bd9] transition-colors">
          <Upload size={16} />
          Importar Conversas
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[{ label: 'Conversas', value: 5, color: '#7c3aed' }, { label: 'Processadas', value: 4, color: '#50cd89' }, { label: 'Pendentes', value: 1, color: '#ffc700' }, { label: 'Vendas', value: 3, color: '#009ef7' }, { label: 'Padrões', value: 18, color: '#7239ea' }].map(s => (
          <div key={s.label} className="rounded-xl p-4" style={{ backgroundColor: '#1b1b29' }}>
            <span className="text-xs text-[#565674] font-semibold">{s.label}</span>
            <div className="text-2xl font-bold mt-1" style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl" style={{ backgroundColor: '#1b1b29' }}>
        <div className="p-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-[#565674] text-[11px] font-semibold uppercase">
                <th className="text-left pb-3">Contato</th>
                <th className="text-center pb-3">Mensagens</th>
                <th className="text-left pb-3">Período</th>
                <th className="text-center pb-3">Resultado</th>
                <th className="text-center pb-3">Status</th>
                <th className="text-center pb-3">Padrões</th>
                <th className="text-right pb-3">Ação</th>
              </tr>
            </thead>
            <tbody>
              {historicalData.map((h) => (
                <tr key={h.id} className="border-t border-[#232334]">
                  <td className="py-3 text-sm text-[#cdcdde] font-medium">{h.contact}</td>
                  <td className="py-3 text-center text-sm text-[#7e8299]">{h.messages}</td>
                  <td className="py-3 text-sm text-[#7e8299]">{h.period}</td>
                  <td className="py-3 text-center">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                      h.result === 'Venda' ? 'bg-[#50cd89]/15 text-[#50cd89]' :
                      h.result === 'Perdido' ? 'bg-[#f1416c]/15 text-[#f1416c]' :
                      'bg-[#565674]/15 text-[#565674]'
                    }`}>{h.result}</span>
                  </td>
                  <td className="py-3 text-center">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                      h.status === 'Processado' ? 'bg-[#50cd89]/15 text-[#50cd89]' : 'bg-[#ffc700]/15 text-[#ffc700]'
                    }`}>{h.status}</span>
                  </td>
                  <td className="py-3 text-center text-sm text-[#7c3aed] font-semibold">{h.patterns}</td>
                  <td className="py-3 text-right">
                    <button className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#7e8299] hover:text-[#cdcdde] transition-colors" style={{ backgroundColor: '#232334' }}>
                      {h.status === 'Pendente' ? 'Processar' : 'Analisar'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;

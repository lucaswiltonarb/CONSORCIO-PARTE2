import React, { useState, useEffect } from 'react';
import { Zap, Plus, Settings, ArrowRight, ExternalLink, CheckCircle, XCircle } from 'lucide-react';
import { eventTypes as defaultTypes } from '../data/mockData';
import { fetchEventTypes, fetchEventRules, fetchEventLogs } from '../services/api';

const Events = () => {
  const [activeTab, setActiveTab] = useState('types');
  const [types, setTypes] = useState(defaultTypes);
  const [rules, setRules] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchEventTypes();
        if (res.data?.length) setTypes(res.data);
      } catch(e) {}
    };
    load();
  }, []);

  useEffect(() => {
    if (activeTab === 'rules') {
      fetchEventRules().then(r => setRules(r.data || [])).catch(() => {});
    } else if (activeTab === 'log') {
      fetchEventLogs().then(r => setLogs(r.data || [])).catch(() => {});
    }
  }, [activeTab]);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#cdcdde] font-bold text-xl">Eventos</h2>
          <p className="text-[#565674] text-sm">Configure eventos comerciais e integrações</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#7c3aed] text-white hover:bg-[#6c2bd9] transition-colors">
          <Plus size={16} />
          Novo Evento
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-lg" style={{ backgroundColor: '#1b1b29' }}>
        {[{ id: 'types', label: 'Tipos de Evento' }, { id: 'rules', label: 'Regras' }, { id: 'log', label: 'Log de Eventos' }].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === tab.id ? 'bg-[#7c3aed]/15 text-[#7c3aed]' : 'text-[#565674] hover:text-[#7e8299]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'types' && (
        <div className="rounded-xl" style={{ backgroundColor: '#1b1b29' }}>
          <div className="p-6 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-[#565674] text-[11px] font-semibold uppercase">
                  <th className="text-left pb-3">Evento Interno</th>
                  <th className="text-center pb-3">Ativo</th>
                  <th className="text-center pb-3">Enviar Externamente</th>
                  <th className="text-left pb-3">Evento Externo (Meta)</th>
                  <th className="text-right pb-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {types.map((evt) => (
                  <tr key={evt.id} className="border-t border-[#232334]">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: evt.color }} />
                        <span className="text-sm text-[#cdcdde] font-medium">{evt.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-center">
                      <CheckCircle size={16} className="text-[#50cd89] mx-auto" />
                    </td>
                    <td className="py-3 text-center">
                      {evt.external ? <CheckCircle size={16} className="text-[#50cd89] mx-auto" /> : <XCircle size={16} className="text-[#565674] mx-auto" />}
                    </td>
                    <td className="py-3">
                      {(evt.external_name || evt.externalName) ? (
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#009ef7]/15 text-[#009ef7]">{evt.external_name || evt.externalName}</span>
                      ) : (
                        <span className="text-xs text-[#565674]">—</span>
                      )}
                    </td>
                    <td className="py-3 text-right">
                      <button className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#7e8299] hover:text-[#cdcdde] transition-colors" style={{ backgroundColor: '#232334' }}>
                        Configurar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'rules' && (
        <div className="rounded-xl p-6" style={{ backgroundColor: '#1b1b29' }}>
          <div className="space-y-3">
            <div className="p-4 rounded-lg border border-dashed border-[#323248]" style={{ backgroundColor: '#232334' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#cdcdde] font-semibold">Lead Qualificado</span>
                <span className="text-[10px] text-[#50cd89] bg-[#50cd89]/15 px-2 py-0.5 rounded font-medium">Ativa</span>
              </div>
              <p className="text-xs text-[#7e8299]">SE Score >= 70 E Intenção = Alta ENTÃO gerar evento "Lead Qualificado"</p>
            </div>
            <div className="p-4 rounded-lg border border-dashed border-[#323248]" style={{ backgroundColor: '#232334' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#cdcdde] font-semibold">Purchase</span>
                <span className="text-[10px] text-[#50cd89] bg-[#50cd89]/15 px-2 py-0.5 rounded font-medium">Ativa</span>
              </div>
              <p className="text-xs text-[#7e8299]">SE Venda confirmada manualmente ENTÃO gerar evento "Purchase" + enviar Meta CAPI</p>
            </div>
            <button className="w-full py-3 rounded-lg border border-dashed border-[#323248] text-[#565674] hover:text-[#7c3aed] hover:border-[#7c3aed] transition-colors text-sm font-medium">
              + Adicionar regra
            </button>
          </div>
        </div>
      )}

      {activeTab === 'log' && (
        <div className="rounded-xl p-6" style={{ backgroundColor: '#1b1b29' }}>
          <div className="space-y-2">
            {[{ event: 'Lead Qualificado', lead: 'Ana Paula Santos', dest: 'Meta CAPI', status: 'Sucesso', time: '10:52', color: '#50cd89' },
              { event: 'Atendimento Iniciado', lead: 'João Pedro Lima', dest: 'Interno', status: 'Registrado', time: '09:58', color: '#7239ea' },
              { event: 'Venda Confirmada', lead: 'Roberto Mendes', dest: 'Meta CAPI', status: 'Sucesso', time: '14:30 (ontem)', color: '#50cd89' }
            ].map((log, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#232334' }}>
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: log.color }} />
                  <div>
                    <span className="text-sm text-[#cdcdde] font-medium">{log.event}</span>
                    <span className="text-xs text-[#565674] ml-2">{log.lead}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-[#7e8299]">{log.dest}</span>
                  <span className="text-[11px] font-semibold" style={{ color: log.color }}>{log.status}</span>
                  <span className="text-[11px] text-[#565674]">{log.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;

import React, { useState, useEffect } from 'react';
import { Shield, Search, Filter } from 'lucide-react';
import { auditLogs as defaultLogs } from '../data/mockData';
import { fetchAuditLogs } from '../services/api';

const actionColors = {
  'Venda confirmada': '#50cd89',
  'Score alterado manualmente': '#ffc700',
  'Evento enviado à Meta': '#009ef7',
  'Intervenção humana': '#7c3aed',
  'Critério de qualificação alterado': '#ffc700'
};

const Audit = () => {
  const [logs, setLogs] = useState(defaultLogs);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchAuditLogs();
        if (res.data?.length) setLogs(res.data);
      } catch(e) {}
    };
    load();
  }, []);
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#cdcdde] font-bold text-xl">Auditoria</h2>
          <p className="text-[#565674] text-sm">Registro de ações importantes do sistema</p>
        </div>
      </div>

      {/* Search */}
      <div className="rounded-xl p-4" style={{ backgroundColor: '#1b1b29' }}>
        <div className="relative max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#565674]" />
          <input type="text" placeholder="Buscar ações, usuários..." className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm text-[#cdcdde] placeholder-[#565674] outline-none focus:ring-1 focus:ring-[#7c3aed]" style={{ backgroundColor: '#232334' }} />
        </div>
      </div>

      {/* Logs */}
      <div className="rounded-xl" style={{ backgroundColor: '#1b1b29' }}>
        <div className="p-6">
          <div className="space-y-0">
            {logs.map((log, i) => {
              const aColor = actionColors[log.action] || '#7e8299';
              return (
                <div key={log.id} className="flex items-start gap-4 pb-5 relative">
                  {i < logs.length - 1 && (
                    <div className="absolute left-[7px] top-5 bottom-0 w-px bg-[#232334]" />
                  )}
                  <div className="w-4 h-4 rounded-full flex-shrink-0 mt-0.5" style={{ backgroundColor: aColor }}>
                    <div className="w-full h-full rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm text-[#cdcdde] font-semibold">{log.action}</span>
                      <span className="text-xs text-[#7e8299]">— {log.target}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-[#565674]">por <strong className="text-[#7e8299]">{log.user}</strong></span>
                      <span className="text-[10px] text-[#565674]">{log.timestamp}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Audit;

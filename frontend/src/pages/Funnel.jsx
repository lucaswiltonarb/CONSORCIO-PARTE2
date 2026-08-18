import React from 'react';
import { Filter as FilterIcon, Users, ArrowRight } from 'lucide-react';
import { funnelStages } from '../data/mockData';

const Funnel = () => {
  const totalLeads = funnelStages.reduce((sum, s) => sum + s.count, 0);
  const maxCount = Math.max(...funnelStages.map(s => s.count));

  return (
    <div className="space-y-5">
      {/* Funnel Visual */}
      <div className="rounded-xl p-6" style={{ backgroundColor: '#1b1b29' }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-[#cdcdde] font-bold text-lg">Funil Comercial</h3>
            <p className="text-[#565674] text-sm mt-1">Visão completa do pipeline</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#cdcdde]" style={{ backgroundColor: '#232334' }}>
              Total: {totalLeads} leads
            </div>
          </div>
        </div>

        {/* Funnel bars */}
        <div className="space-y-2">
          {funnelStages.map((stage, idx) => {
            const widthPct = Math.max((stage.count / maxCount) * 100, 15);
            const convRate = idx > 0 ? ((stage.count / funnelStages[idx - 1].count) * 100).toFixed(0) : 100;
            return (
              <div key={stage.name} className="flex items-center gap-4">
                <span className="text-xs text-[#7e8299] w-[140px] text-right font-medium truncate">{stage.name}</span>
                <div className="flex-1">
                  <div
                    className="h-10 rounded-lg flex items-center px-4 justify-between transition-all duration-700 cursor-pointer hover:opacity-80"
                    style={{
                      backgroundColor: `${stage.color}20`,
                      width: `${widthPct}%`,
                      borderLeft: `4px solid ${stage.color}`
                    }}
                  >
                    <span className="text-sm font-bold" style={{ color: stage.color }}>{stage.count}</span>
                    <span className="text-[10px] text-[#565674]">{convRate}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stage details cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {funnelStages.map((stage) => (
          <div key={stage.name} className="rounded-xl p-4 transition-all hover:scale-[1.01]" style={{ backgroundColor: '#1b1b29' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold" style={{ color: stage.color }}>{stage.name}</span>
              <span className="text-lg font-bold text-[#cdcdde]">{stage.count}</span>
            </div>
            <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: '#232334' }}>
              <div className="h-1.5 rounded-full" style={{ backgroundColor: stage.color, width: `${(stage.count / maxCount) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Funnel;

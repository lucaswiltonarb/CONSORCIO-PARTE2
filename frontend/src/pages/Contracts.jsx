import React, { useState } from 'react';
import { FileSignature, Search, Plus, ChevronRight, Clock, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { contracts } from '../data/mockData';

const statusConfig = {
  'Documentação': { color: '#ffc700', icon: Clock },
  'Negociação': { color: '#009ef7', icon: AlertCircle },
  'Em Análise': { color: '#7239ea', icon: FileText },
  'Assinado': { color: '#50cd89', icon: CheckCircle },
  'Confirmado': { color: '#50cd89', icon: CheckCircle }
};

const Contracts = () => {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#cdcdde] font-bold text-xl">Contratos</h2>
          <p className="text-[#565674] text-sm">Gerencie contratos e contratações</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#7c3aed] text-white hover:bg-[#6c2bd9] transition-colors">
          <Plus size={16} />
          Nova Contratação
        </button>
      </div>

      <div className="rounded-xl" style={{ backgroundColor: '#1b1b29' }}>
        <div className="p-6 pb-0">
          <div className="relative max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#565674]" />
            <input type="text" placeholder="Buscar contratos..." className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm text-[#cdcdde] placeholder-[#565674] outline-none focus:ring-1 focus:ring-[#7c3aed]" style={{ backgroundColor: '#232334' }} />
          </div>
        </div>
        <div className="p-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-[#565674] text-[11px] font-semibold uppercase">
                <th className="text-left pb-3">Lead</th>
                <th className="text-left pb-3">Produto</th>
                <th className="text-center pb-3">Valor</th>
                <th className="text-center pb-3">Status</th>
                <th className="text-left pb-3">Data</th>
                <th className="text-right pb-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((c) => {
                const cfg = statusConfig[c.status] || statusConfig['Em Análise'];
                return (
                  <tr key={c.id} className="border-t border-[#232334] hover:bg-[#232334]/50">
                    <td className="py-3 text-sm text-[#cdcdde] font-semibold">{c.leadName}</td>
                    <td className="py-3 text-sm text-[#7e8299]">{c.product}</td>
                    <td className="py-3 text-center text-sm text-[#cdcdde] font-semibold">{c.value}</td>
                    <td className="py-3 text-center">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold" style={{ backgroundColor: `${cfg.color}18`, color: cfg.color }}>{c.status}</span>
                    </td>
                    <td className="py-3 text-sm text-[#565674]">{c.createdAt}</td>
                    <td className="py-3 text-right">
                      <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#50cd89]/15 text-[#50cd89] hover:bg-[#50cd89]/25 transition-colors">
                        Confirmar Venda
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Contracts;

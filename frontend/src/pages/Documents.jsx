import React from 'react';
import { FolderOpen, Upload, CheckCircle, Clock, XCircle, RefreshCw } from 'lucide-react';

const documents = [
  { id: 1, lead: 'Fernanda Costa', docType: 'RG/CNH', status: 'Recebido', date: '14 Jul 2026' },
  { id: 2, lead: 'Fernanda Costa', docType: 'Comprovante de Renda', status: 'Validado', date: '14 Jul 2026' },
  { id: 3, lead: 'Fernanda Costa', docType: 'Comprovante de Endereço', status: 'Pendente', date: '-' },
  { id: 4, lead: 'Roberto Mendes', docType: 'RG/CNH', status: 'Pendente', date: '-' },
  { id: 5, lead: 'Roberto Mendes', docType: 'Comprovante de Renda', status: 'Pendente', date: '-' },
];

const statusConfig = {
  'Recebido': { color: '#009ef7', icon: CheckCircle },
  'Validado': { color: '#50cd89', icon: CheckCircle },
  'Pendente': { color: '#ffc700', icon: Clock },
  'Recusado': { color: '#f1416c', icon: XCircle },
  'Reenvio': { color: '#7239ea', icon: RefreshCw }
};

const Documents = () => {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#cdcdde] font-bold text-xl">Documentos</h2>
          <p className="text-[#565674] text-sm">Acompanhe documentos de contratação</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[{ label: 'Pendentes', value: 3, color: '#ffc700' }, { label: 'Recebidos', value: 1, color: '#009ef7' }, { label: 'Validados', value: 1, color: '#50cd89' }, { label: 'Recusados', value: 0, color: '#f1416c' }].map(s => (
          <div key={s.label} className="rounded-xl p-4" style={{ backgroundColor: '#1b1b29' }}>
            <span className="text-xs text-[#565674] font-semibold">{s.label}</span>
            <div className="text-2xl font-bold mt-1" style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl" style={{ backgroundColor: '#1b1b29' }}>
        <div className="p-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-[#565674] text-[11px] font-semibold uppercase">
                <th className="text-left pb-3">Lead</th>
                <th className="text-left pb-3">Documento</th>
                <th className="text-center pb-3">Status</th>
                <th className="text-left pb-3">Data</th>
                <th className="text-right pb-3">Ação</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => {
                const cfg = statusConfig[doc.status];
                const Icon = cfg.icon;
                return (
                  <tr key={doc.id} className="border-t border-[#232334]">
                    <td className="py-3 text-sm text-[#cdcdde] font-medium">{doc.lead}</td>
                    <td className="py-3 text-sm text-[#7e8299]">{doc.docType}</td>
                    <td className="py-3 text-center">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold" style={{ backgroundColor: `${cfg.color}18`, color: cfg.color }}>
                        <Icon size={12} />{doc.status}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-[#565674]">{doc.date}</td>
                    <td className="py-3 text-right">
                      <button className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#7e8299] hover:text-[#cdcdde] transition-colors" style={{ backgroundColor: '#232334' }}>
                        {doc.status === 'Pendente' ? 'Solicitar' : 'Ver'}
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

export default Documents;

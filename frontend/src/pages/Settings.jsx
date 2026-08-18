import React, { useState } from 'react';
import { Settings as SettingsIcon, ToggleLeft, ToggleRight, Save, Clock, Bot, MessageCircle, Shield } from 'lucide-react';

const Settings = () => {
  const [agentActive, setAgentActive] = useState(true);
  const [qualActive, setQualActive] = useState(true);
  const [followUp, setFollowUp] = useState(true);

  const settingSections = [
    {
      title: 'Agente de Atendimento',
      icon: Bot,
      items: [
        { label: 'Agente ativo', desc: 'Habilitar atendimento automático', value: agentActive, toggle: setAgentActive },
        { label: 'Qualificação ativa', desc: 'O agente tenta qualificar leads', value: qualActive, toggle: setQualActive },
        { label: 'Follow-up automático', desc: 'Enviar mensagens de acompanhamento', value: followUp, toggle: setFollowUp },
      ]
    }
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#cdcdde] font-bold text-xl">Configurações</h2>
          <p className="text-[#565674] text-sm">Configure o comportamento da plataforma</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#50cd89] text-white hover:bg-[#47b97a] transition-colors">
          <Save size={16} />
          Salvar
        </button>
      </div>

      {settingSections.map((section) => {
        const SectionIcon = section.icon;
        return (
          <div key={section.title} className="rounded-xl p-6" style={{ backgroundColor: '#1b1b29' }}>
            <div className="flex items-center gap-2 mb-4">
              <SectionIcon size={18} className="text-[#7c3aed]" />
              <h3 className="text-[#cdcdde] font-bold text-sm">{section.title}</h3>
            </div>
            <div className="space-y-3">
              {section.items.map((item) => (
                <div key={item.label} className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: '#232334' }}>
                  <div>
                    <span className="text-sm text-[#cdcdde] font-medium">{item.label}</span>
                    <p className="text-xs text-[#565674] mt-0.5">{item.desc}</p>
                  </div>
                  <button onClick={() => item.toggle(!item.value)} className="transition-colors">
                    {item.value ?
                      <ToggleRight size={28} className="text-[#50cd89]" /> :
                      <ToggleLeft size={28} className="text-[#565674]" />
                    }
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Score ranges config */}
      <div className="rounded-xl p-6" style={{ backgroundColor: '#1b1b29' }}>
        <h3 className="text-[#cdcdde] font-bold text-sm mb-4">Faixas de Score</h3>
        <div className="space-y-2">
          {[{ range: '0-20', label: 'Não Qualificado', color: '#565674' },
            { range: '21-40', label: 'Baixo Potencial', color: '#f1416c' },
            { range: '41-60', label: 'Potencial', color: '#ffc700' },
            { range: '61-80', label: 'Qualificado', color: '#50cd89' },
            { range: '81-90', label: 'Alta Intenção', color: '#009ef7' },
            { range: '91-100', label: 'Oportunidade Prioritária', color: '#7239ea' }
          ].map(s => (
            <div key={s.range} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#232334' }}>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="text-sm text-[#cdcdde]">{s.label}</span>
              </div>
              <span className="text-xs text-[#7e8299] font-mono">{s.range}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Funnel stages config */}
      <div className="rounded-xl p-6" style={{ backgroundColor: '#1b1b29' }}>
        <h3 className="text-[#cdcdde] font-bold text-sm mb-4">Estágios do Funil</h3>
        <div className="space-y-1">
          {['Novo Lead', 'Primeiro Contato', 'Em Atendimento', 'Em Diagnóstico', 'Qualificado', 'Oportunidade', 'Simulação', 'Negociação', 'Documentação', 'Contrato Iniciado', 'Contrato Assinado', 'Aguardando Confirmação', 'Venda Confirmada', 'Perdido', 'Sem Interesse'].map((stage, i) => (
            <div key={stage} className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#232334] transition-colors">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#565674] font-mono w-5">{i + 1}</span>
                <span className="text-sm text-[#cdcdde]">{stage}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;

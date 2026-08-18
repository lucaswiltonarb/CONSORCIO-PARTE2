import React, { useState } from 'react';
import { BookOpen, Search, ChevronDown, ChevronUp, Eye, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';

const playbookEntries = [
  {
    id: 1,
    situation: 'Lead pergunta sobre contemplação',
    context: 'Lead demonstra interesse mas tem medo de não ser contemplado',
    signals: ['Pergunta "quando vou ser contemplado?"', 'Demonstra ansiedade sobre prazo', 'Compara com financiamento'],
    strategy: 'Não minimizar a preocupação. Explicar mecanismo de lances. Mostrar que existe controle parcial.',
    approach: 'Natural, sem pressão. Usar exemplos reais de contemplação rápida por lance.',
    avoid: 'Não prometer contemplação rápida. Não comparar diretamente com financiamento de forma negativa.',
    evidence: '72% das conversas onde essa objeção foi tratada com foco em lances resultaram em avanço.',
    validated: true
  },
  {
    id: 2,
    situation: 'Lead diz que está "só pesquisando"',
    context: 'Lead pode estar genuinamente pesquisando ou usando como defesa',
    signals: ['Respostas curtas', 'Evita perguntas diretas', 'Não dá informações pessoais'],
    strategy: 'Aceitar a posição sem confrontar. Oferecer informação de valor. Deixar porta aberta.',
    approach: 'Leve e informativo. Não tentar qualificar imediatamente.',
    avoid: 'Não pressionar. Não fazer muitas perguntas seguidas. Não parecer vendedor.',
    evidence: '45% dos leads "só pesquisando" retornaram após receberem informação sem pressão.',
    validated: true
  },
  {
    id: 3,
    situation: 'Lead pergunta sobre valor da parcela',
    context: 'Momento de qualificação financeira natural',
    signals: ['Pergunta direta sobre valores', 'Demonstra preocupação com orçamento'],
    strategy: 'Aproveitar para entender capacidade financeira sem interrogar. Apresentar faixas.',
    approach: 'Objetivo e claro sobre valores. Perguntar indiretamente sobre capacidade.',
    avoid: 'Não perguntar renda diretamente neste momento.',
    evidence: 'Abordagem indireta de renda neste momento tem 60% mais chance de obter a informação.',
    validated: false
  }
];

const Playbook = () => {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#cdcdde] font-bold text-xl">Playbook do Especialista</h2>
          <p className="text-[#565674] text-sm">Estratégias aprendidas e validadas</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[{ label: 'Estratégias', value: playbookEntries.length, color: '#7c3aed' }, { label: 'Validadas', value: playbookEntries.filter(e => e.validated).length, color: '#50cd89' }, { label: 'Pendentes', value: playbookEntries.filter(e => !e.validated).length, color: '#ffc700' }].map(s => (
          <div key={s.label} className="rounded-xl p-4" style={{ backgroundColor: '#1b1b29' }}>
            <span className="text-xs text-[#565674] font-semibold">{s.label}</span>
            <div className="text-2xl font-bold mt-1" style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Entries */}
      <div className="space-y-3">
        {playbookEntries.map((entry) => {
          const isExpanded = expandedId === entry.id;
          return (
            <div key={entry.id} className="rounded-xl overflow-hidden" style={{ backgroundColor: '#1b1b29' }}>
              <button
                onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-[#232334]/50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <BookOpen size={18} className="text-[#7c3aed] flex-shrink-0" />
                  <div>
                    <span className="text-sm text-[#cdcdde] font-semibold">{entry.situation}</span>
                    <p className="text-xs text-[#565674] mt-0.5">{entry.context}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {entry.validated ? (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#50cd89]/15 text-[#50cd89] font-medium">Validada</span>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#ffc700]/15 text-[#ffc700] font-medium">Pendente</span>
                  )}
                  {isExpanded ? <ChevronUp size={16} className="text-[#565674]" /> : <ChevronDown size={16} className="text-[#565674]" />}
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 border-t border-[#232334] space-y-3 pt-4">
                  <div><span className="text-[10px] text-[#565674] font-semibold uppercase">Sinais</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">{entry.signals.map((s, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded-md bg-[#232334] text-[#7e8299]">{s}</span>
                    ))}</div>
                  </div>
                  <div><span className="text-[10px] text-[#565674] font-semibold uppercase">Estratégia</span>
                    <p className="text-xs text-[#cdcdde] mt-1 leading-relaxed">{entry.strategy}</p>
                  </div>
                  <div><span className="text-[10px] text-[#565674] font-semibold uppercase">Abordagem</span>
                    <p className="text-xs text-[#7e8299] mt-1">{entry.approach}</p>
                  </div>
                  <div><span className="text-[10px] text-[#f1416c] font-semibold uppercase">Evitar</span>
                    <p className="text-xs text-[#7e8299] mt-1">{entry.avoid}</p>
                  </div>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#232334' }}>
                    <span className="text-[10px] text-[#565674] font-semibold uppercase">Evidência Histórica</span>
                    <p className="text-xs text-[#50cd89] mt-1">{entry.evidence}</p>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-[#50cd89]/10 text-[#50cd89] hover:bg-[#50cd89]/20 transition-colors">
                      <ThumbsUp size={13} /> Validar
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-[#f1416c]/10 text-[#f1416c] hover:bg-[#f1416c]/20 transition-colors">
                      <ThumbsDown size={13} /> Rejeitar
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Playbook;

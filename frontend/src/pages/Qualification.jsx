import React, { useState, useEffect } from 'react';
import { Target, Plus, Edit, Trash2, ChevronDown, ChevronUp, ToggleLeft, ToggleRight, GripVertical } from 'lucide-react';
import { qualificationCriteria as defaultCriteria } from '../data/mockData';
import { fetchCriteria, deleteCriterion, updateQualificationSettings, fetchQualificationSettings } from '../services/api';

const Qualification = () => {
  const [qualificationActive, setQualificationActive] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [criteria, setCriteria] = useState(defaultCriteria);

  useEffect(() => {
    const load = async () => {
      try {
        const [criteriaRes, settingsRes] = await Promise.allSettled([
          fetchCriteria(),
          fetchQualificationSettings()
        ]);
        if (criteriaRes.status === 'fulfilled' && criteriaRes.value.data?.length) setCriteria(criteriaRes.value.data);
        if (settingsRes.status === 'fulfilled') setQualificationActive(settingsRes.value.data?.active ?? true);
      } catch(e) {}
    };
    load();
  }, []);

  const handleToggle = async () => {
    const newState = !qualificationActive;
    setQualificationActive(newState);
    try { await updateQualificationSettings({ active: newState }); } catch(e) {}
  };

  const handleDelete = async (id) => {
    try {
      await deleteCriterion(id);
      setCriteria(criteria.filter(c => c.id !== id));
    } catch(e) {}
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#cdcdde] font-bold text-xl">Critérios de Qualificação</h2>
          <p className="text-[#565674] text-sm">Configure como o agente qualifica os leads</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggle}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              qualificationActive ? 'bg-[#50cd89]/15 text-[#50cd89]' : 'bg-[#f1416c]/15 text-[#f1416c]'
            }`}
          >
            {qualificationActive ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
            {qualificationActive ? 'Ativo' : 'Inativo'}
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#7c3aed] text-white hover:bg-[#6c2bd9] transition-colors">
            <Plus size={16} />
            Novo Critério
          </button>
        </div>
      </div>

      {/* Info banner */}
      {!qualificationActive && (
        <div className="rounded-xl p-4 border border-dashed border-[#ffc700]/30" style={{ backgroundColor: 'rgba(255,199,0,0.05)' }}>
          <p className="text-sm text-[#ffc700]">Qualificação desativada — o agente continuará atendendo normalmente, mas não tentará qualificar leads segundo estes critérios.</p>
        </div>
      )}

      {/* Criteria list */}
      <div className="space-y-3">
        {criteria.map((criteria_item) => {
          const isExpanded = expandedId === criteria_item.id;
          return (
            <div key={criteria_item.id} className="rounded-xl overflow-hidden transition-all" style={{ backgroundColor: '#1b1b29' }}>
              {/* Header */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : criteria_item.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-[#232334]/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <GripVertical size={16} className="text-[#323248] cursor-grab" />
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[#cdcdde] font-semibold">{criteria_item.name}</span>
                      {criteria_item.required && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#f1416c]/15 text-[#f1416c] font-medium">Obrigatório</span>
                      )}
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#232334] text-[#7e8299] font-medium">Peso: {criteria_item.weight}</span>
                    </div>
                    <p className="text-xs text-[#565674] mt-0.5">{criteria_item.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${criteria_item.active ? 'bg-[#50cd89]' : 'bg-[#565674]'}`} />
                  {isExpanded ? <ChevronUp size={16} className="text-[#565674]" /> : <ChevronDown size={16} className="text-[#565674]" />}
                </div>
              </button>

              {/* Expanded content */}
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-[#232334]">
                  <div className="pt-4 space-y-2">
                    <span className="text-[10px] text-[#565674] font-semibold uppercase">Opções e Pontuação</span>
                    {criteria_item.options.map((opt, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#232334' }}>
                        <span className="text-sm text-[#cdcdde]">{opt.label}</span>
                        <span className="text-sm font-bold text-[#50cd89]">+{opt.points} pts</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-[#7c3aed]/10 text-[#7c3aed] hover:bg-[#7c3aed]/20 transition-colors">
                      <Edit size={13} /> Editar
                    </button>
                    <button onClick={() => handleDelete(criteria_item.id)} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-[#f1416c]/10 text-[#f1416c] hover:bg-[#f1416c]/20 transition-colors">
                      <Trash2 size={13} /> Remover
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

export default Qualification;

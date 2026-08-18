import React, { useState } from 'react';
import { Brain, Search, Plus, BookOpen, Lightbulb, HelpCircle, FileText, Edit, Trash2 } from 'lucide-react';
import { knowledgeItems } from '../data/mockData';

const categoryIcons = {
  'Produtos': FileText,
  'Processos': BookOpen,
  'FAQ': HelpCircle,
  'Objeções': Lightbulb
};

const Knowledge = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const categories = ['all', ...new Set(knowledgeItems.map(k => k.category))];
  const filtered = selectedCategory === 'all' ? knowledgeItems : knowledgeItems.filter(k => k.category === selectedCategory);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#cdcdde] font-bold text-xl">Base de Conhecimento</h2>
          <p className="text-[#565674] text-sm">Conhecimento oficial e aprendido</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#7c3aed] text-white hover:bg-[#6c2bd9] transition-colors">
          <Plus size={16} />
          Adicionar
        </button>
      </div>

      {/* Category filter */}
      <div className="flex gap-1 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              selectedCategory === cat ? 'bg-[#7c3aed]/15 text-[#7c3aed]' : 'text-[#565674] hover:text-[#7e8299] hover:bg-[#2b2b40]'
            }`}
          >
            {cat === 'all' ? 'Todos' : cat}
          </button>
        ))}
      </div>

      {/* Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map((item) => {
          const Icon = categoryIcons[item.category] || FileText;
          return (
            <div key={item.id} className="rounded-xl p-4 group hover:scale-[1.01] transition-all" style={{ backgroundColor: '#1b1b29' }}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon size={16} className="text-[#7c3aed]" />
                  <span className="text-xs px-2 py-0.5 rounded bg-[#232334] text-[#7e8299] font-medium">{item.category}</span>
                  {item.type === 'learned' && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#ffc700]/15 text-[#ffc700] font-medium">Aprendido</span>
                  )}
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 rounded text-[#565674] hover:text-[#7c3aed] transition-colors"><Edit size={13} /></button>
                  <button className="p-1.5 rounded text-[#565674] hover:text-[#f1416c] transition-colors"><Trash2 size={13} /></button>
                </div>
              </div>
              <h4 className="text-sm text-[#cdcdde] font-semibold mb-1">{item.title}</h4>
              <p className="text-xs text-[#7e8299] leading-relaxed line-clamp-2">{item.content}</p>
              <div className="text-[10px] text-[#565674] mt-2">Atualizado: {item.updatedAt}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Knowledge;

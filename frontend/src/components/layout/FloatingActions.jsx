import React, { useState } from 'react';
import { LayoutGrid, ThumbsUp, ShoppingBasket, X, HelpCircle } from 'lucide-react';

const iconMap = {
  LayoutGrid,
  ThumbsUp,
  ShoppingBasket
};

const FloatingActions = () => {
  const [isOpen, setIsOpen] = useState(true);

  const actions = [
    { label: "Prebuilts", icon: "LayoutGrid", hoverClass: "hover:bg-[#7239ea] hover:text-white" },
    { label: "Get Help", icon: "ThumbsUp", hoverClass: "hover:bg-[#7239ea] hover:text-white" },
    { label: "Buy Now", icon: "ShoppingBasket", hoverClass: "hover:bg-[#50cd89] hover:text-white" }
  ];

  if (!isOpen) {
    return (
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center w-10 h-10 rounded-l-lg text-[#7c3aed] transition-colors"
          style={{ backgroundColor: '#1b1b29' }}
        >
          <HelpCircle size={18} />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-1">
      {actions.map((action) => {
        const Icon = iconMap[action.icon];
        return (
          <button
            key={action.label}
            className={`flex flex-col items-center justify-center w-[52px] py-3 text-[#565674] transition-all duration-200 ${action.hoverClass}`}
            style={{ backgroundColor: '#1b1b29' }}
          >
            <Icon size={18} className="mb-1" />
            <span className="text-[9px] font-semibold leading-tight">{action.label}</span>
          </button>
        );
      })}
      <button
        onClick={() => setIsOpen(false)}
        className="flex items-center justify-center w-[52px] py-3 text-[#565674] hover:text-white transition-colors"
        style={{ backgroundColor: '#1b1b29' }}
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default FloatingActions;

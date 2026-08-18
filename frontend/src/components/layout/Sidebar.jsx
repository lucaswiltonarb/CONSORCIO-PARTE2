import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, MessageCircle, Users, Filter, FileSignature,
  FolderOpen, Target, Zap, BookOpen, Brain, BarChart3, History,
  TrendingUp, Settings, Plug, UserCog, Shield, X
} from 'lucide-react';
import { sidebarSections } from '../../data/mockData';

const iconMap = {
  LayoutDashboard, MessageCircle, Users, Filter, FileSignature,
  FolderOpen, Target, Zap, BookOpen, Brain, BarChart3, History,
  TrendingUp, Settings, Plug, UserCog, Shield
};

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleNav = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`w-[240px] flex-shrink-0 transition-transform duration-300 lg:transition-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } fixed lg:sticky top-0 lg:top-[90px] left-0 z-50 lg:z-auto h-screen lg:h-auto lg:self-start`}
      >
        <div
          className="rounded-xl py-4 px-3 lg:mt-0 mt-0 h-full lg:h-auto overflow-y-auto"
          style={{ backgroundColor: '#1b1b29' }}
        >
          {/* Mobile close button */}
          <div className="flex items-center justify-between px-3 pb-3 lg:hidden">
            <span className="text-[#cdcdde] font-bold text-sm">Menu</span>
            <button onClick={onClose} className="text-[#565674] hover:text-white">
              <X size={18} />
            </button>
          </div>

          {/* Sections */}
          <div className="space-y-5">
            {sidebarSections.map((section, sIdx) => (
              <div key={section.title}>
                {/* Section header */}
                <div className="px-3 mb-2">
                  <span className="text-[#565674] text-[10px] font-bold uppercase tracking-wider">
                    {section.title}
                  </span>
                </div>

                {/* Section items */}
                <nav className="flex flex-col gap-0.5">
                  {section.items.map((item) => {
                    const Icon = iconMap[item.icon];
                    const active = isActive(item.path);
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNav(item.path)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200 w-full text-left group relative ${
                          active
                            ? 'bg-[#7c3aed]/15 text-[#7c3aed]'
                            : 'text-[#7e8299] hover:bg-[#2b2b40] hover:text-[#cdcdde]'
                        }`}
                      >
                        {/* Active indicator */}
                        {active && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#7c3aed] rounded-r-full" />
                        )}
                        <Icon
                          size={18}
                          strokeWidth={1.8}
                          className={`flex-shrink-0 transition-colors ${
                            active ? 'text-[#7c3aed]' : 'text-[#565674] group-hover:text-[#cdcdde]'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                        {/* Badge */}
                        {item.badge && (
                          <span className="ml-auto bg-[#f1416c] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>

                {/* Section divider */}
                {sIdx < sidebarSections.length - 1 && (
                  <div className="mx-3 mt-4 border-t border-[#232334]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

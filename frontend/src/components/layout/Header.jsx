import React, { useState } from 'react';
import { ChevronDown, Menu, Bell, Search } from 'lucide-react';
import { currentUser, alerts } from '../../data/mockData';

const Header = ({ onToggleSidebar }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full" style={{ backgroundColor: '#1e1e2d' }}>
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 h-[65px]">
        {/* Mobile menu toggle */}
        <button
          className="lg:hidden mr-3 text-gray-400 hover:text-white transition-colors"
          onClick={onToggleSidebar}
        >
          <Menu size={22} />
        </button>

        {/* Logo */}
        <div className="flex items-center flex-shrink-0 mr-6">
          <a href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 flex items-center justify-center">
              <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none">
                <path d="M16 2L2 10L16 18L30 10L16 2Z" fill="#7c3aed" />
                <path d="M2 22L16 30L30 22" stroke="#7c3aed" strokeWidth="2" fill="none" />
                <path d="M2 16L16 24L30 16" stroke="#a78bfa" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <span className="text-white font-bold text-lg hidden lg:block">ConsórcioAI</span>
          </a>
        </div>

        {/* Center - Global Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#565674]" />
            <input
              type="text"
              placeholder="Buscar leads, conversas..."
              className="w-full pl-9 pr-4 py-2 rounded-lg text-sm text-[#cdcdde] placeholder-[#565674] border-0 outline-none focus:ring-1 focus:ring-[#7c3aed]"
              style={{ backgroundColor: '#2b2b40' }}
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg text-[#565674] hover:text-[#cdcdde] hover:bg-[#2b2b40] transition-colors"
            >
              <Bell size={20} />
              {alerts.length > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#f1416c] rounded-full border-2" style={{ borderColor: '#1e1e2d' }} />
              )}
            </button>

            {/* Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 rounded-xl shadow-2xl p-3 z-50" style={{ backgroundColor: '#1b1b29', border: '1px solid #232334' }}>
                <div className="flex items-center justify-between mb-3 px-2">
                  <span className="text-[#cdcdde] font-bold text-sm">Notificações</span>
                  <span className="text-[#7c3aed] text-xs font-semibold cursor-pointer hover:underline">Marcar como lidas</span>
                </div>
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#232334] transition-colors cursor-pointer">
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                      alert.type === 'warning' ? 'bg-[#ffc700]' :
                      alert.type === 'error' ? 'bg-[#f1416c]' :
                      alert.type === 'success' ? 'bg-[#50cd89]' : 'bg-[#009ef7]'
                    }`} />
                    <div>
                      <p className="text-xs text-[#cdcdde] leading-snug">{alert.message}</p>
                      <span className="text-[10px] text-[#565674]">{alert.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3 border border-dashed border-[#323248] rounded-lg p-2 cursor-pointer hover:border-[#565674] transition-colors">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-[#2b2b40]">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden lg:block mr-1">
              <div className="text-[#cdcdde] font-semibold text-sm leading-tight">
                {currentUser.name}
              </div>
              <div className="text-[#565674] text-xs">
                {currentUser.role}
              </div>
            </div>
            <ChevronDown size={14} className="text-[#565674] hidden lg:block" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

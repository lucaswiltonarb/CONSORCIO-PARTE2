import React, { useState } from "react";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Leads from "./pages/Leads";
import Funnel from "./pages/Funnel";
import Contracts from "./pages/Contracts";
import Documents from "./pages/Documents";
import Qualification from "./pages/Qualification";
import Events from "./pages/Events";
import Playbook from "./pages/Playbook";
import Knowledge from "./pages/Knowledge";
import Traffic from "./pages/Traffic";
import HistoryPage from "./pages/History";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Integrations from "./pages/Integrations";
import UsersPage from "./pages/Users";
import Audit from "./pages/Audit";
import { Home, ChevronRight } from "lucide-react";

const pageTitles = {
  '/': { breadcrumb: 'Principal', title: 'Dashboard' },
  '/atendimento': { breadcrumb: 'Principal', title: 'Atendimento' },
  '/leads': { breadcrumb: 'Comercial', title: 'Leads' },
  '/funil': { breadcrumb: 'Comercial', title: 'Funil Comercial' },
  '/contratos': { breadcrumb: 'Comercial', title: 'Contratos' },
  '/documentos': { breadcrumb: 'Comercial', title: 'Documentos' },
  '/qualificacao': { breadcrumb: 'Inteligência', title: 'Qualificação' },
  '/eventos': { breadcrumb: 'Inteligência', title: 'Eventos' },
  '/playbook': { breadcrumb: 'Inteligência', title: 'Playbook do Especialista' },
  '/conhecimento': { breadcrumb: 'Inteligência', title: 'Base de Conhecimento' },
  '/trafego': { breadcrumb: 'Análise', title: 'Tráfego' },
  '/historico': { breadcrumb: 'Análise', title: 'Histórico' },
  '/relatorios': { breadcrumb: 'Análise', title: 'Relatórios' },
  '/configuracoes': { breadcrumb: 'Administração', title: 'Configurações' },
  '/integracoes': { breadcrumb: 'Administração', title: 'Integrações' },
  '/usuarios': { breadcrumb: 'Administração', title: 'Usuários' },
  '/auditoria': { breadcrumb: 'Administração', title: 'Auditoria' }
};

const LayoutContent = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const pageInfo = pageTitles[location.pathname] || pageTitles['/'];
  const isChatPage = location.pathname === '/atendimento';

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#151521', fontFamily: 'Inter, sans-serif' }}>
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* Toolbar / Breadcrumb - hide on chat page for more space */}
      {!isChatPage && (
        <div className="max-w-[1400px] mx-auto px-6 pt-4 pb-2">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Home size={14} className="text-[#565674]" />
            <ChevronRight size={12} className="text-[#565674]" />
            <span className="text-[#565674] text-xs font-semibold">{pageInfo.breadcrumb}</span>
            <ChevronRight size={12} className="text-[#565674]" />
            <span className="text-[#7e8299] text-xs font-semibold">{pageInfo.title}</span>
          </div>
          <h1 className="text-[#cdcdde] text-xl font-bold">{pageInfo.title}</h1>
        </div>
      )}

      {/* Main Content */}
      <div className={`max-w-[1400px] mx-auto px-6 flex gap-5 ${isChatPage ? 'pt-3 pb-3' : 'pb-8'}`}>
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>

      {/* Footer - hide on chat */}
      {!isChatPage && (
        <footer className="max-w-[1400px] mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between">
          <div className="text-[#565674] text-sm">
            <span className="text-[#7e8299]">2026©</span>{" "}
            <span className="text-[#cdcdde] font-semibold">ConsórcioAI</span>
            <span className="text-[#565674]"> — Inteligência Comercial</span>
          </div>
        </footer>
      )}
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <LayoutContent>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/atendimento" element={<Chat />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/funil" element={<Funnel />} />
            <Route path="/contratos" element={<Contracts />} />
            <Route path="/documentos" element={<Documents />} />
            <Route path="/qualificacao" element={<Qualification />} />
            <Route path="/eventos" element={<Events />} />
            <Route path="/playbook" element={<Playbook />} />
            <Route path="/conhecimento" element={<Knowledge />} />
            <Route path="/trafego" element={<Traffic />} />
            <Route path="/historico" element={<HistoryPage />} />
            <Route path="/relatorios" element={<Reports />} />
            <Route path="/configuracoes" element={<Settings />} />
            <Route path="/integracoes" element={<Integrations />} />
            <Route path="/usuarios" element={<UsersPage />} />
            <Route path="/auditoria" element={<Audit />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </LayoutContent>
      </BrowserRouter>
    </div>
  );
}

export default App;

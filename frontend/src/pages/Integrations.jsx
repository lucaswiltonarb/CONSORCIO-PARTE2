import React, { useState } from 'react';
import { Plug, Facebook, Globe, Key, CheckCircle, XCircle, ExternalLink, Save } from 'lucide-react';

const Integrations = () => {
  const [metaPixelId, setMetaPixelId] = useState('');
  const [metaAccessToken, setMetaAccessToken] = useState('');
  const [whatsappApiKey, setWhatsappApiKey] = useState('');

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-[#cdcdde] font-bold text-xl">Integrações</h2>
        <p className="text-[#565674] text-sm">Configure conexões com plataformas externas</p>
      </div>

      {/* WhatsApp */}
      <div className="rounded-xl p-6" style={{ backgroundColor: '#1b1b29' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#25d366]/15 flex items-center justify-center">
              <MessageCircleIcon size={20} className="text-[#25d366]" />
            </div>
            <div>
              <h3 className="text-[#cdcdde] font-bold text-sm">WhatsApp Business API</h3>
              <p className="text-xs text-[#565674]">Conexão com WhatsApp para atendimento</p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-[#ffc700] bg-[#ffc700]/15 px-2.5 py-1 rounded-md">
            <XCircle size={12} /> Não configurado
          </span>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-[#565674] font-semibold mb-1 block">API Key / Token</label>
            <input
              type="password"
              value={whatsappApiKey}
              onChange={(e) => setWhatsappApiKey(e.target.value)}
              placeholder="Insira o token da API do WhatsApp"
              className="w-full px-4 py-2.5 rounded-lg text-sm text-[#cdcdde] placeholder-[#565674] outline-none focus:ring-1 focus:ring-[#7c3aed]"
              style={{ backgroundColor: '#232334' }}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#25d366]/15 text-[#25d366] hover:bg-[#25d366]/25 transition-colors">
            <Save size={16} /> Conectar WhatsApp
          </button>
        </div>
      </div>

      {/* Meta / CAPI */}
      <div className="rounded-xl p-6" style={{ backgroundColor: '#1b1b29' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#1877f2]/15 flex items-center justify-center">
              <Facebook size={20} className="text-[#1877f2]" />
            </div>
            <div>
              <h3 className="text-[#cdcdde] font-bold text-sm">Meta Conversions API (CAPI)</h3>
              <p className="text-xs text-[#565674]">Envie eventos de conversão para o Meta Ads</p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-[#ffc700] bg-[#ffc700]/15 px-2.5 py-1 rounded-md">
            <XCircle size={12} /> Não configurado
          </span>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-[#565674] font-semibold mb-1 block">Pixel ID</label>
            <input
              type="text"
              value={metaPixelId}
              onChange={(e) => setMetaPixelId(e.target.value)}
              placeholder="Ex: 123456789012345"
              className="w-full px-4 py-2.5 rounded-lg text-sm text-[#cdcdde] placeholder-[#565674] outline-none focus:ring-1 focus:ring-[#7c3aed]"
              style={{ backgroundColor: '#232334' }}
            />
          </div>
          <div>
            <label className="text-xs text-[#565674] font-semibold mb-1 block">Access Token</label>
            <input
              type="password"
              value={metaAccessToken}
              onChange={(e) => setMetaAccessToken(e.target.value)}
              placeholder="Token de acesso do Meta"
              className="w-full px-4 py-2.5 rounded-lg text-sm text-[#cdcdde] placeholder-[#565674] outline-none focus:ring-1 focus:ring-[#7c3aed]"
              style={{ backgroundColor: '#232334' }}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#1877f2]/15 text-[#1877f2] hover:bg-[#1877f2]/25 transition-colors">
            <Save size={16} /> Salvar Configuração Meta
          </button>
        </div>
      </div>

      {/* API Info */}
      <div className="rounded-xl p-5 border border-dashed border-[#323248]" style={{ backgroundColor: '#232334' }}>
        <h4 className="text-sm text-[#cdcdde] font-bold mb-2">Informações</h4>
        <p className="text-xs text-[#7e8299] leading-relaxed">
          Configure as credenciais de cada integração. O sistema está preparado para receber as credenciais reais 
          e iniciar a operação assim que forem configuradas. Nenhum dado será enviado externamente até que a configuração 
          esteja completa e validada.
        </p>
      </div>
    </div>
  );
};

const MessageCircleIcon = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
  </svg>
);

export default Integrations;

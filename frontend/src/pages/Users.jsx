import React, { useState, useEffect } from 'react';
import { UserCog, Plus, Edit, Trash2, Shield, CheckCircle, XCircle } from 'lucide-react';
import { teamUsers as defaultUsers, userRoles } from '../data/mockData';
import { fetchUsers, deleteUser } from '../services/api';

const roleColors = {
  'Administrador': '#7c3aed',
  'Gestor': '#009ef7',
  'Atendente': '#50cd89',
  'Tráfego': '#ffc700',
  'Financeiro': '#f1416c'
};

const UsersPage = () => {
  const [users, setUsers] = useState(defaultUsers);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchUsers();
        if (res.data?.length) setUsers(res.data);
      } catch(e) {}
    };
    load();
  }, []);
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#cdcdde] font-bold text-xl">Usuários</h2>
          <p className="text-[#565674] text-sm">Gerencie a equipe e permissões</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#7c3aed] text-white hover:bg-[#6c2bd9] transition-colors">
          <Plus size={16} />
          Novo Usuário
        </button>
      </div>

      {/* Users table */}
      <div className="rounded-xl" style={{ backgroundColor: '#1b1b29' }}>
        <div className="p-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-[#565674] text-[11px] font-semibold uppercase">
                <th className="text-left pb-3">Usuário</th>
                <th className="text-left pb-3">Email</th>
                <th className="text-center pb-3">Perfil</th>
                <th className="text-center pb-3">Status</th>
                <th className="text-right pb-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const rColor = roleColors[user.role] || '#565674';
                return (
                  <tr key={user.id} className="border-t border-[#232334]">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#2b2b40] flex items-center justify-center text-xs font-bold text-[#cdcdde]">
                          {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <span className="text-sm text-[#cdcdde] font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-[#7e8299]">{user.email}</td>
                    <td className="py-3 text-center">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold" style={{ backgroundColor: `${rColor}18`, color: rColor }}>{user.role}</span>
                    </td>
                    <td className="py-3 text-center">
                      {user.status === 'active' ?
                        <span className="flex items-center justify-center gap-1 text-xs text-[#50cd89] font-medium"><CheckCircle size={12} /> Ativo</span> :
                        <span className="flex items-center justify-center gap-1 text-xs text-[#565674] font-medium"><XCircle size={12} /> Inativo</span>
                      }
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 rounded text-[#565674] hover:text-[#7c3aed] transition-colors"><Edit size={14} /></button>
                        <button className="p-1.5 rounded text-[#565674] hover:text-[#f1416c] transition-colors"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Roles */}
      <div className="rounded-xl p-6" style={{ backgroundColor: '#1b1b29' }}>
        <h3 className="text-[#cdcdde] font-bold text-sm mb-4">Perfis de Acesso</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {userRoles.map((role) => (
            <div key={role.id} className="p-4 rounded-lg" style={{ backgroundColor: '#232334' }}>
              <div className="flex items-center gap-2 mb-1">
                <Shield size={14} style={{ color: roleColors[role.name] || '#7c3aed' }} />
                <span className="text-sm text-[#cdcdde] font-semibold">{role.name}</span>
              </div>
              <p className="text-xs text-[#7e8299]">{role.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;

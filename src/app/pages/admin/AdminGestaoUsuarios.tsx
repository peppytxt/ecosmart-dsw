import { useEffect, useState } from 'react';
import { Table } from '../../components/Table';
import { Modal } from '../../components/Modal';
import { Search, UserPlus } from 'lucide-react';
import { toast } from 'sonner';

export function AdminGestaoUsuarios() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPerfil, setFilterPerfil] = useState('all');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    perfil: 'UC' as 'UC' | 'UP' | 'UE' | 'UA',
    status: 'ativo' as 'ativo' | 'inativo'
  });

  // Busca dados do Django
  useEffect(() => {
    fetch('http://localhost:8000/api/usuarios/')
      .then(res => res.json())
      .then(data => {
        const formattedData = data.map((u: any) => ({
          ...u,
          status: u.status ? 'ativo' : 'inativo'
        }));
        setUsuarios(formattedData);
      })
      .catch(err => console.error("Erro ao buscar usuários:", err));
  }, []);

  const filteredUsers = usuarios.filter(u => {
    const matchesSearch = u.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPerfil = filterPerfil === 'all' || u.perfil === filterPerfil;
    return matchesSearch && matchesPerfil;
  });

  // Função para criar usuário no Banco (API)
  const handleNewUser = async () => {
    if (!formData.nome || !formData.email) {
      toast.error('Preencha todos os campos obrigatórios!');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/usuarios/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const savedUser = await response.json();
        // Ajusta o status que vem do banco para o padrão do seu front
        const formattedUser = { ...savedUser, status: savedUser.status ? 'ativo' : 'inativo' };
        
        setUsuarios([...usuarios, formattedUser]); 
        toast.success('Usuário salvo no banco!');
        setShowNewModal(false);
        setFormData({ nome: '', email: '', perfil: 'UC', status: 'ativo' });
      }
    } catch (error) {
      toast.error('Erro ao conectar com o servidor.');
    }
  };

  const handleSaveEdit = () => {
    if (!selectedUser) return;
    // FAZER um fetch com método PUT/PATCH para o Django futuramente
    const updatedUsuarios = usuarios.map(u => 
      u.id === selectedUser.id ? { ...u, ...formData } : u
    );
    setUsuarios(updatedUsuarios);
    toast.success('Usuário atualizado com sucesso!');
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const openEditModal = (user: any) => {
    setSelectedUser(user);
    setFormData({
      nome: user.nome,
      email: user.email,
      perfil: user.perfil,
      status: user.status
    });
    setShowEditModal(true);
  };

  const openNewModal = () => {
    setFormData({ nome: '', email: '', perfil: 'UC', status: 'ativo' });
    setShowNewModal(true);
  };

  const columns = [
    { key: 'nome', header: 'Nome' },
    { key: 'email', header: 'E-mail' },
    {
      key: 'perfil',
      header: 'Perfil',
      render: (item: any) => {
        const labels = { UC: 'Comum', UP: 'Premium', UE: 'Empresarial', UA: 'Admin' };
        return labels[item.perfil as keyof typeof labels] || item.perfil;
      }
    },
    {
      key: 'status',
      header: 'Status',
      render: (item: any) => (
        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
          item.status === 'ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {item.status}
        </span>
      )
    },
    {
      key: 'created_at',
      header: 'Data de Cadastro',
      render: (item: any) => item.created_at ? new Date(item.created_at).toLocaleDateString('pt-BR') : '---'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1a4d2e]">Gestão de Usuários</h1>
          <p className="mt-2 text-muted-foreground">Gerenciar usuários do sistema</p>
        </div>
        <button 
          onClick={openNewModal}
          className="flex items-center gap-2 rounded-lg bg-[#4caf50] px-4 py-2 font-semibold text-white transition-colors hover:bg-[#45a049]"
        >
          <UserPlus className="h-5 w-5" />
          Novo Usuário
        </button>
      </div>

      {/* Stats - Agora lendo os dados do Banco! */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: 'Comum', count: usuarios.filter(u => u.perfil === 'UC').length },
          { label: 'Premium', count: usuarios.filter(u => u.perfil === 'UP').length },
          { label: 'Empresarial', count: usuarios.filter(u => u.perfil === 'UE').length },
          { label: 'Admin', count: usuarios.filter(u => u.perfil === 'UA').length }
        ].map((item, index) => (
          <div key={index} className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">{item.label}</p>
            <p className="mt-1 text-2xl font-bold">{item.count}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 rounded-xl border bg-card p-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por nome ou e-mail..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10 w-full rounded-lg border bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <select
          value={filterPerfil}
          onChange={(e) => setFilterPerfil(e.target.value)}
          className="h-10 rounded-lg border bg-background px-4 text-sm"
        >
          <option value="all">Todos os perfis</option>
          <option value="UC">Comum</option>
          <option value="UP">Premium</option>
          <option value="UE">Empresarial</option>
          <option value="UA">Admin</option>
        </select>
      </div>

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <Table data={filteredUsers} columns={columns} onRowClick={openEditModal} />
      </div>

      {/* Modal Novo Usuário */}
      <Modal isOpen={showNewModal} onClose={() => setShowNewModal(false)} title="Novo Usuário">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nome *</label>
            <input
              type="text"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              className="mt-2 h-10 w-full rounded-lg border px-4 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">E-mail *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-2 h-10 w-full rounded-lg border px-4 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Perfil</label>
            <select
              value={formData.perfil}
              onChange={(e) => setFormData({ ...formData, perfil: e.target.value as any })}
              className="mt-2 h-10 w-full rounded-lg border px-4 text-sm"
            >
              <option value="UC">Usuário Comum</option>
              <option value="UP">Usuário Premium</option>
              <option value="UE">Usuário Empresarial</option>
              <option value="UA">Administrador</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <button onClick={() => setShowNewModal(false)} className="flex-1 rounded-lg border py-2">Cancelar</button>
            <button onClick={handleNewUser} className="flex-1 rounded-lg bg-[#4caf50] py-2 text-white">Criar</button>
          </div>
        </div>
      </Modal>

      {/* Modal Editar Usuário */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Editar Usuário">
        {selectedUser && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Nome</label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="mt-2 h-10 w-full rounded-lg border px-4 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Perfil</label>
              <select
                value={formData.perfil}
                onChange={(e) => setFormData({ ...formData, perfil: e.target.value as any })}
                className="mt-2 h-10 w-full rounded-lg border px-4 text-sm"
              >
                <option value="UC">Usuário Comum</option>
                <option value="UP">Usuário Premium</option>
                <option value="UE">Usuário Empresarial</option>
                <option value="UA">Administrador</option>
              </select>
            </div>
            <div className="flex gap-3 pt-4">
              <button onClick={() => setShowEditModal(false)} className="flex-1 rounded-lg border py-2">Cancelar</button>
              <button onClick={handleSaveEdit} className="flex-1 rounded-lg bg-[#4caf50] py-2 text-white">Salvar</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
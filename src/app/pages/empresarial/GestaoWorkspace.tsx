import { useState } from 'react';
import { Users, UserPlus, Mail, Filter, Search, MoreVertical, Pencil, Trash2, Check, X } from 'lucide-react';
import { StatCard } from '../../components/Card';
import { mockWorkspaces, mockWorkspaceMembros, mockConvitesWorkspace, mockUsuarios } from '../../../lib/mockData';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

export function GestaoWorkspace() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [perfilFilter, setPerfilFilter] = useState('todos');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [isVincularModalOpen, setIsVincularModalOpen] = useState(false);
  const [isConviteModalOpen, setIsConviteModalOpen] = useState(false);
  const [selectedMembro, setSelectedMembro] = useState<string | null>(null);

  // Dados do workspace
  const workspace = mockWorkspaces[0];
  const membros = mockWorkspaceMembros;
  const convites = mockConvitesWorkspace;

  // Estatísticas
  const totalMembros = membros.filter(m => m.status_vinculo === 'ativo').length;
  const usuariosComuns = membros.filter(m => m.perfil_usuario === 'UC' && m.status_vinculo === 'ativo').length;
  const usuariosPremium = membros.filter(m => m.perfil_usuario === 'UP' && m.status_vinculo === 'ativo').length;
  const convitesPendentes = convites.filter(c => c.status_convite === 'pendente').length;

  // Filtros
  const membrosComUsuarios = membros.map(membro => {
    const usuario = mockUsuarios.find(u => u.id === membro.usuario_id);
    return { ...membro, usuario };
  });

  const filteredMembros = membrosComUsuarios.filter(membro => {
    const matchSearch = membro.usuario?.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       membro.usuario?.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchPerfil = perfilFilter === 'todos' || membro.perfil_usuario === perfilFilter;
    const matchStatus = statusFilter === 'todos' || membro.status_vinculo === statusFilter;
    return matchSearch && matchPerfil && matchStatus;
  });

  const handleVincularUsuario = () => {
    toast.success('Usuário vinculado com sucesso!');
    setIsVincularModalOpen(false);
  };

  const handleEnviarConvite = () => {
    toast.success('Convite enviado com sucesso!');
    setIsConviteModalOpen(false);
  };

  const handleRemoverVinculo = (membroId: string) => {
    const membro = membrosComUsuarios.find(m => m.id === membroId);
    if (confirm(`Deseja realmente remover ${membro?.usuario?.nome} do workspace?`)) {
      toast.success('Vínculo removido com sucesso!');
    }
  };

  const handleAprovarConvite = (conviteId: string) => {
    toast.success('Convite aprovado com sucesso!');
  };

  const handleRejeitarConvite = (conviteId: string) => {
    toast.success('Convite rejeitado.');
  };

  const handleVerDetalhes = (membroId: string) => {
    navigate(`/app/empresarial/membro/${membroId}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1a4d2e]">Gestão do Workspace</h1>
        <p className="mt-2 text-muted-foreground">
          {workspace.nome_workspace}
        </p>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total de Membros"
          value={totalMembros}
          icon={Users}
          color="primary"
        />
        <StatCard
          title="Usuários Comuns"
          value={usuariosComuns}
          icon={Users}
          color="secondary"
        />
        <StatCard
          title="Usuários Premium"
          value={usuariosPremium}
          icon={Users}
          color="accent"
        />
        <StatCard
          title="Convites Pendentes"
          value={convitesPendentes}
          icon={Mail}
          color="primary"
        />
      </div>

      {/* Ações Rápidas */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => setIsVincularModalOpen(true)} className="bg-[#1a4d2e] hover:bg-[#143d24]">
          <UserPlus className="mr-2 h-4 w-4" />
          Vincular Usuário Existente
        </Button>
        <Button variant="outline" onClick={() => setIsConviteModalOpen(true)}>
          <Mail className="mr-2 h-4 w-4" />
          Convidar Novo Usuário
        </Button>
      </div>

      {/* Filtros e Busca */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold">Membros Vinculados</h3>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou e-mail..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80"
              />
            </div>
            <Select value={perfilFilter} onValueChange={setPerfilFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Perfil" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os perfis</SelectItem>
                <SelectItem value="UC">Usuário Comum</SelectItem>
                <SelectItem value="UP">Usuário Premium</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="inativo">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabela de Membros */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="pb-3 text-left font-medium">Nome</th>
                <th className="pb-3 text-left font-medium">E-mail</th>
                <th className="pb-3 text-left font-medium">Perfil</th>
                <th className="pb-3 text-left font-medium">Setor</th>
                <th className="pb-3 text-left font-medium">Unidade</th>
                <th className="pb-3 text-left font-medium">Status</th>
                <th className="pb-3 text-left font-medium">Data Vínculo</th>
                <th className="pb-3 text-right font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembros.map((membro) => (
                <tr key={membro.id} className="border-b last:border-0">
                  <td className="py-4">{membro.usuario?.nome}</td>
                  <td className="py-4 text-muted-foreground">{membro.usuario?.email}</td>
                  <td className="py-4">
                    <Badge variant={membro.perfil_usuario === 'UP' ? 'default' : 'secondary'}>
                      {membro.perfil_usuario === 'UC' ? 'Comum' : 'Premium'}
                    </Badge>
                  </td>
                  <td className="py-4">{membro.setor || '-'}</td>
                  <td className="py-4">{membro.unidade || '-'}</td>
                  <td className="py-4">
                    <Badge
                      variant={
                        membro.status_vinculo === 'ativo' ? 'default' :
                        membro.status_vinculo === 'pendente' ? 'secondary' :
                        'destructive'
                      }
                    >
                      {membro.status_vinculo === 'ativo' ? 'Ativo' :
                       membro.status_vinculo === 'pendente' ? 'Pendente' : 'Inativo'}
                    </Badge>
                  </td>
                  <td className="py-4 text-muted-foreground">
                    {new Date(membro.data_vinculo).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleVerDetalhes(membro.id)}
                      >
                        Ver Detalhes
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemoverVinculo(membro.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lista de Convites Pendentes */}
      {convitesPendentes > 0 && (
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="mb-4 font-semibold">Convites Pendentes</h3>
          <div className="space-y-3">
            {convites.filter(c => c.status_convite === 'pendente').map((convite) => (
              <div key={convite.id} className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">{convite.email_convidado}</p>
                  <p className="text-sm text-muted-foreground">
                    Perfil sugerido: {convite.perfil_sugerido === 'UC' ? 'Usuário Comum' : 'Usuário Premium'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Enviado em {new Date(convite.created_at).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAprovarConvite(convite.id)}
                  >
                    <Check className="mr-1 h-4 w-4" />
                    Aprovar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRejeitarConvite(convite.id)}
                  >
                    <X className="mr-1 h-4 w-4" />
                    Rejeitar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal Vincular Usuário Existente */}
      <Dialog open={isVincularModalOpen} onOpenChange={setIsVincularModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Vincular Usuário Existente</DialogTitle>
            <DialogDescription>
              Busque e vincule um usuário existente ao workspace empresarial.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="busca-usuario">Buscar Usuário</Label>
              <Input
                id="busca-usuario"
                placeholder="Digite nome ou e-mail..."
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="perfil-vinculo">Perfil do Usuário</Label>
              <Select defaultValue="UC">
                <SelectTrigger id="perfil-vinculo" className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UC">Usuário Comum</SelectItem>
                  <SelectItem value="UP">Usuário Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="setor-vinculo">Setor</Label>
              <Input
                id="setor-vinculo"
                placeholder="Ex: Administrativo, Operacional..."
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="unidade-vinculo">Unidade</Label>
              <Input
                id="unidade-vinculo"
                placeholder="Ex: Matriz, Filial Sul..."
                className="mt-1.5"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsVincularModalOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-[#1a4d2e] hover:bg-[#143d24]" onClick={handleVincularUsuario}>
              Vincular Usuário
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Convidar Novo Usuário */}
      <Dialog open={isConviteModalOpen} onOpenChange={setIsConviteModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Convidar Novo Usuário</DialogTitle>
            <DialogDescription>
              Envie um convite por e-mail para um novo usuário participar do workspace.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="email-convite">E-mail do Convidado</Label>
              <Input
                id="email-convite"
                type="email"
                placeholder="usuario@email.com"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="perfil-convite">Perfil Sugerido</Label>
              <Select defaultValue="UC">
                <SelectTrigger id="perfil-convite" className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UC">Usuário Comum</SelectItem>
                  <SelectItem value="UP">Usuário Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="mensagem-convite">Mensagem Personalizada (opcional)</Label>
              <Textarea
                id="mensagem-convite"
                placeholder="Adicione uma mensagem ao convite..."
                className="mt-1.5"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConviteModalOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-[#1a4d2e] hover:bg-[#143d24]" onClick={handleEnviarConvite}>
              Enviar Convite
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

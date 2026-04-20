import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Building2, Recycle, TrendingUp, Pencil, Trash2 } from 'lucide-react';
import { mockWorkspaceMembros, mockUsuarios, mockDescartes, mockImpactos } from '../../../lib/mockData';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { StatCard } from '../../components/Card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { toast } from 'sonner';

export function DetalhesMembro() {
  const { membroId } = useParams();
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Buscar dados do membro
  const membro = mockWorkspaceMembros.find(m => m.id === membroId);
  const usuario = mockUsuarios.find(u => u.id === membro?.usuario_id);
  const descartes = mockDescartes.filter(d => d.usuario_id === membro?.usuario_id);
  const impacto = usuario ? mockImpactos[usuario.id] : null;

  if (!membro || !usuario) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/app/empresarial/workspace')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </div>
        <div className="rounded-xl border bg-card p-8 text-center shadow-sm">
          <p className="text-muted-foreground">Membro não encontrado</p>
        </div>
      </div>
    );
  }

  const totalRecyclado = descartes.reduce((acc, d) => acc + d.quantidade, 0);

  const handleEditarVinculo = () => {
    toast.success('Vínculo atualizado com sucesso!');
    setIsEditModalOpen(false);
  };

  const handleRemoverVinculo = () => {
    if (confirm(`Deseja realmente remover ${usuario.nome} do workspace?`)) {
      toast.success('Vínculo removido com sucesso!');
      navigate('/app/empresarial/workspace');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/app/empresarial/workspace')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-[#1a4d2e]">Detalhes do Membro</h1>
            <p className="mt-1 text-muted-foreground">
              Informações e atividades do usuário vinculado
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setIsEditModalOpen(true)}>
            <Pencil className="mr-2 h-4 w-4" />
            Editar Vínculo
          </Button>
          <Button variant="destructive" onClick={handleRemoverVinculo}>
            <Trash2 className="mr-2 h-4 w-4" />
            Remover do Workspace
          </Button>
        </div>
      </div>

      {/* Informações do Usuário */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h3 className="mb-4 font-semibold">Informações do Usuário</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <User className="mt-1 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Nome</p>
                <p className="font-medium">{usuario.nome}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-1 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">E-mail</p>
                <p className="font-medium">{usuario.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-1 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Telefone</p>
                <p className="font-medium">{usuario.telefone}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Endereço</p>
                <p className="font-medium">{usuario.endereco}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <User className="mt-1 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Perfil</p>
                <Badge variant={membro.perfil_usuario === 'UP' ? 'default' : 'secondary'}>
                  {membro.perfil_usuario === 'UC' ? 'Usuário Comum' : 'Usuário Premium'}
                </Badge>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Building2 className="mt-1 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Setor</p>
                <p className="font-medium">{membro.setor || '-'}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Building2 className="mt-1 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Unidade</p>
                <p className="font-medium">{membro.unidade || '-'}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="mt-1 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Data de Vínculo</p>
                <p className="font-medium">
                  {new Date(membro.data_vinculo).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <User className="mt-1 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Status do Vínculo</p>
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
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estatísticas de Participação */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total de Descartes"
          value={descartes.length}
          icon={Recycle}
          color="primary"
        />
        <StatCard
          title="Material Reciclado"
          value={`${totalRecyclado} kg`}
          icon={TrendingUp}
          color="secondary"
        />
        <StatCard
          title="Pontos Acumulados"
          value={impacto?.pontos || 0}
          icon={TrendingUp}
          color="accent"
        />
        <StatCard
          title="Emissão Evitada"
          value={`${impacto?.emissao_evitada || 0} kg CO₂`}
          icon={TrendingUp}
          color="primary"
        />
      </div>

      {/* Histórico de Descartes Vinculados */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h3 className="mb-4 font-semibold">Histórico de Descartes</h3>
        {descartes.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="pb-3 text-left font-medium">Data</th>
                  <th className="pb-3 text-left font-medium">Tipo de Resíduo</th>
                  <th className="pb-3 text-left font-medium">Quantidade</th>
                  <th className="pb-3 text-left font-medium">Local</th>
                  <th className="pb-3 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {descartes.slice(0, 10).map((descarte) => (
                  <tr key={descarte.id} className="border-b last:border-0">
                    <td className="py-4">
                      {new Date(descarte.data_descarte).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="py-4">{descarte.tipo_residuo}</td>
                    <td className="py-4">{descarte.quantidade} {descarte.unidade}</td>
                    <td className="py-4">{descarte.local}</td>
                    <td className="py-4">
                      <Badge
                        variant={
                          descarte.status === 'processado' ? 'default' :
                          descarte.status === 'coletado' ? 'secondary' :
                          'outline'
                        }
                      >
                        {descarte.status === 'registrado' ? 'Registrado' :
                         descarte.status === 'coletado' ? 'Coletado' : 'Processado'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            Nenhum descarte registrado ainda
          </div>
        )}
      </div>

      {/* Modal Editar Vínculo */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Vínculo</DialogTitle>
            <DialogDescription>
              Atualize as informações do vínculo do usuário ao workspace.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="perfil-edit">Perfil do Usuário</Label>
              <Select defaultValue={membro.perfil_usuario}>
                <SelectTrigger id="perfil-edit" className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UC">Usuário Comum</SelectItem>
                  <SelectItem value="UP">Usuário Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="setor-edit">Setor</Label>
              <Input
                id="setor-edit"
                defaultValue={membro.setor}
                placeholder="Ex: Administrativo, Operacional..."
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="unidade-edit">Unidade</Label>
              <Input
                id="unidade-edit"
                defaultValue={membro.unidade}
                placeholder="Ex: Matriz, Filial Sul..."
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="status-edit">Status do Vínculo</Label>
              <Select defaultValue={membro.status_vinculo}>
                <SelectTrigger id="status-edit" className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-[#1a4d2e] hover:bg-[#143d24]" onClick={handleEditarVinculo}>
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

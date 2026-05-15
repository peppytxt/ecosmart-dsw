import { useNavigate } from 'react-router';
import { StatCard } from '../../components/Card';
import { Users, Recycle, Bell, Shield, FileText, Activity } from 'lucide-react';
import { mockUsuarios, mockDescartes, mockPedidosColeta, mockLogsAdmin, mockMateriais } from '../../../lib/mockData';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export function DashboardUA() {
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [conteudos, setConteudos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Busca usuários e conteúdos ao mesmo tempo
        const [resUsers, resContent] = await Promise.all([
          fetch('http://localhost:8000/api/usuarios/'),
          fetch('http://localhost:8000/api/conteudos/')
        ]);

        if (resUsers.ok && resContent.ok) {
          const dataUsers = await resUsers.json();
          const dataContent = await resContent.json();
          setUsuarios(dataUsers);
          setConteudos(dataContent);
        }
      } catch (err) {
        toast.error("Erro ao sincronizar dados do painel.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalUsuarios = usuarios.length;
  const usuariosAtivos = usuarios.filter(u => u.status === 'ativo' || u.status === true).length;

  const contagemPorPerfil = (perfil: string) => 
    usuarios.filter(u => u.perfil === perfil).length;

  if (loading) return <div className="p-10 text-center">Carregando painel...</div>;

  // Calculate active orders
  const pedidosAtivos = mockPedidosColeta.filter(p => 
    p.status === 'solicitada' || p.status === 'agendada' || p.status === 'coletando'
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1a4d2e]">Painel Administrativo</h1>
        <p className="mt-2 text-muted-foreground">
          Visão geral do sistema EcoSmart
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total de Usuários"
          value={totalUsuarios}
          icon={Users}
          color="primary"
          trend={{ value: 'Atualizado em tempo real', isPositive: true }}
        />
        <StatCard
          title="Total de Descartes"
          value={mockDescartes.length}
          icon={Recycle}
          color="secondary"
          trend={{ value: '+12%', isPositive: true }}
        />
        <StatCard
          title="Pedidos Ativos"
          value={pedidosAtivos}
          icon={Bell}
          color="accent"
          trend={{ value: `${mockPedidosColeta.length} total`, isPositive: true }}
        />
        <StatCard
          title="Usuários Ativos"
          value={usuariosAtivos}
          icon={Shield}
          color="primary"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Ações Rápidas</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <button
            onClick={() => navigate('/app/admin/usuarios')}
            className="flex flex-col items-start gap-4 rounded-xl border bg-card p-6 text-left shadow-sm transition-all hover:shadow-md hover:border-[#4caf50]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#4caf50]">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Gestão de Usuários</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Gerenciar usuários do sistema
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate('/app/admin/permissoes')}
            className="flex flex-col items-start gap-4 rounded-xl border bg-card p-6 text-left shadow-sm transition-all hover:shadow-md hover:border-[#4caf50]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#4caf50]">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Gestão de Permissões</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Configurar permissões por perfil
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate('/app/admin/conteudos')}
            className="flex flex-col items-start gap-4 rounded-xl border bg-card p-6 text-left shadow-sm transition-all hover:shadow-md hover:border-[#4caf50]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#4caf50]">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Gestão de Conteúdos</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Criar e gerenciar conteúdos educativos
              </p>
            </div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* User Stats Dinâmicos */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="font-semibold">Usuários por Perfil</h3>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {[
              { label: 'Comum', count: contagemPorPerfil('UC'), color: 'bg-blue-100' },
              { label: 'Premium', count: contagemPorPerfil('UP'), color: 'bg-purple-100' },
              { label: 'Empresarial', count: contagemPorPerfil('UE'), color: 'bg-orange-100' },
              { label: 'Admin', count: contagemPorPerfil('UA'), color: 'bg-green-100' }
            ].map((item, index) => (
              <div key={index} className="rounded-lg bg-muted p-4 text-center">
                <div className="text-2xl font-bold text-[#1a4d2e]">{item.count}</div>
                <div className="mt-1 text-sm text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Stats */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="font-semibold">Estatísticas de Conteúdo</h3>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between rounded-lg bg-muted p-4">
              <div>
                <p className="text-sm text-muted-foreground">Conteúdos Educativos</p>
                <p className="mt-1 text-2xl font-bold text-[#1a4d2e]">{conteudos.length}</p>
              </div>
              <FileText className="h-8 w-8 text-[#4caf50]" />
            </div>
            <div className="flex items-center justify-between rounded-lg bg-muted p-4">
              <div>
                <p className="text-sm text-muted-foreground">Pedidos de Coleta</p>
                <p className="mt-1 text-2xl font-bold text-[#1a4d2e]">{mockPedidosColeta.length}</p>
              </div>
              <Bell className="h-8 w-8 text-[#4caf50]" />
            </div>
          </div>
        </div>
      </div>

      {/* Activity Log */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="h-5 w-5 text-[#4caf50]" />
          <h3 className="font-semibold">Atividades Recentes</h3>
        </div>
        <div className="space-y-3">
          {mockLogsAdmin.slice(0, 5).map((log) => (
            <div
              key={log.id}
              className="flex items-start gap-3 rounded-lg border bg-muted/50 p-3 text-sm"
            >
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#4caf50]/10">
                <Activity className="h-4 w-4 text-[#4caf50]" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{log.acao}</p>
                <p className="text-muted-foreground">{log.descricao}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {new Date(log.created_at).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
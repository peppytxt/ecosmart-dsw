import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router';
import { StatCard } from '../../components/Card';
import { Recycle, History, TrendingUp, Award, Plus, BookOpen } from 'lucide-react';
import { mockDescartes, mockImpactos } from '../../../lib/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function DashboardUC() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const userDescartes = mockDescartes.filter(d => d.usuario_id === user?.id);
  const userImpact = mockImpactos[user?.id || ''] || {
    pontos: 0,
    reciclado_kg: 0,
    emissao_evitada: 0,
    economia_gerada: 0
  };

  const chartData = [
    { mes: 'Jan', kg: 8 },
    { mes: 'Fev', kg: 12 },
    { mes: 'Mar', kg: userImpact.reciclado_kg }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#1a4d2e]">
          Olá, {user?.nome?.split(' ')[0]}! 👋
        </h1>
        <p className="mt-2 text-muted-foreground">
          Bem-vindo ao seu painel de sustentabilidade
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total de Descartes"
          value={userDescartes.length}
          icon={Recycle}
          color="secondary"
        />
        <StatCard
          title="Material Reciclado"
          value={`${userImpact.reciclado_kg} kg`}
          icon={TrendingUp}
          color="accent"
        />
        <StatCard
          title="Pontos Acumulados"
          value={userImpact.pontos}
          icon={Award}
          color="primary"
        />
        <StatCard
          title="CO₂ Evitado"
          value={`${userImpact.emissao_evitada} kg`}
          icon={TrendingUp}
          color="secondary"
        />
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <button
          onClick={() => navigate('/app/registrar-descarte')}
          className="flex flex-col items-start gap-4 rounded-xl border-2 border-dashed border-[#4caf50] bg-[#4caf50]/5 p-6 text-left transition-colors hover:bg-[#4caf50]/10"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#4caf50]">
            <Plus className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold">Registrar Descarte</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Adicione um novo registro de descarte
            </p>
          </div>
        </button>

        <button
          onClick={() => navigate('/app/historico')}
          className="flex flex-col items-start gap-4 rounded-xl border bg-card p-6 text-left shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
            <History className="h-6 w-6 text-[#1a4d2e]" />
          </div>
          <div>
            <h3 className="font-semibold">Ver Histórico</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Consulte seus registros anteriores
            </p>
          </div>
        </button>

        <button
          onClick={() => navigate('/app/educacao')}
          className="flex flex-col items-start gap-4 rounded-xl border bg-card p-6 text-left shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
            <BookOpen className="h-6 w-6 text-[#1a4d2e]" />
          </div>
          <div>
            <h3 className="font-semibold">Aprender a Reciclar</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Conteúdo educativo sobre reciclagem
            </p>
          </div>
        </button>
      </div>

      {/* Chart and Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Chart */}
        <div className="rounded-xl border bg-card p-6 shadow-sm lg:col-span-2">
          <h3 className="font-semibold">Descartes por Mês</h3>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="mes" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="kg" fill="#4caf50" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="font-semibold">Últimos Registros</h3>
          <div className="mt-6 space-y-4">
            {userDescartes.slice(-3).reverse().map((descarte) => (
              <div key={descarte.id} className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#4caf50]/10">
                  <Recycle className="h-5 w-5 text-[#4caf50]" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{descarte.tipo_residuo}</p>
                  <p className="text-sm text-muted-foreground">
                    {descarte.quantidade} {descarte.unidade}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(descarte.data_descarte).toLocaleDateString('pt-BR')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="rounded-xl border bg-gradient-to-r from-[#4caf50]/10 to-[#81c784]/10 p-6">
        <h3 className="font-semibold text-[#1a4d2e]">💡 Dica de Sustentabilidade</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Você sabia que reciclar 1 tonelada de papel economiza cerca de 22 árvores? Continue
          registrando seus descartes e acompanhe seu impacto positivo!
        </p>
      </div>
    </div>
  );
}

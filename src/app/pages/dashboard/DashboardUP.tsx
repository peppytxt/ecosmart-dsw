import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router';
import { StatCard } from '../../components/Card';
import {
  Recycle,
  TrendingUp,
  Award,
  Star,
  Download,
  BarChart3,
  Target,
  Gift,
  Plus,
  History,
  BookOpen,
  Calendar,
  Zap
} from 'lucide-react';
import { mockDescartes, mockImpactos } from '../../../lib/mockData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { toast } from 'sonner';

export function DashboardUP() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isBenefitsModalOpen, setIsBenefitsModalOpen] = useState(false);

  const userDescartes = mockDescartes.filter(d => d.usuario_id === user?.id);
  const descartesPendentes = userDescartes.filter(d => d.status === 'registrado');
  const userImpact = mockImpactos[user?.id || ''] || {
    pontos: 0,
    reciclado_kg: 0,
    emissao_evitada: 0,
    economia_gerada: 0
  };

  // Dados de desempenho mensal
  const desempenhoMensal = [
    { mes: 'Out', kg: 5, pontos: 50 },
    { mes: 'Nov', kg: 7, pontos: 85 },
    { mes: 'Dez', kg: 8, pontos: 120 },
    { mes: 'Jan', kg: 8.5, pontos: 150 },
    { mes: 'Fev', kg: 10, pontos: 180 },
    { mes: 'Mar', kg: userImpact.reciclado_kg, pontos: userImpact.pontos }
  ];

  // Materiais mais registrados
  const materiaisMaisRegistrados = [
    { material: 'Papel', quantidade: 35, percentual: 40 },
    { material: 'Plástico', quantidade: 25, percentual: 30 },
    { material: 'Vidro', quantidade: 15, percentual: 18 },
    { material: 'Metal', quantidade: 10, percentual: 12 }
  ];

  // Volume coletado no mês atual
  const volumeMesAtual = 12.5;
  const metaMensal = 15;
  const progressoMeta = (volumeMesAtual / metaMensal) * 100;

  const handleExportarRelatorio = () => {
    toast.success('Relatório exportado com sucesso!');
    setIsExportModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Premium */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#1a4d2e] to-[#2d6a4f] p-6 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <Star className="h-6 w-6 text-yellow-400" />
            <Badge className="bg-yellow-400 text-[#1a4d2e]">Premium</Badge>
          </div>
          <h1 className="mt-3 text-3xl font-bold">
            Olá, {user?.nome?.split(' ')[0]}! 🌟
          </h1>
          <p className="mt-2 text-white/90">
            Acompanhe seu desempenho e benefícios como Usuário Premium
          </p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-10">
          <Award className="h-full w-full" />
        </div>
      </div>

      {/* Stats Grid Premium */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Volume Coletado (Mês)"
          value={`${volumeMesAtual} kg`}
          icon={Recycle}
          color="primary"
        />
        <StatCard
          title="Pontuação Acumulada"
          value={userImpact.pontos}
          icon={Award}
          color="accent"
        />
        <StatCard
          title="Total Reciclado"
          value={`${userImpact.reciclado_kg} kg`}
          icon={TrendingUp}
          color="secondary"
        />
        <StatCard
          title="Benefícios Disponíveis"
          value="3"
          icon={Gift}
          color="primary"
        />
      </div>

      {/* Ações Rápidas Premium */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
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
              Adicione um novo registro
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
            <h3 className="font-semibold">Histórico Detalhado</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Consulte registros completos
            </p>
          </div>
        </button>

        <button
          onClick={() => setIsExportModalOpen(true)}
          className="flex flex-col items-start gap-4 rounded-xl border bg-card p-6 text-left shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
            <Download className="h-6 w-6 text-[#1a4d2e]" />
          </div>
          <div>
            <h3 className="font-semibold">Exportar Relatório</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Baixe seus dados em PDF
            </p>
          </div>
        </button>

        <button
          onClick={() => setIsBenefitsModalOpen(true)}
          className="flex flex-col items-start gap-4 rounded-xl border bg-gradient-to-br from-yellow-50 to-amber-50 p-6 text-left shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-400">
            <Gift className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold">Benefícios Premium</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Veja suas vantagens
            </p>
          </div>
        </button>
      </div>

      {/* Gráficos de Desempenho */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Gráfico de Desempenho Mensal */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Desempenho Mensal</h3>
            <Badge variant="secondary">Últimos 6 meses</Badge>
          </div>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={desempenhoMensal}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="mes" stroke="#6b7280" />
                <YAxis yAxisId="left" stroke="#6b7280" />
                <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="kg"
                  stroke="#4caf50"
                  strokeWidth={3}
                  name="Volume (kg)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="pontos"
                  stroke="#1a4d2e"
                  strokeWidth={3}
                  name="Pontos"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Materiais Mais Registrados */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="font-semibold">Materiais Mais Registrados</h3>
          <div className="mt-6 space-y-4">
            {materiaisMaisRegistrados.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{item.material}</span>
                  <span className="text-muted-foreground">{item.quantidade} kg ({item.percentual}%)</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-[#4caf50]"
                    style={{ width: `${item.percentual}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Alerta de Itens Pendentes */}
      {descartesPendentes.length > 0 && (
        <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100">
              <Zap className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-yellow-800">Coletas Pendentes</h3>
              <p className="text-sm text-yellow-700">
                Você tem {descartesPendentes.length} descarte(s) aguardando coleta.
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-yellow-300 text-yellow-800 hover:bg-yellow-100"
              onClick={() => navigate('/app/historico')}
            >
              Ver Detalhes
            </Button>
          </div>
        </div>
      )}

      {/* Minha Evolução */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Minha Evolução</h3>
          <Button variant="ghost" size="sm" onClick={() => navigate('/app/impacto')}>
            Ver Detalhes
          </Button>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <p className="text-sm font-medium text-green-900">Crescimento Mensal</p>
            </div>
            <p className="mt-2 text-2xl font-bold text-green-600">+25%</p>
            <p className="mt-1 text-xs text-green-700">Volume coletado vs mês anterior</p>
          </div>

          <div className="rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <p className="text-sm font-medium text-blue-900">Frequência</p>
            </div>
            <p className="mt-2 text-2xl font-bold text-blue-600">12 dias</p>
            <p className="mt-1 text-xs text-blue-700">Registros nos últimos 30 dias</p>
          </div>

          <div className="rounded-lg bg-gradient-to-br from-amber-50 to-yellow-50 p-4">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-600" />
              <p className="text-sm font-medium text-amber-900">Nível de Impacto</p>
            </div>
            <p className="mt-2 text-2xl font-bold text-amber-600">Alto</p>
            <p className="mt-1 text-xs text-amber-700">Continue assim!</p>
          </div>
        </div>
      </div>

      {/* Meta Mensal */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Meta Mensal</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Você está a {(metaMensal - volumeMesAtual).toFixed(1)} kg da sua meta
            </p>
          </div>
          <Target className="h-8 w-8 text-[#4caf50]" />
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm">
            <span>Progresso</span>
            <span className="font-semibold">{progressoMeta.toFixed(0)}%</span>
          </div>
          <div className="mt-2 h-4 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-gradient-to-r from-[#4caf50] to-[#2d6a4f] transition-all"
              style={{ width: `${Math.min(progressoMeta, 100)}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>0 kg</span>
            <span>{volumeMesAtual} kg coletados</span>
            <span>{metaMensal} kg (meta)</span>
          </div>
        </div>
      </div>

      {/* Impacto Ambiental Ampliado */}
      <div className="rounded-xl border bg-gradient-to-br from-emerald-50 to-teal-50 p-6 shadow-sm">
        <h3 className="font-semibold text-[#1a4d2e]">💚 Seu Impacto Ambiental Ampliado</h3>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <p className="text-sm text-muted-foreground">Emissão de CO₂ Evitada</p>
            <p className="mt-1 text-2xl font-bold text-[#1a4d2e]">{userImpact.emissao_evitada} kg</p>
            <p className="mt-1 text-xs text-muted-foreground">Equivalente a plantar 3 árvores</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Economia Gerada</p>
            <p className="mt-1 text-2xl font-bold text-[#1a4d2e]">R$ {userImpact.economia_gerada}</p>
            <p className="mt-1 text-xs text-muted-foreground">Valor estimado da reciclagem</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Água Economizada</p>
            <p className="mt-1 text-2xl font-bold text-[#1a4d2e]">450 L</p>
            <p className="mt-1 text-xs text-muted-foreground">Pela reciclagem de papel</p>
          </div>
        </div>
      </div>

      {/* Modal Exportar Relatório */}
      <Dialog open={isExportModalOpen} onOpenChange={setIsExportModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Exportar Relatório Premium</DialogTitle>
            <DialogDescription>
              Escolha o formato e período do seu relatório personalizado
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium">Formato</label>
              <select className="mt-2 h-10 w-full rounded-lg border bg-background px-3">
                <option>PDF - Relatório Completo</option>
                <option>Excel - Planilha de Dados</option>
                <option>CSV - Dados Brutos</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Período</label>
              <select className="mt-2 h-10 w-full rounded-lg border bg-background px-3">
                <option>Último Mês</option>
                <option>Últimos 3 Meses</option>
                <option>Últimos 6 Meses</option>
                <option>Último Ano</option>
                <option>Personalizado</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsExportModalOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-[#1a4d2e] hover:bg-[#143d24]" onClick={handleExportarRelatorio}>
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Benefícios Premium */}
      <Dialog open={isBenefitsModalOpen} onOpenChange={setIsBenefitsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Star className="h-6 w-6 text-yellow-400" />
              Benefícios Premium
            </DialogTitle>
            <DialogDescription>
              Vantagens exclusivas do seu plano Premium
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-900">Relatórios Detalhados</h4>
                  <p className="mt-1 text-sm text-green-700">
                    Exporte relatórios completos em PDF, Excel ou CSV
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900">Métricas Ampliadas</h4>
                  <p className="mt-1 text-sm text-blue-700">
                    Acompanhe evolução mensal, metas e comparativos detalhados
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100">
                  <Gift className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-900">Programa de Recompensas (Em Breve)</h4>
                  <p className="mt-1 text-sm text-amber-700">
                    Troque seus pontos por descontos em parceiros sustentáveis
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100">
                  <Target className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-purple-900">Metas Personalizadas</h4>
                  <p className="mt-1 text-sm text-purple-700">
                    Defina objetivos mensais e acompanhe seu progresso
                  </p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsBenefitsModalOpen(false)}>
              Entendi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

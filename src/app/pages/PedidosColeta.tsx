import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Table } from '../components/Table';
import { Plus, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export function PedidosColeta() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userPedidos, setUserPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Carrega os pedidos do banco de dados real
  useEffect(() => {
    if (!user?.id) return;

    fetch(`http://localhost:8000/api/pedidos-coleta/?usuario_id=${user.id}`)
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => setUserPedidos(data))
      .catch(() => toast.error('Erro ao buscar pedidos de coleta.'))
      .finally(() => setLoading(false));
  }, [user?.id]);

  const filteredPedidos = userPedidos.filter(p =>
    selectedStatus === 'all' || p.status === selectedStatus
  );

  const statusCount = {
    solicitada: userPedidos.filter(p => p.status === 'solicitada').length,
    agendada: userPedidos.filter(p => p.status === 'agendada').length,
    finalizada: userPedidos.filter(p => p.status === 'finalizada').length,
    cancelada: userPedidos.filter(p => p.status === 'cancelada').length
  };

  const columns = [
    {
      key: 'data_solicitacao',
      header: 'Data',
      render: (item: any) => new Date(item.data_solicitacao).toLocaleDateString('pt-BR')
    },
    {
      key: 'materiais',
      header: 'Materiais',
      render: (item: any) => Array.isArray(item.materiais) ? item.materiais.join(', ') : item.materiais
    },
    { key: 'quantidade_estimada', header: 'Quantidade' },
    { key: 'endereco', header: 'Endereço' },
    {
      key: 'status',
      header: 'Status',
      render: (item: any) => {
        const colors = {
          solicitada: 'bg-yellow-100 text-yellow-800',
          agendada: 'bg-blue-100 text-blue-800',
          finalizada: 'bg-green-100 text-green-800',
          cancelada: 'bg-red-100 text-red-800'
        };
        const statusKey = item.status as keyof typeof colors;
        return (
          <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${colors[statusKey] || 'bg-gray-100'}`}>
            {item.status.toUpperCase()}
          </span>
        );
      }
    }
  ];

  if (loading) return <div className="p-10 text-center text-muted-foreground animate-pulse">Buscando agendamentos no banco...</div>;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </button>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1a4d2e]">Pedidos de Coleta</h1>
          <p className="mt-2 text-muted-foreground">
            Solicite e acompanhe suas coletas
          </p>
        </div>
        <button
          onClick={() => navigate('/app/pedidos-coleta/novo')}
          className="flex items-center gap-2 rounded-lg bg-[#4caf50] px-4 py-2 font-semibold text-white transition-colors hover:bg-[#45a049]"
        >
          <Plus className="h-5 w-5" />
          Novo Pedido
        </button>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: 'Solicitadas', count: statusCount.solicitada, color: 'bg-yellow-100 text-yellow-800' },
          { label: 'Agendadas', count: statusCount.agendada, color: 'bg-blue-100 text-blue-800' },
          { label: 'Finalizadas', count: statusCount.finalizada, color: 'bg-green-100 text-green-800' },
          { label: 'Canceladas', count: statusCount.cancelada, color: 'bg-red-100 text-red-800' }
        ].map((item, index) => (
          <div key={index} className="rounded-lg border bg-card p-4">
            <div className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${item.color}`}>
              {item.label}
            </div>
            <p className="mt-2 text-2xl font-bold">{item.count}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="rounded-xl border bg-card p-4">
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="h-10 rounded-lg border bg-background px-4 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="all">Todos os status</option>
          <option value="solicitada">Solicitada</option>
          <option value="agendada">Agendada</option>
          <option value="finalizada">Finalizada</option>
          <option value="cancelada">Cancelada</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <Table
          data={filteredPedidos}
          columns={columns}
          emptyMessage="Nenhum pedido de coleta encontrado"
        />
      </div>
    </div>
  );
}

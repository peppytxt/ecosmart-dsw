import { useState } from 'react';
import { useNavigate } from 'react-router';
import { mockMateriais } from '../../lib/mockData';
import { Search, BookOpen, ArrowLeft, X } from 'lucide-react';

export function CentralEducativa() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  const categories = ['all', ...Array.from(new Set(mockMateriais.map(m => m.categoria)))];

  const filteredMateriais = mockMateriais.filter(m => {
    const matchesSearch = m.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || m.categoria === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Breadcrumb / Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </button>

      <div>
        <h1 className="text-3xl font-bold text-[#1a4d2e]">Central Educativa</h1>
        <p className="mt-2 text-muted-foreground">
          Aprenda como descartar corretamente cada tipo de material
        </p>
      </div>

      {/* Active Filters Display */}
      {(searchTerm || selectedCategory !== 'all') && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filtros ativos:</span>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="flex items-center gap-1 rounded-full bg-[#4caf50]/10 px-3 py-1 text-sm text-[#4caf50] transition-colors hover:bg-[#4caf50]/20"
            >
              {selectedCategory}
              <X className="h-3 w-3" />
            </button>
          )}
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="flex items-center gap-1 rounded-full bg-[#4caf50]/10 px-3 py-1 text-sm text-[#4caf50] transition-colors hover:bg-[#4caf50]/20"
            >
              "{searchTerm}"
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      )}

      {/* Search and Filter */}
      <div className="flex flex-col gap-4 rounded-xl border bg-card p-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar material..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10 w-full rounded-lg border bg-background pl-10 pr-4 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="h-10 rounded-lg border bg-background px-4 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="all">Todas as categorias</option>
          {categories.filter(c => c !== 'all').map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredMateriais.map((material) => (
          <button
            key={material.id}
            onClick={() => navigate(`/app/educacao/${material.id}`)}
            className="flex flex-col items-start gap-4 rounded-xl border bg-card p-6 text-left shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#4caf50]/10">
              <BookOpen className="h-6 w-6 text-[#4caf50]" />
            </div>
            <div>
              <h3 className="font-semibold">{material.nome}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{material.categoria}</p>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                {material.descricao}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

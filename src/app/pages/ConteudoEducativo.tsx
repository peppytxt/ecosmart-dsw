import { useParams, useNavigate } from 'react-router';
import { mockMateriais } from '../../lib/mockData';
import { ArrowLeft, MapPin, Plus, AlertTriangle } from 'lucide-react';

export function ConteudoEducativo() {
  const { materialId } = useParams();
  const navigate = useNavigate();

  const material = mockMateriais.find(m => m.id === materialId);

  if (!material) {
    return (
      <div className="text-center">
        <h2>Material não encontrado</h2>
        <button onClick={() => navigate('/app/educacao')} className="mt-4 text-[#4caf50]">
          Voltar para Central Educativa
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <button
        onClick={() => navigate('/app/educacao')}
        className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </button>

      <div className="rounded-xl border bg-card p-8 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-[#4caf50]">
            <span className="text-3xl">♻️</span>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-[#1a4d2e]">{material.nome}</h1>
            <p className="mt-2 text-muted-foreground">{material.descricao}</p>
          </div>
        </div>

        <div className="mt-8 space-y-8">
          {/* Como Descartar */}
          <div>
            <h2 className="text-xl font-semibold text-[#1a4d2e]">Como Descartar</h2>
            <ul className="mt-4 space-y-3">
              {material.como_descartar.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#4caf50] text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cuidados */}
          <div className="rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div>
                <h3 className="font-semibold text-yellow-900">Cuidados Importantes</h3>
                <ul className="mt-2 space-y-1 text-sm text-yellow-800">
                  {material.cuidados.map((cuidado, index) => (
                    <li key={index}>• {cuidado}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <button
            onClick={() => navigate('/app/pontos-coleta')}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-lg border bg-background transition-colors hover:bg-muted"
          >
            <MapPin className="h-5 w-5" />
            Ver Pontos de Coleta
          </button>
          <button
            onClick={() => navigate('/app/registrar-descarte')}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-[#4caf50] font-semibold text-white transition-colors hover:bg-[#45a049]"
          >
            <Plus className="h-5 w-5" />
            Registrar Descarte
          </button>
        </div>
      </div>
    </div>
  );
}

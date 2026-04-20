import { useState } from 'react';
import { mockMateriais } from '../../../lib/mockData';
import { Plus, Edit, Trash2, Eye, X } from 'lucide-react';
import { Modal } from '../../components/Modal';
import { toast } from 'sonner';

export function AdminGestaoConteudos() {
  const [showNewModal, setShowNewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState<any>(null);
  const [conteudos, setConteudos] = useState(mockMateriais);
  
  // Form states
  const [formData, setFormData] = useState({
    nome: '',
    categoria: 'Eletrônicos',
    descricao: '',
    comoDescartar: '',
    cuidados: ''
  });

  const handlePublish = () => {
    if (!formData.nome || !formData.descricao || !formData.comoDescartar) {
      toast.error('Preencha todos os campos obrigatórios!');
      return;
    }

    const newContent = {
      id: String(conteudos.length + 1),
      nome: formData.nome,
      categoria: formData.categoria,
      icone: 'Package',
      descricao: formData.descricao,
      como_descartar: formData.comoDescartar.split('\n').filter(line => line.trim()),
      cuidados: formData.cuidados.split('\n').filter(line => line.trim())
    };

    setConteudos([...conteudos, newContent]);
    toast.success('Conteúdo publicado com sucesso!');
    setShowNewModal(false);
    resetForm();
  };

  const handleSaveEdit = () => {
    if (!selectedContent) return;

    const updatedConteudos = conteudos.map(c => 
      c.id === selectedContent.id 
        ? {
            ...c,
            nome: formData.nome,
            categoria: formData.categoria,
            descricao: formData.descricao,
            como_descartar: formData.comoDescartar.split('\n').filter(line => line.trim()),
            cuidados: formData.cuidados.split('\n').filter(line => line.trim())
          }
        : c
    );

    setConteudos(updatedConteudos);
    toast.success('Conteúdo atualizado com sucesso!');
    setShowEditModal(false);
    setSelectedContent(null);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este conteúdo?')) {
      setConteudos(conteudos.filter(c => c.id !== id));
      toast.success('Conteúdo excluído com sucesso!');
    }
  };

  const openViewModal = (content: any) => {
    setSelectedContent(content);
    setShowViewModal(true);
  };

  const openEditModal = (content: any) => {
    setSelectedContent(content);
    setFormData({
      nome: content.nome,
      categoria: content.categoria,
      descricao: content.descricao,
      comoDescartar: content.como_descartar.join('\n'),
      cuidados: content.cuidados.join('\n')
    });
    setShowEditModal(true);
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      categoria: 'Eletrônicos',
      descricao: '',
      comoDescartar: '',
      cuidados: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1a4d2e]">Gestão de Conteúdos</h1>
          <p className="mt-2 text-muted-foreground">
            Criar e gerenciar conteúdos educativos e campanhas
          </p>
        </div>
        <button
          onClick={() => setShowNewModal(true)}
          className="flex items-center gap-2 rounded-lg bg-[#4caf50] px-4 py-2 font-semibold text-white transition-colors hover:bg-[#45a049]"
        >
          <Plus className="h-5 w-5" />
          Novo Conteúdo
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">Total de Conteúdos</p>
          <p className="mt-1 text-2xl font-bold">{conteudos.length}</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">Publicados</p>
          <p className="mt-1 text-2xl font-bold">{conteudos.length}</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">Rascunhos</p>
          <p className="mt-1 text-2xl font-bold">0</p>
        </div>
      </div>

      {/* Content List */}
      <div className="space-y-3">
        {conteudos.map((material) => (
          <div
            key={material.id}
            className="flex items-center justify-between rounded-xl border bg-card p-4 transition-shadow hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#4caf50]/10">
                ♻️
              </div>
              <div>
                <h4 className="font-semibold">{material.nome}</h4>
                <p className="text-sm text-muted-foreground">{material.categoria}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => openViewModal(material)}
                className="rounded-lg p-2 transition-colors hover:bg-muted"
                title="Visualizar"
              >
                <Eye className="h-4 w-4" />
              </button>
              <button 
                onClick={() => openEditModal(material)}
                className="rounded-lg p-2 transition-colors hover:bg-muted"
                title="Editar"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button 
                onClick={() => handleDelete(material.id)}
                className="rounded-lg p-2 text-destructive transition-colors hover:bg-destructive/10"
                title="Excluir"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View Content Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="Visualizar Conteúdo"
        size="lg"
      >
        {selectedContent && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">{selectedContent.nome}</h3>
              <p className="text-sm text-muted-foreground">{selectedContent.categoria}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Descrição</h4>
              <p className="text-sm">{selectedContent.descricao}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Como Descartar</h4>
              <ul className="list-disc list-inside space-y-1">
                {selectedContent.como_descartar.map((item: string, idx: number) => (
                  <li key={idx} className="text-sm">{item}</li>
                ))}
              </ul>
            </div>
            {selectedContent.cuidados.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Cuidados</h4>
                <ul className="list-disc list-inside space-y-1">
                  {selectedContent.cuidados.map((item: string, idx: number) => (
                    <li key={idx} className="text-sm">{item}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex justify-end pt-4">
              <button
                onClick={() => setShowViewModal(false)}
                className="rounded-lg border px-4 py-2 transition-colors hover:bg-muted"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* New Content Modal */}
      <Modal
        isOpen={showNewModal}
        onClose={() => setShowNewModal(false)}
        title="Novo Conteúdo Educativo"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Título *</label>
            <input
              type="text"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              placeholder="Ex: Como Descartar Pilhas e Baterias"
              className="mt-2 h-10 w-full rounded-lg border bg-input-background px-4 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Categoria</label>
            <select 
              value={formData.categoria}
              onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
              className="mt-2 h-10 w-full rounded-lg border bg-input-background px-4 text-sm"
            >
              <option>Eletrônicos</option>
              <option>Químicos</option>
              <option>Orgânicos</option>
              <option>Recicláveis</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Descrição *</label>
            <textarea
              rows={3}
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              placeholder="Descreva o material e sua importância..."
              className="mt-2 w-full rounded-lg border bg-input-background px-4 py-3 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Como Descartar * (um por linha)</label>
            <textarea
              rows={4}
              value={formData.comoDescartar}
              onChange={(e) => setFormData({ ...formData, comoDescartar: e.target.value })}
              placeholder="Liste os passos para descarte correto (um por linha)"
              className="mt-2 w-full rounded-lg border bg-input-background px-4 py-3 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Cuidados (um por linha)</label>
            <textarea
              rows={3}
              value={formData.cuidados}
              onChange={(e) => setFormData({ ...formData, cuidados: e.target.value })}
              placeholder="Liste os cuidados necessários (um por linha)"
              className="mt-2 w-full rounded-lg border bg-input-background px-4 py-3 text-sm"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => {
                setShowNewModal(false);
                resetForm();
              }}
              className="flex-1 rounded-lg border py-2 transition-colors hover:bg-muted"
            >
              Cancelar
            </button>
            <button
              onClick={handlePublish}
              className="flex-1 rounded-lg bg-[#4caf50] py-2 font-semibold text-white transition-colors hover:bg-[#45a049]"
            >
              Publicar
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit Content Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Editar Conteúdo"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Título *</label>
            <input
              type="text"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              placeholder="Ex: Como Descartar Pilhas e Baterias"
              className="mt-2 h-10 w-full rounded-lg border bg-input-background px-4 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Categoria</label>
            <select 
              value={formData.categoria}
              onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
              className="mt-2 h-10 w-full rounded-lg border bg-input-background px-4 text-sm"
            >
              <option>Eletrônicos</option>
              <option>Químicos</option>
              <option>Orgânicos</option>
              <option>Recicláveis</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Descrição *</label>
            <textarea
              rows={3}
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              placeholder="Descreva o material e sua importância..."
              className="mt-2 w-full rounded-lg border bg-input-background px-4 py-3 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Como Descartar * (um por linha)</label>
            <textarea
              rows={4}
              value={formData.comoDescartar}
              onChange={(e) => setFormData({ ...formData, comoDescartar: e.target.value })}
              placeholder="Liste os passos para descarte correto (um por linha)"
              className="mt-2 w-full rounded-lg border bg-input-background px-4 py-3 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Cuidados (um por linha)</label>
            <textarea
              rows={3}
              value={formData.cuidados}
              onChange={(e) => setFormData({ ...formData, cuidados: e.target.value })}
              placeholder="Liste os cuidados necessários (um por linha)"
              className="mt-2 w-full rounded-lg border bg-input-background px-4 py-3 text-sm"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => {
                setShowEditModal(false);
                resetForm();
              }}
              className="flex-1 rounded-lg border py-2 transition-colors hover:bg-muted"
            >
              Cancelar
            </button>
            <button
              onClick={handleSaveEdit}
              className="flex-1 rounded-lg bg-[#4caf50] py-2 font-semibold text-white transition-colors hover:bg-[#45a049]"
            >
              Salvar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
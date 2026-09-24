import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import CRUDList from '../components/CRUDList';
import FormModal from '../components/FormModal';
import ExpertForm from '../components/ExpertForm';
import DetailModal from '../components/DetailModal';

export default function Experts() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [viewingItem, setViewingItem] = useState<any>(null);

  const createMutation = useMutation({
    mutationFn: (data: any) => api.post('/experts', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experts'] });
      setShowForm(false);
      setEditingItem(null);
      setError(null);
    },
    onError: (err: any) => {
      setError(err.response?.data?.error || err.message || 'Erreur lors de la création');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      api.put(`/experts/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experts'] });
      setShowForm(false);
      setEditingItem(null);
      setError(null);
    },
    onError: (err: any) => {
      setError(err.response?.data?.error || err.message || 'Erreur lors de la modification');
    },
  });

  const handleFormSubmit = (data: any) => {
    setError(null);
    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleAddClick = () => {
    setEditingItem(null);
    setShowForm(true);
    setError(null);
  };

  const handleEditClick = (item: any) => {
    setEditingItem(item);
    setShowForm(true);
    setError(null);
  };

  const handleViewClick = (item: any) => {
    setViewingItem(item);
    setShowDetail(true);
  };

  const detailFields = [
    { key: 'nom', label: 'Nom' },
    { key: 'prenom', label: 'Prénom' },
    { key: 'slug', label: 'Slug' },
    { key: 'specialite', label: 'Spécialité' },
    { key: 'bio', label: 'Biographie' },
    { key: 'image', label: 'Image' },
    { key: 'published', label: 'Publié', type: 'boolean' as const },
  ];

  return (
    <>
      <CRUDList
        endpoint="experts"
        title="Experts"
        columns={[
          { key: 'nom', label: 'Nom' },
          { key: 'prenom', label: 'Prénom' },
          { key: 'published', label: 'Publié' },
        ]}
        onAddClick={handleAddClick}
        onEditClick={handleEditClick}
        onViewClick={handleViewClick}
      />
      <FormModal
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingItem(null);
          setError(null);
        }}
        title={editingItem ? 'Modifier l\'expert' : 'Nouvel expert'}
      >
        <ExpertForm
          initialData={editingItem}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingItem(null);
            setError(null);
          }}
          error={error}
          isLoading={createMutation.isPending || updateMutation.isPending}
        />
      </FormModal>
      <DetailModal
        isOpen={showDetail}
        onClose={() => {
          setShowDetail(false);
          setViewingItem(null);
        }}
        title="Détails de l'expert"
        data={viewingItem}
        fields={detailFields}
      />
    </>
  );
}

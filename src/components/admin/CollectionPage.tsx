'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/admin/api';
import CRUDList from './CRUDList';
import FormModal from './FormModal';
import DetailModal from './DetailModal';

interface Field {
  key: string;
  label: string;
  type?: 'text' | 'boolean' | 'date';
}

interface FormComponentProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  error?: string | null;
  isLoading?: boolean;
}

interface CollectionPageProps {
  endpoint: string;
  title: string;
  columns: Field[];
  detailFields: Field[];
  detailTitle: string;
  addLabel: string;
  editLabel: string;
  FormComponent: React.ComponentType<FormComponentProps>;
}

export default function CollectionPage({
  endpoint,
  title,
  columns,
  detailFields,
  detailTitle,
  addLabel,
  editLabel,
  FormComponent,
}: CollectionPageProps) {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [viewingItem, setViewingItem] = useState<any>(null);

  const createMutation = useMutation({
    mutationFn: (data: any) => api.post(`/${endpoint}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [endpoint] });
      setShowForm(false);
      setEditingItem(null);
      setError(null);
    },
    onError: (err: any) => {
      setError(err.response?.data?.error || err.message || 'Erreur lors de la création');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => api.put(`/${endpoint}/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [endpoint] });
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

  const closeForm = () => {
    setShowForm(false);
    setEditingItem(null);
    setError(null);
  };

  return (
    <>
      <CRUDList
        endpoint={endpoint}
        title={title}
        columns={columns}
        onAddClick={handleAddClick}
        onEditClick={handleEditClick}
        onViewClick={handleViewClick}
      />
      <FormModal isOpen={showForm} onClose={closeForm} title={editingItem ? editLabel : addLabel}>
        <FormComponent
          initialData={editingItem}
          onSubmit={handleFormSubmit}
          onCancel={closeForm}
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
        title={detailTitle}
        data={viewingItem}
        fields={detailFields}
      />
    </>
  );
}

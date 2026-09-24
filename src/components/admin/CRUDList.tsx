'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/admin/api';
import { useState } from 'react';
import { Trash2, Edit, Plus, Search, Eye, EyeOff, ChevronLeft, ChevronRight } from 'lucide-react';

interface CRUDListProps {
  endpoint: string;
  title: string;
  columns: { key: string; label: string }[];
  onAddClick?: () => void;
  onEditClick?: (item: any) => void;
  onViewClick?: (item: any) => void;
}

export default function CRUDList({ endpoint, title, columns, onAddClick, onEditClick, onViewClick }: CRUDListProps) {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPublished, setFilterPublished] = useState<boolean | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const { data, isLoading, error } = useQuery({
    queryKey: [endpoint],
    queryFn: () => api.get(`/${endpoint}`).then((res) => res.data),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/${endpoint}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [endpoint] });
    },
  });

  const togglePublishedMutation = useMutation({
    mutationFn: ({ id, published }: { id: string; published: boolean }) =>
      api.put(`/${endpoint}/${id}`, { published: !published }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [endpoint] });
    },
  });

  const handleDelete = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleTogglePublished = (id: string, currentPublished: boolean) => {
    togglePublishedMutation.mutate({ id, published: currentPublished });
  };

  const filteredData = data?.data?.filter((item: any) => {
    const matchesSearch = columns.some((col) =>
      String(item[col.key] || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesFilter = filterPublished === null || item.published === filterPublished;
    return matchesSearch && matchesFilter;
  }) || [];

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-soga-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-card p-6 border border-red-500/30">
        <p className="text-red-400">Erreur: {(error as any).message}</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-soga-sand mb-1">{title}</h1>
          <p className="text-admin-muted">
            {filteredData.length} {filteredData.length === 1 ? 'élément' : 'éléments'} • Page {currentPage} sur {totalPages || 1}
          </p>
        </div>
        <button
          onClick={onAddClick}
          disabled={!onAddClick}
          className="px-6 py-3 bg-soga-gold text-soga-black rounded-lg hover:bg-soga-gold-light hover:shadow-lg hover:shadow-soga-gold/30 transition-all duration-200 font-semibold flex items-center gap-2 disabled:bg-admin-muted disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus size={20} />
          Ajouter
        </button>
      </div>

      <div className="admin-card p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-admin-muted" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-input-field pl-10"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterPublished(null)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterPublished === null
                  ? 'bg-soga-gold text-soga-black'
                  : 'bg-admin-graphite/50 text-admin-muted hover:text-soga-sand'
              }`}
            >
              Tous
            </button>
            <button
              onClick={() => setFilterPublished(true)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterPublished === true
                  ? 'bg-soga-gold text-soga-black'
                  : 'bg-admin-graphite/50 text-admin-muted hover:text-soga-sand'
              }`}
            >
              Publiés
            </button>
            <button
              onClick={() => setFilterPublished(false)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterPublished === false
                  ? 'bg-soga-gold text-soga-black'
                  : 'bg-admin-graphite/50 text-admin-muted hover:text-soga-sand'
              }`}
            >
              Brouillons
            </button>
          </div>
        </div>
      </div>

      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-admin-muted/20">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-6 py-4 text-left text-xs font-semibold text-admin-muted uppercase tracking-wider"
                  >
                    {col.label}
                  </th>
                ))}
                <th className="px-6 py-4 text-right text-xs font-semibold text-admin-muted uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-admin-muted uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-muted/10">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 2} className="px-6 py-12 text-center text-admin-muted">
                    Aucun élément trouvé
                  </td>
                </tr>
              ) : (
                paginatedData.map((item: any, index: number) => (
                  <tr
                    key={item.id}
                    className="hover:bg-soga-gold/5 transition-colors animate-slide-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {columns.map((col) => (
                      <td key={col.key} className="px-6 py-4 text-soga-sand">
                        {item[col.key] || '-'}
                      </td>
                    ))}
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleTogglePublished(item.id, item.published)}
                        className={`p-2 rounded-lg transition-colors ${
                          item.published
                            ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                            : 'bg-admin-muted/10 text-admin-muted hover:bg-admin-muted/20'
                        }`}
                        title={item.published ? 'Publié' : 'Brouillon'}
                      >
                        {item.published ? <Eye size={18} /> : <EyeOff size={18} />}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {onViewClick && (
                          <button
                            onClick={() => onViewClick(item)}
                            className="p-2 rounded-lg text-soga-gold hover:bg-soga-gold/10 transition-colors"
                            title="Voir les détails"
                          >
                            <Eye size={18} />
                          </button>
                        )}
                        <button
                          onClick={() => onEditClick?.(item)}
                          className="p-2 rounded-lg text-soga-gold hover:bg-soga-gold/10 transition-colors"
                          title="Modifier"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-admin-muted">
            Affichage de {startIndex + 1} à {Math.min(endIndex, filteredData.length)} sur {filteredData.length} éléments
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg text-soga-sand hover:bg-soga-gold/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === page
                    ? 'bg-soga-gold text-soga-black font-semibold'
                    : 'text-soga-sand hover:bg-soga-gold/10'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg text-soga-sand hover:bg-soga-gold/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

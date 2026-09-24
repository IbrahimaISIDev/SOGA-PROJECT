'use client';

import { useState, useEffect } from 'react';
import { slugify } from '@/lib/admin/slugify';

interface ArticleFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  error?: string | null;
  isLoading?: boolean;
}

export default function ArticleForm({ initialData, onSubmit, onCancel, error, isLoading }: ArticleFormProps) {
  const [formData, setFormData] = useState({
    titre: initialData?.titre || '',
    slug: initialData?.slug || '',
    resume: initialData?.resume || '',
    contenu: initialData?.contenu || '',
    image: initialData?.image || '',
    date: initialData?.date || new Date().toISOString().split('T')[0],
    published: initialData?.published ?? false,
  });
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  useEffect(() => {
    if (!slugManuallyEdited && formData.titre) {
      setFormData((prev) => ({ ...prev, slug: slugify(formData.titre) }));
    }
  }, [formData.titre, slugManuallyEdited]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (name === 'slug') {
      setSlugManuallyEdited(true);
    }

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-soga-black mb-2">Titre</label>
          <input
            type="text"
            name="titre"
            value={formData.titre}
            onChange={handleChange}
            required
            placeholder="Titre de l'article"
            className="w-full px-4 py-3 border-2 border-admin-muted/30 rounded-lg focus:outline-none focus:border-soga-gold focus:ring-2 focus:ring-soga-gold/20 transition-all duration-200 bg-white text-soga-black placeholder:text-admin-muted/50"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-soga-black mb-2">Slug</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
            placeholder="slug-de-l-article"
            className="w-full px-4 py-3 border-2 border-admin-muted/30 rounded-lg focus:outline-none focus:border-soga-gold focus:ring-2 focus:ring-soga-gold/20 transition-all duration-200 bg-white text-soga-black placeholder:text-admin-muted/50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-soga-black mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-admin-muted/30 rounded-lg focus:outline-none focus:border-soga-gold focus:ring-2 focus:ring-soga-gold/20 transition-all duration-200 bg-white text-soga-black placeholder:text-admin-muted/50"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-soga-black mb-2">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://exemple.com/image.jpg"
            className="w-full px-4 py-3 border-2 border-admin-muted/30 rounded-lg focus:outline-none focus:border-soga-gold focus:ring-2 focus:ring-soga-gold/20 transition-all duration-200 bg-white text-soga-black placeholder:text-admin-muted/50"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-soga-black mb-2">Résumé</label>
        <textarea
          name="resume"
          value={formData.resume}
          onChange={handleChange}
          rows={3}
          placeholder="Résumé court de l'article..."
          className="w-full px-4 py-3 border-2 border-admin-muted/30 rounded-lg focus:outline-none focus:border-soga-gold focus:ring-2 focus:ring-soga-gold/20 transition-all duration-200 bg-white text-soga-black placeholder:text-admin-muted/50 resize-none"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-soga-black mb-2">Contenu</label>
        <textarea
          name="contenu"
          value={formData.contenu}
          onChange={handleChange}
          rows={10}
          required
          placeholder="Contenu complet de l'article..."
          className="w-full px-4 py-3 border-2 border-admin-muted/30 rounded-lg focus:outline-none focus:border-soga-gold focus:ring-2 focus:ring-soga-gold/20 transition-all duration-200 bg-white text-soga-black placeholder:text-admin-muted/50 resize-none"
        />
      </div>

      <div className="flex items-center p-4 bg-soga-gold/10 rounded-lg border border-soga-gold/30">
        <input
          type="checkbox"
          name="published"
          id="published"
          checked={formData.published}
          onChange={handleChange}
          className="w-5 h-5 text-soga-gold border-admin-muted rounded focus:ring-soga-gold focus:ring-offset-0"
        />
        <label htmlFor="published" className="ml-3 text-sm font-medium text-soga-black cursor-pointer">
          Publier cet article
        </label>
      </div>

      <div className="flex justify-end space-x-4 pt-6 border-t border-admin-muted/20">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 text-soga-black bg-admin-muted/20 rounded-lg hover:bg-admin-muted/30 transition-all duration-200 font-semibold"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 text-white bg-soga-gold rounded-lg hover:bg-soga-gold-light hover:shadow-lg hover:shadow-soga-gold/30 transition-all duration-200 font-semibold disabled:bg-admin-muted disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? 'Enregistrement...' : (initialData ? 'Mettre à jour' : "Créer l'article")}
        </button>
      </div>
    </form>
  );
}

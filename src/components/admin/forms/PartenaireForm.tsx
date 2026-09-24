'use client';

import { useState, useEffect } from 'react';
import { slugify } from '@/lib/admin/slugify';

interface PartenaireFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  error?: string | null;
  isLoading?: boolean;
}

export default function PartenaireForm({ initialData, onSubmit, onCancel, error, isLoading }: PartenaireFormProps) {
  const [formData, setFormData] = useState({
    nom: initialData?.nom || '',
    slug: initialData?.slug || '',
    categorie: initialData?.categorie || '',
    logo: initialData?.logo || '',
    description: initialData?.description || '',
    published: initialData?.published ?? false,
  });
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  useEffect(() => {
    if (!slugManuallyEdited && formData.nom) {
      setFormData((prev) => ({ ...prev, slug: slugify(formData.nom) }));
    }
  }, [formData.nom, slugManuallyEdited]);

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
          <label className="block text-sm font-semibold text-soga-black mb-2">Nom</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
            placeholder="Nom du partenaire"
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
            placeholder="slug-du-partenaire"
            className="w-full px-4 py-3 border-2 border-admin-muted/30 rounded-lg focus:outline-none focus:border-soga-gold focus:ring-2 focus:ring-soga-gold/20 transition-all duration-200 bg-white text-soga-black placeholder:text-admin-muted/50"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-soga-black mb-2">Catégorie</label>
        <select
          name="categorie"
          value={formData.categorie}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-admin-muted/30 rounded-lg focus:outline-none focus:border-soga-gold focus:ring-2 focus:ring-soga-gold/20 transition-all duration-200 bg-white text-soga-black"
        >
          <option value="">— Sélectionner —</option>
          <option value="Accréditation & qualité académique">Accréditation &amp; qualité académique</option>
          <option value="Institutions publiques & appui à la formation">Institutions publiques &amp; appui à la formation</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-soga-black mb-2">Logo URL</label>
        <input
          type="text"
          name="logo"
          value={formData.logo}
          onChange={handleChange}
          placeholder="https://exemple.com/logo.png"
          className="w-full px-4 py-3 border-2 border-admin-muted/30 rounded-lg focus:outline-none focus:border-soga-gold focus:ring-2 focus:ring-soga-gold/20 transition-all duration-200 bg-soga-sand/5"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-soga-black mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          placeholder="Description du partenariat..."
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
          Publier ce partenaire
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
          {isLoading ? 'Enregistrement...' : (initialData ? 'Mettre à jour' : 'Créer le partenaire')}
        </button>
      </div>
    </form>
  );
}

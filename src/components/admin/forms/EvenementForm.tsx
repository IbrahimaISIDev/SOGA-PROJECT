'use client';

import { useState, useEffect } from 'react';
import { slugify } from '@/lib/admin/slugify';

interface EvenementFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  error?: string | null;
  isLoading?: boolean;
}

export default function EvenementForm({ initialData, onSubmit, onCancel, error, isLoading }: EvenementFormProps) {
  const [formData, setFormData] = useState({
    titre: initialData?.titre || '',
    slug: initialData?.slug || '',
    date: initialData?.date || new Date().toISOString().split('T')[0],
    heure: initialData?.heure || '',
    lieu: initialData?.lieu || '',
    type: initialData?.type || '',
    description: initialData?.description || '',
    image: initialData?.image || '',
    inscriptionOuverte: initialData?.inscriptionOuverte ?? true,
    placesLimitees: initialData?.placesLimitees ?? false,
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
            placeholder="Titre de l'événement"
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
            placeholder="slug-de-levenement"
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
          <label className="block text-sm font-semibold text-soga-black mb-2">Lieu</label>
          <input
            type="text"
            name="lieu"
            value={formData.lieu}
            onChange={handleChange}
            placeholder="Ex: Dakar, Sénégal"
            className="w-full px-4 py-3 border-2 border-admin-muted/30 rounded-lg focus:outline-none focus:border-soga-gold focus:ring-2 focus:ring-soga-gold/20 transition-all duration-200 bg-white text-soga-black placeholder:text-admin-muted/50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-soga-black mb-2">Heure</label>
          <input
            type="text"
            name="heure"
            value={formData.heure}
            onChange={handleChange}
            placeholder="Ex: 14h00"
            className="w-full px-4 py-3 border-2 border-admin-muted/30 rounded-lg focus:outline-none focus:border-soga-gold focus:ring-2 focus:ring-soga-gold/20 transition-all duration-200 bg-white text-soga-black placeholder:text-admin-muted/50"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-soga-black mb-2">Type</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            placeholder="Ex: Portes ouvertes"
            className="w-full px-4 py-3 border-2 border-admin-muted/30 rounded-lg focus:outline-none focus:border-soga-gold focus:ring-2 focus:ring-soga-gold/20 transition-all duration-200 bg-white text-soga-black placeholder:text-admin-muted/50"
          />
        </div>
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

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-soga-black mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          placeholder="Description de l'événement..."
          className="w-full px-4 py-3 border-2 border-admin-muted/30 rounded-lg focus:outline-none focus:border-soga-gold focus:ring-2 focus:ring-soga-gold/20 transition-all duration-200 bg-white text-soga-black placeholder:text-admin-muted/50 resize-none"
        />
      </div>

      <div className="flex items-center gap-6 p-4 bg-soga-gold/10 rounded-lg border border-soga-gold/30 flex-wrap">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="inscriptionOuverte"
            id="inscriptionOuverte"
            checked={formData.inscriptionOuverte}
            onChange={handleChange}
            className="w-5 h-5 text-soga-gold border-admin-muted rounded focus:ring-soga-gold focus:ring-offset-0"
          />
          <label htmlFor="inscriptionOuverte" className="ml-3 text-sm font-medium text-soga-black cursor-pointer">
            Inscription ouverte
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="placesLimitees"
            id="placesLimitees"
            checked={formData.placesLimitees}
            onChange={handleChange}
            className="w-5 h-5 text-soga-gold border-admin-muted rounded focus:ring-soga-gold focus:ring-offset-0"
          />
          <label htmlFor="placesLimitees" className="ml-3 text-sm font-medium text-soga-black cursor-pointer">
            Places limitées
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="published"
            id="published"
            checked={formData.published}
            onChange={handleChange}
            className="w-5 h-5 text-soga-gold border-admin-muted rounded focus:ring-soga-gold focus:ring-offset-0"
          />
          <label htmlFor="published" className="ml-3 text-sm font-medium text-soga-black cursor-pointer">
            Publier cet événement
          </label>
        </div>
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
          {isLoading ? 'Enregistrement...' : (initialData ? 'Mettre à jour' : "Créer l'événement")}
        </button>
      </div>
    </form>
  );
}

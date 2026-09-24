'use client';

import { useState, useEffect } from 'react';
import { slugify } from '@/lib/admin/slugify';

interface ExpertFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  error?: string | null;
  isLoading?: boolean;
}

export default function ExpertForm({ initialData, onSubmit, onCancel, error, isLoading }: ExpertFormProps) {
  const [formData, setFormData] = useState({
    nom: initialData?.nom || '',
    prenom: initialData?.prenom || '',
    slug: initialData?.slug || '',
    specialite: initialData?.specialite || '',
    bio: initialData?.bio || '',
    image: initialData?.image || '',
    published: initialData?.published ?? false,
  });
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  useEffect(() => {
    if (!slugManuallyEdited && formData.nom && formData.prenom) {
      setFormData((prev) => ({ ...prev, slug: slugify(`${formData.nom} ${formData.prenom}`) }));
    }
  }, [formData.nom, formData.prenom, slugManuallyEdited]);

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
            placeholder="Nom"
            className="w-full px-4 py-3 border-2 border-admin-muted/30 rounded-lg focus:outline-none focus:border-soga-gold focus:ring-2 focus:ring-soga-gold/20 transition-all duration-200 bg-white text-soga-black placeholder:text-admin-muted/50"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-soga-black mb-2">Prénom</label>
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            placeholder="Prénom"
            className="w-full px-4 py-3 border-2 border-admin-muted/30 rounded-lg focus:outline-none focus:border-soga-gold focus:ring-2 focus:ring-soga-gold/20 transition-all duration-200 bg-white text-soga-black placeholder:text-admin-muted/50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-soga-black mb-2">Slug</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
            placeholder="slug-de-l-expert"
            className="w-full px-4 py-3 border-2 border-admin-muted/30 rounded-lg focus:outline-none focus:border-soga-gold focus:ring-2 focus:ring-soga-gold/20 transition-all duration-200 bg-white text-soga-black placeholder:text-admin-muted/50"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-soga-black mb-2">Spécialité</label>
          <input
            type="text"
            name="specialite"
            value={formData.specialite}
            onChange={handleChange}
            placeholder="Ex: Intelligence Artificielle"
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
          placeholder="https://exemple.com/photo.jpg"
          className="w-full px-4 py-3 border-2 border-admin-muted/30 rounded-lg focus:outline-none focus:border-soga-gold focus:ring-2 focus:ring-soga-gold/20 transition-all duration-200 bg-white text-soga-black placeholder:text-admin-muted/50"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-soga-black mb-2">Biographie</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={4}
          placeholder="Biographie de l'expert..."
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
          Publier cet expert
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
          {isLoading ? 'Enregistrement...' : (initialData ? 'Mettre à jour' : "Créer l'expert")}
        </button>
      </div>
    </form>
  );
}

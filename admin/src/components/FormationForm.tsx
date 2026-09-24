import { useState, useEffect } from 'react';
import { slugify } from '../lib/slugify';

interface FormationFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  error?: string | null;
  isLoading?: boolean;
}

export default function FormationForm({ initialData, onSubmit, onCancel, error, isLoading }: FormationFormProps) {
  const [formData, setFormData] = useState({
    titre: initialData?.titre || '',
    slug: initialData?.slug || '',
    codeFiliere: initialData?.codeFiliere || '',
    pole: initialData?.pole || '',
    niveau: initialData?.niveau || '',
    rythme: initialData?.rythme || '',
    duree: initialData?.duree || '',
    description: initialData?.description || '',
    image: initialData?.image || '',
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
          <label className="block text-sm font-semibold text-soga-dark mb-2">Titre</label>
          <input
            type="text"
            name="titre"
            value={formData.titre}
            onChange={handleChange}
            required
            placeholder="Titre de la formation"
            className="w-full px-4 py-3 border-2 border-soga-muted/30 rounded-lg focus:outline-none focus:border-soga-gold focus:ring-2 focus:ring-soga-gold/20 transition-all duration-200 bg-white text-soga-dark placeholder:text-soga-muted/50"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-soga-dark mb-2">Slug</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
            placeholder="slug-de-la-formation"
            className="w-full px-4 py-3 border-2 border-soga-muted/30 rounded-lg focus:outline-none focus:border-soga-gold focus:ring-2 focus:ring-soga-gold/20 transition-all duration-200 bg-white text-soga-dark placeholder:text-soga-muted/50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-soga-dark mb-2">Code Filière</label>
          <input
            type="text"
            name="codeFiliere"
            value={formData.codeFiliere}
            onChange={handleChange}
            required
            placeholder="Ex: BTS-01"
            className="w-full px-4 py-3 border-2 border-soga-muted/30 rounded-lg focus:outline-none focus:border-soga-gold focus:ring-2 focus:ring-soga-gold/20 transition-all duration-200 bg-white text-soga-dark placeholder:text-soga-muted/50"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-soga-dark mb-2">Pôle</label>
          <input
            type="text"
            name="pole"
            value={formData.pole}
            onChange={handleChange}
            placeholder="Ex: Informatique"
            className="w-full px-4 py-3 border-2 border-soga-muted/30 rounded-lg focus:outline-none focus:border-soga-gold focus:ring-2 focus:ring-soga-gold/20 transition-all duration-200 bg-white text-soga-dark placeholder:text-soga-muted/50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-soga-dark mb-2">Niveau</label>
          <input
            type="text"
            name="niveau"
            value={formData.niveau}
            onChange={handleChange}
            placeholder="Ex: Bac+2"
            className="w-full px-4 py-3 border-2 border-soga-muted/30 rounded-lg focus:outline-none focus:border-soga-gold focus:ring-2 focus:ring-soga-gold/20 transition-all duration-200 bg-white text-soga-dark placeholder:text-soga-muted/50"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-soga-dark mb-2">Rythme</label>
          <input
            type="text"
            name="rythme"
            value={formData.rythme}
            onChange={handleChange}
            placeholder="Ex: Temps plein"
            className="w-full px-4 py-3 border-2 border-soga-muted/30 rounded-lg focus:outline-none focus:border-soga-gold focus:ring-2 focus:ring-soga-gold/20 transition-all duration-200 bg-white text-soga-dark placeholder:text-soga-muted/50"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-soga-dark mb-2">Durée</label>
          <input
            type="text"
            name="duree"
            value={formData.duree}
            onChange={handleChange}
            placeholder="Ex: 2 ans"
            className="w-full px-4 py-3 border-2 border-soga-muted/30 rounded-lg focus:outline-none focus:border-soga-gold focus:ring-2 focus:ring-soga-gold/20 transition-all duration-200 bg-white text-soga-dark placeholder:text-soga-muted/50"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-soga-dark mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          placeholder="Description détaillée de la formation..."
          className="w-full px-4 py-3 border-2 border-soga-muted/30 rounded-lg focus:outline-none focus:border-soga-gold focus:ring-2 focus:ring-soga-gold/20 transition-all duration-200 bg-white text-soga-dark placeholder:text-soga-muted/50 resize-none"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-soga-dark mb-2">Image URL</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://exemple.com/image.jpg"
          className="w-full px-4 py-3 border-2 border-soga-muted/30 rounded-lg focus:outline-none focus:border-soga-gold focus:ring-2 focus:ring-soga-gold/20 transition-all duration-200 bg-soga-light/5"
        />
      </div>

      <div className="flex items-center p-4 bg-soga-gold/10 rounded-lg border border-soga-gold/30">
        <input
          type="checkbox"
          name="published"
          id="published"
          checked={formData.published}
          onChange={handleChange}
          className="w-5 h-5 text-soga-gold border-soga-muted rounded focus:ring-soga-gold focus:ring-offset-0"
        />
        <label htmlFor="published" className="ml-3 text-sm font-medium text-soga-dark cursor-pointer">
          Publier cette formation
        </label>
      </div>

      <div className="flex justify-end space-x-4 pt-6 border-t border-soga-muted/20">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 text-soga-dark bg-soga-muted/20 rounded-lg hover:bg-soga-muted/30 transition-all duration-200 font-semibold"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 text-white bg-soga-gold rounded-lg hover:bg-soga-gold-light hover:shadow-lg hover:shadow-soga-gold/30 transition-all duration-200 font-semibold disabled:bg-soga-muted disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? 'Enregistrement...' : (initialData ? 'Mettre à jour' : 'Créer la formation')}
        </button>
      </div>
    </form>
  );
}

'use client';

import CollectionPage from '@/components/admin/CollectionPage';
import ThematiqueForm from '@/components/admin/forms/ThematiqueForm';

export default function ThematiquesPage() {
  return (
    <CollectionPage
      endpoint="thematiques"
      title="Thématiques"
      addLabel="Nouvelle thématique"
      editLabel="Modifier la thématique"
      detailTitle="Détails de la thématique"
      FormComponent={ThematiqueForm}
      columns={[
        { key: 'nom', label: 'Nom' },
        { key: 'published', label: 'Publié' },
      ]}
      detailFields={[
        { key: 'nom', label: 'Nom' },
        { key: 'slug', label: 'Slug' },
        { key: 'description', label: 'Description' },
        { key: 'published', label: 'Publié', type: 'boolean' },
      ]}
    />
  );
}

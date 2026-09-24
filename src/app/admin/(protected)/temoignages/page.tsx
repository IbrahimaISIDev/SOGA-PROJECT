'use client';

import CollectionPage from '@/components/admin/CollectionPage';
import TemoignageForm from '@/components/admin/forms/TemoignageForm';

export default function TemoignagesPage() {
  return (
    <CollectionPage
      endpoint="temoignages"
      title="Témoignages"
      addLabel="Nouveau témoignage"
      editLabel="Modifier le témoignage"
      detailTitle="Détails du témoignage"
      FormComponent={TemoignageForm}
      columns={[
        { key: 'nom', label: 'Nom' },
        { key: 'role', label: 'Rôle' },
        { key: 'published', label: 'Publié' },
      ]}
      detailFields={[
        { key: 'nom', label: 'Nom' },
        { key: 'slug', label: 'Slug' },
        { key: 'role', label: 'Rôle' },
        { key: 'contenu', label: 'Contenu' },
        { key: 'image', label: 'Image' },
        { key: 'published', label: 'Publié', type: 'boolean' },
      ]}
    />
  );
}

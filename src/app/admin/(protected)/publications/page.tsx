'use client';

import CollectionPage from '@/components/admin/CollectionPage';
import PublicationForm from '@/components/admin/forms/PublicationForm';

export default function PublicationsPage() {
  return (
    <CollectionPage
      endpoint="publications"
      title="Publications"
      addLabel="Nouvelle publication"
      editLabel="Modifier la publication"
      detailTitle="Détails de la publication"
      FormComponent={PublicationForm}
      columns={[
        { key: 'titre', label: 'Titre' },
        { key: 'date', label: 'Date' },
        { key: 'published', label: 'Publié' },
      ]}
      detailFields={[
        { key: 'titre', label: 'Titre' },
        { key: 'slug', label: 'Slug' },
        { key: 'type', label: 'Type' },
        { key: 'date', label: 'Date', type: 'date' },
        { key: 'thematique', label: 'Thématique' },
        { key: 'description', label: 'Description' },
        { key: 'image', label: 'Image' },
        { key: 'fichier', label: 'Fichier' },
        { key: 'telechargeable', label: 'Téléchargeable', type: 'boolean' },
        { key: 'published', label: 'Publié', type: 'boolean' },
      ]}
    />
  );
}

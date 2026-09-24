'use client';

import CollectionPage from '@/components/admin/CollectionPage';
import EvenementForm from '@/components/admin/forms/EvenementForm';

export default function EvenementsPage() {
  return (
    <CollectionPage
      endpoint="evenements"
      title="Événements"
      addLabel="Nouvel événement"
      editLabel="Modifier l'événement"
      detailTitle="Détails de l'événement"
      FormComponent={EvenementForm}
      columns={[
        { key: 'titre', label: 'Titre' },
        { key: 'date', label: 'Date' },
        { key: 'published', label: 'Publié' },
      ]}
      detailFields={[
        { key: 'titre', label: 'Titre' },
        { key: 'slug', label: 'Slug' },
        { key: 'date', label: 'Date', type: 'date' },
        { key: 'lieu', label: 'Lieu' },
        { key: 'description', label: 'Description' },
        { key: 'image', label: 'Image' },
        { key: 'published', label: 'Publié', type: 'boolean' },
      ]}
    />
  );
}

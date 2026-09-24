'use client';

import CollectionPage from '@/components/admin/CollectionPage';
import FormationForm from '@/components/admin/forms/FormationForm';

export default function FormationsPage() {
  return (
    <CollectionPage
      endpoint="formations"
      title="Formations"
      addLabel="Nouvelle formation"
      editLabel="Modifier la formation"
      detailTitle="Détails de la formation"
      FormComponent={FormationForm}
      columns={[
        { key: 'titre', label: 'Titre' },
        { key: 'codeFiliere', label: 'Code Filière' },
        { key: 'niveau', label: 'Niveau' },
        { key: 'published', label: 'Publié' },
      ]}
      detailFields={[
        { key: 'titre', label: 'Titre' },
        { key: 'slug', label: 'Slug' },
        { key: 'codeFiliere', label: 'Code Filière' },
        { key: 'pole', label: 'Pôle' },
        { key: 'niveau', label: 'Niveau' },
        { key: 'rythme', label: 'Rythme' },
        { key: 'duree', label: 'Durée' },
        { key: 'description', label: 'Description' },
        { key: 'image', label: 'Image' },
        { key: 'published', label: 'Publié', type: 'boolean' },
      ]}
    />
  );
}

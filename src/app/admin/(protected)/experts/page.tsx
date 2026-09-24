'use client';

import CollectionPage from '@/components/admin/CollectionPage';
import ExpertForm from '@/components/admin/forms/ExpertForm';

export default function ExpertsPage() {
  return (
    <CollectionPage
      endpoint="experts"
      title="Experts"
      addLabel="Nouvel expert"
      editLabel="Modifier l'expert"
      detailTitle="Détails de l'expert"
      FormComponent={ExpertForm}
      columns={[
        { key: 'nom', label: 'Nom' },
        { key: 'prenom', label: 'Prénom' },
        { key: 'published', label: 'Publié' },
      ]}
      detailFields={[
        { key: 'nom', label: 'Nom' },
        { key: 'prenom', label: 'Prénom' },
        { key: 'slug', label: 'Slug' },
        { key: 'titre', label: 'Titre' },
        { key: 'institution', label: 'Institution' },
        { key: 'specialite', label: 'Spécialité' },
        { key: 'bio', label: 'Biographie' },
        { key: 'image', label: 'Image' },
        { key: 'published', label: 'Publié', type: 'boolean' },
      ]}
    />
  );
}

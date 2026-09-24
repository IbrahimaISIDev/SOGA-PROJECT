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
        { key: 'rentree', label: 'Rentrée' },
        { key: 'placesLimitees', label: 'Places limitées', type: 'boolean' },
        { key: 'capacite', label: 'Capacité' },
        { key: 'description', label: 'Description' },
        { key: 'objectifs', label: 'Objectifs' },
        { key: 'conditionsAdmission', label: "Conditions d'admission" },
        { key: 'publicConcerne', label: 'Public concerné' },
        { key: 'image', label: 'Image' },
        { key: 'brochureUrl', label: 'Brochure' },
        { key: 'published', label: 'Publié', type: 'boolean' },
      ]}
    />
  );
}

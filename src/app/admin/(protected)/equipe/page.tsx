'use client';

import CollectionPage from '@/components/admin/CollectionPage';
import EquipeForm from '@/components/admin/forms/EquipeForm';

export default function EquipePage() {
  return (
    <CollectionPage
      endpoint="equipe"
      title="Équipe"
      addLabel="Nouveau membre"
      editLabel="Modifier le membre"
      detailTitle="Détails du membre"
      FormComponent={EquipeForm}
      columns={[
        { key: 'nom', label: 'Nom' },
        { key: 'prenom', label: 'Prénom' },
        { key: 'published', label: 'Publié' },
      ]}
      detailFields={[
        { key: 'nom', label: 'Nom' },
        { key: 'prenom', label: 'Prénom' },
        { key: 'slug', label: 'Slug' },
        { key: 'role', label: 'Rôle' },
        { key: 'bio', label: 'Biographie' },
        { key: 'email', label: 'Email' },
        { key: 'image', label: 'Image' },
        { key: 'linkedin', label: 'LinkedIn' },
        { key: 'published', label: 'Publié', type: 'boolean' },
      ]}
    />
  );
}

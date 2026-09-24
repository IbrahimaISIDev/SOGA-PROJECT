'use client';

import CollectionPage from '@/components/admin/CollectionPage';
import PartenaireForm from '@/components/admin/forms/PartenaireForm';

export default function PartenairesPage() {
  return (
    <CollectionPage
      endpoint="partenaires"
      title="Partenaires"
      addLabel="Nouveau partenaire"
      editLabel="Modifier le partenaire"
      detailTitle="Détails du partenaire"
      FormComponent={PartenaireForm}
      columns={[
        { key: 'nom', label: 'Nom' },
        { key: 'published', label: 'Publié' },
      ]}
      detailFields={[
        { key: 'nom', label: 'Nom' },
        { key: 'slug', label: 'Slug' },
        { key: 'logo', label: 'Logo' },
        { key: 'description', label: 'Description' },
        { key: 'published', label: 'Publié', type: 'boolean' },
      ]}
    />
  );
}

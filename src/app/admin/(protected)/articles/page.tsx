'use client';

import CollectionPage from '@/components/admin/CollectionPage';
import ArticleForm from '@/components/admin/forms/ArticleForm';

export default function ArticlesPage() {
  return (
    <CollectionPage
      endpoint="articles"
      title="Articles"
      addLabel="Nouvel article"
      editLabel="Modifier l'article"
      detailTitle="Détails de l'article"
      FormComponent={ArticleForm}
      columns={[
        { key: 'titre', label: 'Titre' },
        { key: 'categorie', label: 'Catégorie' },
        { key: 'date', label: 'Date' },
        { key: 'published', label: 'Publié' },
      ]}
      detailFields={[
        { key: 'titre', label: 'Titre' },
        { key: 'slug', label: 'Slug' },
        { key: 'categorie', label: 'Catégorie' },
        { key: 'resume', label: 'Résumé' },
        { key: 'contenu', label: 'Contenu' },
        { key: 'image', label: 'Image' },
        { key: 'date', label: 'Date', type: 'date' },
        { key: 'published', label: 'Publié', type: 'boolean' },
      ]}
    />
  );
}

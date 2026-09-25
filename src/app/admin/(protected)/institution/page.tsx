'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/admin/api';
import { useState, useEffect } from 'react';
import {
  Building2, MapPin, Share2, Link2, AtSign, Save, Sparkles,
  Target, GraduationCap, Network, Landmark, Camera, PlaySquare,
} from 'lucide-react';

const EMPTY_FORM = {
  nom: '',
  sigle: '',
  tagline: '',
  presentation: '',
  historique: '',
  adresse: '',
  email: '',
  telephone: '',
  horaires: '',
  facebook: '',
  linkedin: '',
  instagram: '',
  youtube: '',
  twitter: '',
  campuses: '[]',
  mission: '',
  vision: '',
  valeurs: '[]',
  chiffres: '[]',
  fondatriceNom: '',
  fondatriceTitre: '',
  fondatriceQualifications: '',
  fondatriceCitation: '',
  fondatriceBiographie: '',
  fondatricePortrait: '',
  organigramme: '[]',
  campusDescription: '',
  campusInfrastructures: '[]',
  campusPhotos: '',
};

function toTextarea(value: unknown): string {
  if (value === undefined || value === null) return '[]';
  return JSON.stringify(value, null, 2);
}

export default function InstitutionPage() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [jsonErrors, setJsonErrors] = useState<Record<string, string>>({});

  const { data, isLoading } = useQuery({
    queryKey: ['institution'],
    queryFn: () => api.get('/institution').then((res) => res.data),
  });

  useEffect(() => {
    const d = data?.data;
    if (!d) return;
    setFormData({
      nom: d.nom || '',
      sigle: d.sigle || '',
      tagline: d.tagline || '',
      presentation: d.presentation || '',
      historique: d.historique || '',
      adresse: d.adresse || '',
      email: d.email || '',
      telephone: d.telephone || '',
      horaires: d.horaires || '',
      facebook: d.facebook || '',
      linkedin: d.linkedin || '',
      instagram: d.instagram || '',
      youtube: d.youtube || '',
      twitter: d.twitter || '',
      campuses: toTextarea(d.campuses ?? []),
      mission: d.mission || '',
      vision: d.vision || '',
      valeurs: toTextarea(d.valeurs ?? []),
      chiffres: toTextarea(d.chiffres ?? []),
      fondatriceNom: d.fondatrice?.nom || '',
      fondatriceTitre: d.fondatrice?.titre || '',
      fondatriceQualifications: d.fondatrice?.qualifications || '',
      fondatriceCitation: d.fondatrice?.citation || '',
      fondatriceBiographie: (d.fondatrice?.biographie || []).join('\n'),
      fondatricePortrait: d.fondatrice?.portrait || '',
      organigramme: toTextarea(d.organigramme ?? []),
      campusDescription: d.campusInfo?.description || '',
      campusInfrastructures: toTextarea(d.campusInfo?.infrastructures ?? []),
      campusPhotos: (d.campusInfo?.photos || []).join('\n'),
    });
  }, [data]);

  const mutation = useMutation({
    mutationFn: (data: any) => api.put('/institution', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['institution'] });
      alert('Institution mise à jour avec succès');
    },
    onError: (err: any) => {
      alert(err.response?.data?.error || 'Erreur lors de la sauvegarde');
    },
  });

  const parseJsonField = (key: string, raw: string, errors: Record<string, string>) => {
    try {
      return JSON.parse(raw || '[]');
    } catch {
      errors[key] = 'JSON invalide';
      return undefined;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: Record<string, string> = {};
    const campuses = parseJsonField('campuses', formData.campuses, errors);
    const valeurs = parseJsonField('valeurs', formData.valeurs, errors);
    const chiffres = parseJsonField('chiffres', formData.chiffres, errors);
    const organigramme = parseJsonField('organigramme', formData.organigramme, errors);
    const campusInfrastructures = parseJsonField('campusInfrastructures', formData.campusInfrastructures, errors);

    setJsonErrors(errors);
    if (Object.keys(errors).length > 0) return;

    mutation.mutate({
      nom: formData.nom,
      sigle: formData.sigle,
      tagline: formData.tagline,
      presentation: formData.presentation,
      historique: formData.historique,
      adresse: formData.adresse,
      email: formData.email,
      telephone: formData.telephone,
      horaires: formData.horaires,
      facebook: formData.facebook,
      linkedin: formData.linkedin,
      instagram: formData.instagram,
      youtube: formData.youtube,
      twitter: formData.twitter,
      campuses,
      mission: formData.mission,
      vision: formData.vision,
      valeurs,
      chiffres,
      fondatrice: {
        nom: formData.fondatriceNom,
        titre: formData.fondatriceTitre,
        qualifications: formData.fondatriceQualifications,
        citation: formData.fondatriceCitation,
        biographie: formData.fondatriceBiographie.split('\n').map((s) => s.trim()).filter(Boolean),
        portrait: formData.fondatricePortrait || null,
      },
      organigramme,
      campusInfo: {
        description: formData.campusDescription,
        infrastructures: campusInfrastructures,
        photos: formData.campusPhotos.split('\n').map((s) => s.trim()).filter(Boolean),
      },
    });
  };

  const set = (key: keyof typeof EMPTY_FORM) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [key]: e.target.value });

  const inputClass = "w-full px-4 py-3 border-2 border-admin-muted/30 rounded-lg focus:outline-none focus:border-soga-gold focus:ring-2 focus:ring-soga-gold/20 transition-all duration-200 bg-white text-soga-black placeholder:text-admin-muted/50";
  const jsonClass = `${inputClass} font-mono text-[13px] resize-y`;
  const labelClass = "block text-sm font-semibold text-soga-black mb-2";

  if (isLoading) return <div className="text-soga-sand animate-pulse">Chargement...</div>;

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-soga-sand mb-2">Institution</h1>
        <p className="text-admin-muted">Gérer les informations de l&apos;institution SOGA</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Informations générales */}
            <div className="admin-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-soga-gold/10 rounded-lg flex items-center justify-center">
                  <Building2 size={20} className="text-soga-gold" />
                </div>
                <h2 className="text-xl font-semibold text-soga-sand">Informations générales</h2>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className={labelClass}>Nom *</label>
                    <input type="text" value={formData.nom} onChange={set('nom')} className={inputClass} required placeholder="Senegal Oil and Gas Academy" />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Sigle</label>
                    <input type="text" value={formData.sigle} onChange={set('sigle')} className={inputClass} placeholder="SOGA" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Tagline</label>
                  <input type="text" value={formData.tagline} onChange={set('tagline')} className={inputClass} placeholder="L'Académie de Toutes les Énergies" />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Présentation</label>
                  <textarea value={formData.presentation} onChange={set('presentation')} className={`${inputClass} resize-none`} rows={5} placeholder="Présentation complète de l'institution..." />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Historique</label>
                  <textarea value={formData.historique} onChange={set('historique')} className={`${inputClass} resize-none`} rows={4} placeholder="Historique de la création..." />
                </div>
              </div>
            </div>

            {/* Coordonnées */}
            <div className="admin-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-soga-gold/10 rounded-lg flex items-center justify-center">
                  <MapPin size={20} className="text-soga-gold" />
                </div>
                <h2 className="text-xl font-semibold text-soga-sand">Coordonnées</h2>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className={labelClass}>Adresse</label>
                  <input type="text" value={formData.adresse} onChange={set('adresse')} className={inputClass} placeholder="Adresse complète" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className={labelClass}>Email</label>
                    <input type="email" value={formData.email} onChange={set('email')} className={inputClass} placeholder="contact@sogasenegal.com" />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Téléphone</label>
                    <input type="text" value={formData.telephone} onChange={set('telephone')} className={inputClass} placeholder="+221 77 263 16 63" />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Horaires</label>
                    <input type="text" value={formData.horaires} onChange={set('horaires')} className={inputClass} placeholder="Du lundi au vendredi, de 8h à 18h" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>
                    Campus (JSON — tableau de {'{'}ville, adresse{'}'})
                  </label>
                  <textarea
                    value={formData.campuses}
                    onChange={set('campuses')}
                    className={jsonClass}
                    rows={6}
                    placeholder={'[\n  { "ville": "Dakar", "adresse": "Almadies, Dakar, Sénégal" }\n]'}
                  />
                  {jsonErrors.campuses && <p className="text-red-500 text-xs">{jsonErrors.campuses}</p>}
                </div>
              </div>
            </div>

            {/* Mission, vision, valeurs */}
            <div className="admin-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-soga-gold/10 rounded-lg flex items-center justify-center">
                  <Target size={20} className="text-soga-gold" />
                </div>
                <h2 className="text-xl font-semibold text-soga-sand">Mission, vision & valeurs</h2>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className={labelClass}>Mission</label>
                    <textarea value={formData.mission} onChange={set('mission')} className={`${inputClass} resize-none`} rows={4} />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Vision</label>
                    <textarea value={formData.vision} onChange={set('vision')} className={`${inputClass} resize-none`} rows={4} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>
                    Valeurs (JSON — tableau de {'{'}titre, sousTitre, description{'}'})
                  </label>
                  <textarea
                    value={formData.valeurs}
                    onChange={set('valeurs')}
                    className={jsonClass}
                    rows={8}
                    placeholder={'[\n  { "titre": "Excellence", "sousTitre": "Rigueur académique", "description": "..." }\n]'}
                  />
                  {jsonErrors.valeurs && <p className="text-red-500 text-xs">{jsonErrors.valeurs}</p>}
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>
                    Chiffres clés (JSON — tableau de {'{'}valeur, libelle{'}'})
                  </label>
                  <textarea
                    value={formData.chiffres}
                    onChange={set('chiffres')}
                    className={jsonClass}
                    rows={6}
                    placeholder={'[\n  { "valeur": "14", "libelle": "Filières de formation" }\n]'}
                  />
                  {jsonErrors.chiffres && <p className="text-red-500 text-xs">{jsonErrors.chiffres}</p>}
                </div>
              </div>
            </div>

            {/* Fondatrice */}
            <div className="admin-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-soga-gold/10 rounded-lg flex items-center justify-center">
                  <GraduationCap size={20} className="text-soga-gold" />
                </div>
                <h2 className="text-xl font-semibold text-soga-sand">Fondatrice</h2>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className={labelClass}>Nom</label>
                    <input type="text" value={formData.fondatriceNom} onChange={set('fondatriceNom')} className={inputClass} placeholder="Dr. Aïssatou Niasse" />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Titre</label>
                    <input type="text" value={formData.fondatriceTitre} onChange={set('fondatriceTitre')} className={inputClass} placeholder="Fondatrice & Directrice Générale" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Qualifications</label>
                  <input type="text" value={formData.fondatriceQualifications} onChange={set('fondatriceQualifications')} className={inputClass} placeholder="Docteure en Énergie" />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Citation</label>
                  <textarea value={formData.fondatriceCitation} onChange={set('fondatriceCitation')} className={`${inputClass} resize-none`} rows={2} />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Biographie (un paragraphe par ligne)</label>
                  <textarea value={formData.fondatriceBiographie} onChange={set('fondatriceBiographie')} className={`${inputClass} resize-none`} rows={6} />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Portrait (URL image)</label>
                  <input type="text" value={formData.fondatricePortrait} onChange={set('fondatricePortrait')} className={inputClass} placeholder="/media/fondatrice.jpg" />
                </div>
              </div>
            </div>

            {/* Organigramme */}
            <div className="admin-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-soga-gold/10 rounded-lg flex items-center justify-center">
                  <Network size={20} className="text-soga-gold" />
                </div>
                <h2 className="text-xl font-semibold text-soga-sand">Organigramme</h2>
              </div>
              <div className="space-y-2">
                <label className={labelClass}>
                  JSON — tableau de {'{'}label, niveau (0 = sommet), accent (bool){'}'}
                </label>
                <textarea
                  value={formData.organigramme}
                  onChange={set('organigramme')}
                  className={jsonClass}
                  rows={8}
                  placeholder={'[\n  { "label": "Fondatrice & Direction Générale", "niveau": 0, "accent": true },\n  { "label": "Direction Pédagogique", "niveau": 1, "accent": false }\n]'}
                />
                {jsonErrors.organigramme && <p className="text-red-500 text-xs">{jsonErrors.organigramme}</p>}
              </div>
            </div>

            {/* Campus (infrastructures) */}
            <div className="admin-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-soga-gold/10 rounded-lg flex items-center justify-center">
                  <Landmark size={20} className="text-soga-gold" />
                </div>
                <h2 className="text-xl font-semibold text-soga-sand">Page Campus</h2>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className={labelClass}>Description des campus</label>
                  <textarea value={formData.campusDescription} onChange={set('campusDescription')} className={`${inputClass} resize-none`} rows={3} />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>
                    Infrastructures (JSON — tableau de {'{'}titre, detail, enPlanification (bool), photo{'}'})
                  </label>
                  <textarea
                    value={formData.campusInfrastructures}
                    onChange={set('campusInfrastructures')}
                    className={jsonClass}
                    rows={8}
                    placeholder={'[\n  { "titre": "Laboratoires techniques", "detail": "Électrotechnique · Instrumentation", "enPlanification": false, "photo": null }\n]'}
                  />
                  {jsonErrors.campusInfrastructures && <p className="text-red-500 text-xs">{jsonErrors.campusInfrastructures}</p>}
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Photos (une URL par ligne)</label>
                  <textarea value={formData.campusPhotos} onChange={set('campusPhotos')} className={`${inputClass} resize-none`} rows={3} />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Réseaux sociaux */}
            <div className="admin-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-soga-gold/10 rounded-lg flex items-center justify-center">
                  <Sparkles size={20} className="text-soga-gold" />
                </div>
                <h2 className="text-xl font-semibold text-soga-sand">Réseaux sociaux</h2>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className={`${labelClass} flex items-center gap-2`}>
                    <Share2 size={16} className="text-blue-600" />
                    Facebook
                  </label>
                  <input type="url" value={formData.facebook} onChange={set('facebook')} className={inputClass} placeholder="https://facebook.com/sogasenegal" />
                </div>
                <div className="space-y-2">
                  <label className={`${labelClass} flex items-center gap-2`}>
                    <Link2 size={16} className="text-blue-700" />
                    LinkedIn
                  </label>
                  <input type="url" value={formData.linkedin} onChange={set('linkedin')} className={inputClass} placeholder="https://linkedin.com/company/sogasenegal" />
                </div>
                <div className="space-y-2">
                  <label className={`${labelClass} flex items-center gap-2`}>
                    <Camera size={16} className="text-pink-600" />
                    Instagram
                  </label>
                  <input type="url" value={formData.instagram} onChange={set('instagram')} className={inputClass} placeholder="https://instagram.com/sogasenegal" />
                </div>
                <div className="space-y-2">
                  <label className={`${labelClass} flex items-center gap-2`}>
                    <PlaySquare size={16} className="text-red-600" />
                    YouTube
                  </label>
                  <input type="url" value={formData.youtube} onChange={set('youtube')} className={inputClass} placeholder="https://youtube.com/@sogasenegal" />
                </div>
                <div className="space-y-2">
                  <label className={`${labelClass} flex items-center gap-2`}>
                    <AtSign size={16} className="text-sky-500" />
                    Twitter / X
                  </label>
                  <input type="url" value={formData.twitter} onChange={set('twitter')} className={inputClass} placeholder="https://twitter.com/sogasenegal" />
                </div>
              </div>
            </div>

            <div className="admin-card p-6 sticky top-6">
              <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full px-6 py-4 text-white bg-soga-gold rounded-lg hover:bg-soga-gold-light hover:shadow-lg hover:shadow-soga-gold/30 transition-all duration-200 font-semibold disabled:bg-admin-muted disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Save size={20} />
                {mutation.isPending ? 'Sauvegarde...' : 'Sauvegarder'}
              </button>
              {Object.keys(jsonErrors).length > 0 && (
                <p className="text-red-500 text-xs mt-3">
                  Corrigez les champs JSON invalides avant de sauvegarder.
                </p>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

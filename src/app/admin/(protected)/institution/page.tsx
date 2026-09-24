'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/admin/api';
import { useState, useEffect } from 'react';
import { Building2, MapPin, Share2, Link2, AtSign, Save, Sparkles } from 'lucide-react';

export default function InstitutionPage() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    nom: '',
    slogan: '',
    description: '',
    adresse: '',
    email: '',
    telephone: '',
    facebook: '',
    linkedin: '',
    twitter: '',
  });

  const { data, isLoading } = useQuery({
    queryKey: ['institution'],
    queryFn: () => api.get('/institution').then((res) => res.data),
  });

  useEffect(() => {
    if (data?.data) {
      setFormData(data.data);
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: (data: any) => api.put('/institution', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['institution'] });
      alert('Institution mise à jour avec succès');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

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
            <div className="admin-card p-6 animate-slide-in" style={{ animationDelay: '0ms' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-soga-gold/10 rounded-lg flex items-center justify-center">
                  <Building2 size={20} className="text-soga-gold" />
                </div>
                <h2 className="text-xl font-semibold text-soga-sand">Informations générales</h2>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-soga-black mb-2">Nom *</label>
                  <input
                    type="text"
                    value={formData.nom}
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-admin-muted/30 rounded-lg focus:outline-none focus:border-soga-gold focus:ring-2 focus:ring-soga-gold/20 transition-all duration-200 bg-white text-soga-black placeholder:text-admin-muted/50"
                    required
                    placeholder="Nom de l'institution"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-soga-black mb-2">Slogan</label>
                  <input
                    type="text"
                    value={formData.slogan}
                    onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-admin-muted/30 rounded-lg focus:outline-none focus:border-soga-gold focus:ring-2 focus:ring-soga-gold/20 transition-all duration-200 bg-white text-soga-black placeholder:text-admin-muted/50"
                    placeholder="Slogan de l'institution"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-soga-black mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-admin-muted/30 rounded-lg focus:outline-none focus:border-soga-gold focus:ring-2 focus:ring-soga-gold/20 transition-all duration-200 bg-white text-soga-black placeholder:text-admin-muted/50 resize-none"
                    rows={4}
                    placeholder="Description de l'institution..."
                  />
                </div>
              </div>
            </div>

            <div className="admin-card p-6 animate-slide-in" style={{ animationDelay: '100ms' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-soga-gold/10 rounded-lg flex items-center justify-center">
                  <MapPin size={20} className="text-soga-gold" />
                </div>
                <h2 className="text-xl font-semibold text-soga-sand">Coordonnées</h2>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-soga-black mb-2">Adresse</label>
                  <input
                    type="text"
                    value={formData.adresse}
                    onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-admin-muted/30 rounded-lg focus:outline-none focus:border-soga-gold focus:ring-2 focus:ring-soga-gold/20 transition-all duration-200 bg-white text-soga-black placeholder:text-admin-muted/50"
                    placeholder="Adresse complète"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-soga-black mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-admin-muted/30 rounded-lg focus:outline-none focus:border-soga-gold focus:ring-2 focus:ring-soga-gold/20 transition-all duration-200 bg-white text-soga-black placeholder:text-admin-muted/50"
                      placeholder="contact@sogasenegal.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-soga-black mb-2">Téléphone</label>
                    <input
                      type="text"
                      value={formData.telephone}
                      onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-admin-muted/30 rounded-lg focus:outline-none focus:border-soga-gold focus:ring-2 focus:ring-soga-gold/20 transition-all duration-200 bg-white text-soga-black placeholder:text-admin-muted/50"
                      placeholder="+221 33 000 00 00"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="admin-card p-6 animate-slide-in" style={{ animationDelay: '200ms' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-soga-gold/10 rounded-lg flex items-center justify-center">
                  <Sparkles size={20} className="text-soga-gold" />
                </div>
                <h2 className="text-xl font-semibold text-soga-sand">Réseaux sociaux</h2>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-soga-black mb-2 flex items-center gap-2">
                    <Share2 size={16} className="text-blue-600" />
                    Facebook
                  </label>
                  <input
                    type="url"
                    value={formData.facebook}
                    onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-admin-muted/30 rounded-lg focus:outline-none focus:border-soga-gold focus:ring-2 focus:ring-soga-gold/20 transition-all duration-200 bg-white text-soga-black placeholder:text-admin-muted/50"
                    placeholder="https://facebook.com/sogasenegal"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-soga-black mb-2 flex items-center gap-2">
                    <Link2 size={16} className="text-blue-700" />
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-admin-muted/30 rounded-lg focus:outline-none focus:border-soga-gold focus:ring-2 focus:ring-soga-gold/20 transition-all duration-200 bg-white text-soga-black placeholder:text-admin-muted/50"
                    placeholder="https://linkedin.com/company/sogasenegal"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-soga-black mb-2 flex items-center gap-2">
                    <AtSign size={16} className="text-sky-500" />
                    Twitter
                  </label>
                  <input
                    type="url"
                    value={formData.twitter}
                    onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-admin-muted/30 rounded-lg focus:outline-none focus:border-soga-gold focus:ring-2 focus:ring-soga-gold/20 transition-all duration-200 bg-white text-soga-black placeholder:text-admin-muted/50"
                    placeholder="https://twitter.com/sogasenegal"
                  />
                </div>
              </div>
            </div>

            <div className="admin-card p-6 animate-slide-in" style={{ animationDelay: '300ms' }}>
              <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full px-6 py-4 text-white bg-soga-gold rounded-lg hover:bg-soga-gold-light hover:shadow-lg hover:shadow-soga-gold/30 transition-all duration-200 font-semibold disabled:bg-admin-muted disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Save size={20} />
                {mutation.isPending ? 'Sauvegarde...' : 'Sauvegarder'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

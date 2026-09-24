'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, GraduationCap, Eye, EyeOff } from 'lucide-react';
import api from '@/lib/admin/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      router.push('/admin');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Échec de la connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-soga-black relative overflow-hidden">
      <div
        className="fixed left-0 top-0 bottom-0 w-1 z-10"
        style={{
          background: 'repeating-linear-gradient(180deg, #3d4148 0, #3d4148 40px, #C9962C 40px, #C9962C 60px, #3d4148 60px, #3d4148 120px)',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-soga-black via-admin-graphite/20 to-soga-black" />

      <div className="absolute top-20 right-20 w-64 h-64 bg-soga-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-soga-gold/5 rounded-full blur-3xl" />

      <div className="relative z-20 w-full max-w-md p-8 animate-fade-in">
        <div className="admin-card p-8">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-soga-gold/10 rounded-2xl flex items-center justify-center">
              <GraduationCap size={32} className="text-soga-gold" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center text-soga-gold mb-2">SOGA Admin</h1>
          <p className="text-admin-muted text-center mb-8">
            Connectez-vous pour accéder au panneau d&apos;administration
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-6 animate-scale-in">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-soga-sand text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-admin-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="admin-input-field pl-10"
                  placeholder="admin@sogasenegal.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-soga-sand text-sm font-medium mb-2">Mot de passe</label>
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-admin-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="admin-input-field pl-10 pr-10"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-admin-muted hover:text-soga-gold transition-colors"
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="admin-btn-primary w-full flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-soga-black border-t-transparent rounded-full animate-spin" />
                  Connexion...
                </>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-admin-muted/20 text-center">
            <p className="text-admin-muted text-sm">© 2026 SOGA Senegal - Système de Gestion Académique</p>
          </div>
        </div>
      </div>
    </div>
  );
}

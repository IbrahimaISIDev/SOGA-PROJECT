'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  BookOpen, Newspaper, Calendar, Users, TrendingUp, Activity,
  GraduationCap, Building2, ArrowRight,
} from 'lucide-react';
import api from '@/lib/admin/api';

export default function DashboardPage() {
  const router = useRouter();
  const { data: stats } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const [formations, articles, evenements, equipe] = await Promise.all([
        api.get('/formations'),
        api.get('/articles'),
        api.get('/evenements'),
        api.get('/equipe'),
      ]);
      return {
        formations: formations.data.meta?.total || 0,
        articles: articles.data.meta?.total || 0,
        evenements: evenements.data.meta?.total || 0,
        equipe: equipe.data.meta?.total || 0,
      };
    },
  });

  const statCards = [
    {
      key: 'formations',
      label: 'Formations',
      value: stats?.formations || 0,
      icon: BookOpen,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
    },
    {
      key: 'articles',
      label: 'Articles',
      value: stats?.articles || 0,
      icon: Newspaper,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
    },
    {
      key: 'evenements',
      label: 'Événements',
      value: stats?.evenements || 0,
      icon: Calendar,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
    },
    {
      key: 'equipe',
      label: 'Équipe',
      value: stats?.equipe || 0,
      icon: Users,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
    },
  ];

  const quickActions = [
    { label: 'Nouvelle formation', path: '/admin/formations', icon: BookOpen },
    { label: 'Nouvel article', path: '/admin/articles', icon: Newspaper },
    { label: 'Nouvel événement', path: '/admin/evenements', icon: Calendar },
    { label: 'Nouveau membre', path: '/admin/equipe', icon: Users },
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-soga-sand mb-2">Dashboard</h1>
        <p className="text-admin-muted">Vue d&apos;ensemble du système de gestion SOGA</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={card.key}
              className={`admin-card p-6 border ${card.borderColor} animate-slide-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-12 h-12 ${card.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                <Icon size={24} className={card.color} />
              </div>
              <h3 className="text-admin-muted text-sm font-medium mb-1">{card.label}</h3>
              <p className="text-3xl font-bold text-soga-sand">{card.value}</p>
            </div>
          );
        })}
      </div>

      <div className="admin-card p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp size={24} className="text-soga-gold" />
          <h2 className="text-xl font-semibold text-soga-sand">Actions rapides</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                onClick={() => router.push(action.path)}
                className="flex items-center gap-3 p-4 rounded-lg border border-admin-muted/20
                         hover:border-soga-gold/50 hover:bg-soga-gold/5 transition-all duration-200
                         animate-slide-in cursor-pointer"
                style={{ animationDelay: `${(index + 4) * 100}ms` }}
              >
                <Icon size={20} className="text-soga-gold" />
                <span className="text-soga-sand font-medium">{action.label}</span>
                <ArrowRight size={16} className="text-admin-muted ml-auto" />
              </button>
            );
          })}
        </div>
      </div>

      <div className="admin-card p-8 animate-scale-in" style={{ animationDelay: '600ms' }}>
        <div className="flex items-start gap-6">
          <div className="w-16 h-16 bg-soga-gold/10 rounded-2xl flex items-center justify-center flex-shrink-0">
            <GraduationCap size={32} className="text-soga-gold" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-soga-gold mb-2">Bienvenue sur SOGA Admin</h2>
            <p className="text-admin-muted mb-4">Système de Gestion Académique - Panneau d&apos;administration</p>
            <div className="flex items-center gap-6 text-sm text-admin-muted">
              <div className="flex items-center gap-2">
                <Activity size={16} />
                <span>Système opérationnel</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 size={16} />
                <span>SOGA Senegal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

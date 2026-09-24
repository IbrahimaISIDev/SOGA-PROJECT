import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Menu, X, LayoutDashboard, BookOpen, Newspaper, Calendar, 
         HeartHandshake, MessageSquare, Users, GraduationCap, FileText, Tag, Building2 } from 'lucide-react';
import { useState } from 'react';

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/formations', label: 'Formations', icon: BookOpen },
    { path: '/articles', label: 'Articles', icon: Newspaper },
    { path: '/evenements', label: 'Événements', icon: Calendar },
    { path: '/partenaires', label: 'Partenaires', icon: HeartHandshake },
    { path: '/temoignages', label: 'Témoignages', icon: MessageSquare },
    { path: '/equipe', label: 'Équipe', icon: Users },
    { path: '/experts', label: 'Experts', icon: GraduationCap },
    { path: '/publications', label: 'Publications', icon: FileText },
    { path: '/thematiques', label: 'Thématiques', icon: Tag },
    { path: '/institution', label: 'Institution', icon: Building2 },
  ];

  return (
    <div className="min-h-screen bg-soga-dark">
      {/* Stratigraphic bar pattern */}
      <div
        className="fixed left-0 top-0 bottom-0 w-1 z-50"
        style={{
          background: 'repeating-linear-gradient(180deg, #3d4148 0, #3d4148 40px, #C9962C 40px, #C9962C 60px, #3d4148 60px, #3d4148 120px)'
        }}
      />

      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-soga-dark/95 backdrop-blur-sm border-b border-soga-muted/20 z-50 p-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-soga-gold/10 text-soga-gold transition-colors"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-soga-dark/95 backdrop-blur-sm border-r border-soga-muted/20 w-72 transform transition-transform duration-300 ease-in-out z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="p-8 border-b border-soga-muted/20">
          <h1 className="text-2xl font-bold text-soga-gold tracking-tight">SOGA Admin</h1>
          <p className="text-soga-muted text-sm mt-2">{user.email}</p>
        </div>

        <nav className="mt-6 px-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`sidebar-link ${isActive ? 'sidebar-link-active' : 'text-soga-muted'}`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-soga-muted/20">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-soga-muted hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 w-full"
          >
            <LogOut size={20} />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:ml-72 pt-16 lg:pt-0">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

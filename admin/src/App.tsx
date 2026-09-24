import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import Formations from './pages/Formations';
import Articles from './pages/Articles';
import Evenements from './pages/Evenements';
import Partenaires from './pages/Partenaires';
import Temoignages from './pages/Temoignages';
import Equipe from './pages/Equipe';
import Experts from './pages/Experts';
import Publications from './pages/Publications';
import Thematiques from './pages/Thematiques';
import Institution from './pages/Institution';

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="formations" element={<Formations />} />
            <Route path="articles" element={<Articles />} />
            <Route path="evenements" element={<Evenements />} />
            <Route path="partenaires" element={<Partenaires />} />
            <Route path="temoignages" element={<Temoignages />} />
            <Route path="equipe" element={<Equipe />} />
            <Route path="experts" element={<Experts />} />
            <Route path="publications" element={<Publications />} />
            <Route path="thematiques" element={<Thematiques />} />
            <Route path="institution" element={<Institution />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

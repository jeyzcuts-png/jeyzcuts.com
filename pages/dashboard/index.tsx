import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import {
  Calendar, Scissors, Package, Image, Star, LogOut, Menu, X,
  LayoutDashboard, ChevronRight, Users,
} from 'lucide-react';
import { useSession, signOut } from '@/lib/auth/auth-client';
import DashboardAppointments from './DashboardAppointments';
import DashboardServices from './DashboardServices';
import DashboardProducts from './DashboardProducts';
import DashboardGallery from './DashboardGallery';
import DashboardReviews from './DashboardReviews';

type Tab = 'overview' | 'appointments' | 'services' | 'products' | 'gallery' | 'reviews';

export default function DashboardPage() {
  const { user, isPending } = useSession();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0a0a' }}>
        <div className="w-8 h-8 border-2 border-white/10 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  const role = (user as { role?: string }).role;
  const isAdmin = role === 'admin';
  const isBarber = role === 'barber';

  const navItems: { id: Tab; label: string; icon: React.ReactNode; adminOnly?: boolean }[] = [
    { id: 'overview', label: 'Resumen', icon: <LayoutDashboard size={18} /> },
    { id: 'appointments', label: 'Citas', icon: <Calendar size={18} /> },
    ...(isAdmin || isBarber
      ? [
          { id: 'services' as Tab, label: 'Servicios', icon: <Scissors size={18} />, adminOnly: true },
          { id: 'products' as Tab, label: 'Productos', icon: <Package size={18} />, adminOnly: true },
          { id: 'gallery' as Tab, label: 'Galería', icon: <Image size={18} />, adminOnly: true },
          { id: 'reviews' as Tab, label: 'Reseñas', icon: <Star size={18} />, adminOnly: true },
        ]
      : []),
  ];

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b" style={{ borderColor: 'rgba(255,46,166,0.15)' }}>
        <img src="/assets/25931078-B6D2-4B15-9DBA-F65176330026.png" alt="JeyzCuts" className="h-10 w-auto object-contain" />
      </div>

      {/* User info */}
      <div className="p-4 mx-3 mt-4 rounded-sm" style={{ background: 'rgba(255,46,166,0.08)', border: '1px solid rgba(255,46,166,0.2)' }}>
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white"
            style={{ background: '#ff2ea6' }}
          >
            {user.name?.[0]?.toUpperCase() ?? user.email[0].toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-white truncate">{user.name ?? 'Usuario'}</p>
            <p className="text-xs capitalize" style={{ color: '#ff2ea6' }}>
              {role === 'admin' ? 'Administrador' : role === 'barber' ? 'Barbero' : 'Cliente'}
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 mt-4 flex flex-col gap-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
            className="flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium tracking-wide transition-all duration-200 text-left w-full"
            style={
              activeTab === item.id
                ? { background: 'rgba(255,46,166,0.15)', color: '#ff2ea6', borderLeft: '2px solid #ff2ea6' }
                : { color: 'rgba(255,255,255,0.5)', borderLeft: '2px solid transparent' }
            }
          >
            {item.icon}
            {item.label}
            {activeTab === item.id && <ChevronRight size={14} className="ml-auto" />}
          </button>
        ))}
      </nav>

      {/* Sign out */}
      <div className="p-3 border-t" style={{ borderColor: 'rgba(255,46,166,0.1)' }}>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium w-full transition-colors text-white/40 hover:text-white/70"
        >
          <LogOut size={18} />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Dashboard — JeyzCuts</title>
      </Helmet>

      <div className="flex h-screen overflow-hidden" style={{ background: '#0a0a0a' }}>
        {/* Desktop sidebar */}
        <aside
          className="hidden md:flex flex-col w-64 flex-shrink-0 border-r"
          style={{ background: '#080808', borderColor: 'rgba(255,46,166,0.15)' }}
        >
          <Sidebar />
        </aside>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-black/70" onClick={() => setSidebarOpen(false)} />
            <aside
              className="relative z-10 w-72 flex flex-col border-r"
              style={{ background: '#080808', borderColor: 'rgba(255,46,166,0.2)' }}
            >
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white"
              >
                <X size={20} />
              </button>
              <Sidebar />
            </aside>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Top bar */}
          <div
            className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0"
            style={{ borderColor: 'rgba(255,46,166,0.1)' }}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden text-white/50 hover:text-white"
              >
                <Menu size={22} />
              </button>
              <h1
                className="text-xl font-black tracking-tight text-white"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {navItems.find((n) => n.id === activeTab)?.label ?? 'Dashboard'}
              </h1>
            </div>
            <a href="/" className="text-xs text-white/30 hover:text-white/60 transition-colors tracking-widest uppercase">
              Ver Sitio →
            </a>
          </div>

          {/* Content area */}
          <div className="flex-1 overflow-y-auto p-6">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              {activeTab === 'overview' && <DashboardOverview user={user} isAdmin={isAdmin} onNavigate={setActiveTab} />}
              {activeTab === 'appointments' && <DashboardAppointments isAdmin={isAdmin || isBarber} />}
              {(isAdmin || isBarber) && activeTab === 'services' && <DashboardServices />}
              {(isAdmin || isBarber) && activeTab === 'products' && <DashboardProducts />}
              {(isAdmin || isBarber) && activeTab === 'gallery' && <DashboardGallery />}
              {(isAdmin || isBarber) && activeTab === 'reviews' && <DashboardReviews />}
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
}

function DashboardOverview({
  user,
  isAdmin,
  onNavigate,
}: {
  user: { name?: string | null; email: string; role?: string };
  isAdmin: boolean;
  onNavigate: (tab: Tab) => void;
}) {
  const role = (user as { role?: string }).role;
  const quickActions = [
    { label: 'Ver Citas', icon: <Calendar size={22} />, tab: 'appointments' as Tab },
    ...(isAdmin
      ? [
          { label: 'Servicios', icon: <Scissors size={22} />, tab: 'services' as Tab },
          { label: 'Productos', icon: <Package size={22} />, tab: 'products' as Tab },
          { label: 'Galería', icon: <Image size={22} />, tab: 'gallery' as Tab },
          { label: 'Reseñas', icon: <Star size={22} />, tab: 'reviews' as Tab },
        ]
      : []),
  ];

  return (
    <div className="max-w-4xl">
      {/* Welcome */}
      <div className="mb-8">
        <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#ff2ea6' }}>
          Bienvenido de vuelta
        </p>
        <h2
          className="text-4xl font-black tracking-tight text-white"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {user.name ?? user.email.split('@')[0]}
        </h2>
        <p className="text-white/40 mt-1 capitalize">
          {role === 'admin' ? 'Panel de Administrador' : role === 'barber' ? 'Panel de Barbero' : 'Mi Cuenta'}
        </p>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {quickActions.map((action) => (
          <motion.button
            key={action.tab}
            onClick={() => onNavigate(action.tab)}
            className="p-6 rounded-sm text-left flex flex-col gap-3 transition-all"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,46,166,0.15)',
              borderTop: '2px solid rgba(255,46,166,0.4)',
            }}
            whileHover={{ scale: 1.02, borderColor: 'rgba(255,46,166,0.5)' }}
            whileTap={{ scale: 0.98 }}
          >
            <div style={{ color: '#ff2ea6' }}>{action.icon}</div>
            <p className="text-sm font-bold text-white tracking-wide">{action.label}</p>
          </motion.button>
        ))}

        {/* Book appointment shortcut */}
        <motion.a
          href="/#reservar"
          className="p-6 rounded-sm text-left flex flex-col gap-3"
          style={{
            background: 'rgba(255,46,166,0.08)',
            border: '1px solid rgba(255,46,166,0.3)',
            borderTop: '2px solid #ff2ea6',
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div style={{ color: '#ff2ea6' }}><Calendar size={22} /></div>
          <p className="text-sm font-bold text-white tracking-wide">Nueva Cita</p>
          <p className="text-xs text-white/40">Reservar en el sitio</p>
        </motion.a>
      </div>

      {isAdmin && (
        <div
          className="mt-8 p-4 rounded-sm flex items-center gap-3"
          style={{ background: 'rgba(255,46,166,0.06)', border: '1px solid rgba(255,46,166,0.2)' }}
        >
          <Users size={18} style={{ color: '#ff2ea6' }} />
          <p className="text-sm text-white/60">
            Eres administrador — tienes acceso completo para gestionar servicios, productos, galería y reseñas.
          </p>
        </div>
      )}
    </div>
  );
}

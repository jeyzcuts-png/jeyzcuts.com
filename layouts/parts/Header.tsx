import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Scissors, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSession, signOut } from '@/lib/auth/auth-client';

export default function Header() {
  const location = useLocation();
  const { user, isPending } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const isHome = location.pathname === '/';

  const navItems = [
    { href: isHome ? '#servicios' : '/#servicios', label: 'Servicios' },
    { href: isHome ? '#galeria' : '/#galeria', label: 'Galería' },
    { href: isHome ? '#resenas' : '/#resenas', label: 'Reseñas' },
    { href: '/jeyzdrip', label: 'JeyzDrip', badge: 'Soon' },
    { href: '/productos', label: 'Productos', badge: 'Soon' },
    { href: isHome ? '#contacto' : '/#contacto', label: 'Contacto' },
  ];

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  const role = (user as { role?: string } | null)?.role;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-md border-b' : 'bg-transparent border-b border-transparent'
      }`}
      style={scrolled ? { borderColor: 'rgba(255,46,166,0.3)', boxShadow: '0 0 20px rgba(255,46,166,0.1)' } : {}}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/assets/25931078-B6D2-4B15-9DBA-F65176330026.png"
              alt="JeyzCuts"
              className="h-9 md:h-11 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase transition-all duration-200 hover:text-primary relative group text-white/60"
              >
                {item.label}
                {item.badge && (
                  <span
                    className="px-1.5 py-0.5 text-[9px] font-bold rounded-sm leading-none"
                    style={{ background: 'rgba(255,46,166,0.2)', color: '#ff2ea6' }}
                  >
                    {item.badge}
                  </span>
                )}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full"
                  style={{ boxShadow: '0 0 6px #ff2ea6' }}
                />
              </a>
            ))}
          </nav>

          {/* Right side: CTA + Auth */}
          <div className="flex items-center gap-3">
            {/* Book CTA */}
            <a
              href={isHome ? '#reservar' : '/#reservar'}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-widest uppercase text-white rounded-sm transition-all duration-200 hover:scale-105"
              style={{ background: '#ff2ea6', boxShadow: '0 0 12px rgba(255,46,166,0.4)' }}
            >
              <Scissors size={12} />
              Reservar
            </a>

            {/* Auth area */}
            {!isPending && (
              <>
                {user ? (
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-2 px-3 py-2 rounded-sm border transition-all"
                      style={{ borderColor: 'rgba(255,46,166,0.3)', background: 'rgba(255,46,166,0.08)' }}
                    >
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                        style={{ background: '#ff2ea6' }}
                      >
                        {user.name?.[0]?.toUpperCase() ?? user.email[0].toUpperCase()}
                      </div>
                      <span className="hidden md:block text-xs text-white/70 max-w-[80px] truncate">
                        {user.name ?? user.email.split('@')[0]}
                      </span>
                    </button>

                    <AnimatePresence>
                      {userMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 top-full mt-2 w-48 rounded-sm overflow-hidden"
                          style={{
                            background: '#0f0f0f',
                            border: '1px solid rgba(255,46,166,0.25)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                          }}
                        >
                          <div className="px-4 py-3 border-b" style={{ borderColor: 'rgba(255,46,166,0.1)' }}>
                            <p className="text-xs font-bold text-white truncate">{user.name ?? user.email}</p>
                            <p className="text-xs capitalize" style={{ color: '#ff2ea6' }}>
                              {role === 'admin' ? 'Administrador' : role === 'barber' ? 'Barbero' : 'Cliente'}
                            </p>
                          </div>
                          <Link
                            to="/dashboard"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2 px-4 py-3 text-xs text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            <LayoutDashboard size={14} />
                            Mi Dashboard
                          </Link>
                          <button
                            onClick={handleSignOut}
                            className="flex items-center gap-2 px-4 py-3 text-xs text-white/60 hover:text-white hover:bg-white/5 transition-colors w-full text-left"
                          >
                            <LogOut size={14} />
                            Cerrar Sesión
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-widest uppercase text-white/70 rounded-sm border transition-all hover:text-white hover:border-primary"
                    style={{ borderColor: 'rgba(255,255,255,0.15)' }}
                  >
                    <User size={12} />
                    Iniciar Sesión
                  </Link>
                )}
              </>
            )}

            {/* Mobile toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t"
            style={{ background: 'rgba(0,0,0,0.97)', borderColor: 'rgba(255,46,166,0.2)' }}
          >
            <nav className="flex flex-col px-6 py-6 gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 text-sm font-medium tracking-widest uppercase text-white/70 hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                  {item.badge && (
                    <span
                      className="px-1.5 py-0.5 text-[9px] font-bold rounded-sm"
                      style={{ background: 'rgba(255,46,166,0.2)', color: '#ff2ea6' }}
                    >
                      {item.badge}
                    </span>
                  )}
                </a>
              ))}

              <div className="flex flex-col gap-3 mt-2 pt-4 border-t" style={{ borderColor: 'rgba(255,46,166,0.1)' }}>
                <a
                  href={isHome ? '#reservar' : '/#reservar'}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold tracking-widest uppercase text-white rounded-sm"
                  style={{ background: '#ff2ea6', boxShadow: '0 0 16px rgba(255,46,166,0.4)' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Scissors size={14} />
                  Reservar Cita
                </a>

                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold tracking-widest uppercase text-white/70 rounded-sm border"
                      style={{ borderColor: 'rgba(255,255,255,0.15)' }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <LayoutDashboard size={14} />
                      Dashboard
                    </Link>
                    <button
                      onClick={() => { handleSignOut(); setIsMobileMenuOpen(false); }}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold tracking-widest uppercase text-white/40 rounded-sm"
                    >
                      <LogOut size={14} />
                      Cerrar Sesión
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold tracking-widest uppercase text-white/70 rounded-sm border"
                    style={{ borderColor: 'rgba(255,255,255,0.15)' }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User size={14} />
                    Iniciar Sesión
                  </Link>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

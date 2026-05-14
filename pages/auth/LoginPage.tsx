import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { Eye, EyeOff, Scissors, AlertCircle } from 'lucide-react';
import { authClient } from '@/lib/auth/auth-client';

export default function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        const res = await authClient.signIn.email({
          email: form.email,
          password: form.password,
        });
        if (res.error) throw new Error(res.error.message ?? 'Error al iniciar sesión');
        navigate('/dashboard');
      } else {
        const res = await authClient.signUp.email({
          email: form.email,
          password: form.password,
          name: form.name,
        });
        if (res.error) throw new Error(res.error.message ?? 'Error al registrarse');
        navigate('/dashboard');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'} — JeyzCuts</title>
      </Helmet>

      <div
        className="min-h-screen flex items-center justify-center relative overflow-hidden px-4"
        style={{ background: '#0a0a0a' }}
      >
        {/* Grid bg */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,46,166,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,46,166,0.4) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Neon glow */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255,46,166,0.12) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-md"
        >
          {/* Card */}
          <div
            className="p-8 rounded-sm"
            style={{
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,46,166,0.25)',
              boxShadow: '0 0 40px rgba(255,46,166,0.08)',
            }}
          >
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <Link to="/">
                <img
                  src="/assets/25931078-B6D2-4B15-9DBA-F65176330026.png"
                  alt="JeyzCuts"
                  className="h-14 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Mode toggle */}
            <div
              className="flex rounded-sm mb-8 p-1"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,46,166,0.15)' }}
            >
              {(['login', 'signup'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => { setMode(m); setError(''); }}
                  className="flex-1 py-2 text-sm font-bold tracking-widest uppercase rounded-sm transition-all duration-200"
                  style={
                    mode === m
                      ? { background: '#ff2ea6', color: 'white', boxShadow: '0 0 12px rgba(255,46,166,0.4)' }
                      : { color: 'rgba(255,255,255,0.4)' }
                  }
                >
                  {m === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase text-white/50 mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Tu nombre completo"
                    className="w-full px-4 py-3 text-sm text-white rounded-sm outline-none transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,46,166,0.2)',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#ff2ea6')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(255,46,166,0.2)')}
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold tracking-widest uppercase text-white/50 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="tu@email.com"
                  className="w-full px-4 py-3 text-sm text-white rounded-sm outline-none transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,46,166,0.2)',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#ff2ea6')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255,46,166,0.2)')}
                />
              </div>

              <div>
                <label className="block text-xs font-bold tracking-widest uppercase text-white/50 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={8}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="Mínimo 8 caracteres"
                    className="w-full px-4 py-3 pr-12 text-sm text-white rounded-sm outline-none transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,46,166,0.2)',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#ff2ea6')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(255,46,166,0.2)')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && (
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-sm text-sm"
                  style={{ background: 'rgba(255,46,60,0.1)', border: '1px solid rgba(255,46,60,0.3)', color: '#ff6b6b' }}
                >
                  <AlertCircle size={14} />
                  {error}
                </div>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                className="mt-2 w-full py-3 text-sm font-bold tracking-widest uppercase text-white rounded-sm disabled:opacity-60 flex items-center justify-center gap-2"
                style={{ background: '#ff2ea6', boxShadow: '0 0 20px rgba(255,46,166,0.3)' }}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Scissors size={14} />
                    {mode === 'login' ? 'Entrar' : 'Crear Cuenta'}
                  </>
                )}
              </motion.button>
            </form>

            <p className="mt-6 text-center text-xs text-white/30">
              <Link to="/" className="hover:text-white/60 transition-colors">
                ← Volver al inicio
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}

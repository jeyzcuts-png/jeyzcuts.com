import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { ChevronRight, Instagram, ShoppingBag, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
    </svg>
  );
}

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const calc = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return timeLeft;
}

export default function JeyzDripLanding() {
  const launchDate = new Date('2026-09-01T00:00:00');
  const countdown = useCountdown(launchDate);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  const countdownItems = [
    { label: 'Días', value: countdown.days },
    { label: 'Horas', value: countdown.hours },
    { label: 'Min', value: countdown.minutes },
    { label: 'Seg', value: countdown.seconds },
  ];

  return (
    <>
      <Helmet>
        <title>JeyzDrip — Streetwear Luxury Puerto Rico</title>
        <meta name="description" content="JeyzDrip — Streetwear Luxury de Puerto Rico. Próximamente." />
      </Helmet>

      <div
        className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-24"
        style={{ background: '#050505' }}
      >
        {/* Animated grid */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,46,166,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,46,166,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Ambient glows */}
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,46,166,0.12) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(46,255,135,0.06) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />

        <div className="relative z-10 text-center max-w-4xl mx-auto w-full">

          {/* Logo / Brand */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-sm flex items-center justify-center"
                style={{ background: 'rgba(255,46,166,0.15)', border: '1px solid rgba(255,46,166,0.4)' }}
              >
                <Zap size={20} style={{ color: '#ff2ea6' }} />
              </div>
              <span
                className="text-4xl font-black tracking-tight text-white"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                JEYZ<span style={{ color: '#ff2ea6' }}>DRIP</span>
              </span>
            </div>
          </motion.div>

          {/* Coming Soon badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-xs font-bold tracking-widest uppercase rounded-sm border"
            style={{ color: '#ff2ea6', borderColor: 'rgba(255,46,166,0.4)', background: 'rgba(255,46,166,0.08)' }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#ff2ea6' }} />
            Lanzamiento Próximo
          </motion.div>

          {/* Big headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-[18vw] md:text-[12vw] font-black tracking-tighter leading-none mb-2"
            style={{
              fontFamily: 'var(--font-heading)',
              color: 'transparent',
              WebkitTextStroke: '1.5px rgba(255,46,166,0.7)',
            }}
          >
            DRIP
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-white/40 text-base md:text-lg tracking-[0.3em] uppercase mb-14"
          >
            Streetwear Luxury — Puerto Rico
          </motion.p>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center justify-center gap-3 md:gap-6 mb-14"
          >
            {countdownItems.map(({ label, value }, i) => (
              <div key={label} className="flex items-center gap-3 md:gap-6">
                <div className="flex flex-col items-center">
                  <div
                    className="w-16 md:w-24 h-16 md:h-24 flex items-center justify-center rounded-sm mb-2 relative overflow-hidden"
                    style={{ background: 'rgba(255,46,166,0.06)', border: '1px solid rgba(255,46,166,0.25)' }}
                  >
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{ background: 'linear-gradient(135deg, rgba(255,46,166,0.3) 0%, transparent 60%)' }}
                    />
                    <span
                      className="text-3xl md:text-4xl font-black text-white relative z-10"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {String(value).padStart(2, '0')}
                    </span>
                  </div>
                  <span className="text-[10px] text-white/30 tracking-widest uppercase">{label}</span>
                </div>
                {i < countdownItems.length - 1 && (
                  <span className="text-2xl font-black text-white/20 mb-5" style={{ fontFamily: 'var(--font-heading)' }}>:</span>
                )}
              </div>
            ))}
          </motion.div>

          {/* What's coming */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="grid grid-cols-3 gap-3 max-w-lg mx-auto mb-12"
          >
            {[
              { label: 'Hoodies', icon: '🧥' },
              { label: 'Tees', icon: '👕' },
              { label: 'Accesorios', icon: '🧢' },
            ].map(({ label, icon }) => (
              <div
                key={label}
                className="p-4 rounded-sm text-center"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,46,166,0.1)' }}
              >
                <div className="text-2xl mb-2">{icon}</div>
                <p className="text-xs font-bold text-white/50 tracking-wide">{label}</p>
              </div>
            ))}
          </motion.div>

          {/* Email notify */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-10"
          >
            {submitted ? (
              <div
                className="inline-flex items-center gap-2 px-6 py-3 rounded-sm text-sm font-bold"
                style={{ background: 'rgba(46,255,135,0.1)', border: '1px solid rgba(46,255,135,0.3)', color: '#2eff87' }}
              >
                ✓ Te avisamos cuando lancemos
              </div>
            ) : (
              <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
                <input
                  type="email" required value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="flex-1 px-4 py-3 text-sm text-white rounded-sm outline-none"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,46,166,0.25)' }}
                />
                <motion.button
                  type="submit"
                  className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold tracking-widest uppercase text-white rounded-sm"
                  style={{ background: '#ff2ea6', boxShadow: '0 0 16px rgba(255,46,166,0.4)' }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Notifícame <ChevronRight size={14} />
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Preview shop link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mb-10"
          >
            <Link
              to="/jeyzdrip/shop"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold tracking-widest uppercase rounded-sm border transition-all hover:border-primary"
              style={{ color: 'rgba(255,255,255,0.5)', borderColor: 'rgba(255,255,255,0.12)' }}
            >
              <ShoppingBag size={14} />
              Ver Catálogo Preview
            </Link>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex items-center justify-center gap-6"
          >
            <a href="https://www.instagram.com/jeyzcuts/?hl=es" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-white/30 hover:text-white transition-colors">
              <Instagram size={16} /> @jeyzcuts
            </a>
            <a href="https://www.tiktok.com/@jeyzcuts" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-white/30 hover:text-white transition-colors">
              <TikTokIcon size={16} /> @jeyzcuts
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="mt-10"
          >
            <Link to="/" className="text-xs text-white/20 hover:text-white/40 transition-colors tracking-widest uppercase">
              ← Volver a JeyzCuts
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}

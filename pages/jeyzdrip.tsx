import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { ChevronRight, Instagram } from 'lucide-react';

function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
    </svg>
  );
}

// Countdown timer
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

export default function JeyzDripPage() {
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
        <title>JeyzDrip — Coming Soon</title>
        <meta name="description" content="JeyzDrip — Streetwear Luxury de Puerto Rico. Próximamente." />
      </Helmet>

      <div
        className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-24"
        style={{ background: '#050505' }}
      >
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,46,166,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,46,166,0.4) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Ambient glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255,46,166,0.1) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <img
              src="/assets/JeyzDrip.png"
              alt="JeyzDrip"
              className="h-24 md:h-32 w-auto object-contain mx-auto"
            />
          </motion.div>

          {/* Coming Soon badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-xs font-bold tracking-widest uppercase rounded-sm border"
            style={{
              color: '#ff2ea6',
              borderColor: 'rgba(255,46,166,0.4)',
              background: 'rgba(255,46,166,0.08)',
            }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#ff2ea6' }} />
            Coming Soon
          </motion.div>

          {/* Big title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-[20vw] md:text-[15vw] font-black tracking-tighter leading-none mb-4"
            style={{
              fontFamily: 'var(--font-heading)',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,46,166,0.6)',
            }}
          >
            DRIP
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-white/50 text-lg md:text-xl tracking-widest uppercase mb-12"
          >
            Streetwear Luxury — Puerto Rico
          </motion.p>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center justify-center gap-4 md:gap-8 mb-14"
          >
            {countdownItems.map(({ label, value }) => (
              <div key={label} className="flex flex-col items-center">
                <div
                  className="w-16 md:w-20 h-16 md:h-20 flex items-center justify-center rounded-sm mb-2"
                  style={{
                    background: 'rgba(255,46,166,0.08)',
                    border: '1px solid rgba(255,46,166,0.3)',
                  }}
                >
                  <span
                    className="text-2xl md:text-3xl font-black text-white"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {String(value).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-xs text-white/30 tracking-widest uppercase">{label}</span>
              </div>
            ))}
          </motion.div>

          {/* Email notify */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {submitted ? (
              <div
                className="inline-flex items-center gap-2 px-6 py-3 rounded-sm text-sm font-bold"
                style={{ background: 'rgba(46,255,135,0.1)', border: '1px solid rgba(46,255,135,0.3)', color: '#2eff87' }}
              >
                ✓ Te notificaremos cuando lancemos
              </div>
            ) : (
              <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="flex-1 px-4 py-3 text-sm text-white rounded-sm outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,46,166,0.25)',
                  }}
                />
                <motion.button
                  type="submit"
                  className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold tracking-widest uppercase text-white rounded-sm"
                  style={{ background: '#ff2ea6', boxShadow: '0 0 16px rgba(255,46,166,0.4)' }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Notifícame
                  <ChevronRight size={14} />
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex items-center justify-center gap-6 mt-12"
          >
            <a
              href="https://www.instagram.com/jeyzcuts/?hl=es"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
            >
              <Instagram size={16} />
              @jeyzcuts
            </a>
            <a
              href="https://www.tiktok.com/@jeyzcuts"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
            >
              <TikTokIcon size={16} />
              @jeyzcuts
            </a>
          </motion.div>

          {/* Back link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="mt-10"
          >
            <a href="/" className="text-xs text-white/20 hover:text-white/50 transition-colors tracking-widest uppercase">
              ← Volver a JeyzCuts
            </a>
          </motion.div>
        </div>
      </div>
    </>
  );
}

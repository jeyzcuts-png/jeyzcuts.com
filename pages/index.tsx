import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Scissors, Star, ChevronRight, Phone, Instagram, Calendar } from 'lucide-react';
import BookingForm from '@/components/BookingForm';

// TikTok icon
function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
    </svg>
  );
}

// Neon Orb ambient element
function NeonOrb({
  size,
  x,
  y,
  delay,
  color = '#ff2ea6',
}: {
  size: number;
  x: string;
  y: string;
  delay: number;
  color?: string;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        background: `radial-gradient(circle, ${color}22 0%, transparent 70%)`,
        filter: `blur(${size / 3}px)`,
      }}
      animate={{
        x: [0, 20, -15, 0],
        y: [0, -25, 10, 0],
        opacity: [0.4, 0.7, 0.5, 0.4],
      }}
      transition={{
        duration: 8 + delay,
        repeat: Infinity,
        ease: 'easeInOut' as const,
        delay,
      }}
    />
  );
}

// Services data
const services = [
  {
    name: 'Recorte',
    price: '$25',
    description: 'Corte clásico o moderno con acabado perfecto. Fade, taper, o estilo libre.',
    icon: '✂️',
    featured: false,
  },
  {
    name: 'Barba',
    price: '$20',
    description: 'Perfilado y arreglo de barba con navaja caliente y aceites premium.',
    icon: '🪒',
    featured: false,
  },
  {
    name: 'Line Up',
    price: '$15',
    description: 'Definición de líneas y bordes con precisión milimétrica.',
    icon: '📐',
    featured: false,
  },
  {
    name: 'Premium',
    price: '$50',
    description: 'Corte + barba + tratamiento completo. La experiencia JeyzCuts al máximo.',
    icon: '👑',
    featured: true,
  },
  {
    name: 'Diseños',
    price: 'Desde $35',
    description: 'Arte en tu cabeza. Diseños personalizados, logos, patrones únicos.',
    icon: '🎨',
    featured: false,
  },
];

// Reviews data
const reviews = [
  {
    name: 'Carlos M.',
    rating: 5,
    text: 'El mejor corte que me han dado en mi vida. Jeyz tiene un talento increíble, siempre salgo con el estilo exacto que quiero.',
    date: 'Hace 2 semanas',
  },
  {
    name: 'Miguel R.',
    rating: 5,
    text: 'Ambiente premium, servicio de primera. El fade quedó perfecto. Definitivamente mi barbería de confianza en Puerto Rico.',
    date: 'Hace 1 mes',
  },
  {
    name: 'Javier T.',
    rating: 5,
    text: 'El diseño que me hicieron fue una obra de arte. Todo el mundo me pregunta dónde me corto. 100% recomendado.',
    date: 'Hace 3 semanas',
  },
];

// Gallery images
const galleryImages = [
  { slot: '/airo-assets/images/pages/home/gallery-1', span: 'col-span-1 row-span-1' },
  { slot: '/airo-assets/images/pages/home/gallery-2', span: 'col-span-1 row-span-2' },
  { slot: '/airo-assets/images/pages/home/gallery-3', span: 'col-span-1 row-span-1' },
  { slot: '/airo-assets/images/pages/home/gallery-4', span: 'col-span-1 row-span-1' },
  { slot: '/airo-assets/images/pages/home/gallery-5', span: 'col-span-1 row-span-1' },
  { slot: '/airo-assets/images/pages/home/gallery-6', span: 'col-span-1 row-span-1' },
];

// Glitch text animation for Jeyz Drip
function GlitchText({ text }: { text: string }) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className="relative inline-block"
      style={
        glitch
          ? {
              textShadow: '3px 0 #ff2ea6, -3px 0 #00ffff',
              transform: 'skewX(-2deg)',
            }
          : {
              textShadow: '0 0 40px rgba(255,46,166,0.3)',
            }
      }
    >
      {text}
    </span>
  );
}

// Section fade-in wrapper
function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const taglineWords = ['Precisión.', 'Estilo.', 'Confianza.'];

  return (
    <>
      <Helmet>
        <title>JeyzCuts — Premium Barbershop Puerto Rico</title>
        <meta
          name="description"
          content="JeyzCuts — Puerto Rico's premier barbershop. Fades, lineups, diseños y más. Reserva tu cita hoy."
        />
      </Helmet>

      <main style={{ background: '#0a0a0a' }}>
        {/* ═══════════════════════════════════════════════════════
            HERO
        ═══════════════════════════════════════════════════════ */}
        <section
          ref={heroRef}
          id="inicio"
          className="relative min-h-screen flex items-center overflow-hidden"
        >
          {/* Background image with parallax */}
          <motion.div className="absolute inset-0" style={{ y: heroY }}>
            <img
              src="/airo-assets/images/pages/home/hero"
              alt="JeyzCuts barbershop"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(135deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.75) 50%, rgba(10,0,5,0.88) 100%)',
              }}
            />
          </motion.div>

          {/* Ambient neon orbs */}
          <NeonOrb size={400} x="60%" y="10%" delay={0} color="#ff2ea6" />
          <NeonOrb size={300} x="80%" y="50%" delay={2} color="#ff2ea6" />
          <NeonOrb size={200} x="5%" y="60%" delay={4} color="#ff2ea6" />

          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,46,166,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,46,166,0.3) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          {/* Oversized background text */}
          <div
            className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none"
            style={{ lineHeight: 0.85 }}
          >
            <span
              className="block text-[20vw] font-black tracking-tighter opacity-5 text-white"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              JEYZCUTS
            </span>
          </div>

          {/* Hero content */}
          <motion.div
            className="relative z-10 container mx-auto px-4 lg:px-8 pt-24"
            style={{ opacity: heroOpacity }}
          >
            <div className="max-w-3xl">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-xs font-bold tracking-widest uppercase rounded-sm border"
                style={{
                  color: '#ff2ea6',
                  borderColor: 'rgba(255,46,166,0.4)',
                  background: 'rgba(255,46,166,0.08)',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: '#ff2ea6' }}
                />
                Puerto Rico — Área Sur
              </motion.div>

              {/* Tagline — staggered word reveal */}
              <div className="flex flex-wrap gap-x-4 mb-6">
                {taglineWords.map((word, i) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, y: 60, clipPath: 'inset(100% 0 0 0)' }}
                    animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' }}
                    transition={{ duration: 0.7, delay: 0.4 + i * 0.15, ease: 'easeOut' as const }}
                    className="block text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-none"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      textShadow: i === 1 ? '0 0 30px rgba(255,46,166,0.5)' : 'none',
                      color: i === 1 ? '#ff2ea6' : 'white',
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="text-white/60 text-lg md:text-xl mb-10 max-w-lg leading-relaxed"
              >
                Puerto Rico's Premier Barbershop Experience. Donde cada corte es una obra de arte.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="flex flex-wrap items-center gap-4 mb-12"
              >
                <motion.a
                  href="#reservar"
                  className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold tracking-widest uppercase text-white rounded-sm"
                  style={{ background: '#ff2ea6' }}
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(255,46,166,0.4)',
                      '0 0 40px rgba(255,46,166,0.7)',
                      '0 0 20px rgba(255,46,166,0.4)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' as const }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Calendar size={16} />
                  Reservar Cita
                </motion.a>

                <motion.a
                  href="#servicios"
                  className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold tracking-widest uppercase text-white rounded-sm border transition-all duration-200 hover:bg-white/5"
                  style={{ borderColor: 'rgba(255,255,255,0.3)' }}
                  whileHover={{ borderColor: '#ff2ea6', scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Ver Servicios
                  <ChevronRight size={16} />
                </motion.a>
              </motion.div>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.3 }}
                className="flex items-center gap-5"
              >
                <span className="text-xs text-white/30 tracking-widest uppercase">Síguenos</span>
                <div className="w-8 h-px" style={{ background: 'rgba(255,46,166,0.4)' }} />
                <a
                  href="https://www.instagram.com/jeyzcuts/?hl=es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/50 hover:text-primary transition-colors text-sm"
                >
                  <Instagram size={18} />
                  @jeyzcuts
                </a>
                <a
                  href="https://www.tiktok.com/@jeyzcuts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/50 hover:text-primary transition-colors text-sm"
                >
                  <TikTokIcon size={18} />
                  @jeyzcuts
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' as const }}
          >
            <div className="w-px h-12" style={{ background: 'linear-gradient(to bottom, #ff2ea6, transparent)' }} />
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SERVICES
        ═══════════════════════════════════════════════════════ */}
        <section id="servicios" className="py-24 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-3"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,46,166,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,46,166,0.15) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <FadeUp className="mb-16">
              <div className="flex items-end justify-between flex-wrap gap-4">
                <div>
                  <p
                    className="text-xs font-bold tracking-widest uppercase mb-3"
                    style={{ color: '#ff2ea6' }}
                  >
                    Lo que hacemos
                  </p>
                  <h2
                    className="text-5xl md:text-7xl font-black tracking-tight text-white"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Nuestros Servicios
                  </h2>
                </div>
                <div className="h-px flex-1 min-w-[60px] max-w-xs" style={{ background: 'linear-gradient(to right, rgba(255,46,166,0.5), transparent)' }} />
              </div>
            </FadeUp>

            {/* Bento grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service, i) => (
                <FadeUp key={service.name} delay={i * 0.08}>
                  <motion.div
                    className={`relative p-6 rounded-sm cursor-pointer overflow-hidden ${
                      service.featured ? 'md:col-span-2 lg:col-span-1' : ''
                    }`}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      backdropFilter: 'blur(10px)',
                      border: service.featured
                        ? '1px solid rgba(255,46,166,0.5)'
                        : '1px solid rgba(255,255,255,0.06)',
                      borderTop: `2px solid ${service.featured ? '#ff2ea6' : 'rgba(255,46,166,0.3)'}`,
                    }}
                    whileHover={{
                      scale: 1.02,
                      borderColor: 'rgba(255,46,166,0.6)',
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {service.featured && (
                      <div
                        className="absolute top-3 right-3 px-2 py-0.5 text-xs font-bold tracking-widest uppercase rounded-sm"
                        style={{ background: '#ff2ea6', color: 'white' }}
                      >
                        Popular
                      </div>
                    )}

                    {/* Hover glow */}
                    <motion.div
                      className="absolute inset-0 opacity-0 pointer-events-none"
                      style={{
                        background: 'radial-gradient(circle at 50% 0%, rgba(255,46,166,0.08) 0%, transparent 70%)',
                      }}
                      whileHover={{ opacity: 1 }}
                    />

                    <div className="text-3xl mb-4">{service.icon}</div>
                    <h3
                      className="text-2xl font-black tracking-tight text-white mb-1"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {service.name}
                    </h3>
                    <p
                      className="text-2xl font-black mb-3"
                      style={{ color: '#ff2ea6', fontFamily: 'var(--font-heading)' }}
                    >
                      {service.price}
                    </p>
                    <p className="text-sm text-white/50 leading-relaxed">{service.description}</p>

                    <motion.a
                      href="#reservar"
                      className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase transition-colors"
                      style={{ color: '#ff2ea6' }}
                      whileHover={{ gap: '8px' }}
                    >
                      Reservar
                      <ChevronRight size={12} />
                    </motion.a>
                  </motion.div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            GALLERY
        ═══════════════════════════════════════════════════════ */}
        <section id="galeria" className="py-24" style={{ background: '#080808' }}>
          <div className="container mx-auto px-4 lg:px-8">
            <FadeUp className="mb-16">
              <div className="flex items-end justify-between flex-wrap gap-4">
                <div>
                  <p
                    className="text-xs font-bold tracking-widest uppercase mb-3"
                    style={{ color: '#ff2ea6' }}
                  >
                    Nuestro trabajo
                  </p>
                  <h2
                    className="text-5xl md:text-7xl font-black tracking-tight text-white"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    La Galería
                  </h2>
                </div>
                <a
                  href="#galeria"
                  className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase transition-colors hover:text-white"
                  style={{ color: '#ff2ea6' }}
                >
                  Ver Todo
                  <ChevronRight size={14} />
                </a>
              </div>
            </FadeUp>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {galleryImages.map((img, i) => (
                <FadeUp key={i} delay={i * 0.07}>
                  <motion.div
                    className="relative overflow-hidden rounded-sm aspect-square group cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={img.slot}
                      alt={`JeyzCuts work ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                      style={{ background: 'rgba(255,46,166,0.25)' }}
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ background: 'rgba(255,46,166,0.8)' }}
                      >
                        <Scissors size={16} color="white" />
                      </div>
                    </div>
                  </motion.div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            REVIEWS
        ═══════════════════════════════════════════════════════ */}
        <section id="resenas" className="py-24 relative overflow-hidden">
          <NeonOrb size={500} x="50%" y="20%" delay={1} color="#ff2ea6" />

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <FadeUp className="mb-16 text-center">
              <p
                className="text-xs font-bold tracking-widest uppercase mb-3"
                style={{ color: '#ff2ea6' }}
              >
                Testimonios
              </p>
              <h2
                className="text-5xl md:text-7xl font-black tracking-tight text-white"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Lo Que Dicen
              </h2>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((review, i) => (
                <FadeUp key={review.name} delay={i * 0.1}>
                  <div
                    className="p-6 rounded-sm h-full flex flex-col"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,46,166,0.15)',
                    }}
                  >
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: review.rating }).map((_, j) => (
                        <motion.div
                          key={j}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + j * 0.08, duration: 0.3 }}
                        >
                          <Star
                            size={16}
                            fill="#ff2ea6"
                            style={{ color: '#ff2ea6', filter: 'drop-shadow(0 0 4px #ff2ea6)' }}
                          />
                        </motion.div>
                      ))}
                    </div>

                    <p className="text-white/70 text-sm leading-relaxed flex-1 mb-5">
                      "{review.text}"
                    </p>

                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
                        style={{ background: 'rgba(255,46,166,0.3)', border: '1px solid rgba(255,46,166,0.4)' }}
                      >
                        {review.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{review.name}</p>
                        <p className="text-xs text-white/30">{review.date}</p>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            JEYZ DRIP
        ═══════════════════════════════════════════════════════ */}
        <section
          className="py-32 relative overflow-hidden"
          style={{ background: '#050505', borderTop: '1px solid rgba(255,46,166,0.15)', borderBottom: '1px solid rgba(255,46,166,0.15)' }}
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,46,166,0.06) 0%, transparent 70%)',
            }}
          />

          <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
            <FadeUp>
              <div
                className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-xs font-bold tracking-widest uppercase rounded-sm border"
                style={{
                  color: '#ff2ea6',
                  borderColor: 'rgba(255,46,166,0.4)',
                  background: 'rgba(255,46,166,0.08)',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: '#ff2ea6' }}
                />
                Coming Soon
              </div>

              <h2
                className="text-[18vw] md:text-[14vw] font-black tracking-tighter leading-none mb-6"
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: 'transparent',
                  WebkitTextStroke: '1px rgba(255,46,166,0.4)',
                }}
              >
                <GlitchText text="JEYZ" />
                <br />
                <span style={{ WebkitTextStroke: '1px rgba(255,255,255,0.15)' }}>DRIP</span>
              </h2>

              <p className="text-white/40 text-lg tracking-widest uppercase mb-8">
                Streetwear Luxury — Puerto Rico
              </p>

              <motion.button
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold tracking-widest uppercase text-white/50 rounded-sm border"
                style={{ borderColor: 'rgba(255,46,166,0.3)' }}
                whileHover={{ borderColor: '#ff2ea6', color: 'white' }}
                transition={{ duration: 0.2 }}
              >
                Notifícame
                <ChevronRight size={14} />
              </motion.button>
            </FadeUp>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            BOOKING FORM
        ═══════════════════════════════════════════════════════ */}
        <section id="reservar" className="py-24 relative overflow-hidden">
          <NeonOrb size={600} x="70%" y="0%" delay={0} color="#ff2ea6" />

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Left — copy */}
              <FadeUp>
                <p
                  className="text-xs font-bold tracking-widest uppercase mb-4"
                  style={{ color: '#ff2ea6' }}
                >
                  Reserva tu cita
                </p>
                <h2
                  className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-none mb-6"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  ¿Listo Para Tu
                  <br />
                  <span style={{ color: '#ff2ea6' }}>Mejor Corte?</span>
                </h2>
                <p className="text-white/50 text-lg mb-8 max-w-md leading-relaxed">
                  Reserva tu cita en JeyzCuts y experimenta la diferencia. Precisión, estilo y
                  confianza en cada visita.
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  <a
                    href="tel:9408824349"
                    className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
                  >
                    <Phone size={14} style={{ color: '#ff2ea6' }} />
                    940-882-4349
                  </a>
                  <a
                    href="https://www.instagram.com/jeyzcuts/?hl=es"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
                  >
                    <Instagram size={14} style={{ color: '#ff2ea6' }} />
                    @jeyzcuts
                  </a>
                </div>

                {/* Preview image */}
                <div
                  className="relative rounded-sm overflow-hidden aspect-video max-w-sm hidden lg:block"
                  style={{ border: '1px solid rgba(255,46,166,0.2)' }}
                >
                  <img
                    src="/airo-assets/images/pages/home/gallery-2"
                    alt="JeyzCuts"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }}
                  />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-lg font-black text-white" style={{ fontFamily: 'var(--font-heading)' }}>JeyzCuts</p>
                    <p className="text-xs" style={{ color: '#ff2ea6' }}>Puerto Rico — Área Sur</p>
                  </div>
                </div>
              </FadeUp>

              {/* Right — booking form */}
              <FadeUp delay={0.15}>
                <div
                  className="p-6 md:p-8 rounded-sm"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,46,166,0.2)',
                    boxShadow: '0 0 40px rgba(255,46,166,0.05)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-6">
                    <Calendar size={18} style={{ color: '#ff2ea6' }} />
                    <h3
                      className="text-xl font-black text-white"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      Reservar Cita
                    </h3>
                  </div>
                  <BookingForm />
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            CONTACT BAR
        ═══════════════════════════════════════════════════════ */}
        <section
          id="contacto"
          className="py-8"
          style={{ background: 'rgba(255,46,166,0.06)', borderTop: '1px solid rgba(255,46,166,0.2)' }}
        >
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-8 flex-wrap">
                <a
                  href="tel:9408824349"
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <Phone size={14} style={{ color: '#ff2ea6' }} />
                  940-882-4349
                </a>
                <a
                  href="https://www.instagram.com/jeyzcuts/?hl=es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <Instagram size={14} style={{ color: '#ff2ea6' }} />
                  @jeyzcuts
                </a>
                <a
                  href="https://www.tiktok.com/@jeyzcuts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <TikTokIcon size={14} />
                  @jeyzcuts
                </a>
              </div>
              <p className="text-xs text-white/30 tracking-widest uppercase">
                Puerto Rico — Área Sur
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

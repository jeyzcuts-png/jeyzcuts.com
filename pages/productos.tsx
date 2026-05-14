import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { Package, ChevronRight } from 'lucide-react';

export default function ProductosPage() {
  return (
    <>
      <Helmet>
        <title>Productos — Coming Soon — JeyzCuts</title>
        <meta name="description" content="Productos de barbería JeyzCuts. Próximamente disponibles." />
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
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255,46,166,0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />

        <div className="relative z-10 text-center max-w-2xl mx-auto">
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-20 h-20 rounded-sm flex items-center justify-center mx-auto mb-8"
            style={{
              background: 'rgba(255,46,166,0.1)',
              border: '1px solid rgba(255,46,166,0.3)',
            }}
          >
            <Package size={36} style={{ color: '#ff2ea6' }} />
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-6xl md:text-8xl font-black tracking-tight text-white mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Productos
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-white/50 text-lg mb-4 leading-relaxed"
          >
            Pronto podrás comprar los mejores productos de barbería directamente desde JeyzCuts.
            Navajas, aceites, pomadas y más.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-white/30 text-sm tracking-widest uppercase mb-12"
          >
            Lanzamiento — Próximamente
          </motion.p>

          {/* Preview cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="grid grid-cols-3 gap-3 mb-12"
          >
            {['Navajas', 'Aceites', 'Pomadas'].map((cat) => (
              <div
                key={cat}
                className="p-4 rounded-sm text-center"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,46,166,0.12)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-sm mx-auto mb-3 flex items-center justify-center"
                  style={{ background: 'rgba(255,46,166,0.1)' }}
                >
                  <Package size={18} style={{ color: '#ff2ea6' }} />
                </div>
                <p className="text-xs font-bold text-white/60 tracking-wide">{cat}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold tracking-widest uppercase text-white rounded-sm border transition-all hover:border-primary"
              style={{ borderColor: 'rgba(255,255,255,0.15)' }}
            >
              ← Volver al Inicio
            </a>
            <a
              href="/jeyzdrip"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold tracking-widest uppercase text-white rounded-sm"
              style={{ background: '#ff2ea6', boxShadow: '0 0 16px rgba(255,46,166,0.3)' }}
            >
              Ver JeyzDrip
              <ChevronRight size={14} />
            </a>
          </motion.div>
        </div>
      </div>
    </>
  );
}

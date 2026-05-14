import { Scissors, Phone, MapPin, Instagram } from 'lucide-react';

// TikTok icon as SVG
function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '#servicios', label: 'Servicios' },
    { href: '#galeria', label: 'Galería' },
    { href: '#resenas', label: 'Reseñas' },
    { href: '#reservar', label: 'Reservar' },
  ];

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: '#0a0a0a', borderTop: '1px solid #ff2ea6' }}
    >
      {/* Neon top glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: '#ff2ea6',
          boxShadow: '0 0 20px 2px rgba(255,46,166,0.6)',
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <img
              src="/assets/25931078-B6D2-4B15-9DBA-F65176330026.png"
              alt="JeyzCuts"
              className="h-10 w-auto object-contain object-left"
            />
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Puerto Rico's premier barbershop experience. Precisión. Estilo. Confianza.
            </p>
            {/* Social */}
            <div className="flex items-center gap-4 mt-2">
              <a
                href="https://www.instagram.com/jeyzcuts/?hl=es"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-sm border border-white/10 text-white/50 hover:text-primary hover:border-primary transition-all duration-200"
                style={{ '--hover-shadow': '0 0 12px rgba(255,46,166,0.4)' } as React.CSSProperties}
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.tiktok.com/@jeyzcuts"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-sm border border-white/10 text-white/50 hover:text-primary hover:border-primary transition-all duration-200"
                aria-label="TikTok"
              >
                <TikTokIcon size={18} />
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4
              className="text-xs font-bold tracking-widest uppercase mb-6"
              style={{ color: '#ff2ea6' }}
            >
              Navegación
            </h4>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/50 hover:text-white transition-colors tracking-wide"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-xs font-bold tracking-widest uppercase mb-6"
              style={{ color: '#ff2ea6' }}
            >
              Contacto
            </h4>
            <div className="flex flex-col gap-4">
              <a
                href="tel:9408824349"
                className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors"
              >
                <Phone size={15} style={{ color: '#ff2ea6' }} />
                940-882-4349
              </a>
              <div className="flex items-center gap-3 text-sm text-white/50">
                <MapPin size={15} style={{ color: '#ff2ea6' }} />
                Puerto Rico — Área Sur
              </div>
              <a
                href="#reservar"
                className="mt-4 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold tracking-widest uppercase text-white rounded-sm transition-all duration-200 hover:scale-105"
                style={{
                  background: '#ff2ea6',
                  boxShadow: '0 0 16px rgba(255,46,166,0.4)',
                }}
              >
                <Scissors size={14} />
                Reservar Cita
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-3"
          style={{ borderTop: '1px solid rgba(255,46,166,0.2)' }}
        >
          <p className="text-xs text-white/30 tracking-widest uppercase">
            © {currentYear} JeyzCuts. All rights reserved.
          </p>
          <p className="text-xs tracking-widest uppercase" style={{ color: '#ff2ea6' }}>
            Puerto Rico — Área Sur
          </p>
        </div>
      </div>
    </footer>
  );
}

import { Helmet } from '@dr.pogodin/react-helmet';
import { type ReactElement } from 'react';
import { ScrollRestoration, useLocation } from 'react-router-dom';

import Footer from '@/layouts/parts/Footer';
import Header from '@/layouts/parts/Header';
import Website from '@/layouts/Website';

interface RootLayoutProps {
  children: ReactElement;
}

// Pages that manage their own full-screen layout (no shared header/footer)
const FULLSCREEN_PATHS = ['/dashboard', '/login'];

export default function RootLayout({ children }: RootLayoutProps) {
  const location = useLocation();
  const isFullscreen = FULLSCREEN_PATHS.some((p) => location.pathname.startsWith(p));

  if (isFullscreen) {
    return (
      <Website>
        <Helmet>
          <title>JeyzCuts</title>
          <meta name="description" content="JeyzCuts — Puerto Rico's premier barbershop." />
        </Helmet>
        <ScrollRestoration />
        {children}
      </Website>
    );
  }

  return (
    <Website>
      <Helmet>
        <title>JeyzCuts — Premium Barbershop Puerto Rico</title>
        <meta
          name="description"
          content="JeyzCuts — Puerto Rico's premier barbershop. Fades, lineups, diseños y más. Reserva tu cita hoy. Área Sur, Puerto Rico."
        />
      </Helmet>
      <ScrollRestoration />
      <Header />
      {children}
      <Footer />
    </Website>
  );
}

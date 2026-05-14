import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, User, Phone, Mail, Scissors, CheckCircle, Loader2 } from 'lucide-react';
import { useSession } from '@/lib/auth/auth-client';

interface Service {
  id: number;
  name: string;
  price: string;
  duration: number;
}

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
];

export default function BookingForm() {
  const { user } = useSession();
  const [services, setServices] = useState<Service[]>([]);
  const [form, setForm] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    serviceId: '',
    date: '',
    time: '',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/services')
      .then((r) => r.json())
      .then((data) => setServices(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  // Pre-fill from logged-in user
  useEffect(() => {
    if (user) {
      setForm((f) => ({
        ...f,
        clientName: user.name ?? f.clientName,
        clientEmail: user.email ?? f.clientEmail,
      }));
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Error al reservar');
      }
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al reservar');
    } finally {
      setSubmitting(false);
    }
  };

  // Get today's date as min
  const today = new Date().toISOString().split('T')[0];

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
          style={{ background: 'rgba(46,255,135,0.15)', border: '1px solid rgba(46,255,135,0.4)' }}
        >
          <CheckCircle size={32} style={{ color: '#2eff87' }} />
        </motion.div>
        <h3
          className="text-3xl font-black text-white mb-3"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          ¡Cita Reservada!
        </h3>
        <p className="text-white/50 mb-8 max-w-sm">
          Te contactaremos pronto para confirmar tu cita. ¡Nos vemos en JeyzCuts!
        </p>
        <button
          onClick={() => { setSuccess(false); setForm({ clientName: user?.name ?? '', clientEmail: user?.email ?? '', clientPhone: '', serviceId: '', date: '', time: '', notes: '' }); }}
          className="px-6 py-3 text-sm font-bold tracking-widest uppercase text-white rounded-sm"
          style={{ background: '#ff2ea6' }}
        >
          Reservar Otra Cita
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-white/40 mb-2">
            <User size={11} /> Nombre *
          </label>
          <input
            type="text" required
            value={form.clientName}
            onChange={(e) => setForm({ ...form, clientName: e.target.value })}
            placeholder="Tu nombre"
            className="w-full px-4 py-3 text-sm text-white rounded-sm outline-none transition-all"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,46,166,0.2)' }}
            onFocus={(e) => (e.target.style.borderColor = '#ff2ea6')}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(255,46,166,0.2)')}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-white/40 mb-2">
            <Phone size={11} /> Teléfono *
          </label>
          <input
            type="tel" required
            value={form.clientPhone}
            onChange={(e) => setForm({ ...form, clientPhone: e.target.value })}
            placeholder="787-000-0000"
            className="w-full px-4 py-3 text-sm text-white rounded-sm outline-none transition-all"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,46,166,0.2)' }}
            onFocus={(e) => (e.target.style.borderColor = '#ff2ea6')}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(255,46,166,0.2)')}
          />
        </div>

        {/* Email */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-white/40 mb-2">
            <Mail size={11} /> Email *
          </label>
          <input
            type="email" required
            value={form.clientEmail}
            onChange={(e) => setForm({ ...form, clientEmail: e.target.value })}
            placeholder="tu@email.com"
            className="w-full px-4 py-3 text-sm text-white rounded-sm outline-none transition-all"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,46,166,0.2)' }}
            onFocus={(e) => (e.target.style.borderColor = '#ff2ea6')}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(255,46,166,0.2)')}
          />
        </div>

        {/* Service */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-white/40 mb-2">
            <Scissors size={11} /> Servicio
          </label>
          <select
            value={form.serviceId}
            onChange={(e) => setForm({ ...form, serviceId: e.target.value })}
            className="w-full px-4 py-3 text-sm text-white rounded-sm outline-none"
            style={{ background: '#111', border: '1px solid rgba(255,46,166,0.2)' }}
          >
            <option value="">Seleccionar servicio</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} — ${s.price}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-white/40 mb-2">
            <Calendar size={11} /> Fecha *
          </label>
          <input
            type="date" required
            min={today}
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full px-4 py-3 text-sm text-white rounded-sm outline-none"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,46,166,0.2)', colorScheme: 'dark' }}
            onFocus={(e) => (e.target.style.borderColor = '#ff2ea6')}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(255,46,166,0.2)')}
          />
        </div>

        {/* Time */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-white/40 mb-2">
            <Clock size={11} /> Hora *
          </label>
          <select
            required
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            className="w-full px-4 py-3 text-sm text-white rounded-sm outline-none"
            style={{ background: '#111', border: '1px solid rgba(255,46,166,0.2)' }}
          >
            <option value="">Seleccionar hora</option>
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-xs font-bold tracking-widest uppercase text-white/40 mb-2">
          Notas (opcional)
        </label>
        <textarea
          rows={3}
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          placeholder="Tipo de corte, referencias, etc."
          className="w-full px-4 py-3 text-sm text-white rounded-sm outline-none resize-none"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,46,166,0.2)' }}
          onFocus={(e) => (e.target.style.borderColor = '#ff2ea6')}
          onBlur={(e) => (e.target.style.borderColor = 'rgba(255,46,166,0.2)')}
        />
      </div>

      {error && (
        <div
          className="px-4 py-3 rounded-sm text-sm"
          style={{ background: 'rgba(255,46,60,0.1)', border: '1px solid rgba(255,46,60,0.3)', color: '#ff6b6b' }}
        >
          {error}
        </div>
      )}

      {!user && (
        <p className="text-xs text-white/30">
          ¿Tienes cuenta?{' '}
          <a href="/login" className="hover:text-primary transition-colors" style={{ color: '#ff2ea6' }}>
            Inicia sesión
          </a>{' '}
          para reservar más rápido.
        </p>
      )}

      <motion.button
        type="submit"
        disabled={submitting}
        className="w-full flex items-center justify-center gap-2 py-4 text-sm font-bold tracking-widest uppercase text-white rounded-sm disabled:opacity-60"
        style={{ background: '#ff2ea6', boxShadow: '0 0 20px rgba(255,46,166,0.3)' }}
        whileHover={{ scale: submitting ? 1 : 1.02 }}
        whileTap={{ scale: submitting ? 1 : 0.98 }}
      >
        {submitting ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <>
            <Scissors size={16} />
            Confirmar Cita
          </>
        )}
      </motion.button>
    </form>
  );
}

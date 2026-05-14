import { useEffect, useState } from 'react';
import { Calendar, Clock, User, Phone, CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface Appointment {
  id: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  date: string;
  time: string;
  notes?: string;
  status: string;
}

interface Row {
  appointment: Appointment;
  service: { name: string; price: string } | null;
}

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  pending: { bg: 'rgba(255,165,0,0.15)', text: '#ffa500', label: 'Pendiente' },
  confirmed: { bg: 'rgba(46,255,135,0.15)', text: '#2eff87', label: 'Confirmada' },
  completed: { bg: 'rgba(100,100,255,0.15)', text: '#8888ff', label: 'Completada' },
  cancelled: { bg: 'rgba(255,46,60,0.15)', text: '#ff6b6b', label: 'Cancelada' },
};

export default function DashboardAppointments({ isAdmin }: { isAdmin: boolean }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<number | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/appointments', { credentials: 'include' });
      const data = await res.json();
      setRows(Array.isArray(data) ? data : []);
    } catch {
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const updateStatus = async (id: number, status: string) => {
    setUpdating(id);
    try {
      await fetch(`/api/appointments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status }),
      });
      await fetchData();
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="animate-spin" style={{ color: '#ff2ea6' }} />
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="text-center py-20">
        <Calendar size={40} className="mx-auto mb-4 opacity-20" style={{ color: '#ff2ea6' }} />
        <p className="text-white/40">No hay citas todavía</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-white/40">{rows.length} cita{rows.length !== 1 ? 's' : ''}</p>
      {rows.map(({ appointment: apt, service }) => {
        const s = statusColors[apt.status] ?? statusColors.pending;
        return (
          <div
            key={apt.id}
            className="p-5 rounded-sm"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,46,166,0.12)' }}
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <User size={14} style={{ color: '#ff2ea6' }} />
                  <span className="text-sm font-bold text-white">{apt.clientName}</span>
                  <span
                    className="px-2 py-0.5 text-xs font-bold rounded-sm"
                    style={{ background: s.bg, color: s.text }}
                  >
                    {s.label}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-xs text-white/50">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {apt.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {apt.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone size={12} /> {apt.clientPhone}
                  </span>
                  {service && (
                    <span style={{ color: '#ff2ea6' }}>
                      {service.name} — ${service.price}
                    </span>
                  )}
                </div>
                {apt.notes && <p className="text-xs text-white/30 italic">"{apt.notes}"</p>}
              </div>

              {isAdmin && apt.status === 'pending' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => updateStatus(apt.id, 'confirmed')}
                    disabled={updating === apt.id}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-sm transition-all"
                    style={{ background: 'rgba(46,255,135,0.15)', color: '#2eff87', border: '1px solid rgba(46,255,135,0.3)' }}
                  >
                    {updating === apt.id ? <Loader2 size={12} className="animate-spin" /> : <CheckCircle size={12} />}
                    Confirmar
                  </button>
                  <button
                    onClick={() => updateStatus(apt.id, 'cancelled')}
                    disabled={updating === apt.id}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-sm transition-all"
                    style={{ background: 'rgba(255,46,60,0.1)', color: '#ff6b6b', border: '1px solid rgba(255,46,60,0.2)' }}
                  >
                    <XCircle size={12} />
                    Cancelar
                  </button>
                </div>
              )}
              {isAdmin && apt.status === 'confirmed' && (
                <button
                  onClick={() => updateStatus(apt.id, 'completed')}
                  disabled={updating === apt.id}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-sm"
                  style={{ background: 'rgba(100,100,255,0.15)', color: '#8888ff', border: '1px solid rgba(100,100,255,0.3)' }}
                >
                  <CheckCircle size={12} />
                  Completar
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

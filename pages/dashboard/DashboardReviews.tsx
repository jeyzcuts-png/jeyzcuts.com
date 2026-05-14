import { useEffect, useState } from 'react';
import { Star, Trash2, Loader2, CheckCircle, XCircle } from 'lucide-react';

interface Review {
  id: number;
  clientName: string;
  clientEmail?: string;
  rating: number;
  text: string;
  approved: boolean;
  createdAt: string;
}

export default function DashboardReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<number | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/reviews', { credentials: 'include' });
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const toggleApprove = async (id: number, approved: boolean) => {
    setUpdating(id);
    try {
      await fetch(`/api/reviews/${id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        credentials: 'include', body: JSON.stringify({ approved }),
      });
      await fetchData();
    } finally {
      setUpdating(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar esta reseña?')) return;
    setDeleting(id);
    try {
      await fetch(`/api/reviews/${id}`, { method: 'DELETE', credentials: 'include' });
      await fetchData();
    } finally {
      setDeleting(null);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 size={24} className="animate-spin" style={{ color: '#ff2ea6' }} /></div>;

  if (reviews.length === 0) {
    return (
      <div className="text-center py-20">
        <Star size={40} className="mx-auto mb-4 opacity-20" style={{ color: '#ff2ea6' }} />
        <p className="text-white/40">No hay reseñas todavía.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-white/40">{reviews.length} reseña{reviews.length !== 1 ? 's' : ''}</p>
      {reviews.map((r) => (
        <div
          key={r.id}
          className="p-5 rounded-sm"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${r.approved ? 'rgba(46,255,135,0.2)' : 'rgba(255,46,166,0.12)'}`,
          }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-bold text-white">{r.clientName}</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} fill={i < r.rating ? '#ff2ea6' : 'transparent'} style={{ color: '#ff2ea6' }} />
                  ))}
                </div>
                <span
                  className="px-2 py-0.5 text-xs font-bold rounded-sm"
                  style={
                    r.approved
                      ? { background: 'rgba(46,255,135,0.15)', color: '#2eff87' }
                      : { background: 'rgba(255,165,0,0.15)', color: '#ffa500' }
                  }
                >
                  {r.approved ? 'Aprobada' : 'Pendiente'}
                </span>
              </div>
              <p className="text-sm text-white/60 leading-relaxed">"{r.text}"</p>
              {r.clientEmail && <p className="text-xs text-white/30 mt-1">{r.clientEmail}</p>}
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => toggleApprove(r.id, !r.approved)}
                disabled={updating === r.id}
                className="p-2 rounded-sm transition-colors"
                style={{
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: r.approved ? '#ffa500' : '#2eff87',
                }}
                title={r.approved ? 'Desaprobar' : 'Aprobar'}
              >
                {updating === r.id ? <Loader2 size={14} className="animate-spin" /> : r.approved ? <XCircle size={14} /> : <CheckCircle size={14} />}
              </button>
              <button
                onClick={() => handleDelete(r.id)} disabled={deleting === r.id}
                className="p-2 rounded-sm text-white/40 hover:text-red-400"
                style={{ border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {deleting === r.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

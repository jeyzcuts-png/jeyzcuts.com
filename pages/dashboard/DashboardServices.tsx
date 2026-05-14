import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Loader2, Scissors, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Service {
  id: number;
  name: string;
  description?: string;
  price: string;
  duration?: number;
  imageUrl?: string;
  active: boolean;
  order: number;
}

const emptyForm = { name: '', description: '', price: '', duration: 30, imageUrl: '', order: 0 };

export default function DashboardServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/services');
      const data = await res.json();
      setServices(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const openCreate = () => { setForm(emptyForm); setEditId(null); setShowForm(true); };
  const openEdit = (s: Service) => {
    setForm({ name: s.name, description: s.description ?? '', price: s.price, duration: s.duration ?? 30, imageUrl: s.imageUrl ?? '', order: s.order });
    setEditId(s.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editId) {
        await fetch(`/api/services/${editId}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' },
          credentials: 'include', body: JSON.stringify({ ...form, active: true }),
        });
      } else {
        await fetch('/api/services', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          credentials: 'include', body: JSON.stringify(form),
        });
      }
      setShowForm(false);
      await fetchData();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este servicio?')) return;
    setDeleting(id);
    try {
      await fetch(`/api/services/${id}`, { method: 'DELETE', credentials: 'include' });
      await fetchData();
    } finally {
      setDeleting(null);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 size={24} className="animate-spin" style={{ color: '#ff2ea6' }} /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-white/40">{services.length} servicio{services.length !== 1 ? 's' : ''}</p>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 text-sm font-bold tracking-widest uppercase text-white rounded-sm"
          style={{ background: '#ff2ea6', boxShadow: '0 0 12px rgba(255,46,166,0.3)' }}
        >
          <Plus size={14} /> Agregar
        </button>
      </div>

      {/* Form modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.8)' }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-md p-6 rounded-sm"
              style={{ background: '#111', border: '1px solid rgba(255,46,166,0.3)' }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-black text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                  {editId ? 'Editar Servicio' : 'Nuevo Servicio'}
                </h3>
                <button onClick={() => setShowForm(false)} className="text-white/40 hover:text-white"><X size={18} /></button>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  { key: 'name', label: 'Nombre', type: 'text', required: true },
                  { key: 'description', label: 'Descripción', type: 'text' },
                  { key: 'price', label: 'Precio ($)', type: 'number', required: true },
                  { key: 'duration', label: 'Duración (min)', type: 'number' },
                  { key: 'imageUrl', label: 'URL de imagen', type: 'text' },
                  { key: 'order', label: 'Orden', type: 'number' },
                ].map(({ key, label, type, required }) => (
                  <div key={key}>
                    <label className="block text-xs font-bold tracking-widest uppercase text-white/40 mb-1">{label}</label>
                    <input
                      type={type}
                      required={required}
                      value={String(form[key as keyof typeof form])}
                      onChange={(e) => setForm({ ...form, [key]: type === 'number' ? Number(e.target.value) : e.target.value })}
                      className="w-full px-3 py-2 text-sm text-white rounded-sm outline-none"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,46,166,0.2)' }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold tracking-widest uppercase text-white rounded-sm"
                  style={{ background: '#ff2ea6' }}
                >
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                  Guardar
                </button>
                <button onClick={() => setShowForm(false)} className="px-4 py-2.5 text-sm text-white/40 hover:text-white rounded-sm border" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                  Cancelar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {services.length === 0 ? (
        <div className="text-center py-20">
          <Scissors size={40} className="mx-auto mb-4 opacity-20" style={{ color: '#ff2ea6' }} />
          <p className="text-white/40">No hay servicios. Agrega el primero.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((s) => (
            <div
              key={s.id}
              className="p-5 rounded-sm flex items-start justify-between gap-4"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,46,166,0.12)' }}
            >
              <div>
                <p className="font-bold text-white">{s.name}</p>
                <p className="text-xl font-black mt-0.5" style={{ color: '#ff2ea6', fontFamily: 'var(--font-heading)' }}>${s.price}</p>
                {s.description && <p className="text-xs text-white/40 mt-1">{s.description}</p>}
                <p className="text-xs text-white/30 mt-1">{s.duration} min</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => openEdit(s)} className="p-2 rounded-sm text-white/40 hover:text-white transition-colors" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => handleDelete(s.id)}
                  disabled={deleting === s.id}
                  className="p-2 rounded-sm text-white/40 hover:text-red-400 transition-colors"
                  style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  {deleting === s.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

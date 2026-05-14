import { useEffect, useState } from 'react';
import { Plus, Trash2, Loader2, Image, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GalleryItem {
  id: number;
  imageUrl: string;
  caption?: string;
  category: string;
}

export default function DashboardGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ imageUrl: '', caption: '', category: 'general' });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSave = async () => {
    if (!form.imageUrl) return;
    setSaving(true);
    try {
      await fetch('/api/gallery', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        credentials: 'include', body: JSON.stringify(form),
      });
      setShowForm(false);
      setForm({ imageUrl: '', caption: '', category: 'general' });
      await fetchData();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar esta imagen?')) return;
    setDeleting(id);
    try {
      await fetch(`/api/gallery/${id}`, { method: 'DELETE', credentials: 'include' });
      await fetchData();
    } finally {
      setDeleting(null);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 size={24} className="animate-spin" style={{ color: '#ff2ea6' }} /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-white/40">{items.length} imagen{items.length !== 1 ? 'es' : ''}</p>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-bold tracking-widest uppercase text-white rounded-sm"
          style={{ background: '#ff2ea6', boxShadow: '0 0 12px rgba(255,46,166,0.3)' }}
        >
          <Plus size={14} /> Agregar
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.8)' }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-md p-6 rounded-sm"
              style={{ background: '#111', border: '1px solid rgba(255,46,166,0.3)' }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-black text-white" style={{ fontFamily: 'var(--font-heading)' }}>Agregar Imagen</h3>
                <button onClick={() => setShowForm(false)} className="text-white/40 hover:text-white"><X size={18} /></button>
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase text-white/40 mb-1">URL de Imagen *</label>
                  <input
                    type="text" required value={form.imageUrl}
                    onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 text-sm text-white rounded-sm outline-none"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,46,166,0.2)' }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase text-white/40 mb-1">Descripción</label>
                  <input
                    type="text" value={form.caption}
                    onChange={(e) => setForm({ ...form, caption: e.target.value })}
                    className="w-full px-3 py-2 text-sm text-white rounded-sm outline-none"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,46,166,0.2)' }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase text-white/40 mb-1">Categoría</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 text-sm text-white rounded-sm outline-none"
                    style={{ background: '#1a1a1a', border: '1px solid rgba(255,46,166,0.2)' }}
                  >
                    <option value="general">General</option>
                    <option value="fade">Fade</option>
                    <option value="barba">Barba</option>
                    <option value="diseño">Diseño</option>
                  </select>
                </div>
                {form.imageUrl && (
                  <img src={form.imageUrl} alt="preview" className="w-full h-32 object-cover rounded-sm" onError={(e) => (e.currentTarget.style.display = 'none')} />
                )}
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSave} disabled={saving || !form.imageUrl}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold tracking-widest uppercase text-white rounded-sm disabled:opacity-50"
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

      {items.length === 0 ? (
        <div className="text-center py-20">
          <Image size={40} className="mx-auto mb-4 opacity-20" style={{ color: '#ff2ea6' }} />
          <p className="text-white/40">No hay imágenes en la galería.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {items.map((item) => (
            <div key={item.id} className="relative group rounded-sm overflow-hidden aspect-square">
              <img src={item.imageUrl} alt={item.caption ?? ''} className="w-full h-full object-cover" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.6)' }}>
                <button
                  onClick={() => handleDelete(item.id)} disabled={deleting === item.id}
                  className="p-2 rounded-full text-white hover:text-red-400 transition-colors"
                  style={{ background: 'rgba(0,0,0,0.5)' }}
                >
                  {deleting === item.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                </button>
              </div>
              {item.caption && (
                <div className="absolute bottom-0 left-0 right-0 px-2 py-1 text-xs text-white truncate" style={{ background: 'rgba(0,0,0,0.7)' }}>
                  {item.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

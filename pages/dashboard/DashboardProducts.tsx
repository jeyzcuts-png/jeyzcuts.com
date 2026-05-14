import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Loader2, Package, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Product {
  id: number;
  name: string;
  description?: string;
  price: string;
  stock: number;
  imageUrl?: string;
  category: string;
  active: boolean;
}

const emptyForm = { name: '', description: '', price: '', stock: 0, imageUrl: '', category: 'barberia' };

export default function DashboardProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const openCreate = () => { setForm(emptyForm); setEditId(null); setShowForm(true); };
  const openEdit = (p: Product) => {
    setForm({ name: p.name, description: p.description ?? '', price: p.price, stock: p.stock, imageUrl: p.imageUrl ?? '', category: p.category });
    setEditId(p.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editId) {
        await fetch(`/api/products/${editId}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' },
          credentials: 'include', body: JSON.stringify({ ...form, active: true }),
        });
      } else {
        await fetch('/api/products', {
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
    if (!confirm('¿Eliminar este producto?')) return;
    setDeleting(id);
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE', credentials: 'include' });
      await fetchData();
    } finally {
      setDeleting(null);
    }
  };

  const categoryLabel: Record<string, string> = { barberia: 'Barbería', drip: 'Drip', accesorios: 'Accesorios' };

  if (loading) return <div className="flex justify-center py-20"><Loader2 size={24} className="animate-spin" style={{ color: '#ff2ea6' }} /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-white/40">{products.length} producto{products.length !== 1 ? 's' : ''}</p>
        <button
          onClick={openCreate}
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
                <h3 className="text-lg font-black text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                  {editId ? 'Editar Producto' : 'Nuevo Producto'}
                </h3>
                <button onClick={() => setShowForm(false)} className="text-white/40 hover:text-white"><X size={18} /></button>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  { key: 'name', label: 'Nombre', type: 'text', required: true },
                  { key: 'description', label: 'Descripción', type: 'text' },
                  { key: 'price', label: 'Precio ($)', type: 'number', required: true },
                  { key: 'stock', label: 'Stock', type: 'number' },
                  { key: 'imageUrl', label: 'URL de imagen', type: 'text' },
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
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase text-white/40 mb-1">Categoría</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 text-sm text-white rounded-sm outline-none"
                    style={{ background: '#1a1a1a', border: '1px solid rgba(255,46,166,0.2)' }}
                  >
                    <option value="barberia">Barbería</option>
                    <option value="drip">Drip</option>
                    <option value="accesorios">Accesorios</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSave} disabled={saving}
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

      {products.length === 0 ? (
        <div className="text-center py-20">
          <Package size={40} className="mx-auto mb-4 opacity-20" style={{ color: '#ff2ea6' }} />
          <p className="text-white/40">No hay productos. Agrega el primero.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((p) => (
            <div
              key={p.id}
              className="p-5 rounded-sm flex items-start justify-between gap-4"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,46,166,0.12)' }}
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-bold text-white">{p.name}</p>
                  <span className="px-1.5 py-0.5 text-xs rounded-sm" style={{ background: 'rgba(255,46,166,0.15)', color: '#ff2ea6' }}>
                    {categoryLabel[p.category] ?? p.category}
                  </span>
                </div>
                <p className="text-xl font-black" style={{ color: '#ff2ea6', fontFamily: 'var(--font-heading)' }}>${p.price}</p>
                {p.description && <p className="text-xs text-white/40 mt-1">{p.description}</p>}
                <p className="text-xs text-white/30 mt-1">Stock: {p.stock}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => openEdit(p)} className="p-2 rounded-sm text-white/40 hover:text-white" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => handleDelete(p.id)} disabled={deleting === p.id}
                  className="p-2 rounded-sm text-white/40 hover:text-red-400"
                  style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  {deleting === p.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

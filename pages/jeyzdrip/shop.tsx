import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { ShoppingBag, Plus, Zap, Filter, Loader2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/lib/cart-store';
import CartDrawer from '@/components/CartDrawer';

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

const CATEGORIES = [
  { value: 'all', label: 'Todo' },
  { value: 'drip', label: 'Drip' },
  { value: 'barberia', label: 'Barbería' },
  { value: 'accesorios', label: 'Accesorios' },
];

function ProductCard({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category,
    });
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group relative flex flex-col rounded-sm overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,46,166,0.12)',
        transition: 'border-color 0.2s',
      }}
      whileHover={{ borderColor: 'rgba(255,46,166,0.4)' } as Record<string, string>}
    >
      {/* Image */}
      <div
        className="relative aspect-square overflow-hidden"
        style={{ background: 'rgba(255,46,166,0.05)' }}
      >
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingBag size={40} style={{ color: '#ff2ea6', opacity: 0.2 }} />
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span
            className="px-2 py-1 text-[10px] font-bold tracking-widest uppercase rounded-sm"
            style={{ background: 'rgba(0,0,0,0.7)', color: '#ff2ea6', backdropFilter: 'blur(4px)' }}
          >
            {product.category}
          </span>
        </div>

        {/* Out of stock overlay */}
        {product.stock === 0 && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.6)' }}
          >
            <span className="text-xs font-bold tracking-widest uppercase text-white/60">Agotado</span>
          </div>
        )}

        {/* Quick add on hover */}
        {product.stock > 0 && (
          <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <motion.button
              onClick={handleAdd}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold tracking-widest uppercase text-white rounded-sm"
              style={{
                background: added ? '#2eff87' : '#ff2ea6',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                color: added ? '#000' : '#fff',
                transition: 'background 0.2s, color 0.2s',
              }}
              whileTap={{ scale: 0.96 }}
            >
              {added ? '✓ Agregado' : <><Plus size={12} /> Agregar</>}
            </motion.button>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="text-sm font-bold text-white leading-tight">{product.name}</h3>
        {product.description && (
          <p className="text-xs text-white/40 leading-relaxed line-clamp-2">{product.description}</p>
        )}
        <div className="flex items-center justify-between mt-auto pt-2">
          <span
            className="text-xl font-black"
            style={{ color: '#ff2ea6', fontFamily: 'var(--font-heading)' }}
          >
            ${product.price}
          </span>
          {product.stock > 0 && product.stock <= 5 && (
            <span className="text-[10px] text-orange-400 font-bold">Últimas {product.stock}</span>
          )}
        </div>

        {/* Mobile add button */}
        <button
          onClick={handleAdd}
          disabled={product.stock === 0}
          className="md:hidden w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold tracking-widest uppercase text-white rounded-sm mt-1 disabled:opacity-40"
          style={{
            background: added ? '#2eff87' : '#ff2ea6',
            color: added ? '#000' : '#fff',
          }}
        >
          {added ? '✓ Agregado' : <><Plus size={12} /> Agregar al Carrito</>}
        </button>
      </div>
    </motion.div>
  );
}

export default function JeyzDripShop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const { count, toggleCart } = useCart();

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((data) => setProducts(Array.isArray(data) ? data.filter((p: Product) => p.active) : []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>JeyzDrip Shop — Streetwear Luxury</title>
        <meta name="description" content="Compra la colección JeyzDrip — Streetwear Luxury de Puerto Rico." />
      </Helmet>

      <CartDrawer />

      <div className="min-h-screen" style={{ background: '#050505' }}>
        {/* Grid bg */}
        <div
          className="fixed inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,46,166,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,46,166,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Shop Header */}
        <div
          className="sticky top-0 z-40 border-b"
          style={{ background: 'rgba(5,5,5,0.95)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,46,166,0.15)' }}
        >
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Left */}
              <div className="flex items-center gap-4">
                <Link
                  to="/jeyzdrip"
                  className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors"
                >
                  <ArrowLeft size={14} />
                  <span className="hidden sm:inline">JeyzDrip</span>
                </Link>
                <div className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-2">
                  <Zap size={16} style={{ color: '#ff2ea6' }} />
                  <span
                    className="text-lg font-black text-white tracking-tight"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    JEYZ<span style={{ color: '#ff2ea6' }}>DRIP</span>
                  </span>
                  <span
                    className="px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase rounded-sm"
                    style={{ background: 'rgba(255,46,166,0.15)', color: '#ff2ea6' }}
                  >
                    Preview
                  </span>
                </div>
              </div>

              {/* Cart */}
              <motion.button
                onClick={toggleCart}
                className="relative flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-bold text-white"
                style={{ background: 'rgba(255,46,166,0.1)', border: '1px solid rgba(255,46,166,0.3)' }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <ShoppingBag size={16} style={{ color: '#ff2ea6' }} />
                <span className="hidden sm:inline text-xs tracking-widest uppercase">Carrito</span>
                {count() > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-white"
                    style={{ background: '#ff2ea6' }}
                  >
                    {count()}
                  </motion.span>
                )}
              </motion.button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-12 relative z-10">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h1
              className="text-5xl md:text-7xl font-black tracking-tight text-white mb-3"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              La <span style={{ color: '#ff2ea6' }}>Colección</span>
            </h1>
            <p className="text-white/40 tracking-widest uppercase text-sm">
              Streetwear Luxury — Puerto Rico
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 mb-10 flex-wrap"
          >
            <Filter size={14} className="text-white/30" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className="px-4 py-2 text-xs font-bold tracking-widest uppercase rounded-sm transition-all"
                style={
                  activeCategory === cat.value
                    ? { background: '#ff2ea6', color: '#fff', boxShadow: '0 0 12px rgba(255,46,166,0.4)' }
                    : { background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.08)' }
                }
              >
                {cat.label}
              </button>
            ))}
            <span className="ml-auto text-xs text-white/30">
              {filtered.length} producto{filtered.length !== 1 ? 's' : ''}
            </span>
          </motion.div>

          {/* Products grid */}
          {loading ? (
            <div className="flex items-center justify-center py-32">
              <Loader2 size={28} className="animate-spin" style={{ color: '#ff2ea6' }} />
            </div>
          ) : filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32"
            >
              <ShoppingBag size={48} className="mx-auto mb-4 opacity-10" style={{ color: '#ff2ea6' }} />
              <p className="text-white/30 text-lg font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                Productos próximamente
              </p>
              <p className="text-white/20 text-sm mt-2">
                Agrega productos desde el dashboard de admin
              </p>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            >
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          )}

          {/* Coming soon banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-20 p-8 rounded-sm text-center relative overflow-hidden"
            style={{ background: 'rgba(255,46,166,0.05)', border: '1px solid rgba(255,46,166,0.2)' }}
          >
            <div
              className="absolute inset-0 opacity-30"
              style={{ background: 'radial-gradient(ellipse at center, rgba(255,46,166,0.15) 0%, transparent 70%)' }}
            />
            <div className="relative z-10">
              <span
                className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-sm mb-4"
                style={{ background: 'rgba(255,46,166,0.15)', color: '#ff2ea6' }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#ff2ea6' }} />
                Lanzamiento Completo — Sep 2026
              </span>
              <h3
                className="text-3xl font-black text-white mb-2"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Checkout Completo Próximamente
              </h3>
              <p className="text-white/40 text-sm">
                Pagos, envíos y más — todo integrado cuando lancemos oficialmente.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

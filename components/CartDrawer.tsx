import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/lib/cart-store';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, total, count, clearCart } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm flex flex-col"
            style={{
              background: '#0a0a0a',
              borderLeft: '1px solid rgba(255,46,166,0.25)',
              boxShadow: '-20px 0 60px rgba(255,46,166,0.08)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5 border-b"
              style={{ borderColor: 'rgba(255,46,166,0.15)' }}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} style={{ color: '#ff2ea6' }} />
                <h2
                  className="text-lg font-black text-white tracking-tight"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Tu Carrito
                </h2>
                {count() > 0 && (
                  <span
                    className="px-2 py-0.5 text-xs font-bold rounded-full text-white"
                    style={{ background: '#ff2ea6' }}
                  >
                    {count()}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-white/40 hover:text-white transition-colors rounded-sm"
                style={{ border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <ShoppingBag size={40} className="mb-4 opacity-20" style={{ color: '#ff2ea6' }} />
                  <p className="text-white/40 text-sm">Tu carrito está vacío</p>
                  <button
                    onClick={closeCart}
                    className="mt-6 text-xs font-bold tracking-widest uppercase transition-colors"
                    style={{ color: '#ff2ea6' }}
                  >
                    Seguir Comprando →
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex gap-4 p-3 rounded-sm"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,46,166,0.1)',
                      }}
                    >
                      {/* Image */}
                      <div
                        className="w-16 h-16 rounded-sm flex-shrink-0 overflow-hidden"
                        style={{ background: 'rgba(255,46,166,0.08)' }}
                      >
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingBag size={20} style={{ color: '#ff2ea6', opacity: 0.4 }} />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate">{item.name}</p>
                        <p className="text-sm font-black mt-0.5" style={{ color: '#ff2ea6', fontFamily: 'var(--font-heading)' }}>
                          ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                        </p>

                        {/* Qty controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQty(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center rounded-sm text-white/60 hover:text-white transition-colors"
                            style={{ border: '1px solid rgba(255,255,255,0.12)' }}
                          >
                            <Minus size={10} />
                          </button>
                          <span className="text-xs font-bold text-white w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQty(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center rounded-sm text-white/60 hover:text-white transition-colors"
                            style={{ border: '1px solid rgba(255,255,255,0.12)' }}
                          >
                            <Plus size={10} />
                          </button>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-white/20 hover:text-red-400 transition-colors self-start"
                      >
                        <Trash2 size={14} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div
                className="px-6 py-5 border-t"
                style={{ borderColor: 'rgba(255,46,166,0.15)' }}
              >
                {/* Subtotal */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-white/50 tracking-widest uppercase text-xs font-bold">
                    Subtotal
                  </span>
                  <span
                    className="text-2xl font-black text-white"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    ${total().toFixed(2)}
                  </span>
                </div>

                {/* Checkout CTA */}
                <motion.button
                  className="w-full flex items-center justify-center gap-2 py-4 text-sm font-bold tracking-widest uppercase text-white rounded-sm"
                  style={{ background: '#ff2ea6', boxShadow: '0 0 20px rgba(255,46,166,0.3)' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => alert('Checkout próximamente — JeyzDrip lanza pronto!')}
                >
                  Proceder al Pago
                  <ArrowRight size={14} />
                </motion.button>

                <button
                  onClick={clearCart}
                  className="w-full mt-3 text-xs text-white/30 hover:text-white/60 transition-colors tracking-widest uppercase"
                >
                  Vaciar carrito
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

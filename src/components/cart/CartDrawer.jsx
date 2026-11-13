// Slide-in cart. Esc and overlay click close it.
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';
import CartItem from './CartItem.jsx';
import WhatsAppCheckout from './WhatsAppCheckout.jsx';

export default function CartDrawer() {
  const { open, setOpen, lines } = useCart();
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [open, setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[90]">
          <motion.div className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.aside role="dialog" aria-modal="true" aria-label="Your cart" className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-black-soft p-6"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-2xl text-white">Your cart</h2>
              <button autoFocus onClick={() => setOpen(false)} aria-label="Close cart" className="flex h-11 w-11 items-center justify-center text-ash-light"><X size={24} strokeWidth={1.5} /></button>
            </div>
            {lines.length === 0 ? (
              <p className="mt-6 text-ash">Nothing here yet. <Link to="/shop" onClick={() => setOpen(false)} className="text-gold-light underline">Browse the shop</Link>.</p>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto">{lines.map((l) => <CartItem key={l.id + l.size} line={l} />)}</ul>
                <WhatsAppCheckout />
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

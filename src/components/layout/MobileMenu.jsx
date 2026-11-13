// Full-screen menu with staggered links. Esc closes.
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { navLinks } from '../../data/navigation.js';
import Logo from '../brand/Logo.jsx';

/** @param {{open:boolean, onClose:()=>void}} props */
export default function MobileMenu({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-black px-6 pb-10 pt-5" data-lenis-prevent
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <div className="flex items-center justify-between">
            <Logo />
            <button onClick={onClose} aria-label="Close menu" className="flex h-11 w-11 items-center justify-center text-ash-light"><X size={24} strokeWidth={1.5} /></button>
          </div>
          <nav aria-label="Mobile main" className="mt-12 flex flex-col">
            {navLinks.map((l, i) => (
              <motion.div key={l.to} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}>
                <Link to={l.to} onClick={onClose} className="block border-b border-ash-dark py-3 font-display text-3xl font-semibold text-white hover:text-gold-light">{l.label}</Link>
              </motion.div>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// A native modal drawer keeps focus and scrolling inside the mobile navigation.
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink } from 'react-router-dom';
import { ArrowUpRight, X } from 'lucide-react';
import { navLinks } from '../../data/navigation.js';
import Logo from '../brand/Logo.jsx';

/** @param {{open:boolean, onClose:()=>void}} props */
export default function MobileMenu({ open, onClose }) {
  const dialog = useRef(null);
  const closeButton = useRef(null);

  useEffect(() => {
    if (!open) return;
    const modal = dialog.current;
    const opener = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const desktop = window.matchMedia('(min-width: 1024px)');
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const animations = [];
    document.body.style.overflow = 'hidden';
    modal.showModal();
    closeButton.current.focus({ preventScroll: true });

    if (!preference.matches && typeof modal.animate === 'function') {
      try {
        animations.push(modal.animate([
          { opacity: 0, transform: 'translateX(28px)' },
          { opacity: 1, transform: 'translateX(0)' },
        ], { duration: 260, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }));
        modal.querySelectorAll('[data-menu-link]').forEach((link, index) => {
          animations.push(link.animate([
            { opacity: 0, transform: 'translateY(10px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ], { duration: 280, delay: 40 + index * 40, fill: 'backwards', easing: 'ease-out' }));
        });
      } catch { animations.forEach(animation => animation.cancel()); }
    }

    const resize = () => { if (desktop.matches) onClose(); };
    const reduce = () => { if (preference.matches) animations.forEach(animation => animation.cancel()); };
    desktop.addEventListener('change', resize);
    preference.addEventListener('change', reduce);
    resize();
    return () => {
      desktop.removeEventListener('change', resize);
      preference.removeEventListener('change', reduce);
      animations.forEach(animation => animation.cancel());
      modal.close();
      document.body.style.overflow = previousOverflow;
      if (opener?.isConnected && opener.getClientRects().length) opener.focus({ preventScroll: true });
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <dialog ref={dialog} id="mobile-menu" aria-label="Menu" data-lenis-prevent
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClose={(event) => { if (!event.currentTarget.open) onClose(); }}
      onKeyDown={(event) => {
        if (event.key !== 'Tab') return;
        const controls = [...event.currentTarget.querySelectorAll('a[href], button:not([disabled])')];
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
      }}
      className="fixed inset-y-0 left-auto right-0 m-0 h-[100dvh] max-h-none w-full max-w-[26rem] overflow-hidden border-0 border-l border-ash-dark bg-black p-0 text-ash-light backdrop:bg-black/75">
      <div className="flex h-full min-h-0 flex-col" style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <div className="flex min-h-[80px] shrink-0 items-center justify-between gap-3 border-b border-ash-dark px-5 sm:px-6">
          <Link to="/" onClick={onClose} aria-label="Sports Wings home" className="inline-flex min-w-0"><Logo /></Link>
          <button ref={closeButton} type="button" onClick={onClose} aria-label="Close menu"
            className="flex h-11 w-11 shrink-0 items-center justify-center border border-ash-dark text-white transition-colors hover:border-gold hover:text-gold-light">
            <X size={22} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Mobile main" className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-8 sm:px-6" data-lenis-prevent>
          <p className="eyebrow mb-5">Explore</p>
          {navLinks.map((link, index) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} onClick={onClose} data-menu-link
              className={({ isActive }) => `group flex min-h-[76px] items-center gap-4 border-b border-ash-dark px-2 py-5 transition-colors ${isActive ? 'bg-gold/5 text-gold-light' : 'text-white hover:bg-black-soft hover:text-gold-light'}`}>
              <span className="text-xs tabular-nums text-ash" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <span className="min-w-0 flex-1 font-display text-[clamp(1.5rem,6vw,2rem)] font-semibold leading-tight">{link.label}</span>
              <ArrowUpRight size={22} strokeWidth={1.5} className="shrink-0 text-gold" aria-hidden="true" />
            </NavLink>
          ))}
        </nav>
        <div className="shrink-0 border-t border-ash-dark px-5 py-5 text-sm text-ash sm:px-6">Made for your next game.</div>
      </div>
    </dialog>, document.body,
  );
}

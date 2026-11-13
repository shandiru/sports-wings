import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

/** A native modal keeps keyboard focus inside and supports Escape to close. */
export default function ImagePreview({ product, onClose, onPrevious, onNext, position, total }) {
  const dialog = useRef(null);
  const closing = useRef(false);

  const requestClose = () => {
    if (closing.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || typeof dialog.current.animate !== 'function') {
      onClose();
      return;
    }
    closing.current = true;
    try {
      const animation = dialog.current.animate([
        { opacity: 1, transform: 'translateY(0) scale(1)' },
        { opacity: 0, transform: 'translateY(8px) scale(0.985)' },
      ], { duration: 160, easing: 'ease-in', fill: 'forwards' });
      animation.finished.then(onClose, () => {});
    } catch { onClose(); }
  };

  useEffect(() => {
    const modal = dialog.current;
    const opener = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    modal.showModal();
    let entrance;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!preference.matches && typeof modal.animate === 'function') {
      try {
        entrance = modal.animate([
          { opacity: 0, transform: 'translateY(16px) scale(0.985)' },
          { opacity: 1, transform: 'translateY(0) scale(1)' },
        ], { duration: 260, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });
      } catch { /* The native preview stays usable without animation. */ }
    }
    const stop = () => { if (preference.matches) entrance?.cancel(); };
    preference.addEventListener('change', stop);
    return () => {
      preference.removeEventListener('change', stop);
      entrance?.cancel();
      modal.close();
      document.body.style.overflow = previousOverflow;
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, []);

  return createPortal(
    <dialog ref={dialog} aria-labelledby="image-preview-title" data-lenis-prevent
      onClose={(event) => { if (!event.currentTarget.open) onClose(); }}
      onCancel={(event) => { event.preventDefault(); requestClose(); }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft' && onPrevious) { event.preventDefault(); onPrevious(); }
        if (event.key === 'ArrowRight' && onNext) { event.preventDefault(); onNext(); }
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) requestClose();
      }}
      className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-5xl overflow-y-auto border border-ash-dark bg-black p-0 text-ash-light backdrop:bg-black/85">
      <div className="flex items-center justify-between gap-4 border-b border-ash-dark px-4 py-3 sm:px-6">
        <h3 id="image-preview-title" className="text-lg text-white">{product.name}</h3>
        <button type="button" autoFocus onClick={requestClose} aria-label="Close image preview"
          className="inline-flex min-h-11 shrink-0 items-center gap-2 border border-ash-dark px-3 text-sm text-white hover:border-gold hover:text-gold-light">
          <X size={20} aria-hidden="true" />Close
        </button>
      </div>
      <img src={product.images[0]} alt={product.name} decoding="async"
        className="h-[65dvh] min-h-[160px] w-full bg-black-soft object-contain p-4 sm:p-6" />
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ash-dark px-4 py-4 sm:px-6">
        <div className="flex items-center gap-2 sm:gap-4">
          {onPrevious && <button type="button" onClick={onPrevious} aria-label="Previous image" className="flex h-11 w-11 items-center justify-center border border-ash-dark text-white hover:border-gold hover:text-gold-light"><ArrowLeft size={18} aria-hidden="true" /></button>}
          {total && <span aria-live="polite" className="text-xs tabular-nums text-ash-light">{String(position).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>}
          {onNext && <button type="button" onClick={onNext} aria-label="Next image" className="flex h-11 w-11 items-center justify-center border border-ash-dark text-white hover:border-gold hover:text-gold-light"><ArrowRight size={18} aria-hidden="true" /></button>}
        </div>
        <Link to={`/product/${product.slug}`} onClick={onClose} className="btn-text">View product</Link>
      </div>
    </dialog>, document.body,
  );
}

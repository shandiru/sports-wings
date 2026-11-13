// Single-line dismissable announcement.
import { X } from 'lucide-react';

/** @param {{onClose:()=>void}} props */
export default function AnnouncementBar({ onClose }) {
  return (
    <div className="relative bg-black-soft px-12 py-2 text-center text-[0.875rem] text-ash-light">
      Bulk kit pricing for clubs and schools. Message us for a quote.
      <button onClick={onClose} aria-label="Dismiss announcement" className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-ash hover:text-gold">
        <X size={18} strokeWidth={1.5} />
      </button>
    </div>
  );
}

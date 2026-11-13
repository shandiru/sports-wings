// Small floating WhatsApp link, bottom right.
import { MessageCircle } from 'lucide-react';
import { waLink } from '../../lib/whatsapp.js';

export default function WhatsAppButton() {
  return (
    <a href={waLink()} target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center border border-gold/60 bg-black-soft text-gold-light transition-colors hover:bg-gold hover:text-black">
      <MessageCircle size={22} strokeWidth={1.5} />
    </a>
  );
}

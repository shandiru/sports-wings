// Small floating WhatsApp link, bottom right.
import WhatsAppIcon from '../brand/WhatsAppIcon.jsx';
import { waLink } from '../../lib/whatsapp.js';

export default function WhatsAppButton() {
  return (
    <a href={waLink()} target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-colors hover:bg-[#1DA851]">
      <WhatsAppIcon size={28} />
    </a>
  );
}

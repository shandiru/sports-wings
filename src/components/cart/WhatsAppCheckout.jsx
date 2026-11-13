// Sends the cart as a WhatsApp order message.
import { useCart } from '../../context/CartContext.jsx';
import { orderLink } from '../../lib/whatsapp.js';
import { money } from '../../lib/format.js';
import Button from '../ui/Button.jsx';

export default function WhatsAppCheckout() {
  const { lines, total } = useCart();
  return (
    <div className="border-t border-ash-dark pt-5">
      <p className="mb-4 flex justify-between text-white"><span>Total</span><span className="font-semibold">{money(total)}</span></p>
      <Button href={orderLink(lines)} target="_blank" rel="noreferrer" className="w-full">Order on WhatsApp</Button>
      <p className="mt-3 text-[0.875rem] text-ash">We confirm stock and arrange pick-up or delivery on WhatsApp. No payment is taken here.</p>
    </div>
  );
}

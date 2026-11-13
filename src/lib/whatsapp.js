// Builds wa.me links for orders and enquiries.
import { site } from '../data/site.js';
import { money, unitPrice } from './format.js';

/** @param {string} text */
export const waLink = (text = 'Hello Sports Wings, I have a question.') =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

/** @param {{product:object,size:string,qty:number}[]} lines */
export const orderLink = (lines) => {
  const body = lines.map((l) => `- ${l.qty} x ${l.product.brand} ${l.product.name}${l.size ? ` (${l.size})` : ''}, ${money(unitPrice(l.product) * l.qty)}`).join('\n');
  const total = lines.reduce((s, l) => s + unitPrice(l.product) * l.qty, 0);
  return waLink(`Hello Sports Wings, I would like to order:\n${body}\nTotal: ${money(total)}\nPlease confirm stock and pick-up or delivery.`);
};

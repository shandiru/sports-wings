// One cart row with quantity controls.
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';
import { money, unitPrice } from '../../lib/format.js';
import ProductVisual from '../ui/ProductVisual.jsx';

/** @param {{line:{product:object,size:string,qty:number}}} props */
export default function CartItem({ line }) {
  const { setQty, remove } = useCart();
  const { product: p, size, qty } = line;
  const btn = 'flex h-11 w-11 items-center justify-center text-ash-light hover:text-gold-light';
  return (
    <li className="flex gap-4 border-b border-ash-dark py-5">
      <ProductVisual product={p} className="w-24 shrink-0" />
      <div className="flex flex-1 flex-col">
        <p className="text-[0.875rem] text-ash">{p.brand}</p>
        <p className="font-semibold text-white">{p.name}</p>
        {size && <p className="text-[0.875rem] text-ash">{size}</p>}
        <p className="mt-1 text-ash-light">{money(unitPrice(p) * qty)}</p>
        <div className="mt-auto flex items-center">
          <button className={btn} aria-label="Decrease quantity" onClick={() => setQty(p.id, size, qty - 1)}><Minus size={18} strokeWidth={1.5} /></button>
          <span className="w-8 text-center" aria-live="polite">{qty}</span>
          <button className={btn} aria-label="Increase quantity" onClick={() => setQty(p.id, size, qty + 1)}><Plus size={18} strokeWidth={1.5} /></button>
          <button className={`${btn} ml-auto`} aria-label={`Remove ${p.name}`} onClick={() => remove(p.id, size)}><Trash2 size={18} strokeWidth={1.5} /></button>
        </div>
      </div>
    </li>
  );
}

// Product title, price, size picker, add to cart and WhatsApp order.
import { useState } from 'react';
import { useCart } from '../../context/CartContext.jsx';
import { money } from '../../lib/format.js';
import { orderLink } from '../../lib/whatsapp.js';
import Button from '../ui/Button.jsx';
import SizeSelector from './SizeSelector.jsx';

/** @param {{product:object}} props */
export default function ProductInfo({ product: p }) {
  const { add } = useCart();
  const [size, setSize] = useState(p.sizes.length === 1 ? p.sizes[0] : '');
  const [warn, setWarn] = useState(false);
  const needs = p.sizes.length > 0 && !size;
  const guard = (fn) => () => (needs ? setWarn(true) : fn());
  return (
    <div>
      <p className="text-ash">{p.brand}</p>
      <h1 className="mt-1 text-[clamp(2rem,4vw,3rem)] text-white">{p.name}</h1>
      <p className="mt-4 flex items-baseline gap-4 text-2xl text-white">
        {money(p.salePrice ?? p.price)}{p.salePrice && <s className="text-lg text-ash">{money(p.price)}</s>}
      </p>
      <p className="prose-line mt-6 text-ash-light">{p.description}</p>
      {p.sizes.length > 0 && <div className="mt-8"><SizeSelector sizes={p.sizes} value={size} onChange={(s) => { setSize(s); setWarn(false); }} />
        {warn && <p role="alert" className="mt-3 text-[0.9375rem] text-gold-light">Choose a size first.</p>}</div>}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button arrow={false} onClick={guard(() => add(p.id, size))}>Add to cart</Button>
        <Button variant="text" href={needs ? undefined : orderLink([{ product: p, size, qty: 1 }])} target="_blank" rel="noreferrer" onClick={needs ? () => setWarn(true) : undefined}>Order on WhatsApp</Button>
      </div>
      <p className="mt-4 text-[0.9375rem] text-ash">Exchange within 7 days if unused and in the original packaging. Bats are not exchangeable once knocked in.</p>
    </div>
  );
}

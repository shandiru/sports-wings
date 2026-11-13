// Product card: visual, brand, name, price, quick add.
import { Link } from 'react-router-dom';
import { Maximize2, Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';
import { money } from '../../lib/format.js';
import ProductVisual from '../ui/ProductVisual.jsx';

/** @param {{product:object, className?:string, preserveImage?:boolean, onPreview?:(product:object)=>void}} props */
export default function ProductCard({ product: p, className = '', preserveImage = false, onPreview }) {
  const { add } = useCart();
  const needsSize = p.sizes.length > 1;
  const quick = 'absolute inset-x-0 bottom-0 flex min-h-[48px] translate-y-full items-center justify-center gap-2 bg-black/90 text-[0.8125rem] font-bold uppercase tracking-[0.08em] text-white transition-transform duration-500 group-hover:translate-y-0 group-focus-within:translate-y-0 max-md:translate-y-0';
  return (
    <article className={`group relative ${className}`}>
      <div className="relative overflow-hidden">
        <Link to={`/product/${p.slug}`} tabIndex={-1} aria-hidden="true" className={`block transition-transform duration-500 motion-reduce:transform-none ${preserveImage ? 'group-hover:scale-[1.025]' : 'group-hover:scale-[1.04]'}`}><ProductVisual product={p} preserveImage={preserveImage} /></Link>
        {p.badge && <span className="absolute left-3 top-3 bg-black px-2 py-1 text-[0.8125rem] font-semibold text-gold-light">{p.badge}</span>}
        {onPreview && p.images?.[0] && (
          <button type="button" onClick={() => onPreview(p)} aria-label={`Enlarge ${p.name}`}
            className="absolute right-3 top-3 inline-flex min-h-11 items-center gap-2 bg-black/90 px-3 text-sm text-white transition-colors hover:text-gold-light">
            <Maximize2 size={16} aria-hidden="true" />Preview
          </button>
        )}
        {needsSize
          ? <Link to={`/product/${p.slug}`} className={quick}>Choose size</Link>
          : <button className={quick} onClick={() => add(p.id, p.sizes[0] ?? '')}><Plus size={16} strokeWidth={1.5} />Quick add</button>}
      </div>
      <Link to={`/product/${p.slug}`} className="mt-4 block">
        <p className="text-[0.9375rem] text-ash">{p.brand}</p>
        <h3 className="underline-slide inline text-xl font-semibold text-white">{p.name}</h3>
        <p className="mt-1 flex gap-3 text-ash-light">
          <span className={p.salePrice ? 'font-semibold text-white' : ''}>{money(p.salePrice ?? p.price)}</span>
          {p.salePrice && <s className="text-ash">{money(p.price)}</s>}
        </p>
      </Link>
    </article>
  );
}

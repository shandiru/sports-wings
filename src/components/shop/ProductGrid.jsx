// Responsive product grid with a designed empty state.
import ProductCard from './ProductCard.jsx';
import Button from '../ui/Button.jsx';

/** @param {{items:object[], onReset?:()=>void}} props */
export default function ProductGrid({ items, onReset }) {
  if (!items.length) {
    return (
      <div className="border-t border-ash-dark py-20">
        <h2 className="text-3xl text-white">Nothing matches those filters.</h2>
        <p className="mt-3 text-ash">Try a different brand or price band, or ask the pro desk to find it for you.</p>
        {onReset && <Button variant="text" arrow={false} onClick={onReset} className="mt-6">Clear filters</Button>}
      </div>
    );
  }
  return <div className="grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-3 xl:grid-cols-4">{items.map((p) => <ProductCard key={p.id} product={p} />)}</div>;
}

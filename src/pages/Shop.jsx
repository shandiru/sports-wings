// Shop and category listing with filters, sort and search.
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products.js';
import { categories } from '../data/categories.js';
import { unitPrice } from '../lib/format.js';
import usePageTitle from '../lib/usePageTitle.js';
import Container from '../components/ui/Container.jsx';
import Breadcrumbs from '../components/shop/Breadcrumbs.jsx';
import ShopFilters, { priceBands } from '../components/shop/ShopFilters.jsx';
import SortSelect from '../components/shop/SortSelect.jsx';
import ProductGrid from '../components/shop/ProductGrid.jsx';
import NotFound from './NotFound.jsx';

/** @param {{lockedCategory?:string}} props */
export default function Shop({ lockedCategory }) {
  const [params] = useSearchParams();
  const q = (params.get('q') ?? '').toLowerCase();
  const cat = categories.find((c) => c.id === lockedCategory);
  const [f, setF] = useState({ sport: 'all', brand: 'all', price: 'all', sort: 'featured' });
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  usePageTitle(cat ? cat.name : 'Shop');

  const items = useMemo(() => {
    const band = priceBands.find((b) => b.id === f.price);
    const list = products.filter((p) => (cat ? p.category === cat.id : f.sport === 'all' || p.category === f.sport)
      && (f.brand === 'all' || p.brand === f.brand) && band.test(unitPrice(p))
      && (!q || `${p.brand} ${p.name} ${p.category}`.toLowerCase().includes(q)));
    if (f.sort === 'low') list.sort((a, b) => unitPrice(a) - unitPrice(b));
    if (f.sort === 'high') list.sort((a, b) => unitPrice(b) - unitPrice(a));
    return list;
  }, [f, q, cat]);

  if (lockedCategory && !cat) return <NotFound />;
  return (
    <main className="bg-black pb-32 pt-44">
      <Container>
        <Breadcrumbs trail={[{ label: 'Home', to: '/' }, { label: cat ? cat.name : 'Shop' }]} />
        <h1 className="h-section text-white">{cat ? cat.name : q ? `Results for "${q}"` : 'The whole shop'}</h1>
        {cat && <p className="mt-3 text-ash">{cat.blurb}</p>}
        <div className="my-10 flex flex-col gap-6 border-y border-ash-dark py-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex-1"><ShopFilters {...f} lockSport={Boolean(cat)} onChange={set} /></div>
          <SortSelect value={f.sort} onChange={(v) => set('sort', v)} />
        </div>
        <p className="mb-6 text-ash" aria-live="polite">{items.length} products</p>
        <ProductGrid items={items} onReset={() => setF({ sport: 'all', brand: 'all', price: 'all', sort: 'featured' })} />
      </Container>
    </main>
  );
}

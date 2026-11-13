// Four more products from the same sport.
import { products } from '../../data/products.js';
import ProductCard from '../shop/ProductCard.jsx';
import Container from '../ui/Container.jsx';

/** @param {{product:object}} props */
export default function RelatedProducts({ product }) {
  const items = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  if (!items.length) return null;
  return (
    <section className="border-t border-ash-dark bg-charcoal py-20">
      <Container>
        <h2 className="mb-10 text-3xl text-white">More in {product.category}</h2>
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">{items.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </Container>
    </section>
  );
}

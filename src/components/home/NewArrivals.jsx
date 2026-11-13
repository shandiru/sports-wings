// Still-image gallery. Content is visible by default; animation only enhances it.
import { useEffect, useRef, useState } from 'react';
import { products } from '../../data/products.js';
import { categories } from '../../data/categories.js';
import ProductCard from '../shop/ProductCard.jsx';
import Container from '../ui/Container.jsx';
import ImagePreview from '../ui/ImagePreview.jsx';
import Button from '../ui/Button.jsx';

const fresh = products.filter((p) => p.badge === 'New');
const sports = [{ id: 'all', name: 'All arrivals' }, ...categories.filter(category => fresh.some(product => product.category === category.id))];

export default function NewArrivals() {
  const gallery = useRef(null);
  const entered = useRef(false);
  const [sport, setSport] = useState('all');
  const [preview, setPreview] = useState(null);
  const items = fresh.filter(product => sport === 'all' || product.category === sport);
  const previewIndex = items.findIndex(product => product.id === preview?.id);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches || typeof window.IntersectionObserver !== 'function' || typeof Element.prototype.animate !== 'function') return;

    const animations = [];
    const reveal = () => {
      entered.current = true;
      try {
        [...gallery.current.children].forEach((card, index) => {
          animations.push(card.animate([
            { opacity: 0, transform: 'translateY(24px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ], { duration: 560, delay: index * 65, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'backwards' }));
        });
      } catch {
        animations.forEach(animation => animation.cancel());
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      reveal();
    }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });
    const stop = () => {
      if (preference.matches) {
        observer.disconnect();
        animations.forEach(animation => animation.cancel());
      }
    };
    preference.addEventListener('change', stop);
    if (entered.current) reveal();
    else observer.observe(gallery.current);
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', stop);
      animations.forEach(animation => animation.cancel());
    };
  }, [sport]);

  return (
    <section className="arrival-section section relative bg-charcoal" aria-labelledby="new-arrivals-heading">
      <Container>
        <div className="mb-8 flex items-center gap-4">
          <span className="h-px w-10 bg-gold" aria-hidden="true" />
          <p className="eyebrow !text-gold-light">The latest drop</p>
          <span className="ml-auto font-display text-sm tabular-nums text-ash">{String(fresh.length).padStart(2, '0')} new arrivals</span>
        </div>
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 id="new-arrivals-heading" className="h-section text-white">Just <span className="block text-gold-light">arrived.</span></h2>
          <p className="max-w-[34ch] text-ash-light">Fresh off the shelf. Find your next favourite for the game ahead.</p>
        </div>
        <div className="arrival-filters mb-10 flex flex-wrap gap-x-6 gap-y-1 border-b border-ash-dark" role="group" aria-label="Filter new arrivals by sport">
          {sports.map(category => (
            <button key={category.id} type="button" aria-pressed={sport === category.id} onClick={() => setSport(category.id)}
              className={`arrival-filter relative flex min-h-12 items-center gap-2 pb-3 text-sm font-semibold transition-colors ${sport === category.id ? 'text-white' : 'text-ash hover:text-ash-light'}`}>
              {category.name}<span className="text-[0.6875rem] tabular-nums text-ash">{String(category.id === 'all' ? fresh.length : fresh.filter(product => product.category === category.id).length).padStart(2, '0')}</span>
              <span aria-hidden="true" className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gold transition-transform duration-300 ${sport === category.id ? 'scale-x-100' : 'scale-x-0'}`} />
            </button>
          ))}
        </div>
        <p className="sr-only" role="status">{items.length} new arrivals shown</p>
        <div ref={gallery} className="arrival-gallery grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((product, index) => (
            <div key={product.id} className="arrival-item relative min-w-0">
              <ProductCard product={product} preserveImage onPreview={setPreview} className="arrival-card h-full min-w-0" />
              <span className="pointer-events-none absolute bottom-5 right-4 font-display text-xs tabular-nums text-ash/60" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-ash-dark pt-7">
          <p className="text-sm text-ash">Your next game starts here.</p>
          <Button to="/shop" variant="text">Explore the shop</Button>
        </div>
      </Container>
      {preview && <ImagePreview product={preview} onClose={() => setPreview(null)} position={previewIndex + 1} total={items.length}
        onPrevious={items.length > 1 ? () => setPreview(items[(previewIndex - 1 + items.length) % items.length]) : undefined}
        onNext={items.length > 1 ? () => setPreview(items[(previewIndex + 1) % items.length]) : undefined} />}
    </section>
  );
}

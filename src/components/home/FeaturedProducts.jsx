// Eight products with simple sport tabs.
import { useState } from 'react';
import { motion } from 'framer-motion';
import { products } from '../../data/products.js';
import { categories } from '../../data/categories.js';
import ProductGrid from '../shop/ProductGrid.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import Container from '../ui/Container.jsx';
import Button from '../ui/Button.jsx';

const tabs = [{ id: 'all', name: 'All' }, ...categories.filter((c) => ['cricket', 'football', 'badminton', 'fitness'].includes(c.id))];

export default function FeaturedProducts() {
  const [tab, setTab] = useState('all');
  const items = products.filter((p) => tab === 'all' || p.category === tab).slice(0, 8);
  return (
    <section className="section bg-charcoal">
      <Container>
        <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading lines={['Off the shelf', 'this week']} />
          <div role="tablist" aria-label="Filter by sport" className="flex flex-wrap gap-x-6">
            {tabs.map((t) => (
              <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)}
                className={`min-h-[44px] border-b-2 font-semibold transition-colors ${tab === t.id ? 'border-gold text-white' : 'border-transparent text-ash hover:text-ash-light'}`}>{t.name}</button>
            ))}
          </div>
        </div>
        <motion.div key={tab} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}><ProductGrid items={items} /></motion.div>
        <div className="mt-14"><Button to="/shop" variant="text">See everything in the shop</Button></div>
      </Container>
    </section>
  );
}

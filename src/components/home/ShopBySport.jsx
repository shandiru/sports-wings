// Editorial layout: one tall Cricket feature plus five smaller entries.
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { categories } from '../../data/categories.js';
import { products } from '../../data/products.js';
import SectionHeading from '../ui/SectionHeading.jsx';
import Container from '../ui/Container.jsx';
import Reveal from '../motion/Reveal.jsx';
import ImageReveal from '../motion/ImageReveal.jsx';
import { photoUrl } from '../../lib/photos.js';
import ProductVisual from '../ui/ProductVisual.jsx';

const countOf = (c) => (c.href ? 'Made to order' : `${products.filter((p) => p.category === c.id).length} items`);

export default function ShopBySport() {
  const [cricket, ...rest] = categories;
  return (
    <section className="section bg-black">
      <Container>
        <SectionHeading lines={['Start with your sport.']} className="mb-16" />
        <div className="grid gap-12 lg:grid-cols-12">
          <Link to="/category/cricket" className="group lg:col-span-5">
            <ImageReveal className="border border-ash-dark"><ProductVisual type="bat" src={photoUrl('cricket,batsman', 3)} className="!aspect-[4/5] transition-transform duration-[800ms] group-hover:scale-[1.03]" /></ImageReveal>
            <div className="mt-5 flex items-end justify-between">
              <div><h3 className="text-4xl text-white">Cricket</h3><p className="mt-1 max-w-[36ch] text-ash">{cricket.blurb}</p></div>
              <span className="text-ash-light">{countOf(cricket)}</span>
            </div>
          </Link>
          <Reveal stagger={0.08} className="lg:col-span-7 lg:pt-4">
            {rest.map((c) => (
              <Link key={c.id} to={c.href ?? `/category/${c.id}`} className="group flex items-center justify-between gap-6 border-b border-ash-dark py-7 first:border-t">
                <div><h3 className="text-3xl text-white transition-colors group-hover:text-gold-light md:text-4xl">{c.name}</h3><p className="mt-1 text-ash">{c.blurb}</p></div>
                <div className="flex items-center gap-4 text-ash-light"><span className="hidden sm:inline">{countOf(c)}</span>
                  <ArrowUpRight size={28} strokeWidth={1.5} className="translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:text-gold group-hover:opacity-100" aria-hidden="true" /></div>
              </Link>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

// Brand wordmark strip.
import Marquee from '../motion/Marquee.jsx';
import { brands } from '../../data/brands.js';

export default function BrandMarquee() {
  return <section id="brands" className="border-y border-ash-dark bg-black-soft py-10"><Marquee items={brands} /></section>;
}

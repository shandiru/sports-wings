// The one light section: how to choose a bat.
import { batGuide } from '../../data/site.js';
import SectionHeading from '../ui/SectionHeading.jsx';
import Container from '../ui/Container.jsx';
import Button from '../ui/Button.jsx';
import Reveal from '../motion/Reveal.jsx';
import Parallax from '../motion/Parallax.jsx';
import ImageReveal from '../motion/ImageReveal.jsx';
import { photoUrl } from '../../lib/photos.js';
import ProductVisual from '../ui/ProductVisual.jsx';

/** @param {{cta?:boolean}} props */
export default function CricketProShop({ cta = true }) {
  return (
    <section className="section bg-bone text-black">
      <Container className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHeading dark lines={['How to choose', 'your bat']} intro="Four things decide whether a bat suits you. Here is how we explain them at the counter." />
          <Reveal stagger={0.1} className="mt-14">
            {batGuide.map((g) => (
              <div key={g.title} className="grid gap-2 border-t border-black/15 py-8 md:grid-cols-5 md:gap-8">
                <h3 className="text-2xl md:col-span-2">{g.title}</h3>
                <p className="text-ash-dark md:col-span-3">{g.text}</p>
              </div>
            ))}
          </Reveal>
          {cta && <div className="mt-6"><Button to="/category/cricket" variant="dark">Shop cricket gear</Button></div>}
        </div>
        <div className="lg:col-span-5">
          <Parallax amount={50} className="lg:sticky lg:top-32">
            <ImageReveal><ProductVisual type="bat" src={photoUrl('cricket,bat,willow', 11)} className="w-full" /></ImageReveal>
          </Parallax>
        </div>
      </Container>
    </section>
  );
}

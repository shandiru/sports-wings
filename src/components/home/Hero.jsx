// Full-viewport hero: headline, one primary action, framed photo with parallax. Content eases away on scroll.
import { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import SplitHeading from '../motion/SplitHeading.jsx';
import ImageReveal from '../motion/ImageReveal.jsx';
import Parallax from '../motion/Parallax.jsx';
import Logo from '../brand/Logo.jsx';
import Button from '../ui/Button.jsx';
import Container from '../ui/Container.jsx';
import ProductVisual from '../ui/ProductVisual.jsx';
import { waLink } from '../../lib/whatsapp.js';
import { photoUrl } from '../../lib/photos.js';
import { introSeen } from '../../lib/intro.js';

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [base] = useState(() => (introSeen() ? 0 : 1.9)); // wait for the intro curtain
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const fade = (d) => ({ initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: base + d, ease: [0.22, 1, 0.36, 1] } });

  return (
    <section ref={ref} className="relative flex min-h-screen items-center overflow-hidden bg-black pb-24 pt-40">
      <Container className="grid items-center gap-14 lg:grid-cols-12">
        <motion.div style={reduce ? undefined : { y, opacity }} className="lg:col-span-7">
          <motion.div {...fade(0)}><Logo variant="icon" className="mb-8 h-20 w-20" /></motion.div>
          <SplitHeading as="h1" immediate delay={base + 0.2} className="h-hero text-white" lines={['Cricket gear,', <>picked by <span className="text-gold">hand</span>.</>]} />
          <motion.p {...fade(0.9)} className="prose-line mt-8 text-ash-light">
            Every bat on our shelf is weighed and checked before it goes out. Come in and feel the pick-up, or message the pro desk and tell us how you play.
          </motion.p>
          <motion.div {...fade(1.1)} className="mt-10 flex flex-wrap items-center gap-6">
            <Button to="/category/cricket">Shop cricket</Button>
            <Button variant="text" arrow={false} href={waLink('Hello, I would like help choosing a bat.')} target="_blank" rel="noreferrer">Ask the pro desk</Button>
          </motion.div>
        </motion.div>
        <div className="lg:col-span-5">
          <Parallax amount={36}>
            <ImageReveal delay={base + 0.5} className="border border-ash-dark p-3">
              <ProductVisual type="bat" src={photoUrl('cricket,bat,stadium', 7)} />
            </ImageReveal>
            <p className="mt-3 text-[0.9375rem] text-ash">Grade 1 English willow, weighed and noted by our team.</p>
          </Parallax>
        </div>
      </Container>
      <motion.button type="button" aria-label="Scroll down" onClick={() => window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' })}
        {...fade(1.6)} className="absolute bottom-6 left-1/2 flex min-h-[44px] -translate-x-1/2 items-center gap-2 text-[0.875rem] text-ash hover:text-gold-light">
        <motion.span animate={reduce ? undefined : { y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}><ArrowDown size={18} strokeWidth={1.5} aria-hidden="true" /></motion.span>Scroll
      </motion.button>
    </section>
  );
}

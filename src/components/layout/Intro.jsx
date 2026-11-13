// Short brand intro: emblem fades in, gold line draws, curtain lifts. Plays once per session.
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { introSeen, markIntroSeen } from '../../lib/intro.js';
import Logo from '../brand/Logo.jsx';

export default function Intro() {
  const [show, setShow] = useState(() => !introSeen());
  useEffect(() => {
    if (!show) return undefined;
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => { markIntroSeen(); setShow(false); }, 1900);
    return () => { clearTimeout(t); document.body.style.overflow = ''; };
  }, [show]);
  return (
    <AnimatePresence>
      {show && (
        <motion.div aria-hidden="true" className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
          exit={{ clipPath: 'inset(0 0 100% 0)' }} initial={{ clipPath: 'inset(0 0 0% 0)' }} transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}>
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
            <Logo variant="emblem" className="w-48 sm:w-56" />
          </motion.div>
          <motion.span className="mt-8 h-px w-40 origin-left bg-gold" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

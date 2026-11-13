// Clip-path reveal from the bottom with an inner 1.15 to 1 scale. Observes a static wrapper so it always triggers.
import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

/** @param {{className?:string, delay?:number, children:import('react').ReactNode}} props */
export default function ImageReveal({ className = '', delay = 0, children }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const seen = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const show = reduce || seen;
  return (
    <div ref={ref} className={className}>
      <motion.div className="h-full w-full" initial={{ clipPath: reduce ? 'inset(0%)' : 'inset(100% 0 0 0)' }}
        animate={{ clipPath: show ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)' }} transition={{ duration: 1.1, ease, delay }}>
        <motion.div className="h-full w-full" initial={{ scale: reduce ? 1 : 1.15 }} animate={{ scale: show ? 1 : 1.15 }} transition={{ duration: 1.6, ease, delay }}>
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}

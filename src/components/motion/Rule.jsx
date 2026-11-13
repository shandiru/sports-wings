// Hairline that draws in from the left when scrolled into view.
import { motion, useReducedMotion } from 'framer-motion';

/** @param {{className?:string}} props */
export default function Rule({ className = '' }) {
  const reduce = useReducedMotion();
  return <motion.div aria-hidden="true" className={`h-px origin-left bg-ash-dark ${className}`} initial={{ scaleX: reduce ? 1 : 0 }}
    whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: '0px 0px -10% 0px' }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} />;
}

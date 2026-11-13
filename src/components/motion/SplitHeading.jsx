// Headline that slides up line by line from behind a mask. Observes the static wrapper, not the clipped text.
import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

/**
 * @param {{lines:import('react').ReactNode[], as?:string, className?:string, immediate?:boolean, delay?:number}} props
 * immediate = animate on mount (hero); otherwise when scrolled into view.
 */
export default function SplitHeading({ lines, as: Tag = 'h2', className = '', immediate = false, delay = 0 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const seen = useInView(ref, { once: true, margin: '0px 0px -12% 0px' });
  const show = reduce || immediate || seen;
  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="-mb-[0.08em] block overflow-hidden pb-[0.08em]">
          <motion.span className="block" initial={{ y: reduce ? 0 : '110%' }} animate={{ y: show ? 0 : '110%' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: delay + i * 0.12 }}>
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

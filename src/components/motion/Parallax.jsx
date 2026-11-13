// Moves its child slightly against the scroll direction.
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

/** @param {{amount?:number, className?:string, children:import('react').ReactNode}} props amount = px travel each way */
export default function Parallax({ amount = 40, className = '', children }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);
  return <div ref={ref} className={className}><motion.div style={reduce ? undefined : { y }}>{children}</motion.div></div>;
}

// Fade and 24px rise, once, at 20% in view. Optional stagger for children.
import { Children } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

/** @param {{delay?:number, stagger?:number, className?:string, children:import('react').ReactNode}} props */
export default function Reveal({ delay = 0, stagger = 0, className = '', children }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } };
  return (
    <motion.div className={className} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
      variants={{ hidden: {}, show: { transition: { delayChildren: delay, staggerChildren: stagger } } }}>
      {stagger ? Children.map(children, (c) => <motion.div variants={item}>{c}</motion.div>)
        : <motion.div variants={item} transition={{ delay }}>{children}</motion.div>}
    </motion.div>
  );
}

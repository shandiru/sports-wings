// Words light up one by one as the heading scrolls through the viewport.
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const Word = ({ progress, range, children }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">{children}</motion.span>;
};

/** @param {{text:string, className?:string}} props */
export default function ScrollWords({ text, className = '' }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.5'] });
  const words = text.split(' ');
  return (
    <h2 ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (reduce ? <span key={i} className="mr-[0.25em] inline-block">{w}</span>
        : <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>{w}</Word>))}
    </h2>
  );
}

// Native product rail with scroll reveals; never pins or adds page-height spacers.
import { Children, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

/** @param {{header:import('react').ReactNode, children:import('react').ReactNode, className?:string}} props */
export default function HorizontalScroll({ header, children, className = '' }) {
  const view = useRef(null);
  const track = useRef(null);
  const reduce = useReducedMotion();
  const [edges, setEdges] = useState({ start: true, end: false });
  const { scrollXProgress } = useScroll({ container: view, axis: 'x' });
  const progress = useTransform(scrollXProgress, [0, 1], [0.08, 1]);
  const smoothProgress = useSpring(progress, { stiffness: 180, damping: 30 });

  useEffect(() => {
    const rail = view.current;
    const update = () => setEdges({
      start: rail.scrollLeft <= 1,
      end: rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 1,
    });
    const observer = new ResizeObserver(update);
    observer.observe(rail);
    observer.observe(track.current);
    rail.addEventListener('scroll', update, { passive: true });
    update();
    return () => { observer.disconnect(); rail.removeEventListener('scroll', update); };
  }, []);

  const move = (direction) => view.current.scrollBy({
    left: direction * view.current.clientWidth * 0.85,
    behavior: reduce ? 'auto' : 'smooth',
  });
  const arrowClass = 'flex h-11 w-11 items-center justify-center border border-ash-dark text-ash-light transition-colors hover:border-gold hover:text-gold-light disabled:cursor-default disabled:opacity-30 disabled:hover:border-ash-dark disabled:hover:text-ash-light';
  const pad = 'max(1.5rem, calc((100% - 1240px) / 2 + 1.5rem))';
  return (
    <div className={`w-full min-w-0 bg-black py-20 ${className}`}>
      <div className="mx-auto mb-12 flex w-full max-w-[1240px] flex-wrap items-end justify-between gap-6 px-6">
        <div className="min-w-0">{header}</div>
        <div className="flex shrink-0 gap-2" aria-label="New arrivals controls">
          <button type="button" aria-label="Previous arrivals" aria-controls="new-arrivals-rail" disabled={edges.start} onClick={() => move(-1)} className={arrowClass}><ArrowLeft size={20} aria-hidden="true" /></button>
          <button type="button" aria-label="Next arrivals" aria-controls="new-arrivals-rail" disabled={edges.end} onClick={() => move(1)} className={arrowClass}><ArrowRight size={20} aria-hidden="true" /></button>
        </div>
      </div>
      <div ref={view} id="new-arrivals-rail" role="region" aria-label="New arrivals products" tabIndex={0}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault();
            move(event.key === 'ArrowRight' ? 1 : -1);
          }
        }}
        className="arrival-rail w-full min-w-0 snap-x snap-mandatory overflow-x-auto overscroll-x-contain pb-2" data-lenis-prevent
        style={{ paddingInline: pad, scrollPaddingInline: pad }}>
        <div ref={track} className="flex w-max gap-6">
          {Children.map(children, (child, index) => (
            <motion.div className="shrink-0 snap-start" initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }}
              transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : Math.min(index, 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}>
              {child}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-10 h-px w-[calc(100%-3rem)] max-w-[1192px] overflow-hidden bg-ash-dark" aria-hidden="true">
        <motion.div style={{ scaleX: reduce ? progress : smoothProgress }} className="h-px origin-left bg-gold" />
      </div>
    </div>
  );
}

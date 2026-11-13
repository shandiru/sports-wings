// Section h2 with an optional short intro.
import SplitHeading from '../motion/SplitHeading.jsx';
import Reveal from '../motion/Reveal.jsx';

/** @param {{lines:import('react').ReactNode[], intro?:string, dark?:boolean, className?:string}} props dark = text on bone */
export default function SectionHeading({ lines, intro, dark = false, className = '' }) {
  return (
    <div className={className}>
      <SplitHeading lines={lines} className={`h-section ${dark ? 'text-black' : 'text-white'}`} />
      {intro && <Reveal delay={0.2}><p className={`prose-line mt-6 ${dark ? 'text-ash-dark' : 'text-ash'}`}>{intro}</p></Reveal>}
    </div>
  );
}

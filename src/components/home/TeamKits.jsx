// Wide section for clubs and schools.
import SectionHeading from '../ui/SectionHeading.jsx';
import Container from '../ui/Container.jsx';
import Button from '../ui/Button.jsx';
import Reveal from '../motion/Reveal.jsx';
import KitTable from './KitTable.jsx';

export default function TeamKits() {
  return (
    <section className="section bg-charcoal">
      <Container className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading lines={['Kits for clubs', 'and schools']} intro="Send us your colours and crest. We print, stitch and deliver to your ground. The more kits, the lower the price per kit." />
          <Reveal delay={0.3}><div className="mt-10"><Button to="/team-kits">Ask for a kit quote</Button></div></Reveal>
        </div>
        <Reveal className="lg:col-span-7"><KitTable /><p className="mt-4 text-[0.875rem] text-ash">Sample prices. Final quote depends on fabric and print.</p></Reveal>
      </Container>
    </section>
  );
}

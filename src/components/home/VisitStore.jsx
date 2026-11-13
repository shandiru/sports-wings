// Address, hours, phone, map and WhatsApp.
import { MapPin, Phone } from 'lucide-react';
import { site } from '../../data/site.js';
import { waLink } from '../../lib/whatsapp.js';
import Container from '../ui/Container.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import Button from '../ui/Button.jsx';

export default function VisitStore() {
  return (
    <section className="section bg-charcoal">
      <Container className="grid gap-14 lg:grid-cols-12">
        <SectionHeading lines={['Come and', 'hold the bat.']} className="lg:col-span-6" />
        <div className="grid gap-10 sm:grid-cols-2 lg:col-span-6">
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-xl text-white"><MapPin size={20} strokeWidth={1.5} aria-hidden="true" />Find us</h3>
            <address className="not-italic text-ash-light">{site.address.map((l) => <span key={l} className="block">{l}</span>)}</address>
            <a href={site.mapUrl} target="_blank" rel="noreferrer" className="btn-text mt-3">Open in Maps</a>
          </div>
          <div>
            <h3 className="mb-3 text-xl text-white">Opening hours</h3>
            {site.hours.map(([d, h]) => <p key={d} className="text-ash-light">{d}<br /><span className="text-ash">{h}</span></p>)}
          </div>
          <div className="flex flex-wrap items-center gap-6 sm:col-span-2">
            <Button href={waLink()} target="_blank" rel="noreferrer">Message on WhatsApp</Button>
            <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="btn-text"><Phone size={18} strokeWidth={1.5} aria-hidden="true" />{site.phone}</a>
          </div>
        </div>
      </Container>
    </section>
  );
}

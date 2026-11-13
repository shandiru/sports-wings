// Contact page with a WhatsApp or email enquiry form.
import usePageTitle from '../lib/usePageTitle.js';
import { site } from '../data/site.js';
import Container from '../components/ui/Container.jsx';
import EnquiryForm from '../components/ui/EnquiryForm.jsx';

const fields = [{ name: 'name', label: 'Your name' }, { name: 'phone', label: 'Phone number', type: 'tel' }, { name: 'notes', label: 'What can we help with?', textarea: true }];

export default function Contact() {
  usePageTitle('Contact');
  return (
    <main className="bg-black pb-32 pt-44">
      <Container className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h1 className="h-section text-white">Talk to the pro desk</h1>
          <address className="mt-8 space-y-1 not-italic text-ash-light">
            {site.address.map((l) => <p key={l}>{l}</p>)}
            <p className="pt-3">{site.phone}</p><p>{site.email}</p>
          </address>
          <div className="mt-8 text-ash">{site.hours.map(([d, h]) => <p key={d}>{d}: {h}</p>)}</div>
        </div>
        <div className="lg:col-span-7"><EnquiryForm subject="Website enquiry" fields={fields} /></div>
      </Container>
    </main>
  );
}

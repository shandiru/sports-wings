// Team kits page: pricing and enquiry form.
import usePageTitle from '../lib/usePageTitle.js';
import Container from '../components/ui/Container.jsx';
import KitTable from '../components/home/KitTable.jsx';
import EnquiryForm from '../components/ui/EnquiryForm.jsx';

const fields = [
  { name: 'name', label: 'Your name' }, { name: 'club', label: 'Club or school' },
  { name: 'qty', label: 'How many kits', type: 'number', min: 10 },
  { name: 'notes', label: 'Colours, crest, sizes, deadline', textarea: true },
];

export default function TeamKits() {
  usePageTitle('Team kits');
  return (
    <main className="bg-black pb-32 pt-44">
      <Container className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h1 className="h-section text-white">Kits for clubs and schools</h1>
          <p className="prose-line mt-6 text-ash">Tell us your numbers and colours. We reply with a quote and a mock-up. Sample prices below.</p>
          <div className="mt-10"><KitTable /></div>
        </div>
        <div className="lg:col-span-6"><h2 className="mb-6 text-2xl text-white">Ask for a quote</h2><EnquiryForm subject="Team kit enquiry" fields={fields} /></div>
      </Container>
    </main>
  );
}

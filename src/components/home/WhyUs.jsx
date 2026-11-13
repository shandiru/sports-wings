// Three statements in large type. Words light up on scroll; hairlines draw in.
import Container from '../ui/Container.jsx';
import Reveal from '../motion/Reveal.jsx';
import Rule from '../motion/Rule.jsx';
import ScrollWords from '../motion/ScrollWords.jsx';

const points = [
  ['Authentic stock only.', 'We buy from authorised distributors and keep the invoices. If a bat is labelled Grade 1, it is.'],
  ['Every bat is spec-checked.', 'We weigh each bat and note the pick-up before it reaches the shelf, so the numbers you read match the bat in your hands.'],
  ['A pro desk on WhatsApp.', 'Send your height, level and budget. A player on our team replies, usually within the hour.'],
];

export default function WhyUs() {
  return (
    <section className="section bg-black">
      <Container>
        {points.map(([h, t]) => (
          <div key={h}>
            <Rule />
            <div className="grid gap-6 py-14 md:grid-cols-12 md:gap-10">
              <ScrollWords text={h} className="h-section text-white md:col-span-7" />
              <Reveal className="md:col-span-5 md:self-end"><p className="prose-line text-ash">{t}</p></Reveal>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}

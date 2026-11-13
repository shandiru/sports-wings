// Footer: emblem, link columns, newsletter, social links.
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { footerColumns } from '../../data/navigation.js';
import { site } from '../../data/site.js';
import Logo from '../brand/Logo.jsx';
import Container from '../ui/Container.jsx';
import Button from '../ui/Button.jsx';

const social = [[Instagram, 'instagram'], [Facebook, 'facebook'], [Youtube, 'youtube']];

export default function Footer() {
  const subscribe = (e) => {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get('email');
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent('Newsletter sign-up')}&body=${encodeURIComponent(`Please add ${email} to your list.`)}`;
  };
  return (
    <footer className="border-t border-ash-dark bg-black-soft py-20">
      <Container className="grid gap-14 md:grid-cols-12">
        <div className="md:col-span-3"><Logo variant="emblem" className="w-40" /></div>
        {footerColumns.map((col) => (
          <nav key={col.title} aria-label={col.title} className="md:col-span-2">
            <h2 className="mb-4 text-base font-semibold text-white">{col.title}</h2>
            <ul className="space-y-1">{col.links.map((l) => <li key={l.to}><Link to={l.to} className="inline-flex min-h-[44px] items-center text-ash hover:text-gold-light">{l.label}</Link></li>)}</ul>
          </nav>
        ))}
        <div className="md:col-span-5">
          <h2 className="mb-2 text-base font-semibold text-white">New stock, now and then</h2>
          <p className="mb-4 text-ash">One short email when new bats and rackets arrive.</p>
          <form onSubmit={subscribe} className="flex flex-col gap-3 sm:flex-row">
            <input name="email" type="email" required placeholder="Your email" aria-label="Email address" className="field" />
            <Button variant="gold" arrow={false} type="submit">Join</Button>
          </form>
          <div className="mt-6 flex gap-1">{social.map(([Icon, k]) => (
            <a key={k} href={site.social[k]} target="_blank" rel="noreferrer" aria-label={k} className="flex h-11 w-11 items-center justify-center text-ash hover:text-gold-light"><Icon size={22} strokeWidth={1.5} /></a>
          ))}</div>
        </div>
      </Container>
      <Container className="mt-16 flex flex-col justify-between gap-2 border-t border-ash-dark pt-6 text-[0.875rem] text-ash sm:flex-row">
        <span className="font-brand tracking-wide text-ash-light">Sports Wings Private Limited</span>
        <span>Colombo, Sri Lanka. Prices shown are in Sri Lankan rupees.</span>
      </Container>
    </footer>
  );
}

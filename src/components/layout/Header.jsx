// Sticky header: transparent over the hero, solid after 80px, hides on scroll down.
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, Search, ShoppingBag } from 'lucide-react';
import { navLinks } from '../../data/navigation.js';
import { useCart } from '../../context/CartContext.jsx';
import Logo from '../brand/Logo.jsx';
import AnnouncementBar from './AnnouncementBar.jsx';
import MobileMenu from './MobileMenu.jsx';

const iconBtn = 'flex h-11 w-11 max-[359px]:w-10 items-center justify-center text-ash-light transition-colors hover:text-gold-light';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState(false);
  const [bar, setBar] = useState(true);
  const [search, setSearch] = useState(false);
  const last = useRef(0);
  const navigate = useNavigate();
  const { count, setOpen } = useCart();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      setHidden(y > last.current && y > 200);
      last.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const submit = (e) => {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get('q').trim();
    setSearch(false);
    navigate(`/shop?q=${encodeURIComponent(q)}`);
  };

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ${hidden ? '-translate-y-full' : ''}`}>
        {bar && <AnnouncementBar onClose={() => setBar(false)} />}
        <div className={`border-b transition-colors duration-300 ${scrolled ? 'border-gold/40 bg-black' : 'border-transparent bg-transparent'}`}>
          <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between gap-2 px-4 sm:gap-6 sm:px-6">
            <Link to="/" aria-label="Sports Wings home" className="inline-flex shrink-0 items-center no-underline"><Logo /></Link>
            <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
              {navLinks.map((l) => (
                <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => `text-[0.9375rem] font-medium transition-colors hover:text-gold-light ${isActive ? 'text-gold-light' : 'text-ash-light'}`}>{l.label}</NavLink>
              ))}
            </nav>
            <div className="flex shrink-0 items-center">
              <button className={iconBtn} aria-label="Search" aria-expanded={search} onClick={() => setSearch((s) => !s)}><Search size={22} strokeWidth={1.5} /></button>
              <button className={`${iconBtn} relative`} aria-label={`Open cart, ${count} items`} onClick={() => setOpen(true)}>
                <ShoppingBag size={22} strokeWidth={1.5} />
                {count > 0 && <motion.span key={count} initial={{ scale: 1.6 }} animate={{ scale: 1 }} transition={{ duration: 0.4 }} className="absolute right-0.5 top-1 flex h-[18px] min-w-[18px] items-center justify-center bg-gold px-1 text-[0.75rem] font-bold text-black">{count}</motion.span>}
              </button>
              <button className={`${iconBtn} lg:hidden`} aria-label="Open menu" aria-expanded={menu} aria-controls="mobile-menu" onClick={() => setMenu(true)}><Menu size={24} strokeWidth={1.5} /></button>
            </div>
          </div>
          {search && (
            <form onSubmit={submit} role="search" className="mx-auto max-w-[1240px] px-6 pb-4">
              <input name="q" autoFocus type="search" placeholder="Search bats, rackets, shoes" aria-label="Search products" className="field" />
            </form>
          )}
        </div>
      </header>
      <MobileMenu open={menu} onClose={() => setMenu(false)} />
    </>
  );
}

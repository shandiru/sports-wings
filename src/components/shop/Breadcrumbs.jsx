// Simple breadcrumb trail.
import { Link } from 'react-router-dom';

/** @param {{trail:{label:string,to?:string}[]}} props */
export default function Breadcrumbs({ trail }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-[0.9375rem] text-ash">
      {trail.map((t, i) => (
        <span key={t.label}>{t.to ? <Link to={t.to} className="hover:text-gold-light">{t.label}</Link> : <span className="text-ash-light" aria-current="page">{t.label}</span>}{i < trail.length - 1 && <span className="mx-2" aria-hidden="true">/</span>}</span>
      ))}
    </nav>
  );
}

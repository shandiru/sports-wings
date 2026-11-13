// Gold, dark or text button. Renders a router Link, an anchor or a button.
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/** @param {{to?:string, href?:string, variant?:'gold'|'dark'|'text', arrow?:boolean, className?:string, children:import('react').ReactNode}} props */
export default function Button({ to, href, variant = 'gold', arrow = true, className = '', children, ...rest }) {
  const base = { gold: 'btn-gold', dark: 'btn-dark', text: 'btn-text' }[variant];
  const cls = `${base} group ${className}`;
  const inner = (<>{children}{arrow && <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />}</>);
  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{inner}</a>;
  return <button className={cls} {...rest}>{inner}</button>;
}

// Brand logo using the client's own artwork. Swap /public/brand/original-1.jpg for a transparent PNG or SVG when available.
const src = `${import.meta.env.BASE_URL}brand/original-1.jpg`;

/** @param {{variant?:'emblem'|'horizontal'|'icon', className?:string}} props */
export default function Logo({ variant = 'horizontal', className = '' }) {
  const img = <img src={src} alt={variant === 'horizontal' ? '' : 'Sports Wings Private Limited'} className="h-full w-full object-contain mix-blend-lighten" />;
  if (variant === 'emblem') return <span className={`block ${className}`}>{img}</span>;
  if (variant === 'icon') return <span className={`block ${className}`}>{img}</span>;
  return (
    <span className={`inline-flex shrink-0 items-center gap-2.5 align-middle not-italic sm:gap-3 ${className}`}>
      <span className="block h-9 w-9 shrink-0 sm:h-12 sm:w-12">{img}</span>
      <span className="flex flex-col gap-1 py-1 text-left">
        <span className="whitespace-nowrap font-brand text-[0.875rem] font-bold leading-[1.25] tracking-[0.025em] text-white sm:text-lg">SPORTS WINGS</span>
        <span className="whitespace-nowrap font-body text-[0.5625rem] font-semibold leading-[1.4] tracking-[0.18em] text-gold-light sm:text-[0.625rem]">PRIVATE LIMITED</span>
      </span>
    </span>
  );
}

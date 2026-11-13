// Slow infinite text marquee. Pauses on hover.
/** @param {{items:string[]}} props */
export default function Marquee({ items }) {
  const row = (hidden) => (
    <ul className="flex shrink-0 items-center gap-16 pr-16" aria-hidden={hidden || undefined}>
      {items.map((b) => <li key={b} className="font-display text-3xl font-semibold tracking-tight text-ash transition-colors duration-300 hover:text-gold md:text-4xl">{b}</li>)}
    </ul>
  );
  return (
    <div className="marquee overflow-hidden" role="list" aria-label="Brands we stock">
      <div className="marquee-track flex w-max">{row(false)}{row(true)}</div>
    </div>
  );
}

// Radio-style size buttons.
/** @param {{sizes:string[], value:string, onChange:(s:string)=>void}} props */
export default function SizeSelector({ sizes, value, onChange }) {
  return (
    <fieldset>
      <legend className="mb-3 font-semibold text-white">Size</legend>
      <div className="flex flex-wrap gap-2">
        {sizes.map((s) => (
          <button key={s} type="button" aria-pressed={value === s} onClick={() => onChange(s)}
            className={`min-h-[44px] min-w-[56px] border px-4 text-[0.9375rem] transition-colors ${value === s ? 'border-gold text-gold-light' : 'border-ash-dark text-ash-light hover:border-ash'}`}>{s}</button>
        ))}
      </div>
    </fieldset>
  );
}

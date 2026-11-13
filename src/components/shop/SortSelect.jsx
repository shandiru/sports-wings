// Sort dropdown.
/** @param {{value:string, onChange:(v:string)=>void}} props */
export default function SortSelect({ value, onChange }) {
  return (
    <label className="flex items-center gap-3 text-[0.9375rem]">
      <span className="text-ash">Sort</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="field !w-auto">
        <option value="featured">Featured</option>
        <option value="low">Price, low to high</option>
        <option value="high">Price, high to low</option>
      </select>
    </label>
  );
}

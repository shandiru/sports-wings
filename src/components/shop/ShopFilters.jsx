// Sport, brand and price filters.
import { categories } from '../../data/categories.js';
import { brands } from '../../data/brands.js';

export const priceBands = [
  { id: 'all', label: 'Any price', test: () => true },
  { id: 'u10', label: 'Under Rs. 10,000', test: (n) => n < 10000 },
  { id: 'm', label: 'Rs. 10,000 to 30,000', test: (n) => n >= 10000 && n <= 30000 },
  { id: 'o30', label: 'Over Rs. 30,000', test: (n) => n > 30000 },
];

/** @param {{sport:string, brand:string, price:string, onChange:(k:string,v:string)=>void, lockSport?:boolean}} props */
export default function ShopFilters({ sport, brand, price, onChange, lockSport }) {
  const sel = (label, key, value, options) => (
    <label className="block">
      <span className="mb-2 block text-[0.9375rem] text-ash">{label}</span>
      <select value={value} onChange={(e) => onChange(key, e.target.value)} className="field">{options}</select>
    </label>
  );
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {!lockSport && sel('Sport', 'sport', sport, [<option key="all" value="all">All sports</option>, ...categories.filter((c) => !c.href).map((c) => <option key={c.id} value={c.id}>{c.name}</option>)])}
      {sel('Brand', 'brand', brand, [<option key="all" value="all">All brands</option>, ...brands.map((b) => <option key={b} value={b}>{b}</option>)])}
      {sel('Price', 'price', price, priceBands.map((b) => <option key={b.id} value={b.id}>{b.label}</option>))}
    </div>
  );
}

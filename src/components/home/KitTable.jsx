// Three quantity tiers for team kits.
import { kitTiers } from '../../data/site.js';
import { money } from '../../lib/format.js';

export default function KitTable({ dark = true }) {
  return (
    <table className="w-full text-left">
      <caption className="sr-only">Team kit pricing by quantity (sample prices)</caption>
      <thead><tr className="border-b border-ash-dark text-ash"><th className="py-3 font-medium">Quantity</th><th className="py-3 font-medium">Per kit</th><th className="hidden py-3 font-medium sm:table-cell">Includes</th></tr></thead>
      <tbody>{kitTiers.map((t) => (
        <tr key={t.qty} className="border-b border-ash-dark">
          <th scope="row" className="py-5 pr-4 text-lg font-semibold text-white">{t.qty}</th>
          <td className="py-5 pr-4 text-lg text-gold-light">{money(t.price)}</td>
          <td className="hidden py-5 text-ash-light sm:table-cell">{t.note}</td>
        </tr>
      ))}</tbody>
    </table>
  );
}

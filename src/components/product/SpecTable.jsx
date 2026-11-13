// Specification table with hairline rows.
/** @param {{specs:Record<string,string>}} props */
export default function SpecTable({ specs }) {
  return (
    <table className="w-full text-left">
      <caption className="sr-only">Specifications</caption>
      <tbody>{Object.entries(specs).map(([k, v]) => (
        <tr key={k} className="border-b border-ash-dark"><th scope="row" className="py-3 pr-6 font-medium text-ash">{k}</th><td className="py-3 text-ash-light">{v}</td></tr>
      ))}</tbody>
    </table>
  );
}

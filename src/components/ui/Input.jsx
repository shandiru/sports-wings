// Labelled input or textarea.
/** @param {{label:string, name:string, textarea?:boolean, light?:boolean}} props */
export default function Input({ label, name, textarea = false, ...rest }) {
  const Tag = textarea ? 'textarea' : 'input';
  return (
    <label className="block">
      <span className="mb-2 block text-[0.9375rem] font-semibold text-ash-light">{label}</span>
      <Tag name={name} className="field" rows={textarea ? 5 : undefined} {...rest} />
    </label>
  );
}

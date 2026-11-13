// Enquiry form that opens WhatsApp or the mail app. No backend.
import { ArrowRight } from 'lucide-react';
import { site } from '../../data/site.js';
import { waLink } from '../../lib/whatsapp.js';
import Input from './Input.jsx';

/** @param {{subject:string, fields:{name:string,label:string,textarea?:boolean,type?:string}[]}} props */
export default function EnquiryForm({ subject, fields }) {
  const compose = (form) => fields.map((f) => `${f.label}: ${new FormData(form).get(f.name) || '-'}`).join('\n');
  const send = (e) => {
    e.preventDefault();
    const text = `${subject}\n${compose(e.currentTarget.form ?? e.currentTarget)}`;
    if (e.nativeEvent.submitter?.value === 'mail') window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    else window.open(waLink(text), '_blank', 'noreferrer');
  };
  return (
    <form onSubmit={send} className="grid gap-5">
      {fields.map((f) => <Input key={f.name} required={f.name !== 'notes'} {...f} />)}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="submit" value="wa" className="btn-gold group">Send on WhatsApp<ArrowRight size={18} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" /></button>
        <button type="submit" value="mail" className="btn-text self-start">Send by email instead</button>
      </div>
    </form>
  );
}

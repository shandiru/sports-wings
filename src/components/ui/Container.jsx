// Centred 1240px container with 24px side padding.
/** @param {{className?:string, as?:string, children:import('react').ReactNode}} props */
export default function Container({ className = '', as: Tag = 'div', children }) {
  return <Tag className={`mx-auto w-full max-w-[1240px] px-6 ${className}`}>{children}</Tag>;
}

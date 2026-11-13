import { useState } from 'react';
// Product image box (4/5): flat SVG illustration on charcoal, with a photo layered on top when available.
const main = 'fill-ash-dark stroke-gold';
const line = 'fill-none stroke-ash';

const shapes = {
  bat: (<g transform="rotate(24 50 50)"><rect x="46" y="2" width="8" height="28" rx="2" className={main} /><path d="M39 30h22v54q0 8-11 8t-11-8z" className={main} /><path d="M50 36v50M44 36v46M56 36v46" className={line} /></g>),
  ball: (<g><circle cx="50" cy="50" r="31" className={main} /><path d="M26 34C42 44 42 56 26 66M74 34C58 44 58 56 74 66" className={line} strokeDasharray="2 3" /></g>),
  helmet: (<g><path d="M16 62C16 30 36 16 56 18C76 20 86 38 84 62Z" className={main} /><path d="M84 62L88 84H44L38 62M52 62v22M60 62v22M68 62v22M76 62v22M42 72h46" className={line} /></g>),
  pads: (<g><rect x="24" y="8" width="20" height="84" rx="9" className={main} /><rect x="56" y="8" width="20" height="84" rx="9" className={main} /><path d="M24 30h20M24 50h20M24 70h20M56 30h20M56 50h20M56 70h20" className={line} /></g>),
  football: (<g><circle cx="50" cy="50" r="33" className={main} /><path d="M50 36L63 45L58 60H42L37 45Z" className={line} /><path d="M50 36V18M63 45L80 40M58 60L68 75M42 60L32 75M37 45L20 40" className={line} /></g>),
  racket: (<g><ellipse cx="50" cy="34" rx="21" ry="27" className={main} /><path d="M50 7v54M36 16v36M64 16v36M30 26h40M29 38h42M33 50h34" className={line} /><path d="M50 61v22" className={line} /><rect x="45" y="80" width="10" height="16" rx="3" className={main} /></g>),
  shoe: (<g><path d="M10 66V44L28 42L40 54L68 56Q92 58 92 70V76H10Z" className={main} /><path d="M10 76h82M32 48l4 6M40 52l4 6M48 54l4 6" className={line} /></g>),
  dumbbell: (<g><rect x="8" y="38" width="10" height="24" rx="2" className={main} /><rect x="18" y="30" width="10" height="40" rx="2" className={main} /><rect x="28" y="46" width="44" height="8" className={main} /><rect x="72" y="30" width="10" height="40" rx="2" className={main} /><rect x="82" y="38" width="10" height="24" rx="2" className={main} /></g>),
  jersey: (<g><path d="M34 12L14 26L22 44L32 38V88H68V38L78 44L86 26L66 12Q50 26 34 12Z" className={main} /><path d="M42 12Q50 22 58 12M50 40v40" className={line} /></g>),
};

/**
 * Illustration always sits underneath; a photo fades in on top once it loads and is skipped if it fails.
 * @param {{product?:{visual:string,images?:string[],name:string}, type?:string, src?:string, className?:string, preserveImage?:boolean}} props
 */
export default function ProductVisual({ product, type, src, className = '', preserveImage = false }) {
  const photo = src ?? product?.images?.[0];
  const equipmentPhoto = photo && !photo.startsWith('https://images.unsplash.com/');
  const [loadedPhoto, setLoadedPhoto] = useState(null);
  const [failedPhoto, setFailedPhoto] = useState(null);
  return (
    <div role="img" aria-label={product?.name ?? 'Cricket gear'} className={`relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-charcoal to-black-soft ${className}`}>
      <svg viewBox="0 0 100 100" aria-hidden="true" className="absolute left-[15%] top-[15%] h-[70%] w-[70%]" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
        {shapes[product?.visual ?? type] ?? shapes.ball}
      </svg>
      {photo && failedPhoto !== photo && (
        <img key={photo} src={photo} alt="" loading="lazy" decoding="async" onLoad={() => setLoadedPhoto(photo)} onError={() => setFailedPhoto(photo)}
          className={`absolute inset-0 h-full w-full ${equipmentPhoto ? 'bg-bone object-contain p-6' : preserveImage ? 'object-contain' : 'object-cover'} ${preserveImage ? 'opacity-100' : `transition-opacity duration-700 ${loadedPhoto === photo ? 'opacity-100' : 'opacity-0'}`}`} />
      )}
    </div>
  );
}

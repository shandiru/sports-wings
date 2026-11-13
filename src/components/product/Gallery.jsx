// Large product image. Uses photos when available, else the illustration.
import ProductVisual from '../ui/ProductVisual.jsx';

/** @param {{product:object}} props */
export default function Gallery({ product }) {
  return <ProductVisual product={product} className="w-full" />;
}

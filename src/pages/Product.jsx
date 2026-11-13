// Product detail page.
import { useParams } from 'react-router-dom';
import { products } from '../data/products.js';
import usePageTitle from '../lib/usePageTitle.js';
import Container from '../components/ui/Container.jsx';
import Breadcrumbs from '../components/shop/Breadcrumbs.jsx';
import Gallery from '../components/product/Gallery.jsx';
import ProductInfo from '../components/product/ProductInfo.jsx';
import SpecTable from '../components/product/SpecTable.jsx';
import RelatedProducts from '../components/product/RelatedProducts.jsx';
import NotFound from './NotFound.jsx';

export default function Product() {
  const { slug } = useParams();
  const p = products.find((x) => x.slug === slug);
  usePageTitle(p ? `${p.brand} ${p.name}` : 'Not found');
  if (!p) return <NotFound />;
  return (
    <>
      <main className="bg-black pb-24 pt-44">
        <Container>
          <Breadcrumbs trail={[{ label: 'Home', to: '/' }, { label: 'Shop', to: '/shop' }, { label: p.name }]} />
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Gallery product={p} />
            <div><ProductInfo key={p.id} product={p} /><div className="mt-12"><h2 className="mb-2 text-2xl text-white">Specifications</h2><SpecTable specs={p.specs} /></div></div>
          </div>
        </Container>
      </main>
      <RelatedProducts product={p} />
    </>
  );
}

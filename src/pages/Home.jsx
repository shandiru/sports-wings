// Home page: sections in order.
import usePageTitle from '../lib/usePageTitle.js';
import Hero from '../components/home/Hero.jsx';
import BrandMarquee from '../components/home/BrandMarquee.jsx';
import ShopBySport from '../components/home/ShopBySport.jsx';
import FeaturedProducts from '../components/home/FeaturedProducts.jsx';
import CricketProShop from '../components/home/CricketProShop.jsx';
import NewArrivals from '../components/home/NewArrivals.jsx';
import TeamKits from '../components/home/TeamKits.jsx';
import WhyUs from '../components/home/WhyUs.jsx';
import VisitStore from '../components/home/VisitStore.jsx';

export default function Home() {
  usePageTitle('');
  return <><Hero /><BrandMarquee /><ShopBySport /><FeaturedProducts /><CricketProShop /><NewArrivals /><TeamKits /><WhyUs /><VisitStore /></>;
}

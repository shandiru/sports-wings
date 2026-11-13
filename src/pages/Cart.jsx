// Full cart page.
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import usePageTitle from '../lib/usePageTitle.js';
import Container from '../components/ui/Container.jsx';
import CartItem from '../components/cart/CartItem.jsx';
import WhatsAppCheckout from '../components/cart/WhatsAppCheckout.jsx';

export default function Cart() {
  const { lines } = useCart();
  usePageTitle('Cart');
  return (
    <main className="bg-black pb-32 pt-44">
      <Container className="max-w-3xl">
        <h1 className="h-section mb-8 text-white">Your cart</h1>
        {lines.length === 0
          ? <p className="text-ash">Your cart is empty. <Link to="/shop" className="text-gold-light underline">Browse the shop</Link>.</p>
          : <><ul>{lines.map((l) => <CartItem key={l.id + l.size} line={l} />)}</ul><div className="mt-8"><WhatsAppCheckout /></div></>}
      </Container>
    </main>
  );
}

// 404 page.
import usePageTitle from '../lib/usePageTitle.js';
import Container from '../components/ui/Container.jsx';
import Button from '../components/ui/Button.jsx';

export default function NotFound() {
  usePageTitle('Page not found');
  return (
    <main className="flex min-h-screen items-center bg-black pt-32">
      <Container>
        <h1 className="h-section text-white">That page is not on the scorecard.</h1>
        <p className="mt-4 text-ash">The link may be old, or the product may have sold out.</p>
        <div className="mt-8"><Button to="/shop">Go to the shop</Button></div>
      </Container>
    </main>
  );
}

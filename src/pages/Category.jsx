// Category route: the shop locked to one sport.
import { useParams } from 'react-router-dom';
import Shop from './Shop.jsx';

export default function Category() {
  const { slug } = useParams();
  return <Shop key={slug} lockedCategory={slug} />;
}

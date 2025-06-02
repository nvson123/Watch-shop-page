import CardProduct from '@/components/cardProduct';
import Collection from '@/components/Collection';
import FeaturedProducts from '@/components/featuredProducts';
import Hotlist from '@/components/Hotlist';
import Instagram from '@/components/instagram';
import Slides from '@/components/slides';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/')({
  component: Index,
});

function Index() {
  return (
    <>
      <Slides />
      <Hotlist />
      <CardProduct />
      <Collection />
      <FeaturedProducts />
      <Instagram />
    </>
  );
}

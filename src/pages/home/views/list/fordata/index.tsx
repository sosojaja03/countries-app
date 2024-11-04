import { lazy } from 'react';
import { Suspense } from 'react';
import translations from '@/pages/home/static/Translations';
import { useParams } from 'react-router-dom';

const LazyHero = lazy(() => import('../../../components/hero'));
const LazyCards = lazy(() => import('../../../components/card/MainCard'));

const CardList = () => {
  const { lang = 'en' } = useParams<{ lang: 'ka' | 'en' }>();
  const t = translations[lang];
  return (
    <>
      <Suspense fallback={<div>{t.loading}</div>}>
        <LazyHero />
        <LazyCards />
      </Suspense>
    </>
  );
};
export default CardList;

import { setRequestLocale } from 'next-intl/server';
import SiteHeader from '@/components/SiteHeader';
import HeroSplit from '@/components/HeroSplit';
import NewsSection from '@/components/NewsSection';
import BreedsSection from '@/components/BreedsSection';
import PageFooter from '@/components/PageFooter';
import { BREEDS } from '@/lib/breeds';
import { getAllNews } from '@/lib/news';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const news = getAllNews();

  return (
    <>
      <SiteHeader />
      <main>
        <HeroSplit />
        <hr className="divider" />
        <NewsSection articles={news} />
        <hr className="dividerDash" />
        <BreedsSection breeds={BREEDS} />
        <PageFooter />
      </main>
    </>
  );
}

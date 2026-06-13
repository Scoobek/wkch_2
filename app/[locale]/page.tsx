import { setRequestLocale } from "next-intl/server";
import { localeParams } from "@/lib/static-params";
import SiteHeader from "@/components/SiteHeader/SiteHeader";
import HeroSplit from "@/components/HeroSplit/HeroSplit";
import NewsSection from "@/components/NewsSection/NewsSection";
import BreedsSection from "@/components/BreedsSection/BreedsSection";
import PageFooter from "@/components/PageFooter/PageFooter";
import { BREEDS } from "@/lib/breeds";
import { getAllNews } from "@/lib/news";

export const generateStaticParams = localeParams;

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
            </main>
            <PageFooter />
        </>
    );
}

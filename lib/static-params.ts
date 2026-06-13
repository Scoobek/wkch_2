import { locales } from "@/i18n";
import { BREEDS } from "@/lib/breeds";
import { getAllNews } from "@/lib/news";

export const localeParams = () => locales.map((locale) => ({ locale }));

export const breedParams = () =>
    locales.flatMap((locale) =>
        BREEDS.map((breed) => ({ locale, slug: breed.slug }))
    );

export const newsParams = () =>
    locales.flatMap((locale) =>
        getAllNews().map((article) => ({ locale, slug: article.slug }))
    );

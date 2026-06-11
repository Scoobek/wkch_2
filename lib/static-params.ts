import { locales } from "@/i18n";
import { BREEDS } from "@/lib/breeds";

export const localeParams = () => locales.map((locale) => ({ locale }));

export const breedParams = () =>
    locales.flatMap((locale) =>
        BREEDS.map((breed) => ({ locale, slug: breed.slug }))
    );

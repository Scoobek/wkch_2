export interface Breed {
  pl: string;
  en: string;
  origin: string;
  slug: string;
  fci: string;
}

export const BREEDS: Breed[] = [
  { pl: 'Chart Polski',      en: 'Polish Greyhound',    origin: 'PL', slug: 'chart-polski',      fci: '333' },
  { pl: 'Chart Afgański',    en: 'Afghan Hound',        origin: 'AF', slug: 'chart-afganski',    fci: '228' },
  { pl: 'Chart Perski',      en: 'Saluki',              origin: 'IR', slug: 'chart-perski',      fci: '269' },
  { pl: 'Chart Rosyjski',    en: 'Borzoi',              origin: 'RU', slug: 'chart-rosyjski',    fci: '193' },
  { pl: 'Greyhound',         en: 'Greyhound',           origin: 'GB', slug: 'greyhound',         fci: '158' },
  { pl: 'Whippet',           en: 'Whippet',             origin: 'GB', slug: 'whippet',           fci: '162' },
  { pl: 'Charcik Włoski',    en: 'Italian Greyhound',   origin: 'IT', slug: 'charcik-wloski',    fci: '200' },
  { pl: 'Chart Irlandzki',   en: 'Irish Wolfhound',     origin: 'IE', slug: 'chart-irlandzki',   fci: '160' },
  { pl: 'Chart Szkocki',     en: 'Scottish Deerhound',  origin: 'GB', slug: 'chart-szkocki',     fci: '164' },
  { pl: 'Chart Węgierski',   en: 'Magyar Agár',         origin: 'HU', slug: 'chart-wegierski',   fci: '240' },
  { pl: 'Chart Hiszpański',  en: 'Galgo Español',       origin: 'ES', slug: 'chart-hiszpanski',  fci: '285' },
  { pl: 'Sloughi',           en: 'Sloughi',             origin: 'MA', slug: 'sloughi',           fci: '188' },
  { pl: 'Azawakh',           en: 'Azawakh',             origin: 'ML', slug: 'azawakh',           fci: '307' },
];

export function getBreedBySlug(slug: string): Breed | undefined {
  return BREEDS.find(b => b.slug === slug);
}

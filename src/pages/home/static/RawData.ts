import translations from "./Translations";

export interface Country {
  name: { ka: string; en: string };
  population: number;
  capital: { ka: string; en: string };
  id: string;
  likes: number;
  deleted?: boolean;
}

export interface CardsProps {
  countries: Country[];
}

// Uncomment CountryData array

const CountryData: Country[] = [
  {
    name: { ka: translations.ka.georgia, en: translations.en.georgia },
    population: 3.713,
    capital: { ka: translations.ka.tbilisi, en: translations.en.tbilisi },
    id: "1",
    likes: 0,
  },
  {
    name: { ka: translations.ka.france, en: translations.en.france },
    population: 67.97,
    capital: { ka: translations.ka.paris, en: translations.en.paris },
    id: "2",
    likes: 0,
  },
  {
    name: { ka: translations.ka.turkey, en: translations.en.turkey },
    population: 84.98,
    capital: { ka: translations.ka.ankara, en: translations.en.ankara },
    id: "3",
    likes: 0,
  },
];

export default CountryData;

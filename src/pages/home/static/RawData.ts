import translations from './Translations';
export interface CardsProps {
  countries: Country[];
}
export interface Country {
  id: string;
  name: { ka: string; en: string };
  capital: { ka: string; en: string };
  population: number;
  likes: number;
  deleted?: boolean;
  image: string;
}
export interface ApiResponse<T> {
  data: T;
}

import GeImage from '../components/images/ge.svg'; // adjust the path based on your project structure
import FrIMAGE from '../components/images/fr.svg'; // adjust the path based on your project structure
import TrIMAGE from '../components/images/tr.svg'; // adjust the path based on your project structure

// Update your CountryData array to include image URLs for each country
const CountryData: Country[] = [
  {
    id: '1',
    name: { ka: translations.ka.georgia, en: translations.en.georgia },
    capital: { ka: translations.ka.tbilisi, en: translations.en.tbilisi },
    population: 3.713,
    likes: 0,
    image: GeImage,
  },
  {
    id: '2',
    name: { ka: translations.ka.france, en: translations.en.france },
    capital: { ka: translations.ka.paris, en: translations.en.paris },
    population: 67.97,
    likes: 0,
    image: FrIMAGE,
  },
  {
    id: '3',
    name: { ka: translations.ka.turkey, en: translations.en.turkey },
    capital: { ka: translations.ka.ankara, en: translations.en.ankara },
    population: 84.98,
    likes: 0,
    image: TrIMAGE,
  },
];

export default CountryData;

export interface Country {
  name: string;
  population: number;
  capital: string;
  id: string;
}

export interface CardsProps {
  countries: Country[];
}

// Uncomment CountryData array
const CountryData: Country[] = [
  {
    name: "Georgia",
    population: 3.713,
    capital: "Tbilisi",
    id: "1",
  },
  {
    name: "France",
    population: 67.97,
    capital: "Paris",
    id: "2",
  },
  {
    name: "Turkey",
    population: 84.98,
    capital: "Ankara",
    id: "3",
  },
];

export default CountryData;

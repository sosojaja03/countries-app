// import { Hero } from "../../components/hero";
// import { Cards } from "../../components/card/MainCard";
import { lazy } from "react";
import { Suspense } from "react";

const LazyHero = lazy(() => import("../../components/hero"));
const LazyCards = lazy(() => import("../../components/card/MainCard"));

interface Country {
  name: string;
  population: number;
  capital: string;
}

// Uncomment CountryData array
const CountryData: Country[] = [
  {
    name: "Georgia",
    population: 3.713,
    capital: "Tbilisi",
  },
  {
    name: "France",
    population: 67.97,
    capital: "Paris",
  },
  {
    name: "Turkey",
    population: 84.98,
    capital: "Ankara",
  },
];

const CardList = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyHero />
        <LazyCards countries={CountryData} />
      </Suspense>
    </>
  );
};
export default CardList;

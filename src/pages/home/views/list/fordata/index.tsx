// import { Hero } from "../../components/hero";
// import { Cards } from "../../components/card/MainCard";
import { lazy } from "react";
import { Suspense } from "react";
// import { CountryData, Country } from "./../detailed-card";
import CountryData from "@/pages/home/static/RawData";
const LazyHero = lazy(() => import("../../../components/hero"));
const LazyCards = lazy(() => import("../../../components/card/MainCard"));

// interface Country {
//   name: string;
//   population: number;
//   capital: string;
//   id: string;
// }

// // Uncomment CountryData array
// const CountryData: Country[] = [
//   {
//     name: "Georgia",
//     population: 3.713,
//     capital: "Tbilisi",
//     id: "1",
//   },
//   {
//     name: "France",
//     population: 67.97,
//     capital: "Paris",
//     id: "2",
//   },
//   {
//     name: "Turkey",
//     population: 84.98,
//     capital: "Ankara",
//     id: "3",
//   },
// ];

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

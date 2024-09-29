import React from "react";
import "./index.css";
import { Cards } from "./assets/components/card/MainCard";
import { Hero } from "./assets/components/hero";
import { Layout } from "./assets/components/layout/dashboard/";

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

const App: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <Cards countries={CountryData} />
    </Layout>
  );
};

export default App;

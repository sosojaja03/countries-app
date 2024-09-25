import React from "react";
import "./index.css";
import Header from "./assets/components/header/Header";
import Hero from "./assets/components/hero/Hero";
import Cards from "./assets/components/card/Cards";

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
    <div>
      <Header />
      <Hero />
      {/* Pass the CountryData array to the Cards component */}
      <Cards countries={CountryData} />
    </div>
  );
};

export default App;

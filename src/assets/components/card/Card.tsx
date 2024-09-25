import React from "react";
import CardHeader from "./CardHeader/CardHeader"; // Assuming you have this in a separate folder
import CardContent from "./CardContent/CardContent"; // Assuming you have this in a separate folder
import styles from "./Card.module.css";

interface Country {
  name: string;
  population: number;
  capital: string;
}

interface CardProps {
  country: Country;
}

const Card: React.FC<CardProps> = ({ country }) => {
  return (
    <div className={styles.card}>
      <CardHeader title={country.name} />
      <CardContent capital={country.capital} population={country.population} />
    </div>
  );
};

export default Card;

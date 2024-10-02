import React from "react";
import styles from "./CardContent.module.css";

interface CardContentProps {
  capital: string;
  population: number;
}

export const CardContent: React.FC<CardContentProps> = ({
  capital,
  population,
}) => {
  return (
    <div className={styles.cardDescription}>
      <p>Capital: {capital}</p>
      <p>Population: {population} million</p>
    </div>
  );
};

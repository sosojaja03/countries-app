import React from "react";
import Card from "./Card"; // Import your Card component
import styles from "./Card.module.css"; // Assuming you have styles for Cards

interface Country {
  name: string;
  population: number;
  capital: string;
}

interface CardsProps {
  countries: Country[];
}

const Cards: React.FC<CardsProps> = ({ countries }) => {
  return (
    <section className={styles.cards}>
      <div className={styles.cardContainer}>
        {countries.map((country, index) => (
          <Card key={index} country={country} />
        ))}
      </div>
    </section>
  );
};

export default Cards;

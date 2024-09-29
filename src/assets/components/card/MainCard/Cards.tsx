import React, { PropsWithChildren } from "react";
import styles from "./Card.module.css";
import { CardHeader } from "@/assets/components/card/CardHeader";
import { CardContent } from "@/assets/components/card/CardContent";

interface Country {
  name: string;
  population: number;
  capital: string;
}

interface CardsProps {
  countries: Country[];
}

export const Card: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.card}>{children}</div>;
};

export const Cards: React.FC<CardsProps> = ({ countries }) => {
  return (
    <section className={styles.cards}>
      <div className={styles.cardContainer}>
        {countries.map((country, index) => (
          /*probsebit  <CardHeader title="georgia" /> */
          <Card key={index}>
            <CardHeader title={country.name} />
            <CardContent
              capital={country.capital}
              population={country.population}
            />
          </Card>
        ))}
      </div>
    </section>
  );
};

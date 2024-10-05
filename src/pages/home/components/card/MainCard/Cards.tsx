import React, { PropsWithChildren } from "react";
import styles from "./Card.module.css";
import { CardHeader } from "@/pages/home/components/card/CardHeader";
import { CardContent } from "@/pages/home/components/card/CardContent";
import { Link } from "react-router-dom";
import { CardsProps } from "@/pages/home/static/RawData";

const Card: React.FC<PropsWithChildren<{ id: string }>> = ({
  children,
  id,
}) => {
  return (
    <Link to={`/tours/${id}`}>
      <div className={styles.card}>{children}</div>
    </Link>
  );
};

const Cards: React.FC<CardsProps> = ({ countries }) => {
  return (
    <section className={styles.cards}>
      <div className={styles.cardContainer}>
        {countries.map((country) => (
          // Pass the id prop to the Card component
          <Card key={country.id} id={country.id}>
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

export default Cards;

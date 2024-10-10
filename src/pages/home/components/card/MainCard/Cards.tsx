import React, { useState } from "react";
import styles from "./Card.module.css";
import { CardHeader } from "@/pages/home/components/card/CardHeader";
import { CardContent } from "@/pages/home/components/card/CardContent";
import { Link } from "react-router-dom";
import { CardsProps, Country } from "@/pages/home/static/RawData";

const Card: React.FC<{ country: Country; onLike: (id: string) => void }> = ({
  country,
  onLike,
}) => {
  return (
    <div className={styles.card}>
      <Link to={`/tours/${country.id}`}>
        <CardHeader title={country.name} />
        <CardContent
          capital={country.capital}
          population={country.population}
        />
      </Link>
      <div className={styles.likeSection}>
        <span>Likes: {country.likes || 0}</span>
        <button onClick={() => onLike(country.id)}>Like</button>
      </div>
    </div>
  );
};

const Cards: React.FC<CardsProps> = ({ countries: initialCountries }) => {
  const [countries, setCountries] = useState<Country[]>(
    initialCountries.map((country) => ({ ...country, likes: 0 }))
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleLike = (id: string) => {
    setCountries((prevCountries) =>
      prevCountries.map((country) =>
        country.id === id ? { ...country, likes: country.likes + 1 } : country
      )
    );
  };

  const sortCountries = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    setCountries((prevCountries) =>
      [...prevCountries].sort((a, b) =>
        newSortOrder === "asc" ? a.likes - b.likes : b.likes - a.likes
      )
    );
  };

  return (
    <section className={styles.cards}>
      <button onClick={sortCountries} className={styles.sortButton}>
        Sort by Likes ({sortOrder === "asc" ? "Ascending" : "Descending"})
      </button>
      <div className={styles.cardContainer}>
        {countries.map((country) => (
          <Card key={country.id} country={country} onLike={handleLike} />
        ))}
      </div>
    </section>
  );
};

export default Cards;

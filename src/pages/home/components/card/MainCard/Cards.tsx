import React, { useReducer, useState } from "react";
import styles from "./Card.module.css";
import { CardHeader } from "@/pages/home/components/card/CardHeader";
import { CardContent } from "@/pages/home/components/card/CardContent";
import { Link } from "react-router-dom";
import { CardsProps, Country } from "@/pages/home/static/RawData";

// Action types
type Action =
  | { type: "LIKE"; id: string }
  | { type: "DELETE"; id: string }
  | { type: "RESTORE"; id: string }
  | { type: "ADD"; country: Country }
  | { type: "SORT"; order: "asc" | "desc" };

// Reducer function
const countryReducer = (state: Country[], action: Action): Country[] => {
  switch (action.type) {
    case "LIKE":
      return state.map((country) =>
        country.id === action.id
          ? { ...country, likes: country.likes + 1 }
          : country
      );
    case "DELETE":
      return state.map((country) =>
        country.id === action.id ? { ...country, deleted: true } : country
      );
    case "RESTORE":
      return state.map((country) =>
        country.id === action.id ? { ...country, deleted: false } : country
      );
    case "ADD":
      return [...state, action.country];
    case "SORT":
      return [...state].sort((a, b) =>
        action.order === "asc" ? a.likes - b.likes : b.likes - a.likes
      );
    default:
      return state;
  }
};

const Card: React.FC<{
  country: Country;
  onLike: () => void;
  onDelete: () => void;
  onRestore: () => void;
}> = ({ country, onLike, onDelete, onRestore }) => {
  return (
    <div
      className={`${styles.card} ${country.deleted ? styles.deletedCard : ""}`}
    >
      <Link to={`/tours/${country.id}`}>
        <CardHeader title={country.name} />
        <CardContent
          capital={country.capital}
          population={country.population}
        />
      </Link>
      <div className={styles.cardActions}>
        <span>Likes: {country.likes}</span>
        <button onClick={onLike} disabled={country.deleted}>
          Like
        </button>
        {country.deleted ? (
          <button onClick={onRestore}>Restore</button>
        ) : (
          <button onClick={onDelete}>Delete</button>
        )}
      </div>
    </div>
  );
};

const AddCountryForm: React.FC<{ onAdd: (country: Country) => void }> = ({
  onAdd,
}) => {
  const [name, setName] = useState("");
  const [capital, setCapital] = useState("");
  const [population, setPopulation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCountry: Country = {
      id: Date.now().toString(),
      name,
      capital,
      population: Number(population),
      likes: 0,
      deleted: false,
    };
    onAdd(newCountry);
    setName("");
    setCapital("");
    setPopulation("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.addForm}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Country Name"
        required
      />
      <input
        type="text"
        value={capital}
        onChange={(e) => setCapital(e.target.value)}
        placeholder="Capital"
        required
      />
      <input
        type="number"
        value={population}
        onChange={(e) => setPopulation(e.target.value)}
        placeholder="Population"
        required
      />
      <button type="submit">Add Country</button>
    </form>
  );
};

const Cards: React.FC<CardsProps> = ({ countries: initialCountries }) => {
  const [countries, dispatch] = useReducer(
    countryReducer,
    initialCountries.map((country) => ({ ...country, deleted: false }))
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    dispatch({ type: "SORT", order: newOrder });
  };

  const activeCountries = countries.filter((country) => !country.deleted);
  const deletedCountries = countries.filter((country) => country.deleted);

  return (
    <section className={styles.cards}>
      <AddCountryForm onAdd={(country) => dispatch({ type: "ADD", country })} />
      <button onClick={handleSort} className={styles.sortButton}>
        Sort by Likes ({sortOrder === "asc" ? "Ascending" : "Descending"})
      </button>
      <div className={styles.cardContainer}>
        {activeCountries.map((country) => (
          <Card
            key={country.id}
            country={country}
            onLike={() => dispatch({ type: "LIKE", id: country.id })}
            onDelete={() => dispatch({ type: "DELETE", id: country.id })}
            onRestore={() => dispatch({ type: "RESTORE", id: country.id })}
          />
        ))}
        {deletedCountries.map((country) => (
          <Card
            key={country.id}
            country={country}
            onLike={() => dispatch({ type: "LIKE", id: country.id })}
            onDelete={() => dispatch({ type: "DELETE", id: country.id })}
            onRestore={() => dispatch({ type: "RESTORE", id: country.id })}
          />
        ))}
      </div>
    </section>
  );
};

export default Cards;

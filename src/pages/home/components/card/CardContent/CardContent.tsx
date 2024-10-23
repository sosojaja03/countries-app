import React from "react";
import styles from "./CardContent.module.css";
import { useParams } from "react-router-dom";
import translations from "@/pages/home/static/Translations";

interface CardContentProps {
  capital: {
    ka: string;
    en: string;
  };
  population: number;
}

export const CardContent: React.FC<CardContentProps> = ({
  capital,
  population,
}) => {
  const { lang = "ka" } = useParams<{ lang: "ka" | "en" }>();
  const t = translations[lang];

  return (
    <div className={styles.cardDescription}>
      <p>
        {t.capital}: {capital[lang]}
      </p>
      <p>
        {t.population}: {population} million
      </p>
    </div>
  );
};

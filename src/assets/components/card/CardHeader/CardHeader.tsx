import React from "react";
import styles from "./CardHeader.module.css";

interface CardHeaderProps {
  title: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ title }) => {
  return <h3 className={styles.cardTitle}>{title}</h3>;
};

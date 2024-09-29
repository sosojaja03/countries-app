import React from "react";
import * as styles from "./Header.module.css";

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <h1 className={styles.logoText}>WonderTravel</h1>
        </div>
        <nav>
          <ul className={styles.navList}>
            {["Destinations", "Tours", "About", "Contact"].map((item) => (
              <li key={item} className={styles.navItem}>
                <a href="#" className={styles.navLink}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.headerActions}>
          <span className={styles.searchIcon}>🔍</span>
          <button className={styles.button}>Book Now</button>
        </div>
      </div>
    </header>
  );
};

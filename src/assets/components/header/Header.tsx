import React from "react";
import * as styles from "./Header.module.css";
import { Link, NavLink } from "react-router-dom";

export const Header: React.FC = () => {
  const navItems = [
    { name: "Destinations", path: "/destinations" },
    { name: "Tours", path: "/tours" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <Link to="/">
            <h1 className={styles.logoText}>WonderTravel</h1>
          </Link>
        </div>
        <nav>
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.name} className={styles.navItem}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => {
                    return isActive ? styles.active : styles.navLink;
                  }}
                >
                  {item.name}
                </NavLink>
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

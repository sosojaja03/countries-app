import React from "react";
import * as styles from "./Hero.module.css";

export const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <h2 className="hero-title">Discover the World with WonderTravel</h2>
          <p className="hero-description">
            Embark on unforgettable journeys to exotic destinations. Create
            memories that last a lifetime.
          </p>
          <div className={styles.heroButtons}>
            <button className={styles.button}>Explore Destinations</button>
            <button className={styles.button}>View Tours</button>
          </div>
        </div>
        <div className={styles.heroImage}>
          <img
            src="https://img.freepik.com/free-photo/travel-concept-with-lugagge-hat_23-2149030570.jpg?t=st=1727013942~exp=1727017542~hmac=7e08316eea62aa5b859d5c14433d7a9d5d1e0dab3d745c0bed6153bf92c7e2b6&w=360"
            alt="Hero Image"
          ></img>
        </div>
      </div>
    </section>
  );
};

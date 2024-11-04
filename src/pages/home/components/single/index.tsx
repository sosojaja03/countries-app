import { useParams } from 'react-router-dom';
import CountryNotFound from '@/pages/CountryNotFound';
import translations from '../../static/Translations';
import styles from './Single.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Country {
  id: string;
  name: { ka: string; en: string };
  capital: { ka: string; en: string };
  population: number;
  image: string;
}

const SingleCardElement = () => {
  const { id, lang } = useParams<{ id: string; lang: 'ka' | 'en' }>();
  const [country, setCountry] = useState<Country | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const currentLang = lang || 'ka';

  useEffect(() => {
    axios
      .get(`http://localhost:3000/countries/${id}`)
      .then((response) => {
        setCountry(response.data);
      })
      .catch((error) => {
        console.error('Error fetching country:', error);
        setError('Error fetching country data');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error || !country) return <CountryNotFound />;

  return (
    <div className={styles.cardContainer}>
      <img
        src={country.image}
        alt={country.name[currentLang]}
        className={styles.cardImage}
      />
      <div className={styles.cardInfo}>
        <h1>{country.name[currentLang]}</h1>
        <p>
          <strong>{translations[currentLang].capital}:</strong>{' '}
          {country.capital[currentLang]}
        </p>
        <p>
          <strong>{translations[currentLang].population}:</strong>{' '}
          {country.population}
        </p>
      </div>
    </div>
  );
};

export default SingleCardElement;

// SingleCardElement.tsx
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import CountryNotFound from '@/pages/CountryNotFound';
// import translations from '../../static/Translations';
// import styles from './Single.module.css';

// interface Country {
//   id: string;
//   name: { ka: string; en: string };
//   capital: { ka: string; en: string };
//   population: number;
//   image: string;
// }

// const SingleCardElement: React.FC = () => {
//   const { id, lang } = useParams<{ id: string; lang: 'ka' | 'en' }>();
//   const [country, setCountry] = useState<Country | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const currentLang = lang || 'ka';

//   useEffect(() => {
//     const fetchCountry = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(
//           `http://localhost:3000/countries/${id}`
//         );
//         setCountry(response.data);
//         setError(false);
//       } catch (error) {
//         console.error('Error fetching country:', error);
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCountry();
//   }, [id]);

//   if (loading) return <p>Loading...</p>;
//   if (error || !country) return <CountryNotFound />;

//   return (
//     <div className={styles.cardContainer}>
//       <img
//         src={country.image}
//         alt={country.name[currentLang]}
//         className={styles.cardImage}
//       />
//       <h1>{country.name[currentLang]}</h1>
//       <p>
//         <strong>{translations[currentLang].capital}:</strong>{' '}
//         {country.capital[currentLang]}
//       </p>
//       <p>
//         <strong>{translations[currentLang].population}:</strong>{' '}
//         {country.population} million
//       </p>
//     </div>
//   );
// };

// export default SingleCardElement;

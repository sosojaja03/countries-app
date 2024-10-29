import React from 'react';
import * as styles from './Header.module.css';
import {
  Link,
  NavLink,
  useParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import translations from '@/pages/home/static/Translations';

export const Header: React.FC = () => {
  const { lang = 'ka' } = useParams<{ lang: 'ka' | 'en' }>();
  const navigate = useNavigate();
  const location = useLocation();
  const t = translations[lang];

  const navItems = [
    { name: t.destinations, path: 'destinations' },
    { name: t.tours, path: 'tours' },
    { name: t.about, path: 'about' },
    { name: t.contact, path: 'contact' },
    { name: t.test, path: 'Test' },
  ];

  const switchLanguage = () => {
    const newLang = lang === 'ka' ? 'en' : 'ka';
    const currentPath = location.pathname.split('/').slice(2).join('/');
    navigate(`/${newLang}/${currentPath}`);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <Link to={`/${lang}`}>
            <h1 className={styles.logoText}>{t.wonderTravel}</h1>
          </Link>
        </div>
        <nav>
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.name} className={styles.navItem}>
                <NavLink
                  to={`/${lang}/${item.path}`}
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
          <button className={styles.button}>{t.bookNow}</button>
          <button onClick={switchLanguage} className={styles.languageSwitch}>
            {lang === 'ka' ? 'EN' : 'KA'}
          </button>
        </div>
      </div>
    </header>
  );
};

import React from 'react';
import styles from './CardHeader.module.css';
import { useParams } from 'react-router-dom';
import translations from '@/pages/home/static/Translations';

interface CardHeaderProps {
  title: {
    ka: string;
    en: string;
  };
}

export const CardHeader: React.FC<CardHeaderProps> = ({ title }) => {
  const { lang = 'en' } = useParams<{ lang: 'ka' | 'en' }>();
  const t = translations[lang];

  return (
    <h3 className={styles.cardTitle}>
      {t.name}: {title[lang]}
    </h3>
  );
};

import React from 'react';
import './index.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CardList from './pages/home/views/list/fordata';
import AboutWievs from './pages/about/views';
import Layout from './assets/components/layout/dashboard';
import PageNotFound from './pages/404';
// import CountryNotFound from "./pages/CountryNotFound";
import DetailedCard from './pages/home/views/list/detailed-card';
import ContactPage from '@/pages/contact/Contact';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:lang" element={<Layout />}>
          <Route index element={<Navigate to="tours" replace />} />
          <Route path="tours" element={<CardList />} />
          <Route path="destinations" element={<AboutWievs />} />
          <Route path="about" element={<AboutWievs />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="tours/:id" element={<DetailedCard />} />
        </Route>
        <Route path="/" element={<Navigate to="/ka" replace />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

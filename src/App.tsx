import React from 'react';
import './index.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CardList from './pages/home/views/list/fordata';
import AboutWievs from './pages/about/views';
import Layout from './assets/components/layout/dashboard/Layout';
import PageNotFound from './pages/404';
// import CountryNotFound from "./pages/CountryNotFound";
import DetailedCard from './pages/home/views/list/detailed-card';
import ContactPage from '@/pages/contact/Contact';
import Test from './pages/test/Test';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/:lang" element={<Layout />}>
            <Route index element={<Navigate to="tours" replace />} />
            <Route path="tours" element={<CardList />} />
            <Route path="destinations" element={<AboutWievs />} />
            <Route path="about" element={<AboutWievs />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="test" element={<Test />} />
            <Route path="tours/:id" element={<DetailedCard />} />
          </Route>
          <Route path="/" element={<Navigate to="/en" replace />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;

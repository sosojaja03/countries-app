import React from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CardList from "./pages/home/views/list";
import AboutWievs from "./pages/about/views";
import { Layout } from "./assets/components/layout/dashboard";
import PageNotFound from "./pages/404";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<CardList />} />
          <Route path="destinations" element={<AboutWievs />} />
          <Route path="tours" element={<AboutWievs />} />
          <Route path="about" element={<AboutWievs />} />
          <Route path="contact" element={<AboutWievs />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

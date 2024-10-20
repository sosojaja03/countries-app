import { lazy } from "react";
import { Suspense } from "react";
import CountryData from "@/pages/home/static/RawData";
import translations from "@/pages/home/static/Translations";
import { useParams } from "react-router-dom";

const LazyHero = lazy(() => import("../../../components/hero"));
const LazyCards = lazy(() => import("../../../components/card/MainCard"));

const CardList = () => {
  const { lang = "ka" } = useParams<{ lang: "ka" | "en" }>();
  const t = translations[lang];
  return (
    <>
      <Suspense fallback={<div>{t.loading}</div>}>
        <LazyHero />
        <LazyCards countries={CountryData} />
      </Suspense>
    </>
  );
};
export default CardList;

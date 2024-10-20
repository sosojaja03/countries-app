import { useParams } from "react-router-dom";
import CountryData from "@/pages/home/static/RawData";
import CountryNotFound from "@/pages/CountryNotFound";
import translations from "../../static/Translations";

const SingleCardElement = () => {
  const { id, lang } = useParams<{ id: string; lang: "ka" | "en" }>();

  const currentLang = lang || "ka";

  const country = CountryData.find((c) => c.id === id);

  if (!country) {
    return <CountryNotFound />;
  }

  return (
    <div>
      <h1>{country.name[currentLang]}</h1>
      <p>
        <strong>{translations[currentLang].capital}:</strong>
        {country.capital[currentLang]}
      </p>
      <p>
        <strong>{translations[currentLang].population}:</strong>
        {country.population} million
      </p>
    </div>
  );
};

export default SingleCardElement;

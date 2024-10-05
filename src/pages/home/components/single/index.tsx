import { useParams } from "react-router-dom";
import CountryData from "@/pages/home/static/RawData";
import CountryNotFound from "@/pages/CountryNotFound";

const SingleCardElement = () => {
  const { id } = useParams<{ id: string }>();

  const country = CountryData.find((c) => c.id === id);

  if (!country) {
    return <CountryNotFound />;
  }

  return (
    <div>
      <h1>{country.name}</h1>
      <p>
        <strong>Capital:</strong> {country.capital}
      </p>
      <p>
        <strong>Population:</strong> {country.population} million
      </p>
    </div>
  );
};

export default SingleCardElement;

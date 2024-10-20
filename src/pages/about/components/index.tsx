import { useParams } from "react-router-dom";
import translations from "@/pages/home/static/Translations";

const AboutDescription = () => {
  const { lang = "ka" } = useParams<{ lang: "ka" | "en" }>();
  const t = translations[lang];
  return <div>{t.AboutDescription}</div>;
};

export default AboutDescription;

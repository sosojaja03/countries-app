import "./index.css";

interface Country {
  name: string;
  population: number;
  capital: string;
}

const CountryData: Country[] = [
  {
    name: "Georgia",
    population: 3.713,
    capital: "Tbilisi",
  },
  // {
  //   name: "France",
  //   population: 67.97,
  //   capital: "Paris",
  // },
  // {
  //   name: "Turkey",
  //   population: 84.98,
  //   capital: "Ankara",
  // },
];

const App: React.FC = () => {
  return (
    <>
      <div>
        <Header />
        <Hero />
        <Cards countries={CountryData} />
      </div>
    </>
  );
};

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1 className="logo-text">WonderTravel</h1>
        </div>
        <nav>
          <ul className="nav-list">
            {["Destinations", "Tours", "About", "Contact"].map((item) => (
              <li key={item} className="nav-item">
                <a href="#" className="nav-link">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="header-actions">
          <span className="search-icon">🔍</span>
          <button className="button">Book Now</button>
        </div>
      </div>
    </header>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h2 className="hero-title">Discover the World with WonderTravel</h2>
          <p className="hero-description">
            Embark on unforgettable journeys to exotic destinations. Create
            memories that last a lifetime.
          </p>
          <div className="hero-buttons">
            <button className="button">Explore Destinations</button>
            <button className="button">View Tours</button>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://img.freepik.com/free-photo/travel-concept-with-lugagge-hat_23-2149030570.jpg?t=st=1727013942~exp=1727017542~hmac=7e08316eea62aa5b859d5c14433d7a9d5d1e0dab3d745c0bed6153bf92c7e2b6&w=360"
            alt="Hero Image"
          ></img>
        </div>
      </div>
    </section>
  );
};

interface CardsProps {
  countries: Country[];
}

const Cards: React.FC<CardsProps> = ({ countries }) => {
  return (
    <section className="cards">
      <div className="card-container">
        {countries.map((country, index) => (
          <div key={index} className="card">
            <h3 className="card-title">{country.name}</h3>
            <p className="card-description">
              <p> Capital: {country.capital}</p>
              <p> Population: {country.population} million</p>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default App;

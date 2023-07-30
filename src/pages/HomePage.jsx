import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getCountry = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('https://ih-countries-api.herokuapp.com/countries');
        const countriesData = response.data;
        setCountries(countriesData);
        setIsLoading(false);
      } catch (error) {
        console.log('There has been an error: ', error);
        setIsLoading(false);
      }
    };
    getCountry();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">WikiCountries: Your Guide to the World</h2>
      <div className="row">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          countries.map((country) => (
            <div key={country.name.common} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <Link to={country.alpha3Code} className="card text-center">
                <img
                  src={"https://flagpedia.net/data/flags/icon/72x54/" + country.alpha2Code.toLowerCase() + '.png'}
                  className="card-img-top country-flag-img"
                  alt={country.name.common}
                />
                <div className="card-body">
                  <h5 className="card-title">{country.name.common}</h5>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HomePage;

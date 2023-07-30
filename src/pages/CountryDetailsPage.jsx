import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function CountryDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [countryData, setCountryData] = useState(null);
  const { countryId } = useParams();

  useEffect(() => {
    const getCountryInfo = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`https://ih-countries-api.herokuapp.com/countries/${countryId}`);
        const oneCountryData = response.data;
        setCountryData(oneCountryData);
        setIsLoading(false);
      } catch (error) {
        console.log('There has been an error: ', error);
        setIsLoading(false);
      }
    };
    getCountryInfo();
  }, [countryId]);
  return (
    <div className="container mt-4">
      <h2>Country Details</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : countryData ? (
        <div className="card country-data-card">
          <img
            className="card-img-top country-flag-img"
            src={"https://flagpedia.net/data/flags/icon/72x54/" + countryData.alpha2Code.toLowerCase() + '.png'}
            alt={countryData.name.common}
          />
        <h3 className="card-title">{countryData.name.common}</h3>
          <div className="card-body card-body-details">
            <div>
                <p className="card-text"><span className="bold">Capital:</span> {countryData.capital}</p>
                <p className="card-text"><span className="bold">Language:</span> </p>
                <p className="card-text"><span className="bold">Area:</span> {countryData.area}km <sup>2</sup></p>
            </div>
            <div className="card-text borders">
            <strong>Borders:</strong>
              {countryData.borders.length === 0 ? (
                <p>No neighboring countries</p>
              ) : (
                
                    
                    <ul>
                      {countryData.borders.map((border) => (
                        <li key={border}>
                          <Link to={`/${border}`}>{border}</Link>
                        </li>
                      ))}
                    </ul>
                
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>Information not available</p>
      )}
    </div>
  );
}

export default CountryDetails;

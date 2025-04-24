import React, { useEffect, useState } from 'react';
import api from "../api.js";  
import AddCountryForm from './AddCountryForm.jsx';

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState('');

  const fetchCountries = async () => {
    try {
      const response = await api.get('/countries');
      setCountries(response.data.countries);
    } catch (error) {
      console.error("Error fetching countries", error);
    }
  };

  const addCountry = async (countryName) => {
    try {
     
      const response = await api.get(`/countries/${countryName}`);
      
     
      if (response.data && response.data.languages) {
        setCountries([...countries, { name: response.data.name, languages: response.data.languages, capital: response.data.capital, currency: response.data.currency
      }]);
      } else {
        setError('Country not found');
      }
    } catch (error) {
      setError('Error fetching country information');
      console.error("Error adding country", error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);



  return (
    <div>
    
      {error && <p>{error}</p>}
      <ul>
        {countries.map((country, index) => (
          <li key={index}>
            <strong style={{ fontSize: '1.5em'}}>{country.name}</strong>
            <div>
              <span><strong>Capital:</strong> {country.capital}</span>
            </div>
            <div>
            <span><strong>Currency:</strong> {country.currency ? country.currency.join(', ') : 'No currencies available'}</span>

            </div>
            <div>
              <span><strong>Languages:</strong> {country.languages ? country.languages.join(', ') : 'No languages available'}</span>
            </div>
           
          

          </li>
        ))}
      </ul>
      <AddCountryForm addCountry={addCountry} />
    </div>
  );
};

export default CountryList;

import React, { useEffect, useState } from 'react';
import api from "../api.js";  // Assuming you're using Axios to make API calls
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
      // Fetch the country details, languages, and capital city from the backend
      const response = await api.get(`/countries/${countryName}`);
      
      // If the country is found, update the list
      if (response.data && response.data.languages) {
        setCountries([...countries, { name: response.data.name, languages: response.data.languages, capital: response.data.capital }]);
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
            <strong>{country.name}</strong>
            <div>
              <span><strong>Capital:</strong> {country.capital}</span>
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

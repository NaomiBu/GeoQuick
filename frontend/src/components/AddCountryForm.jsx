import React, { useState } from 'react';

const AddCountryForm = ({ addCountry }) => {
  const [countryName, setCountryName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (countryName) {
      addCountry(countryName);  // Send country name to the backend
      setCountryName('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={countryName}
        onChange={(e) => setCountryName(e.target.value)}
        placeholder="Enter Country name"
      />
      <button type="submit">Add Country</button>
    </form>
  );
};

export default AddCountryForm;


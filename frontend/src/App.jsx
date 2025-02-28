import React from 'react';
import './App.css';
import CountryList from './components/Countries';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>GeoQuick </h1>
      </header>
      <main>
        <CountryList />
      </main>
    </div>
  );
};

export default App;
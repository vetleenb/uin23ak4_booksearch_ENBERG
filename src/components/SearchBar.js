import React, { useState } from 'react';

const MySearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Søk her..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button type="submit">Søk</button>
    </form>
  );
};

export default MySearchBar;

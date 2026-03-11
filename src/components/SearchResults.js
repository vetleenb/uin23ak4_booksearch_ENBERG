import React from 'react';

const SearchResults = ({ results }) => {
  return (
    <div className="search-results">
      {results.map((result, index) => (
        <div key={index} className="result">
          <h2>{result.title}</h2>
          <p>Utgivelsesår: {result.first_publish_year}</p>
          <p>Forfatter: {result.author_name ? result.author_name.join(', ') : 'Unknown'}</p>
          <p>Gjennomsnittlig rating: {result.average_rating || 'N/A'}</p>
          <a href={`https://www.amazon.com/s?k=${result.amazon_id}`} target="_blank" rel="noopener noreferrer">Søk på Amazone her!</a>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;

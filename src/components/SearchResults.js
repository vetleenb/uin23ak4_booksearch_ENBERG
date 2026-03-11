import React from 'react';

const SearchResults = ({ results }) => {
  if (!results || results.length === 0) {
    return <p>Ingen resultater funnet.</p>;
  }

  return (
    <div className="search-results">
      {results.map((result) => (
        <div key={result.key || result.cover_edition_key} className="result">
          {result.cover_i && (
            <img 
              src={`https://covers.openlibrary.org/b/id/${result.cover_i}-M.jpg`} 
              alt={result.title} 
            />
          )}
          <h2>{result.title}</h2>
          <p>Utgivelsesår: {result.first_publish_year || 'Ukjent'}</p>
          <p>Forfatter: {result.author_name ? result.author_name.join(', ') : 'Ukjent'}</p>
          <p>Gjennomsnittlig rating: {result.average_rating || 'N/A'}</p>
          <a 
            href={`https://www.amazon.com/s?k=${encodeURIComponent(result.title + ' ' + (result.author_name?.[0] || ''))}`} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Søk på Amazon her!
          </a>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;

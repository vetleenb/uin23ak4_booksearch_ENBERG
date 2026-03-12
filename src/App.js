import './App.css';
import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import BookCard from './components/BookCard';

const App = () => {
  const [books, setBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Hent default bøker
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          'https://openlibrary.org/subjects/james_bond.json'
        );
        const data = await response.json();
        setBooks(data.works);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
      setLoading(false);
    };
    fetchBooks();
  }, []);

  // Håndter søk
  const handleSearch = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${searchTerm}`
      );
      const data = await response.json();
      setSearchResults(data.docs);
    } catch (error) {
      console.error('Error searching books:', error);
    }
    setLoading(false);
  };

  // Legg til/fjern favoritter
  const toggleFavorite = (book) => {
    let updatedFavorites;
    const exists = favorites.find(fav => fav.key === book.key);
    if (exists) {
      updatedFavorites = favorites.filter(fav => fav.key !== book.key);
    } else {
      updatedFavorites = [...favorites, book];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="App">
      <header>
        <h1>James Bond Bøker</h1>
        <MySearchBar onSearch={handleSearch} />
      </header>

      {/* Favoritter */}
      {favorites.length > 0 && (
        <section className="favorites">
          <h2>Mine favoritter</h2>
          <div className="book-list">
            {favorites.map((book) => (
              <BookCard
                key={book.key}
                book={book}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </section>
      )}

      <main>
        {loading && <p>Loading books...</p>}

        {searchResults.length > 0 ? (
          <SearchResults
            results={searchResults}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        ) : (
          <div className="book-list">
            {books.map((book) => (
              <BookCard
                key={book.key}
                book={book}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}
      </main>

      <footer>
        <p>&copy; 2024 Vetle Enberg</p>
      </footer>
    </div>
  );
};

export default App;

import './App.css';
import React, { useState, useEffect } from 'react';
import MySearchBar from './components/MySearchBar';
import MySearchResults from './components/MySearchResults';
import BookCard from './components/BookCard';

const App = () => {
  const [books, setBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const handleSearch = async (searchTerm) => {
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${searchTerm}`
      );

      const data = await response.json();
      setSearchResults(data.docs);

    } catch (error) {
      console.error('Error searching books:', error);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>James Bond Bøker</h1>
        <MySearchBar onSearch={handleSearch} />
      </header>

      <main>
        {loading && <p>Loading books...</p>}

        {searchResults.length > 0 ? (
          <MySearchResults results={searchResults} />
        ) : (
          <div className="book-list">
            {books.map((book) => (
              <BookCard key={book.key} book={book} />
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

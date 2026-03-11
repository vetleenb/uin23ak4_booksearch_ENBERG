import React from 'react';

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      {book.cover_i && (
        <img 
          src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} 
          alt={book.title} 
          className="book-cover"
        />
      )}
      <div className="book-info">
        <h2>{book.title}</h2>
        <p>Forfatter: {book.author_name ? book.author_name.join(', ') : 'Ukjent'}</p>
        <p>År: {book.first_publish_year || 'Ukjent'}</p>
      </div>
    </div>
  );
};

export default BookCard;













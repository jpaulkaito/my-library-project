import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { fetchBooks, removeBook } from '../features/api/api';
 import { baseUrlImg } from '../app/shared/baseUrl';

const AllBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks()
      .then((data) => setBooks(data))
      // .then((data) => {
      //   const booksWithImageUrls = mapImageURL(data);
      //   setBooks(booksWithImageUrls);
      // })
      .catch((error) => console.error('Error fetching books:', error));
  }, []);

  const handleBookDeleted = async (bookId) => {
    const isSuccess = await removeBook(bookId);
    if (isSuccess) {
      console.log('Book removed from server successfully!');
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    }
  };

  return (
    <div>
      <h2>All Books</h2>
      <div className="card-deck-wrapper">
        {books.map((book) => (
          <Card key={book.id} className="mb-3">
            <div className="book-image-container">
              <img
                src={baseUrlImg + book.imgurl}
                alt={book.title}
                className="book-image"
              />
            </div>
            <CardBody>
              <CardTitle>{book.title}</CardTitle>
              <CardText>{book.description}</CardText>
              <Button color="danger" onClick={() => handleBookDeleted(book.id)}>
                Delete
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;

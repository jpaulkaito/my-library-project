import React, { useEffect, useState } from 'react';
import { Card, CardDeck, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { fetchBooks, removeBook } from '../features/api/api';
//import bla from '../app/images';

const AllBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks()
      .then((data) => setBooks(data))
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
      <CardDeck>
        {books.map((book) => (
          <Card key={book.id} className="mb-3">
            <CardBody>
              <CardTitle>{book.title}</CardTitle>
              <CardText>{book.description}</CardText>
              <Button color="danger" onClick={() => handleBookDeleted(book.id)}>
                Delete
              </Button>
            </CardBody>
          </Card>
        ))}
      </CardDeck>
    </div>
  );
};

export default AllBooks;

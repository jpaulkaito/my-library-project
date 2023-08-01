import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { fetchBooks, removeBook } from '../features/api/api';
import { baseUrlImg } from '../app/shared/baseUrl';
import Loading from './Loading';
import Deleting from './Deleting';

const AllBooks = () => {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [deletingStates, setDeletingStates] = useState([]); // Separate state for each book

  useEffect(() => {
    fetchBooks()
      .then((data) => {
        setBooks(data);
        setDeletingStates(data.map(() => false)); // Initialize deleting states for each book to false
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
        setLoading(false);
      });
  }, []);

  const handleBookDeleted = async (bookId, index) => {
    try {
      setDeletingStates((prevStates) => {
        const newStates = [...prevStates];
        newStates[index] = true; // Set deleting state to true for the specific book
        return newStates;
      });

      const isSuccess = await removeBook(bookId);
      if (isSuccess) {
        console.log('Book removed from server successfully!');
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
      } else {
        console.error('Failed to remove the book.');
      }
    } catch (error) {
      console.error('Error removing book:', error);
    } finally {
      setDeletingStates((prevStates) => {
        const newStates = [...prevStates];
        newStates[index] = false; // Reset deleting state to false after the operation is done
        return newStates;
      });
    }
  };

  return (
    <div>
      <h2>All Books</h2>
      {loading ? (
        <Loading />
      ) : (
        <div className="card-deck-wrapper">
          {books.map((book, index) => (
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
                <Button
                  color="danger"
                  onClick={() => handleBookDeleted(book.id, index)} // Pass index to identify which book is being deleted
                >
                  {deletingStates[index] ? <Deleting /> : 'Delete'} {/* Use the specific deleting state */}
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBooks;

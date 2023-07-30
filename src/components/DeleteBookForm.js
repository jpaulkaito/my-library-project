import React from 'react';
import { Button } from 'reactstrap';
import { removeBook } from '../features/api/api'; // Import the API function for removing a book

const DeleteBookForm = ({ bookId, onBookDeleted }) => {
  const handleDeleteBook = async () => {
    const isSuccess = await removeBook(bookId);
    if (isSuccess) {
      // Notify the parent component that the book was deleted successfully
      onBookDeleted(bookId);
      console.log('Book removed from server successfully!');
    }
  };

  return (
    <Button color="danger" onClick={handleDeleteBook}>
      Delete
    </Button>
  );
};

export default DeleteBookForm;
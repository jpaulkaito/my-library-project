import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { fetchBooks } from '../features/api/api';
import { baseUrlImg } from '../app/shared/baseUrl';
import UpdateBookForm from './UpdateBookForm';
import Loading from './Loading';

const Updatebook = () => {
    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState([]);
    const [showUpdateFormForBookId, setShowUpdateFormForBookId] = useState(null);

    useEffect(() => {
        fetchBooks()
            .then((data) => {
                setBooks(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching books:', error)
                setLoading(false);
            });
    }, []);

    const handleBookUpdated = (updatedBook) => {
        setBooks((prevBooks) =>
            prevBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book))
        );
        setShowUpdateFormForBookId(null); // Hide the update form after successful update
    };

    const handleUpdateButtonClick = (bookId) => {
        setShowUpdateFormForBookId(bookId);
    };

    return (
        <div>
            <h2>All Books</h2>
            {loading ? (
                <Loading />
            ) : (
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
                                {showUpdateFormForBookId === book.id ? (
                                    <UpdateBookForm
                                        book={book}
                                        onUpdate={handleBookUpdated}
                                    />
                                ) : (
                                    <Button
                                        color="primary"
                                        onClick={() => handleUpdateButtonClick(book.id)}
                                    >
                                        Update
                                    </Button>
                                )}
                            </CardBody>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Updatebook;

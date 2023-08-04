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
        setShowUpdateFormForBookId(null);
    };

    const handleUpdateButtonClick = (bookId) => {
        setShowUpdateFormForBookId(bookId);
    };

    const handleCancelUpdate = () => {
        setShowUpdateFormForBookId(null);
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
                            <CardBody className="d-flex flex-column">
                                <CardTitle>{book.title}</CardTitle>
                                <CardText>{book.description}</CardText>
                                <div className="d-flex justify-content-center align-items-center mt-auto">
                                    {showUpdateFormForBookId === book.id ? (
                                        <UpdateBookForm
                                            book={book}
                                            onUpdate={handleBookUpdated}
                                            onCancel={handleCancelUpdate}
                                        />
                                    ) : (
                                        <Button
                                            color="primary"
                                            onClick={() => handleUpdateButtonClick(book.id)}
                                        >
                                            Update
                                        </Button>
                                    )}
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Updatebook;

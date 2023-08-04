import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { fetchBooks } from '../features/api/api';
import { baseUrlImg } from '../app/shared/baseUrl';
import Loading from './Loading';

const BorrowBooks = () => {
    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks()
            .then((data) => {
                setBooks(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching books:', error);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h2>Borrow Books</h2>
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
                            <CardBody className="d-flex flex-column">
                                <CardTitle>{book.title}</CardTitle>
                                <CardText>{book.description}</CardText>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            )}
        </div>

    )
}

export default BorrowBooks;
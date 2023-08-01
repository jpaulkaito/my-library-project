import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { updateBook } from '../features/api/api';
import Updating from './Updating';

const UpdateBookForm = ({ book, onUpdate }) => {
    const [updating, setUpdating] = useState(false);
    const [title, setTitle] = useState(book.title);
    const [description, setDescription] = useState(book.description);
    const status = book.status;
    const imgurl = book.imgurl;
    const category = book.category;

    const handleUpdate = async () => {
        try {
            setUpdating(true);
            const isSuccess = await updateBook(book.id, { title, description, status, imgurl, category });
            if (isSuccess) {
                console.log(book.status);
                console.log(book.imgurl);
                console.log(book.category);
                console.log('Book updated successfully!');
                onUpdate({ ...book, title, description });
            } else {
                console.error('Failed to update the book.');
            }
        } catch (error) {
            console.error('Error updating book:', error);
        } finally {
            setUpdating(false);
        }
    };

    return (
        <Form>
            <FormGroup>
                <Label for="title">Title</Label>
                <Input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label for="description">Description</Label>
                <Input
                    type="textarea"
                    name="description"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </FormGroup>
            {/* {loading ? (
                <Updating />
            ) : (
                <Button color="primary" onClick={handleUpdate}>
                    Update
                </Button>
            )} */}
            <Button color="primary" onClick={handleUpdate} disabled={updating}>
                {updating ? <Updating /> : 'Update'}
            </Button>
        </Form>
    );
};

export default UpdateBookForm;

    import React, { useState } from 'react';
    import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
    import { updateBook } from '../features/api/api'; // Import the API function for updating book details

    const UpdateBookForm = ({ book, onUpdate }) => {
    const [title, setTitle] = useState(book.title);
    const [description, setDescription] = useState(book.description);
    const status = book.status;
    const imgurl = book.imgurl;
    const category = book.category;

    const handleUpdate = async () => {
        try {
        const isSuccess = await updateBook(book.id, { title, description, status, imgurl, category});
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
        <Button color="primary" onClick={handleUpdate}>
            Update
        </Button>
        </Form>
    );
    };

    export default UpdateBookForm;

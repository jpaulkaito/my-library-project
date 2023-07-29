import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, Label, Input, Button } from 'reactstrap';

const AddBookForm = () => {
  const initialValues = {
    title: '',
    description: '',
    category: '',
  };

  const handleAddBook = async (values, { resetForm }) => {
    // Make a POST request to your backend API endpoint to add the book
    try {
      const response = await fetch('http://localhost:3001/libraryBooks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          status: 'Available',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add book');
      }

      // Book added successfully, you can handle this as you prefer
      console.log('Book added successfully!');
      // Reset the form after successful submission
      resetForm();
      // You may want to refresh the list of books on the main page or show a success message.
    } catch (error) {
      console.error('Error adding book:', error);
      // Handle the error, display a message to the user, etc.
    }
  };

  const validateForm = (values) => {
    const errors = {};

    // Add validation rules if needed
    if (!values.title) {
      errors.title = 'Required';
    }

    return errors;
  };

  return (
    <div>
      <h2>Add a new book</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleAddBook}
        validate={validateForm}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormGroup>
              <Label for="title">Title:</Label>
              <Field as={Input} type="text" name="title" id="title" />
              <ErrorMessage name="title" component="div" className="error-message" />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description:</Label>
              <Field as={Input} type="textarea" name="description" id="description" />
              <ErrorMessage name="description" component="div" className="error-message" />
            </FormGroup>
            <FormGroup>
              <Label for="category">Category:</Label>
              <Field as={Input} type="text" name="category" id="category" />
              <ErrorMessage name="category" component="div" className="error-message" />
            </FormGroup>
            <Button type="submit" color="primary" disabled={isSubmitting}>
              {isSubmitting ? 'Adding...' : 'Add Book'}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddBookForm;

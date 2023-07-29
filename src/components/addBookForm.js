import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

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
        <Form>
          <div>
            <label>Title:</label>
            <Field type="text" name="title" />
            <ErrorMessage name="title" component="div" className="error-message" />
          </div>
          <div>
            <label>Description:</label>
            <Field as="textarea" name="description" />
            <ErrorMessage name="description" component="div" className="error-message" />
          </div>
          <div>
            <label>Category:</label>
            <Field type="text" name="category" />
            <ErrorMessage name="category" component="div" className="error-message" />
          </div>
          <button type="submit">Add Book</button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddBookForm;

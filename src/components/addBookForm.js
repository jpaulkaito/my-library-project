import React, { useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import { baseUrl } from '../app/shared/baseUrl';

const AddBookForm = () => {
  const fileInputRef = useRef(null);

  const initialValues = {
    title: '',
    description: '',
    category: '',
    imgurl: '',
  };

  const handleAddBook = async (values, { resetForm }) => {
    try {
      const selectedFile = fileInputRef.current.files[0];

      if (selectedFile) {
        values.imgurl = selectedFile.name;
        console.log("SelectedFile Name: " + selectedFile);
      } else if (!values.imgurl) {
        values.imgurl = 'librarypic.jpg';
      }

      if (selectedFile) {
        values.imgurl = selectedFile.name;
        console.log("SelectedFile Name: " + selectedFile);
      }

      const response = await fetch(baseUrl + 'libraryBooks', {
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

      console.log('Book added successfully!');
      resetForm();
      fileInputRef.current.value = '';
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const validateForm = (values) => {
    const errors = {};

    if (!values.title) {
      errors.title = 'Required';
    }
    if (!values.description) {
      errors.description = 'Required';
    }
    if (!values.category) {
      errors.category = 'Required';
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
              <ErrorMessage name="title" component="div" className="text-danger" />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description:</Label>
              <Field as={Input} type="textarea" name="description" id="description" />
              <ErrorMessage name="description" component="div" className="text-danger" />
            </FormGroup>
            <FormGroup>
              <Label for="category">Category:</Label>
              <Field as={Input} type="text" name="category" id="category" />
              <ErrorMessage name="category" component="div" className="text-danger" />
            </FormGroup>
            <FormGroup>
              <Label for="imgurl">Image Upload:</Label>
              <Input
                type="file"
                name="imgurl"
                id="imgurl"
                innerRef={fileInputRef}
                onChange={(e) => {
                  console.log(e.target.value);
                  if (!e.target.value) {
                    fileInputRef.current.value = null;
                  }
                }}
              />
              <ErrorMessage name="imgurl" component="div" className="text-danger" />
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

import { baseUrl } from '../../app/shared/baseUrl';

export const fetchBooks = async () => {
  try {
    const response = await fetch(baseUrl + 'libraryBooks');
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
};

export const removeBook = async (bookId) => {
  try {
    const response = await fetch(baseUrl + `libraryBooks/${bookId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to remove book');
    }
    console.log('Book removed successfully!');
    return true;
  } catch (error) {
    console.error('Error removing book:', error);
    return false;
  }
};

export const updateBook = async (bookId, updatedBookData) => {
  try {
    const response = await fetch(baseUrl + `libraryBooks/${bookId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBookData),
    });
    if (!response.ok) {
      throw new Error('Failed to update book');
    }
    console.log('Book updated successfully!');
    return true;
  } catch (error) {
    console.error('Error updating book:', error);
    return false;
  }
};



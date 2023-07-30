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
  
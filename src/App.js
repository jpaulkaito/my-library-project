// App.js
import React from 'react';
import Sidebar from './components/SidebarMenu';
import { Routes, Route } from 'react-router-dom';
import AddBookPage from './pages/AddBookPage';
import DeleteBookPage from './pages/DeleteBookPage';
import UpdateBookPage from './pages/UpdateBookPage';
import BorrowPage from './pages/BorrowPage';

import './App.css';

const App = () => {
  return (
    <div className='App'>
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="content-container">
        <Routes>
          <Route path='/addbooks' element={<AddBookPage />} />
          <Route path='/deletebooks' element={<DeleteBookPage />} />
          <Route path='/updatebooks' element={<UpdateBookPage />} /> 
          <Route path='/borrow' element={<BorrowPage />} /> 
        </Routes>
      </div>
    </div>
  );
};

export default App;

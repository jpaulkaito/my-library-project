// App.js
import React from 'react';
import Sidebar from './pages/SidebarMenu';
import { Routes, Route } from 'react-router-dom';
import AddBookPage from './pages/AddBookPage';
import DeleteBookPage from './pages/DeleteBookPage';
import UpdateBookPage from './pages/UpdateBookPage';
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
        </Routes>
      </div>
    </div>
  );
};

export default App;

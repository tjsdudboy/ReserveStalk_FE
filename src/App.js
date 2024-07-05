import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './app/page/Main';
import Login from './app/page/Login';
import MainPage from './app/page/MainPage'; 
import Signup from './app/page/SignUp'; 
import ProductPage from './app/page/ProductPage';
import AddProduct from './app/page/AddProductPage';
import ProductEditPage from './app/page/ProductEditPage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />        
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/join" element={<Signup />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/add" element={<AddProduct />} />
        <Route path="/products/edit/:id" element={<ProductEditPage />} /> 
      </Routes>
    </Router>
  );
};

export default App;

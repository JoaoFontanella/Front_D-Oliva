import React, { useState, useContext } from 'react';
import Pagination from '../components/Pagination';
import { products } from "../components/ProductosRosto";
import "../styles/Categoria.css";
import Footer from '../components/Footer';
import Header from '../components/Header';
import Card from '../components/Card';
import { CartContext } from '../context/CartContext'; 

const Categoria = () => {  
  const [currentPage, setCurrentPage] = useState(1);
  const { addToCart } = useContext(CartContext);
  const itemsPerPage = 24;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const filteredCategory = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const currentItems = filteredCategory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddToCart = (product) => {
    addToCart(product);
    setMessage(`"${product.title}" foi adicionado ao carrinho!`);
    setTimeout(() => setMessage(''), 1000);
  };


  return (
    <div className="rosto-container">
      <Header onSearch={handleSearch} />
      <h1 className="rosto-title">Rosto</h1>
      <main className="rosto-main-content">
      {message && <div className="confirmation-message">{message}</div>}
        {currentItems.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.title}
            description={product.description}
            addToCart={handleAddToCart}
            product={product}
          />
        ))}
      </main>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <Footer />
    </div>
  );
};

export default Categoria;

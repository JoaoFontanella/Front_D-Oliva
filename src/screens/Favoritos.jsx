import React, { useState, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Pagination from '../components/Pagination';
import '../styles/Favoritos.css';
import { FavoritesContext } from '../context/FavoritesContext';
import { CartContext } from '../context/CartContext';

const Favoritos = () => {
  const { addToCart } = useContext(CartContext);
  const { favoriteItems } = useContext(FavoritesContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');

  const itemsPerPage = 24;
  const totalPages = Math.ceil(favoriteItems.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setMessage(`"${product.title}" foi adicionado ao carrinho!`);
    setTimeout(() => setMessage(''), 1000);
  };

  const filteredFavorites = favoriteItems.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentItems = filteredFavorites.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <div className="favoritos-page">
      <Header onSearch={handleSearch} />
      <main className="main-content">
        {message && <div className="confirmation-message">{message}</div>}
        {currentItems.length > 0 ? (
          currentItems.map((product) => (
            <Card
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.title}
            description={product.description}
            addToCart={() => handleAddToCart(product)}
            product={product}
            />
          ))
        ) : (
          <p className="no-favorites-message">Nenhum item foi adicionado aos favoritos.</p>
        )}
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

export default Favoritos;

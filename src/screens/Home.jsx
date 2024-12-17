import React, { useState, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Pagination from '../components/Pagination';
import '../styles/Home.css';
import { CartContext } from '../context/CartContext';
import { products } from '../components/Products';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const Home = () => {
  const { addToCart } = useContext(CartContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');

  const itemsPerPage = 24;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentItems = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddToCart = (product) => {
    addToCart(product);
    setMessage(`"${product.title}" foi adicionado ao carrinho!`);
    setTimeout(() => setMessage(''), 1000);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (

    
    <div>
      <Header onSearch={handleSearch} />
      <br/><br/>
      <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="../src/assets/Banner_1.png" className="d-block w-100" alt="Promoção 1" />
          </div>
          <div className="carousel-item">
            <img src="../src/assets/Banner_2.png" className="d-block w-100" alt="Promoção 2" />
          </div>
          <div className="carousel-item">
            <img src="../src/assets/Banner_3.png" className="d-block w-100" alt="Promoção 3" />
          <div id="myCarousel" className="carousel slide" data-ride="carousel" data-interval="1000">
            </div>
          </div>
        </div>
      </div>
      <main className="main-content">
        {message && <div className="confirmation-message">{message}</div>}
        {currentItems.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.title}
            description={product.description}
            addToCart={() => handleAddToCart(product)}
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

export default Home;

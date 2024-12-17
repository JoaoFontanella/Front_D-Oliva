import { React, useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../components/Products';
import '../styles/ProductDetail.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CartContext } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((product) => product.id === parseInt(id));
  const { addToCart } = useContext(CartContext);
  const [message, setMessage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return (
      <div>
        <Header />
        <div className="product-not-found">
          <h2>Produto não encontrado</h2>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setMessage(`"${product.title}" foi adicionado ao carrinho!`);
    setTimeout(() => setMessage(''), 1000);
  };

  return (
    <div>
      <Header />
      <div className="product-detail-container">
        <div className="product-image-container">
          <img
            src={product.image}
            alt={product.title}
            className="product-detail-image"
          />
        </div>
        <div className="product-info-container">
          <h1 className="product-detail-title">{product.title}</h1>
          <p className="product-detail-description">
            {product.descricao_produto}
          </p>
          <p className="product-detail-price">{product.description}</p>
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Adicionar ao Carrinho
          </button>
          {message && <div className="confirmation-message">{message}</div>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;

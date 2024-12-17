import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext';
import '../styles/Card.css';
import { Link } from 'react-router-dom';

const Card = ({ id, image, title, description, addToCart, product }) => {
  const { favoriteItems, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);
  const navigate = useNavigate();
  const isFavorite = favoriteItems.some((item) => item.id === id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFromFavorites(id);
    } else {
      addToFavorites(product);
    }
  };

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="card">
      <div onClick={handleCardClick}>
        <img src={image} alt={title} className="card-image" />
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>
      <div className="card-buttons">
        <button className="card-button" onClick={() => addToCart(product)}>
          <img
            src="../src/assets/Cart.png"
            alt="Cart"
          />
        </button>
        <button className="fav-button" onClick={handleFavoriteClick}>
          <img
            src={isFavorite ? "../src/assets/FavoritosSelecionado.png" : "../src/assets/Favoritos.png"}
            alt="Favoritos"
          />
        </button>
      </div>
    </div>
  );
};

export default Card;

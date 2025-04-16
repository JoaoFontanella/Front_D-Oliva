import React from 'react';
import '../styles/Header.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = ({ onSearch }) => {
  const handleInputChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img
            src="/assets/LOGO.png"
            alt="Logo"
          />
        </Link>
      </div>
      <ul className="nav-links">
          <li><Link to="/Rosto">Rosto</Link></li>
          <li><Link to="#">Cabelo</Link></li>
          <li><Link to="#">Unhas</Link></li>
          <li><Link to="#">Corpo</Link></li>
        </ul>
      <div className="imagemheader"></div>
      <div className="search-bar">
        <input type="text" placeholder="O que você está procurando?" onChange={handleInputChange} />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="pink"
          className="bi bi-search search-icon"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
      </div>
      <div className='buttons_header'>
      <Link to="/Favoritos" id="Fav">
      <button id="fav" className="favorito_button" type="submit">
        <img
          src="/assets/Favoritos.png"
          alt="Fav"
        />
      </button>
      </Link>
      <Link to="/Cart" id="Cart">
        <button id="cart" className="cart_button" type="submit">
          <img
            src="/assets/Cart.png"
            alt="Cart"
          />
        </button>
      </Link>
      <Link to="/Createaccount" id="User">
        <button id="user" className="user_button" type="submit">
          <img
            src="/assets/User.png"
            alt="User"
          />
        </button>
      </Link>
      </div>
    </header>
  );
};

export default Header;

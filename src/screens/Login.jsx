import React, { useState } from 'react';
import '../styles/Login.css';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(email, password);
  };

  return (
    <div>
      <Header />
      <div className="name-input-container">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          id="email"
          type="email"
          placeholder="Digite seu Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          id="password"
          type="password"
          placeholder="Digite sua Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
          <button id="next" type='submit'>
            Login
          </button>
        <br></br>
        <Link to="/Createaccount" id="createaccount">
          Criar uma conta
        </Link>
      </form>
      </div>
      <Footer />
    </div>
  );
}

export default Login;

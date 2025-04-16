import React, { useState, useContext, useEffect } from 'react';
import '../styles/Checkout.css';
import Header from '../components/Header';
import { CartContext } from '../context/CartContext';
import Footer from '../components/Footer';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState('cartao');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const calculateTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleCardDetailsChange = (event) => {
    const { name, value } = event.target;
    setCardDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const validateFields = () => {
    const billingInputs = document.querySelectorAll('.billing-details input');
    const allFieldsValid = Array.from(billingInputs).every((input) =>
      input.checkValidity()
    );

    if (!allFieldsValid) {
      Swal.fire({
        title: 'Erro!',
        text: 'Por favor, preencha todos os campos de endereço corretamente.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#EC747C',
      });
      return false;
    }

    if (paymentMethod === 'cartao') {
      const cardInputs = document.querySelectorAll('.card-details input');
      const allCardFieldsValid = Array.from(cardInputs).every((input) =>
        input.checkValidity()
      );

      if (!allCardFieldsValid) {
        Swal.fire({
          title: 'Erro!',
          text: 'Por favor, preencha todos os campos do cartão corretamente.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#EC747C',
        });
        return false;
      }
    }

    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateFields()) {
      return;
    }

    console.log('Pedido enviado:', {
      paymentMethod,
      selectedProducts: cartItems,
      cardDetails: paymentMethod === 'cartao' ? cardDetails : null,
    });

    Swal.fire({
      title: 'Sucesso!',
      text: 'Compra concluída com sucesso!',
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#EC747C',
    })
      .then(() => {
        console.log('SweetAlert foi exibido com sucesso!');
      })
      .then(() => {
        clearCart();
        navigate('/');
      });
  };

  return (
    <div>
      <Header />
      <div className="checkout-container">
        <div className="billing-details">
          <h2>Detalhes de cobrança</h2>
          <label>Nome completo</label>
          <input type="text" required />
          <label>CEP</label>
          <input type="text" required />
          <label>Nome da rua</label>
          <input type="text" required />
          <label>Apartamento, andar, etc. (opcional)</label>
          <input type="text" />
          <label>Ponto de referência</label>
          <input type="text" required />
          <label>Cidade</label>
          <input type="text" required />
          <label>Número de telefone</label>
          <input type="tel" required />
          <label>Endereço de email</label>
          <input type="email" required />
        </div>

        <div className="order-summary">
          <h2>Resumo do Pedido</h2>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="order-item">
                <img src={item.image} alt={item.title} className="item-image" />
                <div className="item-details">
                  <p>{item.title}</p>
                  <p>R$ {item.price.toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="price-details">
            <p>Subtotal: R$ {calculateTotalPrice()}</p>
            <p>Envio: Grátis</p>
            <p>Total: R$ {calculateTotalPrice()}</p>
          </div>

          <div className="payment-method">
            <label>
              <input
                type="radio"
                value="cartao"
                checked={paymentMethod === 'cartao'}
                onChange={handlePaymentMethodChange}
              />
              Cartão
              <img
                className="payment-icons"
                src="/assets/Visa_Mastercard.png"
                alt="Cartões Aceitos"
              />
            </label>
            <label>
              <input
                type="radio"
                value="pagamentoEntrega"
                checked={paymentMethod === 'pagamentoEntrega'}
                onChange={handlePaymentMethodChange}
              />
              Pagamento na entrega
            </label>
          </div>

          {paymentMethod === 'cartao' && (
            <div className="card-details">
              <h3>Detalhes do Cartão</h3>
              <label>Número do Cartão</label>
              <input
                type="text"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleCardDetailsChange}
                required
              />
              <label>Nome no Cartão</label>
              <input
                type="text"
                name="cardHolder"
                placeholder="Digite o nome do cartão"
                value={cardDetails.cardHolder}
                onChange={handleCardDetailsChange}
                required
              />
              <label>Data de Expiração</label>
              <input
                type="month"
                name="expiryDate"
                value={cardDetails.expiryDate}
                onChange={handleCardDetailsChange}
                required
              />
              <label>CVV</label>
              <input
                type="text"
                name="cvv"
                value={cardDetails.cvv}
                onChange={handleCardDetailsChange}
                maxLength="3"
                pattern="\d{3}"
                required
              />
            </div>
          )}

          <button type="button" className="submit-order" onClick={handleSubmit}>
            Fazer pedido
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Checkout;

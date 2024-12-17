import React, { createContext, useState } from 'react';

// Criação do contexto de favoritos
export const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
  const [favoriteItems, setFavoriteItems] = useState([]);

  // Função para adicionar o item aos favoritos
  const addToFavorites = (product) => {
    const isAlreadyFavorite = favoriteItems.some((item) => item.id === product.id);
    if (!isAlreadyFavorite) {
      setFavoriteItems([...favoriteItems, product]);
    }
  };

  // Função para remover o item dos favoritos
  const removeFromFavorites = (productId) => {
    const updatedFavorites = favoriteItems.filter((item) => item.id !== productId);
    setFavoriteItems(updatedFavorites);
  };

  // Função para limpar todos os itens dos favoritos
  const clearFavorites = () => {
    setFavoriteItems([]);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteItems,
        addToFavorites,
        removeFromFavorites,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;

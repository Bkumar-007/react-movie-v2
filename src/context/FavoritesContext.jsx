import { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const FavoritesContext = createContext();

// Custom hook to use the favorites context
export const useFavorites = () => useContext(FavoritesContext);

// Provider component
export const FavoritesProvider = ({ children }) => {
  // Initialize favorites from localStorage if available
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Add a movie to favorites
  const addToFavorites = (movie) => {
    // Check if movie is already in favorites
    if (!favorites.some(fav => fav.id === movie.id)) {
      setFavorites([...favorites, movie]);
    }
  };

  // Remove a movie from favorites
  const removeFromFavorites = (movieId) => {
    setFavorites(favorites.filter(movie => movie.id !== movieId));
  };

  // Check if a movie is in favorites
  const isFavorite = (movieId) => {
    return favorites.some(movie => movie.id === movieId);
  };

  // Toggle favorite status
  const toggleFavorite = (movie) => {
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      toggleFavorite
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}; 
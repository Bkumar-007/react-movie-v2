import "../css/MovieCard.css"
import { useState } from "react";
import { useFavorites } from "../context/FavoritesContext";

function MovieCard({movie}){
    const [imageError, setImageError] = useState(false);
    const { isFavorite, toggleFavorite } = useFavorites();
    
    // Handle image loading errors
    const handleImageError = () => {
        setImageError(true);
    };
    
    // Use fallback image if there's an error loading the poster
    const imageUrl = imageError 
        ? "https://via.placeholder.com/300x450?text=No+Image" 
        : movie.url;
    
    // Check if this movie is in favorites
    const favorite = isFavorite(movie.id);
    
    return(
        <div className="movie-card">
            <div className="movie-poster">
                <img 
                    src={imageUrl} 
                    alt={movie.title}
                    onError={handleImageError}
                />
                <div className="movie-overplay">
                    <button 
                        className={`favourite-btn ${favorite ? 'active' : ''}`} 
                        onClick={() => toggleFavorite(movie)}
                    >
                        <span>{favorite ? '❤️' : '🤍'}</span>
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3>
                    {movie.title}
                </h3>
                <p>{movie.release}</p>
            </div>
        </div>
    )
}

export default MovieCard;
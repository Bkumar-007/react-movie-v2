import "../css/Favorites.css";
import { useFavorites } from "../context/FavoritesContext";
import MovieCard from "../component/movieCard";

function Favourites(){
    const { favorites } = useFavorites();
    
    return (
        <div className="favourites-container">
            <h1 className="favourites-title">My Favourite Movies</h1>
            
            {favorites.length === 0 ? (
                <div className="favourite-empty">
                    <h2>No favourite movies here</h2>
                    <p>Add some movies to your favourites by clicking the heart icon!</p>
                </div>
            ) : (
                <div className="movies-grid">
                    {favorites.map(movie => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Favourites;
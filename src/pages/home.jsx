import MovieCard from "../component/movieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                setLoading(true);
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (err) {
                console.error(err);
                setError("Failed to load movies. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        loadPopularMovies();
    }, []);

    useEffect(() => {
        const searchMoviesDebounced = async () => {
            if (!searchQuery.trim()) {
                // If search is empty, load popular movies
                try {
                    setLoading(true);
                    const popularMovies = await getPopularMovies();
                    setMovies(popularMovies);
                } catch (err) {
                    console.error(err);
                    setError("Failed to load movies. Please try again later.");
                } finally {
                    setLoading(false);
                }
                return;
            }

            setLoading(true);
            setError(null);
            
            try {
                const searchResults = await searchMovies(searchQuery);
                setMovies(searchResults);
            } catch (err) {
                console.error(err);
                setError("Failed to search movies. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        // Add debounce to prevent too many API calls
        const timeoutId = setTimeout(searchMoviesDebounced, 500);
        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    return (
        <div className="home">
            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Search for movies..." 
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            {loading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading movies...</p>
                </div>
            ) : (
                <div className="movies-grid">
                    {movies.length > 0 ? (
                        movies.map(movie => (
                            <MovieCard movie={movie} key={movie.id} />
                        ))
                    ) : (
                        <div className="no-results">No movies found</div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Home;
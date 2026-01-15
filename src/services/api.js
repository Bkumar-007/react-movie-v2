const API_KEY = "6e612b1d";
const BASE_URL = "http://www.omdbapi.com/";

export const getPopularMovies = async () => {
  // Using a broad search query to get a variety of movies
  const searchQuery = "movie";
  
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(searchQuery)}&type=movie`);
    const data = await response.json();
    
    if (data.Response === "True") {
      return data.Search.map(movie => {
        // Ensure we have a valid poster URL
        let posterUrl = "https://via.placeholder.com/300x450?text=No+Image";
        if (movie.Poster && movie.Poster !== "N/A" && movie.Poster.startsWith("http")) {
          posterUrl = movie.Poster;
        }
        
        return {
          id: movie.imdbID,
          title: movie.Title,
          release: movie.Year,
          url: posterUrl
        };
      });
    } else {
      throw new Error(data.Error || "Failed to fetch movies");
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const searchMovies = async (query) => {
  if (!query.trim()) return [];
  
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`
    );
    const data = await response.json();
    
    if (data.Response === "True") {
      return data.Search.map(movie => {
        // Ensure we have a valid poster URL
        let posterUrl = "https://via.placeholder.com/300x450?text=No+Image";
        if (movie.Poster && movie.Poster !== "N/A" && movie.Poster.startsWith("http")) {
          posterUrl = movie.Poster;
        }
        
        return {
          id: movie.imdbID,
          title: movie.Title,
          release: movie.Year,
          url: posterUrl
        };
      });
    } else {
      throw new Error(data.Error || "No movies found");
    }
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};

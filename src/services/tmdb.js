import axios from 'axios';
const apiKey = import.meta.env.VITE_MOVIE_DB_API_KEY;
const apiUrl = import.meta.env.VITE_TMDB_BASE_URL;

export const getPopularMovies = async (page = 1) => {
  try {
    const response = await axios.get(`${apiUrl}/movie/popular`, {
      params: {
        api_key: apiKey,
        language: 'en-US',
        page: page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Failed to fetch movies:', error);
    return [];
  }
};

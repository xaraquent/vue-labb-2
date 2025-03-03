import axios from 'axios';

export const getPopularMovies = async (page = 1) => {
  try {
    const response = await axios.get(
      `${import.meta.env.TMDB_BASE_URL}}/movie/popular`,
      {
        params: {
          api_key: import.meta.env.MOVIE_DB_API_KEY,
          language: 'en-US',
          page: page,
        },
      }
    );
    return response.data.results;
  } catch (error) {
    console.error('Failed to fetch movies:', error);
    return [];
  }
};

import axios from 'axios';

export const getPopularMovies = async (page = 1) => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular`, {
            params: {
                api_key: 'c096d6c48636f8d7d83797548bdff8f5',
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

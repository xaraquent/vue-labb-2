<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4 text-center">Popular Movies</h1>

    <!-- Movies Grid -->
    <div class="flex flex-wrap gap-6 justify-center items-center">
      <div
        v-for="movie in movies"
        :key="movie.id"
        class="rounded-xl shadow-lg overflow-hidden flex flex-col items-center p-4 text-center"
      >
        <img
          :src="'https://image.tmdb.org/t/p/w200' + movie.poster_path"
          :alt="movie.title"
          class="movie-poster"
        />
        <div class="p-2">
          <h2 class="movie-title">{{ movie.title }}</h2>
        </div>
      </div>
    </div>

    <!-- Pagination Controls -->
    <div class="flex justify-center mt-6 gap-6 items-center">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="pagination-button disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ⬅️ Previous
      </button>

      <div class="page-indicator">Page {{ currentPage }}</div>

      <button
        @click="nextPage"
        class="pagination-button"
      >
        Next ➡️
      </button>
    </div>
  </div>
</template>

<script>
import { getPopularMovies } from '../services/tmdb';

export default {
  data() {
    return {
      movies: [],
      currentPage: 1, // Track the current page number
    };
  },
  async created() {
    await this.fetchMovies(); // Load the first page initially
  },
  methods: {
    async fetchMovies() {
      const newMovies = await getPopularMovies(this.currentPage);
      this.movies = newMovies.slice(0, 16); // Display only 16 movies per page
    },
    async nextPage() {
      this.currentPage++;
      await this.fetchMovies(); // Load the next set of movies
    },
    async prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        await this.fetchMovies(); // Load the previous set of movies
      }
    },
  },
};
</script>

<style scoped>
.movie-poster {
  width: 200px;
  height: 300px;
  object-fit: cover;
  border-radius: 12px;
}

.movie-title {
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
}

.flex-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 24px;
}

/* Styled Buttons */
.pagination-button {
  padding: 12px 20px;
  background: linear-gradient(to right, #4f46e5, #3b82f6);
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.2s, background 0.3s;
}

.pagination-button:hover {
  background: linear-gradient(to right, #3b82f6, #2563eb);
  transform: translateY(-3px);
}

/* Page Indicator Styling */
.page-indicator {
  padding: 10px 16px;
  background: #f3f4f6;
  border-radius: 12px;
  font-size: 1.2rem;
  font-weight: bold;
  color: #111827;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>

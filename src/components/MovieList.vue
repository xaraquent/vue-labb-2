<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4 text-center mt-2">Popular Movies</h1>

    <div class="container">
      <!-- Pagination Controls -->
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="button disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
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
      <button
        @click="nextPage"
        class="button"
      >
        Next
      </button>
    </div>
    <div class="page-indicator">Page {{ currentPage }}</div>
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
      this.movies = newMovies.slice(0, 14); // Display only 16 movies per page
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
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem;
}
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

/* Page Indicator Styling */
.page-indicator {
  padding: 10px 16px;
  background: var(--tertiary-color);
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--primary-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}
</style>

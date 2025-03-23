<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4 text-center mt-2">Popular Movies</h1>

    <!-- Search field -->
    <div class="w-screen flex justify-center">
      <input
        v-model="searchQuery"
        placeholder="🔍 Search for a movie..."
        class="w-full max-w-3xl p-3 pl-10 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
      />
    </div>

    <div class="container">
      <!-- Pagination Controls -->
      <button
        @click="prevPage"
        :disabled="currentPage === 1 || isSearching"
        class="button disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      <!-- Movies Grid -->
      <div class="flex flex-wrap gap-6 justify-center items-center">
        <div
          v-for="movie in displayedMovies"
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
        :disabled="isSearching"
        class="button"
      >
        Next
      </button>
    </div>
    <div class="page-indicator">Page {{ currentPage }}</div>
  </div>
</template>

<script>
import { getPopularMovies, searchMovies } from '../services/tmdb'; // Lägg till searchMovies-funktionen

export default {
  data() {
    return {
      movies: [], // Filmer från populära API:et
      searchResults: [], // Filmer från sökningen
      searchQuery: '', // Sökinmatning
      currentPage: 1,
      isSearching: false, // Indikerar om vi söker eller ej
    };
  },
  async created() {
    await this.fetchMovies();
  },
  methods: {
    async fetchMovies() {
      if (this.isSearching) return; // Hämta inte populära filmer om vi söker
      const newMovies = await getPopularMovies(this.currentPage);
      this.movies = newMovies.slice(0, 14);
    },
    async nextPage() {
      this.currentPage++;
      await this.fetchMovies();
    },
    async prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        await this.fetchMovies();
      }
    },
    async handleSearch() {
      if (this.searchQuery.length > 2) {
        this.isSearching = true;
        this.searchResults = await searchMovies(this.searchQuery); // Hämta sökresultat från API
      } else {
        this.isSearching = false;
        await this.fetchMovies(); // Återgå till populära filmer om sökningen är tom
      }
    },
  },
  computed: {
    displayedMovies() {
      return this.isSearching ? this.searchResults : this.movies;
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

/* Search Field Styling */
.search-field {
  display: flex;
  flex-grow: 1;
}
</style>

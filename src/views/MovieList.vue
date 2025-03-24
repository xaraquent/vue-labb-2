<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4 text-center mt-2">Popular Movies</h1>

    <!-- Search field -->
    <div class="search-container">
      <input
        v-model="searchQuery"
        @input="handleSearch"
        placeholder="Sök efter film..."
        class="search-input"
      />
    </div>

    <div class="container">
      <!-- Pagination Controls -->
      <Button
        @click="prevPage"
        text="Previous"
      />

      <!-- Movies Grid -->
      <div class="flex flex-wrap gap-6 justify-center items-center">
        <div
          v-for="movie in displayedMovies"
          :key="movie.id"
          class="rounded-xl shadow-lg overflow-hidden flex flex-col items-center p-4 text-center"
        >
          <RouterLink :to="'/movie/' + movie.id">
            <img
              :src="'https://image.tmdb.org/t/p/w200' + movie.poster_path"
              :alt="movie.title"
              class="movie-poster"
            />
            <div class="p-2">
              <h2 class="movie-title">{{ movie.title }}</h2>
            </div>
          </RouterLink>
        </div>
      </div>

      <!-- Pagination Controls -->
      <Button
        @click="nextPage"
        text="Next"
      />
    </div>
    <div class="page-indicator">Page {{ currentPage }}</div>
  </div>
</template>

<script>
import { getPopularMovies, searchMovies } from '../services/tmdb'; // Lägg till searchMovies-funktionen
import Button from '../components/Button.vue';

export default {
  components: {
    Button,
  },
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
      if (this.searchQuery.length > 0) {
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
.search-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
}

.search-input {
  width: 100%;
  background: var(--tertiary-color);
  padding: 10px;
  text-align: center;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  color: var(--primary-color);
}
.search-input::placeholder {
  color: var(--primary-color);
}

.search-input:focus {
  outline: none;
  border-color: var(--tertiary-color); /* Change this to your preferred color */
  box-shadow: 0 0 16px rgba(144, 206, 161, 0.6); /* A greenish glow */
}

@media (max-width: 1024px) {
  /* Reduce padding and margins to fit better on smaller screens */
  .container {
    margin: 0;
    flex-wrap: wrap;
  }

  .search-container {
    padding: 0 10px;
  }

  .movie-poster {
    width: 100px;
    height: 150px;
  }

  .movie-title {
    font-size: 0.9rem;
    max-width: 100px;
  }

  /* Adjust gap in the movie grid for smaller screens */
  .flex-wrap {
    gap: 10px;
  }
}
</style>

<template>
  <router-link
    to="/"
    class="button"
    >Tillbaka</router-link
  >
  <div class="root-container">
    <!-- Into to movie, small info bits -->
    <div class="intro-container">
      <div>
        <img
          :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
          :alt="movie.title"
        />
      </div>
      <div>
        <h1>{{ movie.title }}</h1>
        <p>{{ movie.overview }}</p>
      </div>
    </div>

    <!-- Indepth info about movie, description etc... -->
    <div class="indepth-container"></div>
  </div>
</template>

<script>
import { getMovieDetails } from '../services/tmdb';

export default {
  props: ['id'],
  data() {
    return {
      movie: {},
    };
  },
  async created() {
    this.movie = await getMovieDetails(this.id);
  },
};
</script>

<style scoped>
.root-container {
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
}

.intro-container {
  display: block;
  background-color: red;
}

.intro-container > div {
  padding: 16px;
}

.intro-container img {
  width: 100%;
}

@media screen and (min-width: 680px) {
  .intro-container {
    display: flex;
    flex-direction: row;
    background-color: blue;
  }

  .intro-container > div {
    width: calc(50% - 32px);
  }
}

.button {
  background-color: var(--secondary-color);
  color: var(--text-color);
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  padding: 12px 20px;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  height: 50px;
  align-self: center;
  margin: 8px;
}

.button:hover {
  background-color: var(--tertiary-color);
}
</style>

<template>
  <router-link to="/"><Button text="Back" /></router-link>
  <div class="details-container">
    <div class="poster">
      <img
        :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
        :alt="movie.title"
      />
    </div>
    <div class="info">
      <h1>{{ movie.title }}</h1>
      <p>{{ movie.overview }}</p>
    </div>
  </div>
</template>

<script>
import { getMovieDetails } from '../services/tmdb';
import Button from '../components/Button.vue';

export default {
  components: {
    Button,
  },
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
.details-container {
  width: 90vw;
  max-width: 1024px;
  margin: 0 auto;
  background-color: var(--tertiary-color);
  display: flex;
  border-radius: 0.5rem;
  padding: 1rem;
  gap: 2rem;
}
.poster img {
  border-radius: 0.5rem;
}
.info {
  color: var(--primary-color);
}

@media screen and (max-width: 1024px) {
  .details-container {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 2rem auto;
  }
  .poster img {
    width: 100%;
    max-width: 375px;
  }
}
</style>

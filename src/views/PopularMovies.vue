<template>
  <div class="container">
    <h1 class="title">Popular Movies</h1>
    <MovieList />
  </div>
</template>

<script>
import MovieList from '../components/MovieList.vue';

export default {
  components: {
    MovieList,
  },
};
</script>

<style scoped>
.title {
  margin: 1rem 0;
  text-align: center;
}
</style>

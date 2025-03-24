import { createRouter, createWebHistory } from 'vue-router';
import MovieDetails from './views/MovieDetails.vue';
import PopularMovies from './views/PopularMovies.vue';

const routes = [
  { path: '/', component: PopularMovies },
  { path: '/movie/:id', component: MovieDetails, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

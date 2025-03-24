import { createRouter, createWebHistory } from 'vue-router';
import MovieList from './views/MovieList.vue';
import MovieDetails from './views/MovieDetails.vue';

const routes = [
  { path: '/', component: MovieList },
  { path: '/movie/:id', component: MovieDetails, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

<template>
  <div>
    <h1>Data with Axios</h1>
    <pre v-if="data">{{ data }}</pre>
    <p v-else-if="error">Error: {{ error }}</p>
    <p v-else>Loading...</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      data: null,
      error: null,
    };
  },
  async created() {
    try {
      const response = await axios.get(
        'https://api.themoviedb.org/3/configuration',
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_MOVIE_DB_API_KEY}`,
          },
        }
      );
      this.data = response.data;
    } catch (err) {
      this.error = err.message;
    }
  },
};
</script>

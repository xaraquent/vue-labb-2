<template>
  <button
    @click="$emit('click')"
    class="button"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  props: ['text'],
  emits: ['click'],
  setup(props) {},
};
</script>

<style scoped>
.button {
  background-color: var(--secondary-color);
  color: var(--text-color);
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  height: 50px;
  width: 100px;
  align-self: center;
  margin: 1em;
}

.button:hover {
  background-color: var(--tertiary-color);
}
</style>

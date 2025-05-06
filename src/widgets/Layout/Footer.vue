<script setup lang="ts">

</script>

<template>
  <footer class="footer">
    <p>© 2025 GamesFinder.</p>
    <p><router-link to="/about">About us</router-link></p>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #333;
  color: white;
  padding: 1rem;
  text-align: center;
}

.footer a {
  color: white;
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}
</style>
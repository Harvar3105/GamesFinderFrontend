<script setup lang="ts">
import 'vue-i18n'
</script>

<template>
  <footer class="footer py-5 text-center border-t-2 border-t-gray-300
          dark:border-t-gray-600">
    <p>© 2025 GamesFinder.</p>
    <p><router-link to="/about">{{ $t("About") }}</router-link></p>
  </footer>
</template>

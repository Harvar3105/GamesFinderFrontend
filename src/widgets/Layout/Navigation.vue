<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const changeLanguage = (lang: string) => {
  locale.value = lang
}
</script>

<template>
  <nav class="navbar">
    <ul>
      <li><router-link to="/">{{ $t("Home") }}</router-link></li>
      <li><router-link to="/about">{{ $t("About") }}</router-link></li>
    </ul>
    <div>
      <button @click="changeLanguage('en')">English</button>
      <button @click="changeLanguage('ru')">Русский</button>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #333;
  padding: 1rem;
}

.navbar ul {
  list-style-type: none;
  display: flex;
  justify-content: space-around;
}

.navbar li {
  margin: 0;
}

.navbar a {
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
}

.navbar a:hover {
  text-decoration: underline;
}
</style>
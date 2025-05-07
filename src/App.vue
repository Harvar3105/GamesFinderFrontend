<script setup>
import Navigation from "@/views/widgets/layout/Navigation.vue";
import Footer from "@/views/widgets/layout/Footer.vue";
</script>



<template>
  <div class="flex flex-col min-h-screen dark:bg-blue-900 dark:text-white">
    <!-- ХЕДЕР -->
    <header class="flex justify-evenly">
      <Navigation />
    </header>

    <!-- ОСНОВНОЙ КОНТЕНТ -->
    <main class="flex-grow">
      <router-view />
    </main>

    <!-- ФУТЕР -->
    <Footer />
  </div>
</template>

<style scoped>

</style>

<script setup>
import Navigation from "@/views/widgets/layout/Navigation.vue";
import Footer from "@/views/widgets/layout/Footer.vue";
</script>



<template>
  <div id="app" class="flex flex-col min-h-screen">
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

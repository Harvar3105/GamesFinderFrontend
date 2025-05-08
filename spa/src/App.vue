<script setup lang="ts">
import Navigation from "@/views/widgets/layout/Navigation.vue";
import Footer from "@/views/widgets/layout/Footer.vue";
</script>



<template>
  <div class="flex flex-col min-h-screen
    dark:bg-[#1a1a1e] dark:text-[#efeff0]">
    <!-- ХЕДЕР -->
    <header
        style="transition: top 0.8s; top: 0px;"
        class="sticky top-0">
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

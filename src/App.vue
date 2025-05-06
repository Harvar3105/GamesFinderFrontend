<script setup>
import Navigation from "@/widgets/Layout/Navigation.vue";
import Footer from "@/widgets/Layout/Footer.vue";
</script>



<template>
  <div id="app">
    <Navigation />

    <main>
      <router-view />
    </main>

    <Footer />
  </div>
</template>

<style scoped>

</style>

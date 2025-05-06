<script setup>
import Navigation from "@/widgets/Layout/Navigation.vue";
import Footer from "@/widgets/Layout/Footer.vue";
</script>



<template>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" type="text/css" href="./assets/base.css">
    <link rel="stylesheet" type="text/css" href="./assets/main.css">
    <title>Hello, world!</title>
  </head>
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

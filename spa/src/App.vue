<script setup lang="ts">
import Navigation from "@/views/widgets/layout/Navigation.vue";
import Footer from "@/views/widgets/layout/Footer.vue";

import { ref, onMounted, onBeforeUnmount } from 'vue';
const headerTop = ref('0px');
let lastScrollY = window.scrollY;

const handleScroll = () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > 80) {
    headerTop.value = '-100px';
  } else {
    headerTop.value = '0px';
  }

  lastScrollY = currentScrollY;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div class="flex flex-col min-h-screen
    dark:bg-[#1a1a1e] dark:text-[#efeff0]">
    <!-- ХЕДЕР -->
    <header
        ref="headerRef"
        :style="{ top: headerTop }"
        class="sticky transition-all duration-700 top-0 z-50 shadow-md">
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

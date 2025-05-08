<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from '../language/LanguageSwitcher.vue'
import ThemeSwitcher from "../theme/ThemeSwitcher.vue";

const { locale } = useI18n();

const changeLanguage = (lang: string) => {
  locale.value = lang
}
</script>

<template>
  <nav class="navbar flex items-center justify-between gap-5 px-5 py-3 border-b-1 border-b-gray-300
          dark:border-b-gray-600">
    <ul class="flex gap-6">
      <li class="rounded bg-amber-300 dark:bg-[#33353b] p-2">
        <router-link to="/">
          <svg class="w-[28px] h-[28px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clip-rule="evenodd"/>
          </svg>
        </router-link>
      </li>
      <li class="rounded bg-amber-300 dark:bg-[#33353b] p-2">
        <router-link to="/about">
          <svg class="w-[28px] h-[28px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.008-3.018a1.502 1.502 0 0 1 2.522 1.159v.024a1.44 1.44 0 0 1-1.493 1.418 1 1 0 0 0-1.037.999V14a1 1 0 1 0 2 0v-.539a3.44 3.44 0 0 0 2.529-3.256 3.502 3.502 0 0 0-7-.255 1 1 0 0 0 2 .076c.014-.398.187-.774.48-1.044Zm.982 7.026a1 1 0 1 0 0 2H12a1 1 0 1 0 0-2h-.01Z" clip-rule="evenodd"/>
          </svg>
        </router-link>
      </li>
    </ul>
    <div class="flex items-center justify-around gap-5">
      <LanguageSwitcher/>
      <ThemeSwitcher/>
    </div>
  </nav>
</template>

<template>
  <div ref="dropdownRef" class="relative inline-block text-left">
    <button
      type="button"
      @click="toggleDropdown"
      class="inline-flex justify-center items-center w-10 h-10 rounded-full bg-amber-300 dark:bg-[#33353b] shadow-sm hover:bg-gray-50"
    >
      <span v-if="currentLang === 'en'">EN</span>
      <span v-else-if="currentLang === 'ru'">RU</span>
    </button>

    <!-- Dropdown -->
    <div
      v-if="open"
      class="absolute right-0 mt-2 w-28 origin-top-right rounded-md bg-amber-200 dark:bg-[#33353b] shadow-lg z-50"
    >
      <div class="py-1">
        <button
          type="button"
          @click="changeLanguage('en')"
          class="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[#43454d]"
        >
          EN English
        </button>
        <button
          type="button"
          @click="changeLanguage('ru')"
          class="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[#43454d]"
        >
          RU Русский
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { onClickOutside } from '@vueuse/core'

// refs
const open = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
const { locale } = useI18n()
const currentLang = ref(locale.value)

onClickOutside(dropdownRef, () => {
  open.value = false
})

function toggleDropdown() {
  open.value = !open.value
}

function changeLanguage(lang: string) {
  locale.value = lang
  currentLang.value = lang
  open.value = false
}
</script>

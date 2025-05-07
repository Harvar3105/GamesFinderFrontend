<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from '@/widgets/language/LanguageSwitcher.vue'

const { locale } = useI18n()

const changeLanguage = (lang: string) => {
  locale.value = lang
}
</script>

<template>
  <nav class="navbar flex items-center justify-between gap-5 py-5">
    <ul class="flex gap-6">
      <li class="rounded bg-amber-200 p-2"><router-link to="/">{{ $t("Home") }}</router-link></li>
      <li class="rounded bg-amber-200 p-2"><router-link to="/about">{{ $t("About") }}</router-link></li>
    </ul>
    <div>
      <LanguageSwitcher/>
    </div>
  </nav>
</template>

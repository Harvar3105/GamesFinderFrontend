<script setup lang="ts">
import { useDark, useToggle} from "@vueuse/core";

const isDark = useDark({
  selector: "body",
  attribute: "data-theme",
  valueDark: "dark",
  valueLight: "light",
});
const toggleTheme = useToggle(isDark);

function handleClick() {
  toggleTheme();
}
</script>

<template>
  <div>
    <button type="button" @click="handleClick">Переключить тему</button>
  </div>
</template>
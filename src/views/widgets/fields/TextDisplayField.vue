<template>
  <div
      class="p-3 border border-amber-300 dark:border-[#33353b] rounded-md bg-amber-200 dark:bg-[#33353b] shadow-sm break-words whitespace-pre-wrap"
      :class="props.classOptions"
  >
    {{ text }}
  </div>
</template>

<script setup lang="ts">

const props =defineProps<{
  text: string
  classOptions?: string
}>()

</script>
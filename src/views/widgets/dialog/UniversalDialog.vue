<template>
  <div v-if="visible" class="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-100">
    <div class="bg-[#ebe9e1] dark:bg-[#1a1a1e] border-1 border-gray-700 dark:border-[#33353b] rounded shadow-lg max-w-lg w-full p-6 relative">
      <button
          class="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          @click="close"
          aria-label="Close"
      >
        ✕
      </button>
      <div class="dialog-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, ref } from 'vue';

const emits = defineEmits(['close']);

const visible = ref(true);

function close() {
  visible.value = false;
  emits('close');
}
</script>


<template>
  <textarea
      class="p-2 border rounded-md resize-none w-full"
      :class="props.classOptions"
      :placeholder="placeholder"
      :disabled="disabled"
      v-model="innerValue"
      @input="autoResize"
      ref="textareaRef"
  />
</template>

<script setup lang="ts">
import {ref, watch, computed, defineEmits, defineProps, onMounted, nextTick} from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: String,
  disabled: Boolean,
  classOptions: String,
})

const emit = defineEmits(['update'])

const innerValue = ref(props.modelValue)
const textareaRef = ref<HTMLTextAreaElement | null>(null)

watch(() => props.modelValue, (val) => {
  innerValue.value = val
  nextTick(() => autoResize())
})

watch(innerValue, (val) => {
  emit('update', val)
})

function autoResize() {
  if (textareaRef.value) {
    textareaRef.value.style.height = 'auto'
    textareaRef.value.style.height = textareaRef.value.scrollHeight + 'px'
  }
}

onMounted(() => {
  autoResize()
})
</script>
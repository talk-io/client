<template>
  <button
      class="w-full bg-card py-2 rounded-md hover:brightness-125 transition-all"
      :class="{
          'bg-primary': type === 'primary',
        }"
      :type="htmlType"
  >
    <slot/>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  type?: string;
  htmlType?: string;
}>()
</script>
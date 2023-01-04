<template>
  <button
      class="w-full bg-card py-2 rounded-md hover:brightness-125 transition-all
      disabled:opacity-50 disabled:cursor-not-allowed"
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
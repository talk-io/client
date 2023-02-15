<template>
  <button
      :class="{
          'bg-logo-text': type === 'primary',
        }"
      :type="htmlType"
      class="w-full bg-card py-2 rounded-md hover:brightness-125 transition-all
      disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <slot/>
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  type?: string;
  htmlType?: string;
}>()
</script>
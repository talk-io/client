<template>
  <div class="flex flex-col gap-1">
    <span
      class="text-header-secondary hover:text-white transition-colors font-medium text-base select-none"
    >
      {{ title }} &dash; {{ count }}
    </span>
    <ul class="flex flex-col gap-1">
      <slot />
    </ul>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string;
  count: number;
}>();
</script>

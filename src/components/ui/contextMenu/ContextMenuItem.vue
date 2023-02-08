<template>
  <div class="px-3 py-1.5 rounded-md font-medium z-50" @mouseenter="handleEnter">
    <slot />
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    hover?: boolean;
    handleEnter: () => void;
  }>(),
  {
    hover: true,
  },
);
</script>

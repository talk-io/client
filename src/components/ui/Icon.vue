<template>
  <button
    :class="{
      '!cursor-not-allowed': disabled,
      }"
    :disabled="disabled"
    class="flex justify-center disabled:opacity-40 transition-all
    items-center aspect-square w-8 h-full hover:brightness-125"
  >
    <Iconify :class="{
      'text-header-secondary': !disabled,
    }" class="transition-all w-full text-3xl" v-bind="$attrs" />
  </button>
</template>

<script lang="ts" setup>
import { Icon as Iconify } from "@iconify/vue";

defineProps<{
  disabled?: boolean;
}>();
</script>

<template>
  <button
    :class="{
      '!cursor-not-allowed': disabled,
      }"
    :disabled="disabled"
    class="flex justify-center disabled:opacity-40 transition-all
    items-center aspect-square w-8 h-full hover:brightness-125"
  >
    <Icon :class="{
      'text-header-secondary': !disabled,
    }" :icon="icon"
          class="transition-all w-full text-3xl" v-bind="$attrs" />
  </button>
</template>

<script lang="ts" setup>
import { Icon } from "@iconify/vue";

defineProps<{
  disabled?: boolean;
}>();
</script>

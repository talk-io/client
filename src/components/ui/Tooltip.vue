<template>
  <!-- Hardcoded "hover", "openDelay" and "closeDelay" -->
  <Popper :placement="placement" hover v-bind="$attrs">
    <slot />
    <template #content>
          <span
            class="whitespace-nowrap drop-shadow-lg backdrop-blur-2xl w-fit origin-left font-medium transition-all z-20 bg-tooltip rounded-md px-3 py-1.5"
          >
            {{ content }}
          </span>
    </template>
  </Popper>
</template>

<script lang="ts" setup>
import Popper from "vue3-popper";

defineProps<{
  content: string;
  placement: "top" | "bottom" | "left" | "right";
}>();
</script>
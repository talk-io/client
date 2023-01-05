<template>
  <RouterLink v-slot="{ isExactActive }" :to="to" class="w-full">
    <div
      :class="{
        'bg-logo-text': isExactActive,
        '!rounded-2xl': isExactActive,
      }"
      :style="{
        borderRadius: '100%',
        backgroundImage: `url(${backgroundImage})`,
      }"
      class="group flex-1 duration-300 before:inline-block before:pt-[100%] bg-card w-full hover:bg-logo-text aspect-square transition-all p-3.5 hover:!rounded-2xl cursor-pointer flex items-center justify-center bg-cover bg-no-repeat bg-center relative"
    >
      <span
        :class="{
          '!h-10': isExactActive,
        }"
        class="h-0 select-none group-hover:h-7 transition-all text-label absolute rounded-md -ml-8 bg-white w-5 left-1 top-1/2 -translate-y-1/2"
      />
      <slot />
    </div>
  </RouterLink>
</template>
<script lang="ts" setup>
import type { RouteLocationRaw } from "vue-router";

defineProps<{
  active?: boolean;
  backgroundImage?: string;
  to: RouteLocationRaw;
}>();
</script>

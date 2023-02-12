<template>
  <div
    :class="{
      'bg-logo-text': active,
      '!rounded-2xl': active,
    }"
    :style="{
      borderRadius: '100%',
      backgroundImage: backgroundImage && `url(${backgroundImage})`,
    }"
    class="group relative max-h-fit duration-300 before:inline-block before:pt-[100%] bg-card w-full hover:bg-logo-text aspect-square transition-all p-3.5 hover:!rounded-2xl cursor-pointer flex items-center justify-center bg-cover bg-no-repeat bg-center"
    v-bind="$attrs"
  >
    <span
      v-if="!hidePill"
      :class="{
        '!h-10': active,
      }"
      class="h-0 select-none group-hover:h-7 transition-all text-label absolute rounded-md -ml-8 bg-white w-5 left-1 top-1/2 -translate-y-1/2"
    />
    <slot />
  </div>
</template>
<script lang="ts" setup>
withDefaults(
  defineProps<{
    active?: boolean;
    backgroundImage?: string;
    hidePill?: boolean;
  }>(),
  {
    active: false,
    hidePill: false,
  },
);
</script>

<template>
  <div
    class="flex justify-center transition-all items-center aspect-square w-8 h-full hover:brightness-125 cursor-pointer">
    <Icon class="w-full text-header-secondary text-3xl" v-bind="$attrs" />
  </div>
</template>

<script lang="ts" setup>
import { Icon } from "@iconify/vue";
</script>

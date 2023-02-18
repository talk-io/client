<template>
  <div class="flex items-center w-full h-full aspect-square">
    <Icon
      class="text-header-secondary text-xl hover:brightness-125 w-full h-full transition-all hover:bg-message-create-back rounded-md p-1 cursor-pointer"
      v-bind="$attrs"
    />
  </div>
</template>

<script lang="ts" setup>
import { Icon } from "@iconify/vue";
</script>

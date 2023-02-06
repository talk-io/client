<template>
  <div class="flex">
    <Icon class="text-5xl text-header-secondary" icon="mdi:face-man-profile" />
    <span>
      {{ user.username }}
    </span>
  </div>
</template>

<script lang="ts" setup>
  import type { BasicUser } from "@/types/auth";
  import { Icon } from "@iconify/vue";

  defineProps<{
    user: BasicUser;
  }>();
</script>

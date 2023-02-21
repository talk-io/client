<template>
  <div class="flex w-full h-screen relative  overflow-y-hidden">
    <NavigationBar />
    <GuildLayout />
  </div>
</template>
<script lang="ts" setup>
import NavigationBar from "@/components/sections/NavigationBar.vue";
import GuildLayout from "@/layouts/GuildLayout.vue";
</script>

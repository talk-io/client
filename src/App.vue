<template>
  <div class="w-full h-screen">
    <Suspense>
      <RouterView/>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import DefaultLayout from "@/layouts/DefaultLayout.vue";
</script>

<template>
  <DefaultLayout>
    <Suspense>
      <RouterView/>
    </Suspense>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "@/layouts/DefaultLayout.vue";
</script>

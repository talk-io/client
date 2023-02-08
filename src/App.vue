<template>
  <RouterView v-slot="{ Component }">
    <Suspense>
      <div v-auto-animate>
        <DefaultLayout v-if="authStore.getLoading">
          <ScaleLoader color="#CD5A41" />
        </DefaultLayout>
        <component :is="Component" v-else class="absolute w-full" />
      </div>

      <template #fallback>Loading...</template>
    </Suspense>
  </RouterView>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import ScaleLoader from "vue-spinner/src/ScaleLoader.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

const authStore = useAuthStore();
</script>

<template>
  <RouterView v-slot="{ Component }">
    <Transition name="fade">
      <DefaultLayout v-if="authStore.getLoading">
        <ScaleLoader color="#CD5A41" />
      </DefaultLayout>
      <Suspense v-else>
        <div class="absolute w-full">
          <component :is="Component" />
        </div>

        <template #fallback>Loading...</template>
      </Suspense>
    </Transition>
  </RouterView>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import ScaleLoader from "vue-spinner/src/ScaleLoader.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

const authStore = useAuthStore();
</script>

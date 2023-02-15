<template>
  <RouterView v-slot="{ Component }">
    <Suspense>
      <div id="wrapper">
        <Transition mode="out-in" name="main">
          <DefaultLayout v-if="authStore.getLoading">
            <ScaleLoader color="#CD5A41" />
          </DefaultLayout>
          <component :is="Component" v-else class="w-full" />
        </Transition>
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

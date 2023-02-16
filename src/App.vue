<template>
  <RouterView v-slot="{ Component }">
    <Suspense>
      <div id="wrapper">
        <Transition mode="out-in" name="main">
          <DefaultLayout v-if="authStore.getLoading">
            <div class="flex flex-col gap-3 items-center">
              <ScaleLoader color="#CD5A41" />
              <div
                v-if="authStore.getConnectionError"
                class="flex flex-col items-center gap-0.5"
              >
                <h2 class="text-xl">Connection Lost</h2>
                <span class="text-header-description">
                  Sit tight while we are trying to connect
                </span>
              </div>
              <h2 v-else class="text-lg">Loading your App</h2>
            </div>
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

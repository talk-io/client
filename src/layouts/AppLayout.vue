<template>
  <div class="flex w-full h-screen relative">
    <NavigationBar />
    <RouterView v-slot="{Component}">
      <template v-if="Component">
        <Suspense>
          <component :is="Component" class="bg-card" />

          <template #fallback>
            <span>
              sadsadsd
            </span>
          </template>
        </Suspense>
      </template>
    </RouterView>
  </div>
</template>
<script lang="ts" setup>
import NavigationBar from "@/components/sections/NavigationBar.vue";
// import {useAuthStore} from "@/stores/auth";
// import {useRouter} from "vue-router";
//
// const router = useRouter();
//
// const authStore = useAuthStore();
// try {
//   await authStore.init()
// } catch {
//   await router.push({name: "login"})
// }
</script>
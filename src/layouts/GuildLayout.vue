<template>
  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <Suspense>
        <component
          :is="Component"
          class="w-full max-h-screen bg-card overflow-y-none"
        />

        <template #fallback> loading... </template>
      </Suspense>
    </template>
  </RouterView>
</template>

<script lang="ts" setup>
  import { useRoute, useRouter } from "vue-router";

  const route = useRoute();
  const router = useRouter();

  const { channelID } = route.params as { channelID: string };
  if (!channelID) router.push({ name: "me" });
</script>

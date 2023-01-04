<template>
  <RouterView v-slot="{Component}">
    <template v-if="Component">
      <Suspense>
        <component :is="Component" class="w-full h-screen bg-card"/>

        <template #fallback>
          loading...
        </template>
      </Suspense>
    </template>
  </RouterView>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();

const {channelID} = route.params as { channelID: string };
if(!channelID) router.push({name: 'guild-channel', params: {guildID: '1', channelID: '1'}});
</script>
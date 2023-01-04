<template>
  <div>
    <p>
      Guild ID: {{ route.params.guildID }}
    </p>
    <p>
      Channel ID: {{ route.params.channelID }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>
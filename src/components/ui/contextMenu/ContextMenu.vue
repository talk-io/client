<template>
  <VerticalTransition
    v-slot="{
      handleEnter,
      handleLeave,

      HighlightedDiv,
    }"
    :additionalSpace="event.pageY"
  >
    <div
      :style="styles"
      class="flex flex-col gap-1 w-48 rounded-lg bg-input drop-shadow-xl p-1 z-50 absolute cursor-pointer select-none"
      v-bind="$attrs"
      @mouseleave="handleLeave"
    >
      <component :is="HighlightedDiv" v-if="HighlightedDiv" class="!bg-card" />
      <slot :handleEnter="handleEnter" :open="open" />
    </div>
  </VerticalTransition>
</template>
<script lang="ts" setup>
import VerticalTransition from "@/components/animations/VerticalTransition.vue";
import { onMounted, reactive } from "vue";
// TODO unfinished
const props = defineProps<{
  event: MouseEvent
}>()

const styles = reactive({
  top: "0px",
  left: "0px",
});

const open = (event: MouseEvent) => {
  styles["top"] = `${event.pageY}px`;
  styles["left"] = `${event.pageX}px`;
};

onMounted(() => open(props.event))
</script>
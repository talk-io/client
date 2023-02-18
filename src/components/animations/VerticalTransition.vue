<template>
  <slot
    :HighlightedDiv="isVisible ? HighlightedDiv : null"
    :handleEnter="handleEnter"
    :handleLeave="handleLeave"
  />
</template>

<script lang="ts" setup>
import { defineComponent, h, reactive, ref } from "vue";

const props = defineProps<{
  additionalSpace?: number;
}>();

const highlightedStyles = reactive({
  height: "0px",
  transform: "translate(0px, 0)",
  opacity: "0",
  width: "0px",
});
const isVisible = ref(false);

const handleEnter = (e: MouseEvent) => {
  const target = e?.target as HTMLElement;
  if(target.tagName === "HR") return;

  const linkCoords = target.getBoundingClientRect();
  const height = linkCoords.top - (props.additionalSpace ?? 0);

  highlightedStyles["height"] = `${linkCoords.height}px`;
  highlightedStyles["width"] = `${linkCoords.width}px`;
  highlightedStyles["transform"] = `translate(0px, ${height}px)`;
  isVisible.value = true;
  setTimeout(() => {
    highlightedStyles["opacity"] = "1";
  }, 0);
};

const handleLeave = () => {
  highlightedStyles["opacity"] = "0";
  setTimeout(() => {
    isVisible.value = false;
  }, 200);
};

const HighlightedDiv = defineComponent(() => {
  return () => {
    return h("div", {
      style: highlightedStyles,
      "aria-hidden": "true",
      class:
        "bg-secondary-light brightness-110 rounded-md transition-all absolute top-0 select-none -z-0",
    });
  };
});
</script>

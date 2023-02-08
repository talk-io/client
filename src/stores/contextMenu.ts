import { defineStore } from "pinia";
import { reactive } from "vue";

export const useContextMenu = defineStore("contextMenu", () => {
  const state = reactive({
    x: 0,
    y: 0,
    visible: false,
  });

  const show = (x: number, y: number) => {
    state.x = x;
    state.y = y;
    state.visible = true;
  };

  const hide = () => {
    state.visible = false;
  };

  const getState = () => {};

  return {
    show,
    hide,
  };
});

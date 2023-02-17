import { defineStore } from "pinia";
import { reactive } from "vue";

export const useContextMenu = defineStore("contextMenu", () => {
  const state = reactive({
    x: 0,
    y: 0,
    show: false,
  });

  return {
    x: 0,
    y: 0,
    show: false,
    showMenu(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.show = true;
    },
    hideMenu() {
      this.show = false;
    },
  };
});

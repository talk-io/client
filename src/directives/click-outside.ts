import type { Directive } from "vue";

type CustomElement = HTMLElement & {
  clickOutsideEvent: (event?: MouseEvent) => void;
};

export const clickOutside: Directive<HTMLElement> = {
  beforeMount(el, binding) {
    const customElement = <CustomElement>el;

    customElement["clickOutsideEvent"] = (event?: MouseEvent) => {
      if (!event) binding.value();
      const target = <HTMLElement>event?.target;
      const isInside = el === target || el.contains(target);
      if (!isInside) binding.value();
    };

    document.addEventListener("click", customElement["clickOutsideEvent"]);
  },
  unmounted(el) {
    const customElement = <CustomElement>el;
    document.removeEventListener("click", customElement["clickOutsideEvent"]);
  },
};

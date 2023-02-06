import { reactive, ref } from "vue";

export const useVerticalTransitionAnimation = ({ additionalSpace = 0 }) => {
  const highlightedStyles = reactive({
    height: "0px",
    transform: "translate(0px, 0)",
    opacity: "1",
  });
  const isVisible = ref(false);

  const handleEnter = (id: string) => {
    const linkElement = document.getElementById(id) as HTMLLIElement;
    const linkCoords = linkElement.getBoundingClientRect();
    const height = linkCoords.top - additionalSpace;

    highlightedStyles["height"] = `${linkCoords.height}px`;
    highlightedStyles["transform"] = `translate(0px, ${height}px)`;
    highlightedStyles["opacity"] = "1";
    isVisible.value = true;
  };

  const handleLeave = () => {
    highlightedStyles["opacity"] = "0";
    setTimeout(() => {
      isVisible.value = false;
    }, 200);
  };

  return {
    isVisible,
    highlightedStyles,

    handleEnter,
    handleLeave,
  };
};

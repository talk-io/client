<template>
<!--  <Transition name="main">-->
    <div class="col-span-3 w-full h-7 px-chat border-message-create-back border-t-2">
      <div
        class="flex items-center rounded-b-md w-full h-full">
        <Icon class="text-lg -mb-0.5 text-header-secondary" icon="eos-icons:typing" />
        <span class="px-1">{{ text }}</span>
      </div>
    </div>
<!--  </Transition>-->
</template>

<script lang="ts" setup>
import type { BasicUser } from "@/types/auth";
import { computed } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps<{
  currentlyTyping: Array<BasicUser>;
}>();

// const currentlyTyping = computed(() =>
//   [{ username: "wee" }, { username: "wwaawwa" }]
// );

const lf = new Intl.ListFormat("en");

const text = computed(() => {
  const names = lf.format(props.currentlyTyping.map((user) => user.username));
  const isManyTyping = props.currentlyTyping.length > 1;
  return `${names} ${isManyTyping ? "are" : "is"} typing...`;
});
</script>

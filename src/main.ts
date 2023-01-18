import { createApp } from "vue";
import { createPinia } from "pinia";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";

import App from "./App.vue";
// @ts-ignore
import VueSkeletonLoader from "skeleton-loader-vue";

import router from "./router";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(autoAnimatePlugin);
app.component("vue-skeleton-loader", VueSkeletonLoader);

app.mount("#app");

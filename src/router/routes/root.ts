import type {RouteRecordRaw} from "vue-router";

export const rootRoutes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "app",
        component: () => import("@/views/index.vue"),
    },
]
import type {RouteRecordRaw} from "vue-router";
import type {Component} from "vue";

const components = import.meta.glob<Component>('../../views/auth/*.vue');

export const authRoutes: Array<RouteRecordRaw> = [
    {
        path: "/login",
        name: "login",
        component: components["../../views/auth/LoginPage.vue"],
    },
    {
        path: "/signup",
        name: "signup",
        component: components["../../views/auth/SignupPage.vue"],
    }
]
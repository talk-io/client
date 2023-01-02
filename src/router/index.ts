import {createRouter, createWebHistory} from 'vue-router'
import routes from "@/router/routes/index";

const {authRoutes} = routes;

const layouts = import.meta.glob("../layouts/*.vue");

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: {name: "login"}
        },
        {
            path: '/',
            component: layouts["../layouts/AuthLayout.vue"],
            children: authRoutes,
        },
    ]
})

export default router

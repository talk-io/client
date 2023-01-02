import {createRouter, createWebHistory} from 'vue-router'
import routes from "@/router/routes/index";
import {useAuthStore} from "@/stores/auth";
import middlewarePipeline from "@/router/middlewares/pipeline";
import authMiddleware from "@/router/middlewares/auth";
import guestMiddleware from "@/router/middlewares/guest";

const {authRoutes, rootRoutes} = routes;

const layouts = import.meta.glob("../layouts/*.vue");

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // {
        //     path: '/',
        //     redirect: {name: "login"}
        // },
        {
            path: '/',
            component: layouts["../layouts/AuthLayout.vue"],
            children: authRoutes,
            meta: {
                middleware: [guestMiddleware]
            }
        },
        {
            path: '/',
            component: layouts["../layouts/DefaultLayout.vue"],
            children: [
                ...rootRoutes
            ],
            meta: {
                middleware: [authMiddleware]
            }
        },
    ]
});

router.beforeEach((to, from, next) => {
    if(!to.meta.middleware) return next();
    const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware];

    const authStore = useAuthStore();

    const context = {
        to,
        from,
        next,
        token: authStore.getToken,
        store: authStore,
    }

    middlewarePipeline(context, middleware, 0)
});

export default router

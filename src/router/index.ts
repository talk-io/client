import { createRouter, createWebHistory } from "vue-router";
import routes from "@/router/routes/index";
import { useAuthStore } from "@/stores/auth";
import middlewarePipeline from "@/router/middlewares/pipeline";
import authMiddleware from "@/router/middlewares/auth";
import guestMiddleware from "@/router/middlewares/guest";
import { useGuildStore } from "@/stores/guilds";

const { authRoutes, rootRoutes } = routes;

const layouts = import.meta.glob("../layouts/*.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      redirect: { name: "me" },
      // component: () => import("@/views/home/index.vue"),
    },
    {
      path: "/",
      component: layouts["../layouts/AuthLayout.vue"],
      children: authRoutes,
      meta: {
        middleware: [guestMiddleware],
      },
    },
    {
      path: "/",
      component: layouts["../layouts/AppLayout.vue"],
      children: [...rootRoutes],
      meta: {
        middleware: [authMiddleware],
      },
    },
    {
      path: "/:catchAll(.*)",
      component: () => import("@/views/home/NotFound.vue"),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (!to.meta.middleware) return next();
  const middleware = Array.isArray(to.meta.middleware)
    ? to.meta.middleware
    : [to.meta.middleware];

  const authStore = useAuthStore();
  if (!authStore.getIsLoggedIn) {
    const showLogin = await authStore.init();
    if (showLogin) return next({ name: "login" });
  }
  if (from.name !== "login") authStore.setLoading(false);

  const context = {
    to,
    from,
    next,
    token: authStore.getToken,
  };

  middlewarePipeline(context, middleware, 0);

  const guildStore = useGuildStore();
  if (to.name === "guild-channel") {
    const { guildID, channelID } = to.params as {
      guildID: string;
      channelID: string;
    };
    guildStore.setLastVisitedChannel(guildID, channelID);
  }
});

export default router;

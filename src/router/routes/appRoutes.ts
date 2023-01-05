import type { RouteRecordRaw } from "vue-router";

const channelComponents = import.meta.glob("@/views/channels/**/*.vue");

export const rootRoutes: Array<RouteRecordRaw> = [
  {
    path: "/app",
    redirect: { name: "me" },
  },
  {
    path: "/channels/",
    name: "guild",
    component: () => import("@/layouts/GuildLayout.vue"),
    children: [
      {
        path: "/channels/",
        redirect: { name: "me" },
      },
      {
        path: "/channels/@me",
        name: "me",
        component: channelComponents["/src/views/channels/@me/index.vue"],
      },
      {
        path: "/channels/:guildID",
        name: "guild",
        component: () => import("@/layouts/GuildLayout.vue"),
        children: [
          {
            path: "/channels/:guildID/:channelID",
            name: "guild-channel",
            component:
              channelComponents["/src/views/channels/guilds/index.vue"],
          },
        ],
      },
    ],
  },
];

import type {NavigationGuardNext} from "vue-router";

export default function guestMiddleware({next, token}: { next: NavigationGuardNext, token: string }) {
    console.log("guestMiddleware", token);
    if (token) return next({name: "app"});
    return next();
}

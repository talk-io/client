import type {NavigationGuardNext} from "vue-router";

export default function guestMiddleware({next, token}: { next: NavigationGuardNext, token: string }) {
    if (token) return next({name: "me"});
    return next();
}

import type {NavigationGuardNext} from "vue-router";

export default async function authMiddleware(
    {next, token}: { next: NavigationGuardNext, token: string }) {
    if (!token) return next({name: "login"})
    return next();
}

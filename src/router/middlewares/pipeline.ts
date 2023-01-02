import type {NavigationGuardNext, RouteLocationNormalized} from "vue-router";

type Context = {
    to: RouteLocationNormalized;
    from: RouteLocationNormalized;
    next: NavigationGuardNext;
    token: string | null;
}

type Middleware = Array<(context: Context, next: () => Promise<void>) => unknown>;

function middlewarePipeline(context: Context, middleware: Middleware, index: number): any {
    const nextMiddleware = middleware[index];
    if (!nextMiddleware) return true;

    return nextMiddleware(context, () => middlewarePipeline(context, middleware, index + 1));
}

export default middlewarePipeline;
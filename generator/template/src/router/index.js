/**
 * index
 * @author ydr.me
 * @create 2019-09-17 17:01:41
 * @update 2019-09-17 17:01:41
 */

'use strict';

import { asyncRoutes } from '@/router/routes';

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role));
    } else {
        return true;
    }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
    const res = [];

    routes.forEach(route => {
        const tmp = { ...route };
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles);
            }
            res.push(tmp);
        }
    });

    return res;
}

export function generateRoutes(roles) {
    let accessedRoutes;
    if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes;
    } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
    }
    return accessedRoutes;
}

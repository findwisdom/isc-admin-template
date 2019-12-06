/**
 * routers
 * @author ydr.me
 * @create 2019-09-17 17:01:19
 * @update 2019-09-17 17:01:19
 */

'use strict';
import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/components/layout';
Vue.use(Router);
export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/case',
        meta: { title: '智能化解决方案', icon: 'nav-pets' },
        children: [
            {
                path: 'case',
                name: 'solution-case',
                component: () => import('@/views/solution/case.vue'),
                meta: { title: '案例管理', icon: 'nav-role' }
            }
        ]
    },
    {
        path: '/about',
        component: Layout,
        redirect: '/about/partner',
        meta: { title: '关于我们', icon: 'nav-role' },
        children: [
            {
                path: 'partner',
                name: 'about-partner',
                component: () => import('@/views/about/partner.vue'),
                meta: { title: '合作伙伴', icon: 'nav-point' }
            },
            {
                path: 'join',
                name: 'about-join',
                component: () => import('@/views/about/join.vue'),
                meta: { title: '加入我们', icon: 'nav-point' }
            }
        ]
    }
];

export const asyncRoutes = [
    {
        path: '/user',
        component: Layout,
        redirect: '/user/role',
        name: 'user',
        meta: { title: '用户管理', icon: 'nav-user', roles: ['admin'] },
        children: [
            {
                path: 'role',
                name: 'user-role',
                component: () => import('@/views/user/role.vue'),
                meta: {
                    title: '角色管理',
                    icon: 'nav-user',
                    roles: ['admin']
                }
            }
        ]
    }
];

const createRouter = () =>
    new Router({
        mode: 'history', // require service support
        // scrollBehavior: () => ({ y: 0 }),
        routes: constantRoutes
    });

const router = createRouter();

export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
}

export default router;

/**
 * routers
 * @author ydr.me
 * @create 2019-09-17 17:01:19
 * @update 2019-09-17 17:01:19
 */

'use strict';

import Layout from '@/components/layout';
export default [
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        hidden: true
    },
    {
        path: '/banner',
        component: Layout,
        redirect: '/banner/manage',
        meta: { title: 'Banner', icon: 'nav-role' },
        children: [
            {
                path: 'manage',
                name: 'banner-manage',
                component: () => import('@/views/banner/index.vue'),
                meta: { title: 'Banner管理', icon: 'nav-role' }
            }
        ]
    },
    {
        path: '/about',
        component: Layout,
        redirect: '/about/manage',
        meta: { title: '媒体中心', icon: 'nav-role' },
        children: [
            {
                path: 'manage',
                name: 'about-manage',
                component: () => import('@/views/about/index.vue'),
                meta: { title: '新闻管理', icon: 'nav-role' }
            }
        ]
    },
    {
        path: '/media',
        component: Layout,
        redirect: '/media/manage',
        meta: { title: '关于我们', icon: 'nav-role' },
        children: [
            {
                path: 'manage',
                name: 'media-manage',
                component: () => import('@/views/media/index.vue'),
                meta: { title: '公司简介', icon: 'nav-role' }
            }
        ]
    },
    {
        path: '/order',
        component: Layout,
        redirect: '/order/backlog/role',
        meta: { title: '工单管理', icon: 'nav-manager' },
        children: [
            {
                path: 'backlog',
                name: 'order-backlog',
                meta: { title: '待办工单' },
                redirect: '/order/backlog/role',
                component: () => import('@/views/user/role.vue'),
                children: [
                    {
                        path: 'role',
                        name: 'order-backlog-role',
                        component: () => import('@/views/user/role.vue'),
                        meta: { title: '角色管理' }
                    },
                    {
                        path: 'all',
                        name: 'order-backlog-all',
                        component: () => import('@/views/order/all.vue'),
                        meta: { title: '权限' }
                    }
                ]
            },
            {
                path: 'all',
                name: 'order-all',
                component: () => import('@/views/order/all.vue'),
                meta: { title: '所有工单' }
            }
        ]
    },
    {
        path: '/user',
        component: Layout,
        redirect: '/user/role',
        meta: { title: '用户管理', icon: 'nav-role' },
        children: [
            {
                path: 'role',
                name: 'user-role',
                component: () => import('@/views/user/role.vue'),
                meta: { title: '角色管理', icon: 'nav-role' }
            }
        ]
    }
];

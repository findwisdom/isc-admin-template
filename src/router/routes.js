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
        path: '/media',
        component: Layout,
        redirect: '/media/events',
        meta: { title: '媒体中心', icon: 'nav-computer' },
        children: [
            {
                path: 'events',
                name: 'media-events',
                component: () => import('@/views/media/event.vue'),
                meta: { title: '公司大事记', icon: 'nav-computer' }
            },
            {
                path: 'news',
                name: 'media-news',
                component: () => import('@/views/media/news/news.vue'),
                meta: { title: '媒体报道', icon: 'nav-appliances' }
            },
            {
                path: 'news/edit',
                name: 'media-news',
                hidden: true,
                component: () => import('@/views/media/news/edit.vue'),
                meta: { title: '编辑媒体报道' }
            }
        ]
    },
    {
        path: '/product',
        component: Layout,
        redirect: '/about/events',
        meta: { title: '产品与服务', icon: 'nav-product' },
        children: [
            {
                path: 'product',
                name: 'product-product',
                component: () => import('@/views/product/product.vue'),
                meta: { title: '产品管理', icon: 'nav-toy' }
            }
        ]
    },
    {
        path: '/integration',
        component: Layout,
        redirect: '/integration/detail',
        meta: { title: '集成商平台', icon: 'nav-integration' },
        children: [
            {
                path: 'detail',
                name: 'integration-detail',
                component: () => import('@/views/integration/detail.vue'),
                meta: { title: '详细信息', icon: 'nav-detail' }
            },
            {
                path: 'eduction',
                name: 'integration-eduction',
                component: () => import('@/views/integration/eduction.vue'),
                meta: { title: '入门', icon: 'nav-eduction' }
            },
            {
                path: 'document',
                name: 'integration-document',
                component: () => import('@/views/integration/document.vue'),
                meta: { title: '文档', icon: 'nav-book' }
            },
            {
                path: 'question',
                name: 'integration-question',
                component: () => import('@/views/integration/question.vue'),
                meta: { title: '常见问题', icon: 'nav-question' }
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
                meta: { title: '合作伙伴', icon: 'nav-partner' }
            },
            {
                path: 'contact',
                name: 'about-contact',
                component: () => import('@/views/about/contract.vue'),
                meta: { title: '联系我们', icon: 'nav-contract' }
            },
            {
                path: 'join',
                name: 'about-join',
                component: () => import('@/views/about/join.vue'),
                meta: { title: '加入我们', icon: 'nav-join' }
            }
        ]
    },
    {
        path: '/user',
        component: Layout,
        redirect: '/user/role',
        meta: { title: '用户管理', icon: 'nav-user' },
        children: [
            {
                path: 'role',
                name: 'user-role',
                component: () => import('@/views/user/role.vue'),
                meta: { title: '角色管理', icon: 'nav-user' }
            }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: '/about'
    }
];

/**
 * index
 * @author ydr.me
 * @create 2019-09-17 17:01:41
 * @update 2019-09-17 17:01:41
 */

'use strict';

import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';
// import store from '@store';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes
});

// const isAdmin = store.getters.isAdmin;
//
// router.beforeEach((to, from, next) => {
//     if ((to.name === 'user-role' || to.name === 'backstage-type') && !isAdmin) {
//         return next({ path: '/order/backlog' });
//     }
//     return next();
// });

export default router;

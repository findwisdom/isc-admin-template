import router, { resetRouter } from '@/router/routes';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { generateRoutes } from '@/router/index';
import store from '@/store';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ['/login']; // 失去登录后重定向位置

router.beforeEach(async (to, from, next) => {
    NProgress.start();
    // 权限获取
    const userInfo = window.sessionStorage.getItem('userInfo');
    if (userInfo) {
        let roles = JSON.parse(userInfo).roles || [];
        if (to.path === '/login') {
            // if is logged in, redirect to the home page
            next({ path: '/' });
            NProgress.done();
        } else {
            const hasRoles = store.getters.roles && store.getters.roles.length > 0;

            if (hasRoles) {
                next();
            } else {
                await store.commit('setRoles', roles);
                let accessRoutes = [
                    ...generateRoutes(roles),
                    {
                        path: '*',
                        hidden: true,
                        redirect: '/404'
                    }
                ];
                resetRouter();
                router.addRoutes(accessRoutes);
                router.options.routes.push(...accessRoutes);
                next({ ...to, replace: true });
            }
        }
    } else {
        /* has no token*/

        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next();
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next(`/login`);
            // NProgress.done();
        }
    }
});

router.afterEach(() => {
    // finish progress bar
    NProgress.done();
});

import router, { resetRouter } from './router/routes';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { generateRoutes } from '@/router/index';
import store from '@/store';
// import getPageTitle from '@/utils/get-page-title';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ['/login']; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start();

    // set page title
    // document.title = getPageTitle(to.meta.title);

    // determine whether the user has logged in
    const userInfo = window.sessionStorage.getItem('userInfo');

    if (userInfo) {
        let roles = JSON.parse(userInfo).roles || [];
        if (to.path === '/login') {
            // if is logged in, redirect to the home page
            next({ path: '/' });
            NProgress.done();
        } else {
            // determine whether the user has obtained his permission roles through getInfo
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
                // dynamically add accessible routes
                resetRouter();
                router.addRoutes(accessRoutes);
                router.options.routes.push(...accessRoutes);
                // hack method to ensure that addRoutes is complete
                // set the replace: true, so the navigation will not leave a history record
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

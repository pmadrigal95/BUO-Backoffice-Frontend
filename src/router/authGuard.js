/**
 * Descripción: Validar Sessión
 *
 * @displayName authGuard
 */

import Vue from 'vue';
import store from '@/store';
import paths from '@/router/path';
import VueRouter from 'vue-router';
import publicPages from '@/router/publicPages.js';
import baseLocalHelper from '@/helpers/baseLocalHelper';
import baseConfigHelper from '@/helpers/baseConfigHelper';
import baseSecurityHelper from '@/helpers/baseSecurityHelper';
import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

/**
 * Variables
 */

/**
 * Instance Vue-Router
 */
Vue.use(VueRouter);
const routes = [...paths];

const instance = new VueRouter({
    mode: 'hash',
    routes,
    scrollBehavior: (to, from, savedPosition) => {
        if (to.hash) return { selector: to.hash };
        if (savedPosition) return savedPosition;

        return { x: 0, y: 0 };
    },
});

const deleteAlert = () => {
    sessionStorage.removeItem(baseConfigHelper.$_alert);
};

const cacheRoute = (value) => {
    store.commit('authentication/CACHEROUTES', value, {
        root: true,
    });
};

const $_getPermissionList = (route, next) => {
    baseSecurityHelper.$_security(validatePermission.bind(null, route, next));
};

const validatePermission = (route, next) => {
    const result = baseSecurityHelper.$_ReadPermission(route);
    return result
        ? next()
        : next({
              name: '403',
          });
};

const validateAuth = (to, next) => {
    const loggedIn = sessionStorage.getItem(baseConfigHelper.$_jwtToken);

    const alert = sessionStorage.getItem(baseConfigHelper.$_alert);

    const authRequired = !publicPages.includes(to.name);

    let value = to.name != 'LoginViewComponent' ? to.name : 'HomeViewComponent';

    if (authRequired && !loggedIn) {
        if (alert) {
            baseNotificationsHelper.Message(
                true,
                baseLocalHelper.$_MsgUserSessionExpired
            );
        }

        deleteAlert();

        // not logged in so redirect to login page with the return url
        return next({
            name: 'LoginViewComponent',
        });
    }

    cacheRoute({ name: value, params: to.params });

    if (authRequired && loggedIn) {
        $_getPermissionList(to.meta.module, next);
    }
};

export default {
    /**
     * Create Vue-Router Instance
     */
    $_instance() {
        return instance;
    },

    /**
     * Redirect to login page if user is not logged in and trying to access a restricted page
     */
    $_authGuard(to, from, next) {
        validateAuth(to, next);
        next();
    },
};

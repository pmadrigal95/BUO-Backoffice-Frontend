/**
 * Descripción: Validar Sessión
 *
 * @displayName authGuard
 */

import Vue from 'vue';
import store from '@/store';
import paths from '@/router/path';
import VueRouter from 'vue-router';
import baseLocalHelper from '@/helpers/baseLocalHelper';
import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';
import publicPages from '@/router/publicPages.js';

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

function deleteAlert() {
    localStorage.removeItem(baseLocalHelper.$_alert);
}

function cacheRoute(value) {
    store.commit('authentication/CACHEROUTES', value, {
        root: true,
    });
}

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
        const loggedIn = localStorage.getItem(baseLocalHelper.$_jwtToken);

        const alert = localStorage.getItem(baseLocalHelper.$_alert);

        const authRequired = !publicPages.includes(to.name);

        let value =
            to.name != 'LoginViewComponent' ? to.name : 'HomeViewComponent';

        if (authRequired && !loggedIn) {
            if (alert) {
                baseNotificationsHelper.Message(
                    true,
                    baseLocalHelper.$_MsgUserSessionExpired
                );
            } else {
                value = 'HomeViewComponent';
            }

            deleteAlert();

            // not logged in so redirect to login page with the return url
            return next({
                name: 'LoginViewComponent',
            });
        }

        cacheRoute(value);

        next();
    },
};

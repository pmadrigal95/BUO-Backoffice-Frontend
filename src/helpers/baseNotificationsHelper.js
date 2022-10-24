/**
 * Descripción: Métodos para utilizar Notificaciones y loading de vuex
 *
 * @displayName BaseNotificationsHelper
 */

import store from '@/store/index.js';
export default {
    Message(type, value, requireTimer = true, timer = 5000) {
        const notification = {
            error: type,
            message: value,
            requireTimer: requireTimer,
            timer: timer,
        };
        store.dispatch('notification/add', notification, { root: true });
    },

    StarLoading() {
        store.dispatch('loading/startLoading', { root: true });
    },

    DoneLoading() {
        store.dispatch('loading/doneLoading', { root: true });
    },
};

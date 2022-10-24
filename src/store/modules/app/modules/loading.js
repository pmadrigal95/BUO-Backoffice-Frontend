/**
 * Descripción: Gestor de loading de peticiones axios
 *
 * @displayName loading
 */

import NProgress from 'nprogress';

export const namespaced = true;

export const state = {
    apiWaitingCount: 0,
};

export const mutations = {
    PUSH(state) {
        if (state.apiWaitingCount === 0) {
            NProgress.start();
        }
        state.apiWaitingCount++;
    },
    DELETE(state) {
        state.apiWaitingCount--;
        if (state.apiWaitingCount === 0) {
            NProgress.done();
        }
    },
};

export const actions = {
    startLoading({ commit }) {
        commit('PUSH');
    },
    doneLoading({ commit }) {
        commit('DELETE');
    },
};

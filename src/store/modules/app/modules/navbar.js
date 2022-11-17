/**
 * Descripción: Gestor del menú
 *
 * @displayName navbar
 */

import baseLocalHelper from '@/helpers/baseLocalHelper';

export const namespaced = true;

export const state = {
    status: false,
    navbar: [],
};

export const getters = {
    status: (state) => state.status,
};

export const mutations = {
    SET_STATUS_DATA(state) {
        state.status = !state.status;
        localStorage.setItem(baseLocalHelper.$_status, state.status);
    },
    CHANGEMODE(state, key) {
        state.status = key[1];
        localStorage.setItem(key[0], key[1]);
    },
    PUSH(state, navbar) {
        state.navbar = [];
        state.navbar.push(...navbar);
    },
};

export const actions = {
    changeStatus({ commit }) {
        commit('SET_STATUS_DATA');
    },
    addNavbar({ commit }, navbar) {
        commit('PUSH', navbar);
    },
};

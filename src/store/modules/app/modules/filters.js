/**
 * Descripción: Gestor de conf de filtros de los grids de Buo Backoffice
 *
 * @displayName filters
 */

import { AES } from 'crypto-js';

import baseConfigHelper from '@/helpers/baseConfigHelper';

export const namespaced = true;

export const state = {
    filters: {},
};

export const getters = {
    filters: (state) => state.filters,

    filtersBypageView: (state) => (pageView) => state.filters[pageView],
};

export const mutations = {
    GET_FILTERS(state, data) {
        state.filters = JSON.parse(data);
    },

    SET_FILTERS(state, data) {
        state.filters = {
            ...state.filters,
            ...data,
        };

        localStorage.setItem(
            baseConfigHelper.$_filter,
            AES.encrypt(
                JSON.stringify(state.filters),
                baseConfigHelper.$_encryptKey
            ).toString()
        );
    },
};

export const actions = {
    $_set_filter({ commit }, data) {
        commit('SET_FILTERS', data);
    },
};

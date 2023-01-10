/**
 * Descripción: Gestor del tema
 *
 * @displayName theme
 */

export const namespaced = true;

export const state = {
    app: false,
};

export const getters = {
    app: (state) => state.app,
};

export const mutations = {
    CHANGEMODE(state, key) {
        state.app = key[1];
        sessionStorage.setItem(key[0], key[1]);
    },
};

export const actions = {
    change_mode({ commit }, key) {
        commit('CHANGEMODE', key);
    },
};

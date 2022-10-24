/**
 * Descripción: Gestor del tema
 *
 * @displayName theme
 */

export const namespaced = true;

export const state = {
    app: false,
};

export const mutations = {
    CHANGEMODE(state, key) {
        state[key[0]] = key[1];
        localStorage.setItem(key[0], key[1]);
    },
};

export const actions = {
    change_mode({ commit }, key) {
        commit('CHANGEMODE', key);
    },
};

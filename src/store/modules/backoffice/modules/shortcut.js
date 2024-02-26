/**
 * Descripción: Gestor de shortcut
 *
 * @displayName shortcut
 */

export const namespaced = true;

export const state = {
    notifier: undefined,
};

export const getters = {
    notifier: (state) => state.notifier,
};

export const mutations = {
    NOTIFIER(state, data) {
        state.notifier = data[1];
        localStorage.setItem(data[0], data[1]);
    },
};

export const actions = {
    notifier_user({ commit }, data) {
        commit('NOTIFIER', data);
    },
};

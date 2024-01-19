/**
 * Descripción: Gestor del Buo dashboard v.3.0.
 *
 * @displayName dashboard
 */

export const namespaced = true;

export const state = {
    filter: undefined,
    notifier: undefined,
};

export const getters = {
    filter: (state) => state.filter,
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

/**
 * Descripción: Gestor del Buo dashboard v.3.0.
 *
 * @displayName dashboard
 */

export const namespaced = true;

export const state = {
    showFilter: true,
    notifier: undefined,
    filter: {
        month: null,
        companyId: null,
        departmentId: null,
    },
};

export const getters = {
    filter: (state) => state.filter,
    notifier: (state) => state.notifier,
    showFilter: (state) => state.showFilter,
};

export const mutations = {
    NOTIFIER(state, data) {
        state.notifier = data[1];
        localStorage.setItem(data[0], data[1]);
    },

    FILTER(state, data) {
        state.filter = data;
    },

    SHOWFILTER(state) {
        state.showFilter = !state.showFilter;
    },
};

export const actions = {
    notifier_user({ commit }, data) {
        commit('NOTIFIER', data);
    },

    filter_user({ commit }, data) {
        commit('FILTER', data);
    },

    show_filter_user({ commit }) {
        commit('SHOWFILTER');
    },
};

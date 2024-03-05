/**
 * Descripción: Gestor del Buo dashboard v.3.0.
 *
 * @displayName dashboard
 */

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

const endpoint = {
    home: 'http://localhost:3000/dashboard/home/detalles',
    rotation: 'dashboard/rotacion/detalles',
    performance: 'http://localhost:3000/dashboard/rendimiento/detalles',
    growth: 'http://localhost:3000/dashboard/crecimiento/detalles',
    recruitment: 'http://localhost:3000/dashboard/reclutamiento/detalles',
};

/**
 *
 * @param {String<endpoint>} id
 * @returns
 */
const getEndpointById = (id) => endpoint[id];

/**
 *
 * @param {Object<filter>} filter
 * @returns
 */
const parseFilter = (filter) => ({
    organizacionId: filter?.companyId,
    departamentoId: filter?.departmentId ? filter?.departmentId : 0,
    fecha: filter?.month ? `${filter?.month}-01T00:00:00` : undefined,
});

/**
 *
 * @param {String<Enpoint>} id
 * @param {Object<Filter>} filter
 * @returns
 */
const setDashboardById = async (state, id) => {
    state.loading = true;

    httpService
        .post(getEndpointById(id), parseFilter(state.filter))
        .then((response) => {
            state.loading = false;

            if (response != undefined) {
                //Logica JS luego de la acción exitosa!!!
                state.dashboard[id] = BaseArrayHelper.SetObject(
                    {},
                    response.data
                );
            }
        });
};

export const namespaced = true;

export const state = {
    loading: false,
    showFilter: true,
    notifier: undefined,
    filter: {
        month: null,
        companyId: null,
        departmentId: null,
    },
    dashboard: {
        home: undefined,
        rotation: undefined,
        performance: undefined,
        growth: undefined,
        recruitment: undefined,
    },
};

export const getters = {
    filter: (state) => state.filter,
    loading: (state) => state.loading,
    notifier: (state) => state.notifier,
    dashboard: (state) => state.dashboard,
    showFilter: (state) => state.showFilter,
    dashboardById: (state) => (id) => state.dashboard[id],
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

    DASHBOARDBYID(state, id) {
        setDashboardById(state, id);
    },

    CLEANDASHBOARD(state) {
        state.dashboard = {
            home: undefined,
            rotation: undefined,
            performance: undefined,
            growth: undefined,
            recruitment: undefined,
        };
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

    set_dashboard_by_id({ commit }, id) {
        commit('DASHBOARDBYID', id);
    },

    clean_dashboard({ commit }) {
        commit('CLEANDASHBOARD');
    },
};

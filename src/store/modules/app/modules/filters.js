/**
 * Descripción: Gestor de conf de filtros de los grids de Buo Backoffice
 *
 * @displayName filters
 */

import { AES } from 'crypto-js';

import baseConfigHelper from '@/helpers/baseConfigHelper';

const $_pageView = () => {
    return {
        UserFilter: 'UserFilterViewComponent',
        CompanyFilter: 'CompanyFilterViewComponent',
        AbilityFilter: 'AbilityFilterViewComponent',
        CategoryFilter: 'CategoryFilterViewComponent',
        AssessmentFilter: 'AssessmentFilterViewComponent',
        DepartmentFilter: 'DepartmentFilterViewComponent',
        MicroAbilityFilter: 'MicroAbilityFilterViewComponent',
        AssessmentTypeFilter: 'AssessmentTypeFilterViewComponent',
        PromotionalCodesFilter: 'PromotionalCodesFilterViewComponent',
    };
};

const $_dialogView = () => {
    return {};
};

export const namespaced = true;

export const state = {
    filters: {},
    advfilters: {},
    pageView: $_pageView(),
    dialogView: $_dialogView(),
};

export const getters = {
    filters: (state) => state.filters,

    filtersBypageView: (state) => (pageView) => state.filters[pageView],

    advfilters: (state) => state.advfilters,

    advfiltersBypageView: (state) => (pageView) => state.advfilters[pageView],

    pageView: (state) => state.pageView,

    pageViewById: (state) => (id) => state.pageView[id],

    dialogView: (state) => state.dialogView,

    dialogViewById: (state) => (id) => state.dialogView[id],
};

export const mutations = {
    GET_FILTERS(state, data) {
        state.filters = JSON.parse(data);
    },

    GET_ADVFILTERS(state, data) {
        state.advfilters = JSON.parse(data);
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

    SET_ADVFILTERS(state, data) {
        state.advfilters = {
            ...state.advfilters,
            ...data,
        };

        localStorage.setItem(
            baseConfigHelper.$_advfilter,
            AES.encrypt(
                JSON.stringify(state.advfilters),
                baseConfigHelper.$_encryptKey
            ).toString()
        );
    },
};

export const actions = {
    $_set_filter({ commit }, data) {
        commit('SET_FILTERS', data);
    },

    $_set_advfilter({ commit }, data) {
        commit('SET_ADVFILTERS', data);
    },
};

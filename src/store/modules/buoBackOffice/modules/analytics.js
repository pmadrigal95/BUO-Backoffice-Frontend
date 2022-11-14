/**
 * Descripción: Gestor de Analytics
 *
 * @displayName BUO Analytics
 */

import { format } from 'date-fns';
import baseLocalHelper from '@/helpers/baseLocalHelper';
import httpService from '@/services/axios/httpService';
import baseSharedFnHelper from '@/helpers/baseSharedFnHelper';

const dataRequest = (buoFilters) => {
    if (
        baseSharedFnHelper.$_checkValueNull(buoFilters.startDate) &&
        baseSharedFnHelper.$_checkValueNull(buoFilters.endDate)
    ) {
        return {
            endpoint: buoFilters.isAccumulated
                ? 'analytics/dashboardAcc'
                : 'analytics/dashboard',
            method: 'get',
        };
    }

    if (
        !baseSharedFnHelper.$_checkValueNull(buoFilters.startDate) &&
        !baseSharedFnHelper.$_checkValueNull(buoFilters.endDate)
    ) {
        return {
            endpoint: 'analytics/dashboardByDate',
            method: 'post',
            params: {
                startDate: buoFilters.startDate,
                endDate: buoFilters.endDate,
                isAccumulated: buoFilters.isAccumulated,
            },
        };
    }

    return null;
};

const formatDate = (dateToConvert) => {
    return format(new Date(dateToConvert), baseLocalHelper.$_DateFormat);
};

export const namespaced = true;

export const state = {
    buoAnalytics: undefined,
    buoFilters: {
        startDate: undefined,
        endDate: undefined,
        isAccumulated: true,
    },
    loadingbuoAnalytics: false,
};

export const getters = {
    /**
     * BUO PDA Analytics Object
     */
    buoAnalytics: (state) => state.buoAnalytics,

    /**
     * BUO PDA Analytics Object
     */
    buoFilters: (state) => state.buoFilters,

    /**
     * BUO Loanding Process
     */
    loadingbuoAnalytics: (state) => state.loadingbuoAnalytics,
};

export const mutations = {
    $_SET_BUO_ANALYTICS(state, Analytics) {
        state.buoAnalytics = Analytics;
    },

    $_SET_BUO_FILTERS(state, buoFilters) {
        state.buoFilters = buoFilters;
    },

    $_CHANGE_BUO_ANALYTICS_MODE(state) {
        state.buoFilters.isAccumulated = !state.buoFilters.isAccumulated;
    },

    $_SET_BUO_LOADING(state, value) {
        state.loadingPdaWallet = value;
    },

    $_CLEAN_BUO_ANALYTICS(state) {
        state.buoAnalytics = undefined;
    },
};

export const actions = {
    $_buo_analytics_clean({ commit }) {
        commit('$_CLEAN_BUO_ANALYTICS');
    },

    $_set_buo_analytics({ commit }, buoAnalytics) {
        commit('$_SET_BUO_ANALYTICS', buoAnalytics);
    },

    $_request_buo_analytics({ commit, state }) {
        commit('$_CLEAN_BUO_ANALYTICS');
        commit('$_SET_BUO_LOADING', true);

        const request = dataRequest(state.buoFilters);

        commit('$_SET_BUO_LOADING', false);
        httpService[request.method](request.endpoint, request.params).then(
            (response) => {
                // Encontro la entidad
                commit('$_SET_BUO_ANALYTICS', response.data.indicadorDtoList);
                commit('$_SET_BUO_FILTERS', {
                    startDate: formatDate(response.data.fechaInicio),
                    endDate: formatDate(response.data.fechaFinal),
                    previewStartDate: formatDate(
                        response.data.fechaInicioAnterior
                    ),
                    previewEndDate: formatDate(
                        response.data.fechaFinalAnterior
                    ),
                    isAccumulated: state.buoFilters.isAccumulated,
                });
            }
        );
    },

    $_change_buo_analytics_mode({ commit, dispatch }) {
        commit('$_CHANGE_BUO_ANALYTICS_MODE');
        dispatch('$_request_buo_analytics');
    },

    $_set_buo_analytics_filters({ commit, dispatch }, buoFilters) {
        commit('$_SET_BUO_FILTERS', buoFilters);
        dispatch('$_request_buo_analytics');
    },
};

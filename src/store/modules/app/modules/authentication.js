/**
 * Descripción: Gestor de Autentificación
 *
 * @displayName authentication
 */

import jwt_decode from 'jwt-decode';

import router from '@/router';

import baseLocalHelper from '@/helpers/baseLocalHelper';

import httpService from '@/services/axios/httpService';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

const $_notAdmin = () => {
    baseNotificationsHelper.Message(true, baseLocalHelper.$_MsgGenericError);
};

const $_setStateValue = (state, decoded, data) => {
    state.user = {
        email: decoded?.sub,
        userId: decoded?.userId,
        name: decoded?.name,
        photoUrl: undefined, //decoded?.photoUrl,
        companyId: decoded?.companyId,
        companyName: decoded?.companyName,
        companyLogo: decoded?.companyLogo,
    };

    state.jwtToken = data;

    localStorage.setItem(baseLocalHelper.$_jwtToken, data);

    router.push({ name: state.module });
};

export const namespaced = true;

export const state = {
    jwtToken: undefined,
    user: undefined,
    alert: true,
    module: 'HomeViewComponent',
    loadingAuthentication: false,
};

export const getters = {
    user: (state) => state.user,

    /**
     * Loanding Process
     */
    loadingAuthentication: (state) => state.loadingAuthentication,
};

export const mutations = {
    SET_USER_DATA(state, data) {
        let decoded = jwt_decode(data);
        decoded && decoded.isAdmin
            ? $_setStateValue(state, decoded, data)
            : $_notAdmin();
    },

    LOGOUT(state, error) {
        if (error) localStorage.setItem(baseLocalHelper.$_alert, state.alert);
        localStorage.removeItem(baseLocalHelper.$_jwtToken);
        location.reload();
    },

    CACHEROUTES(state, to) {
        state.module = to;
    },

    $_SET_LOADING(state, value) {
        state.loadingAuthentication = value;
    },
};

export const actions = {
    login({ commit }, credentials) {
        commit('$_SET_LOADING', true);
        httpService
            .post('/user/authenticate', credentials.credentials)
            .then((response) => {
                if (response != undefined) {
                    commit('SET_USER_DATA', response.data.jwtToken);
                }
                commit('$_SET_LOADING', false);
            });
    },

    loginSocialMedia({ commit }, credentials) {
        commit('$_SET_LOADING', true);
        httpService
            .post('/user/authenticate_federated', credentials)
            .then((response) => {
                if (response != undefined) {
                    commit('SET_USER_DATA', response.data.jwtToken);
                }
                commit('$_SET_LOADING', false);
            });
    },

    logout({ commit }, error) {
        commit('LOGOUT', error);
    },

    save_route({ commit }, to) {
        commit('CACHEROUTES', to);
    },
};

/**
 * Descripción: Gestor de Autentificación
 *
 * @displayName authentication
 */

import { AES } from 'crypto-js';

import router from '@/router';

import jwt_decode from 'jwt-decode';

import httpService from '@/services/axios/httpService';

import baseLocalHelper from '@/helpers/baseLocalHelper';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

import facebookSDK from '@/services/socialMedia/facebook-SDK.js';

import baseDataVisualizationColorsHelper from '@/helpers/baseDataVisualizationColorsHelper';

const $_redirect = (module) => {
    if (router.currentRoute.name === 'LoginViewComponent') {
        const result = baseSecurityHelper.$_getFirstItem();
        router.push({
            name: result ? result : module.name,
            params: module.params,
        });
    }
};

const $_setStateValue = (state, decoded, data) => {
    state.jwtToken = data;

    sessionStorage.setItem(
        baseLocalHelper.$_jwtToken,
        AES.encrypt(data, baseLocalHelper.$_encryptKey).toString()
    );

    state.user = {
        email: decoded?.sub,
        userId: decoded?.userId,
        name: decoded?.name,
        photoUrl: undefined, //decoded?.photoUrl,
        colorAvatar: baseDataVisualizationColorsHelper.$_randomColor().main,
        companyId: decoded?.companyId,
        companyName: decoded?.companyName,
        companyLogo: decoded?.companyLogo,
    };

    baseSecurityHelper.$_security($_redirect.bind(null, state.module));
};

export const namespaced = true;

export const state = {
    jwtToken: undefined,
    user: undefined,
    alert: true,
    module: { name: 'HomeViewComponent' },
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
        $_setStateValue(state, decoded, data);
    },

    LOGOUT(state, error) {
        if (error) sessionStorage.setItem(baseLocalHelper.$_alert, state.alert);
        sessionStorage.removeItem(baseLocalHelper.$_jwtToken);
        sessionStorage.removeItem(baseLocalHelper.$_permissionList);
        facebookSDK.$_facebookLogOut();
        location.reload();
    },

    CACHEROUTES(state, to) {
        state.module = to;
    },

    $_SET_LOADING(state, value) {
        state.loadingAuthentication = value;
    },

    $_CLEAN_USER_DATA(state) {
        state.jwtToken = undefined;
        state.user = undefined;

        sessionStorage.removeItem(baseLocalHelper.$_permissionList);
        sessionStorage.removeItem(baseLocalHelper.$_jwtToken);
    },
};

export const actions = {
    $_user_clean({ commit }) {
        commit('$_CLEAN_USER_DATA');
    },

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

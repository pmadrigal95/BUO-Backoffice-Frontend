/**
 * Descripción: Gestor de Autentificación
 *
 * @displayName authentication
 */

import { AES } from 'crypto-js';

import router from '@/router';

import jwt_decode from 'jwt-decode';

import httpService from '@/services/axios/httpService';

import baseConfigHelper from '@/helpers/baseConfigHelper';

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

import facebookSDK from '@/services/socialMedia/facebook-SDK.js';

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
        baseConfigHelper.$_jwtToken,
        AES.encrypt(data, baseConfigHelper.$_encryptKey).toString()
    );

    state.user = {
        email: decoded?.sub,
        userId: decoded?.userId,
        name: decoded?.name,
        avatar: undefined, //decoded?.photoUrl,
        companyId: decoded?.companyId,
        companyName: decoded?.companyName,
        companyLogo: decoded?.companyLogo,
    };

    baseSecurityHelper.$_security($_redirect.bind(null, state.module));
};

const $_set_initials = (name) => {
    return baseSharedFnHelper.$_set_initials(name);
};

const $_set_usernameDisplay = (name) => {
    return baseSharedFnHelper.$_set_usernameDisplay(name);
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

    userAvatar: (state) => state.user.avatar,

    usernameDisplay: (state) => $_set_usernameDisplay(state.user.name),

    buoId: () => 1,

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

    SET_USER_AVATAR(state, avatar) {
        if (avatar) {
            state.user.avatar = avatar;
        } else {
            state.user.avatar = $_set_initials(state.user.name);
        }
    },

    LOGOUT(state, error) {
        if (error)
            sessionStorage.setItem(baseConfigHelper.$_alert, state.alert);
        sessionStorage.removeItem(baseConfigHelper.$_jwtToken);
        sessionStorage.removeItem(baseConfigHelper.$_permissionList);
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

        sessionStorage.removeItem(baseConfigHelper.$_permissionList);
        sessionStorage.removeItem(baseConfigHelper.$_jwtToken);
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

    get_user_avatar({ commit }, userId) {
        httpService.get(`perfilUsuario/foto/${userId}`).then((response) => {
            commit('SET_USER_AVATAR', response?.data?.fotoEncoded);
        });
    },

    set_user_avatar({ commit }, value) {
        commit('SET_USER_AVATAR', value);
    },
};

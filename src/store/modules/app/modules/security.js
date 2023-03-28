/**
 * Descripción: Gestor de Seguridad (Menu, Permiso, Roles)
 *
 * @displayName security
 */

import { AES, enc } from 'crypto-js';

import jwt_decode from 'jwt-decode';

import httpService from '@/services/axios/httpService';

import baseConfigHelper from '@/helpers/baseConfigHelper';

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

const $_getUserId = () => {
    const jwtToken = sessionStorage.getItem(baseConfigHelper.$_jwtToken);
    const bytes = AES.decrypt(jwtToken, baseConfigHelper.$_encryptKey);
    const result = bytes.toString(enc.Utf8);

    const decoded = jwt_decode(result);
    return decoded.userId;
};

export const namespaced = true;

export const state = {
    permissionList: undefined,
    permissionListTEMP: undefined,
    loadingSecurity: false,
};

export const getters = {
    permissionList: (state) => state.permissionList,

    permissionListTEMP: (state) => state.permissionListTEMP,

    /**
     * Loanding Process
     */
    loadingSecurity: (state) => state.loadingSecurity,
};

export const mutations = {
    SET_PERMISSIONS_DATA(state, data) {
        state.permissionList = data;
        state.permissionListTEMP = data;

        sessionStorage.setItem(
            baseConfigHelper.$_permissionList,
            AES.encrypt(
                JSON.stringify(state.permissionList),
                baseConfigHelper.$_encryptKey
            ).toString()
        );
    },

    $_SET_LOADING(state, value) {
        state.loadingSecurity = value;
    },

    $_CLEAN_PERMISSIONS_DATA(state) {
        state.permissionList = undefined;
    },

    $_FILTER_PERMISSIONS_DATA(state, param) {
        if (!baseSharedFnHelper.$_checkValueNull(param)) {
            const array = baseSharedFnHelper.$_findNestedObjLike(
                state.permissionList,
                'nombreUI',
                param
            );
            state.permissionListTEMP = array ? [array] : [];
        } else {
            state.permissionListTEMP = state.permissionList;
        }
    },
};

export const actions = {
    $_security_clean({ commit }) {
        commit('$_CLEAN_PERMISSIONS_DATA');
    },

    $_security_filter({ commit }, param) {
        commit('$_SET_LOADING', true);
        commit('$_FILTER_PERMISSIONS_DATA', param);
        commit('$_SET_LOADING', false);
    },

    $_request_buo_security({ commit }, callback) {
        commit('$_CLEAN_PERMISSIONS_DATA');

        const cache = sessionStorage.getItem(baseConfigHelper.$_permissionList);

        if (!cache) {
            commit('$_SET_LOADING', true);

            const $_requestObject = {
                usuarioId:
                    this.state.authentication.user?.userId || $_getUserId(),
                aplicacionId: baseConfigHelper.$_security,
            };

            httpService
                .post('menuUsuario', $_requestObject)
                .then((response) => {
                    commit('$_SET_LOADING', false);
                    if (
                        response != undefined &&
                        response.data &&
                        response.data.length > 0
                    ) {
                        commit('SET_PERMISSIONS_DATA', response.data);
                        callback();
                    } else {
                        baseSecurityHelper.$_logout(true);
                    }
                });
        } else {
            const decrypted = AES.decrypt(cache, baseConfigHelper.$_encryptKey);
            const decryptedObject = decrypted.toString(enc.Utf8);
            commit('SET_PERMISSIONS_DATA', JSON.parse(decryptedObject));
            callback();
        }
    },
};

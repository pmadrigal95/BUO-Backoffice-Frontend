/**
 * Descripción: Gestor de Seguridad (Menu, Permiso, Roles)
 *
 * @displayName security
 */

import { AES, enc } from 'crypto-js';

import jwt_decode from 'jwt-decode';

import httpService from '@/services/axios/httpService';

import baseLocalHelper from '@/helpers/baseLocalHelper';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

const $_getUserId = () => {
    const jwtToken = localStorage.getItem(baseLocalHelper.$_jwtToken);
    const bytes = AES.decrypt(jwtToken, baseLocalHelper.$_encryptKey);
    const result = bytes.toString(enc.Utf8);

    const decoded = jwt_decode(result);
    return decoded.userId;
};

export const namespaced = true;

export const state = {
    permissionList: undefined,
    loadingSecurity: false,
};

export const getters = {
    permissionList: (state) => state.permissionList,

    /**
     * Loanding Process
     */
    loadingSecurity: (state) => state.loadingSecurity,
};

export const mutations = {
    SET_PERMISSIONS_DATA(state, data) {
        state.permissionList = data;

        localStorage.setItem(
            baseLocalHelper.$_permissionList,
            AES.encrypt(
                JSON.stringify(state.permissionList),
                baseLocalHelper.$_encryptKey
            ).toString()
        );
    },

    $_SET_LOADING(state, value) {
        state.loadingSecurity = value;
    },

    $_CLEAN_PERMISSIONS_DATA(state) {
        state.permissionList = undefined;
    },
};

export const actions = {
    $_security_clean({ commit }) {
        commit('$_CLEAN_PERMISSIONS_DATA');
    },

    $_request_buo_security({ commit }, callback) {
        commit('$_CLEAN_PERMISSIONS_DATA');

        const cache = localStorage.getItem(baseLocalHelper.$_permissionList);

        if (!cache) {
            commit('$_SET_LOADING', true);

            const $_requestObject = {
                usuarioId:
                    this.state.authentication.user?.userId || $_getUserId(),
                aplicacionId: baseLocalHelper.$_security,
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
            const decrypted = AES.decrypt(cache, baseLocalHelper.$_encryptKey);
            const decryptedObject = decrypted.toString(enc.Utf8);
            commit('SET_PERMISSIONS_DATA', JSON.parse(decryptedObject));
            callback();
        }
    },
};

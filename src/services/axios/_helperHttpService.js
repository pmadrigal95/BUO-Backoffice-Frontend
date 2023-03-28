/**
 * Descripción: Extensión / Utilidades del HttpService
 *
 * @displayName _helpers
 */

/**
 * Import's
 */

import axios from 'axios';
import store from '@/store';
import { AES, enc } from 'crypto-js';
import baseLocalHelper from '@/helpers/baseLocalHelper';
import baseConfigHelper from '@/helpers/baseConfigHelper';
import baseExcludeMessage from '@/helpers/baseExcludeMessage';
import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

/**
 * Variables
 */

/**
 * Instance Axios
 */
const instance = axios.create({
    baseURL: process.env.VUE_APP_BUO_API,
    withCredentials: false, // This is the default
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        AppOrigin: 'BUOUI',
    },
    // timeout: 10000
});

/**
 * Funciones
 */

/**
 * Inyecta Authorization Bearer cuando lo tenga
 */
function jwtInterceptor(request) {
    const jwtToken = sessionStorage.getItem(baseConfigHelper.$_jwtToken);
    if (jwtToken) {
        const bytes = AES.decrypt(jwtToken, baseConfigHelper.$_encryptKey);
        const result = bytes.toString(enc.Utf8);
        request.headers.common.Authorization = `Bearer ${result}`;
    }
    return request;
}

/**
 * Validar Método Login vrs Otros
 */
function handler401(error) {
    const conditionUrl = error.response.config.url;
    if (baseExcludeMessage.$_validLogin(conditionUrl)) {
        baseNotificationsHelper.Message(true, baseLocalHelper.$_MsgUserBadPwd);
    } else {
        store.commit('authentication/LOGOUT', true, {
            root: true,
        });
    }
}

export default {
    /**
     * Create Axios Instance
     */
    $_instance() {
        return instance;
    },

    /**
     * Start Loading
     */
    $_injectHeaders(request) {
        baseNotificationsHelper.StarLoading();
        return jwtInterceptor(request);
    },

    /**
     * Mostrar Mensaje OK
     */
    $_validateOK(response) {
        baseNotificationsHelper.DoneLoading();
        if (
            response.config.method != 'get' &&
            baseExcludeMessage.$_validMethod(response.config.url)
        ) {
            baseNotificationsHelper.Message(
                false,
                response != undefined &&
                    response.data != undefined &&
                    response.data != '' &&
                    typeof response.data === 'string'
                    ? response.data
                    : baseLocalHelper.$_MsgGenericSuccess,
                true,
                2500
            );
        }
    },

    /**
     * Mostrar Mensaje de error
     */
    $_validateError(error) {
        if (error.response != undefined) {
            switch (error.response.status) {
                case 401:
                    handler401(error);
                    break;

                default:
                    baseNotificationsHelper.Message(
                        true,
                        error.response != undefined &&
                            error.response.data.message != undefined
                            ? error.response.data.message
                            : baseLocalHelper.$_MsgGenericError
                    );
            }
        }

        baseNotificationsHelper.DoneLoading();
    },
};

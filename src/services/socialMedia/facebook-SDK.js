/* eslint-disable no-undef */
/**
 * Descripción: Archivo de Configuración Authentificación con Facebook
 *
 * @displayName facebook-SDK
 */

import store from '@/store';
import baseLocalHelper from '@/helpers/baseLocalHelper';
import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

/**
 * Variables
 */

/**
 * Facebook APP ID
 */
const facebookAppId = process.env.VUE_APP_FACEBOOK_APP_ID;

/**
 * Script URL
 */

const sdkScript = 'https://connect.facebook.net/en_US/all.js';

let isLoaded = false;

/**
 * Facebook Config Object
 */
const instance = {
    appId: facebookAppId,
    cookie: false, // This is important, it's not enabled by default
    xfbml: true,
    version: 'v15.0',
};

/**
 * Private Methods
 */

const handleCredentialResponse = (authResponse) => {
    if (authResponse) {
        const params = {
            provider: 'facebook',
            token: authResponse.accessToken,
            userId: authResponse.userID,
        };

        store.dispatch('authentication/loginSocialMedia', params, {
            root: true,
        });
    }
};

/**
 * Auto authenticate with the api if already logged in with facebook
 */
const getLoginStatus = () => {
    FB.getLoginStatus(function (response) {
        if (response && response.status === 'connected') {
            FB.logout();
        }
    });
};

const initFacebook = () => {
    if (!isLoaded) {
        FB.init(instance);
        isLoaded = true;
    }
};

const logInWithFacebook = async () => {
    await initFacebook();

    if (typeof FB != 'undefined') {
        FB.login(
            function (response) {
                if (response.authResponse) {
                    handleCredentialResponse(response.authResponse);
                } else {
                    console.log(
                        'User cancelled login or did not fully authorize.'
                    );
                }
            },
            { scope: 'public_profile,email' }
        );
        return false;
    } else {
        baseNotificationsHelper.Message(
            true,
            baseLocalHelper.$_MsgUserBadBrowser
        );
    }
};

export default {
    $_Script: sdkScript,

    $_facebookAuth() {
        logInWithFacebook();
    },

    $_facebookLogOut() {
        getLoginStatus();
    },
};

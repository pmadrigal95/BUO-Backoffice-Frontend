/* eslint-disable no-undef */
/**
 * Descripción: Archivo de Configuración Authentificación con Google
 *
 * @displayName Google-SDK
 */

import store from '@/store';

/**
 * Variables
 */

/**
 * Google APP ID
 */
const googleAppId = process.env.VUE_APP_GOOGLE_APP_ID;

const googleScript = 'https://accounts.google.com/gsi/client';

const handleCredentialResponse = (response) => {
    if (response && response.credential) {
        const params = {
            provider: 'google',
            token: response.credential,
        };

        store.dispatch('authentication/loginSocialMedia', params, {
            root: true,
        });
    }
};

const instance = {
    client_id: googleAppId,
    callback: handleCredentialResponse,
    itp_support: true,
};

export default {
    $_Script: googleScript,

    $_googlePrompt() {
        google.accounts.id.initialize(instance);

        //TODO: https://github.com/google/google-api-javascript-client/issues/843
        google.accounts.id.prompt((notification) => {
            if (
                notification.isNotDisplayed() ||
                notification.isSkippedMoment()
            ) {
                console.table(
                    notification.getNotDisplayedReason(),
                    notification.getSkippedReason()
                );
            }
        });
    },

    $_googleRenderButton(element) {
        if (window.google) {
            google.accounts.id.initialize(instance);

            // Display the Sign In With Google Button
            google.accounts.id.renderButton(document.getElementById(element), {
                type: 'icon',
            });
        }
    },
};

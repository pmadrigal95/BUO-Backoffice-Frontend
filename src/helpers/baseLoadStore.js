/**
 * Descripción: Métodos para la carga inicial
 *
 * @displayName BaseLoadStore
 */

import store from '@/store';

import { AES, enc } from 'crypto-js';

import baseConfigHelper from '@/helpers/baseConfigHelper';

function returnObject(key, value, type) {
    switch (type) {
        case 'String': {
            const bytes = AES.decrypt(value, baseConfigHelper.$_encryptKey);
            const originalValue = bytes.toString(enc.Utf8);
            return originalValue;
        }
        case 'Boolean':
            return [key, String(value) == 'true'];
        case 'Array':
            return [key, value];
        default:
            console.log('Error !!!');
            break;
    }
}

function buildStore(key, method, type, defaultValue) {
    const value = sessionStorage.getItem(key);

    value != null && value != undefined
        ? store.commit(method, returnObject(key, value, type), {
              root: true,
          })
        : defaultValue != undefined
        ? store.commit(method, returnObject(key, defaultValue, type), {
              root: true,
          })
        : null;
}

function createStoreDefault() {
    buildStore(
        baseConfigHelper.$_jwtToken,
        'authentication/SET_USER_DATA',
        'String'
    );
    buildStore(baseConfigHelper.$_app, 'theme/CHANGEMODE', 'Boolean', false);
}

export default {
    Initializer() {
        createStoreDefault();

        /**
         * Interpolación de String's Vue App
         */
        String.prototype.format = function () {
            var a = this;
            for (var k in arguments) {
                a = a.replace(new RegExp('\\{' + k + '\\}', 'g'), arguments[k]);
            }
            return a;
        };
    },
};

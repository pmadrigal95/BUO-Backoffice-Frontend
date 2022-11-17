/**
 * Descripción: Métodos para la carga inicial
 *
 * @displayName BaseLoadStore
 */

import store from '@/store';

import baseLocalHelper from '@/helpers/baseLocalHelper';

function returnObject(key, value, type) {
    switch (type) {
        case 'String':
            return value;
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
    const value = localStorage.getItem(key);

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
        baseLocalHelper.$_jwtToken,
        'authentication/SET_USER_DATA',
        'String'
    );
    buildStore(baseLocalHelper.$_app, 'theme/CHANGEMODE', 'Boolean', false);
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

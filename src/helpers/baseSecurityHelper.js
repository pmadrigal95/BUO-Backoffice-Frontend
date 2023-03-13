/**
 * Descripción: Métodos para validar roles y permisos
 *
 * @displayName baseSecurityHelper
 */

import store from '@/store/index.js';

import baseLocalHelper from '@/helpers/baseLocalHelper';

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

const read = 'Read',
    write = 'Write',
    upload = 'Upload',
    download = 'Download';

const $_requestData = (callback) => {
    store.dispatch('security/$_request_buo_security', callback, { root: true });
};

const logout = () => {
    store.dispatch('authentication/$_user_clean', { root: true });
    store.dispatch('security/$_security_clean', { root: true });
};

const $_getPermissionList = (callback) => {
    if (!store.state.security.permissionList) {
        $_requestData(callback);
    } else {
        callback();
    }
};

const $_getObject = (route, key = 'nombre') => {
    return baseSharedFnHelper.$_findNestedObj(
        store.state.security.permissionList,
        key,
        route
    );
};

const $_validatePermission = (list, permission = read) => {
    if (typeof permission === 'string') {
        return list.some((x) => x === permission);
    } else {
        let result = {};
        permission.forEach((item) => {
            result[item] = list.some((x) => x === item);
        });

        return result;
    }
};

const ReadPermission = (route, permission) => {
    if (store.state.security.permissionList) {
        const object = $_getObject(route);

        return object?.acciones
            ? $_validatePermission(object.acciones, permission)
            : false;
    }
};

const getFirstItem = (key = 'rutaURL') => {
    const result = baseSharedFnHelper.$_findContraryNestedObj(
        store.state.security.permissionList,
        key,
        null
    );

    return result?.rutaURL;
};

export default {
    $_read: read,

    $_write: write,

    $_upload: upload,

    $_download: download,

    $_security(callback = () => {}) {
        $_getPermissionList(callback);
    },

    $_getObjectById(route, key) {
        return $_getObject(route, key);
    },

    $_ReadPermission(route, permission) {
        return ReadPermission(route, permission);
    },

    $_getFirstItem(key) {
        return getFirstItem(key);
    },

    $_logout(message = false) {
        if (message) {
            baseNotificationsHelper.Message(
                true,
                baseLocalHelper.$_MsgUserSessionExpired
            );
        }

        logout();
    },
};

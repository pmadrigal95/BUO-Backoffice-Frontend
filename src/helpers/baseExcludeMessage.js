/**
 * Descripción: Exclusión de Métodos HTTP
 *
 * @displayName BaseExcludeMessage
 */

const exclusionList = [
    '/findBy',
    'analytics',
    'menuUsuario',
    '/user/authenticate',
    'misc/validateCaptcha',
];

const logOutExclusion = ['/user/authenticate'];

export default {
    $_validMethod(value) {
        return !exclusionList.find((element) => {
            return value.includes(element) ? true : false;
        });
    },

    $_validLogin(value) {
        return logOutExclusion.includes(value);
    },
};

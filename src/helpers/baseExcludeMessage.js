/**
 * Descripción: Exclusión de Métodos HTTP
 *
 * @displayName BaseExcludeMessage
 */

const exclusionList = [
    '/cards',
    '/findBy',
    'dashboard',
    'analytics',
    'menuUsuario',
    'getUsuarios',
    'getAcciones',
    'pda/getTestList',
    'pruebaResultado',
    '/user/authenticate',
    'createShareableLink',
    'misc/validateCaptcha',
    'cualificacion/details',
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

/**
 * Descripción: Exclusión de Métodos HTTP
 *
 * @displayName BaseExcludeMessage
 */

const exclusionList = [
    'cualificacion/findAllByCategoriaIdIn',
    'cualificacion/findAllByDefinicion/',
    '/user/authenticate',
    'external_wallet/profile',
    'user/createShareableLink',
    '/findBy',
];

const logOutExclusion = ['/user/authenticate'];

export default {
    $_validMethod(value) {
        return !exclusionList.find((element) => {
            return value.includes(element) ? true : false;
        });
        //return !exclusionList.includes(value);
    },

    $_validLogin(value) {
        return logOutExclusion.includes(value);
    },
};

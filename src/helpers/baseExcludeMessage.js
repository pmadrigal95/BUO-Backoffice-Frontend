/**
 * Descripción: Exclusión de Métodos HTTP
 *
 * @displayName BaseExcludeMessage
 */

const exclusionList = ['misc/validateCaptcha', '/user/authenticate', '/findBy'];

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

/**
 * Descripción: Archivo de Configuración recaptcha V2
 *
 * @displayName Google reCAPTCHA
 */

/**
 * Variables
 */

/**
 * Google APP ID
 */

const googleRecaptchaAppId = process.env.VUE_APP_GOOGLE_RECAPTCHA_ID;

const googleScript =
    'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit';

export default {
    $_Script: googleScript,

    $_RecaptchaId: googleRecaptchaAppId,
};

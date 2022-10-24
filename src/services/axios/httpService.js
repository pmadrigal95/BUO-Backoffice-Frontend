/**
 * Descripción: Gestor de peticiones Http
 *
 * @displayName HttpService
 */

import _helper from '@/services/axios/_helperHttpService';

/**
 * Instancia Axios
 */
const apiClient = _helper.$_instance();

/**
 * Inicia el loading (Middware)
 */
apiClient.interceptors.request.use((request) => {
    request = _helper.$_injectHeaders(request);
    return request;
});

/**
 * Intercepta las respuestas (Middware)
 */
apiClient.interceptors.response.use(
    (response) => {
        _helper.$_validateOK(response);
        return response;
    },
    (error) => {
        _helper.$_validateError(error);
        throw error;
    }
);

/**
 * Método Reutilizable de peticiones
 */
function httpRequest(method, url, request) {
    if (request != undefined) {
        return apiClient[method](url, request)
            .then((response) => Promise.resolve(response))
            .catch((error) => {
                console.log(error.message);
            });
    } else {
        return apiClient[method](url)
            .then((response) => Promise.resolve(response))
            .catch((error) => {
                console.log(error.message);
            });
    }
}

export default {
    /**
     * Método GET
     */
    get(url, request) {
        return httpRequest('get', url, request);
    },

    /**
     * Método DELETE
     */
    delete(url, request) {
        return httpRequest('delete', url, request);
    },

    /**
     * Método POST
     */
    post(url, request) {
        return httpRequest('post', url, JSON.stringify(request));
    },

    /**
     * Método POST
     */
    spost(url, request) {
        return httpRequest('post', url, request);
    },

    /**
     * Método PUT
     */
    put(url, request) {
        return httpRequest('put', url, request);
    },
};

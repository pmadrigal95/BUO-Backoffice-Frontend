/**
 * Descripción: Configuraciones Generales de la App
 *
 * @displayName baseConfigHelper
 */

//https://buotech.atlassian.net/wiki/spaces/BUO/pages/1409025/Definici+n+de+Estados

const statusCode = {
    inactive: 1, // Inactivo
    active: 2, // Activo
    uncertified: 3, // Sin certificar
    certifying: 4, // Certificando
    certificate: 5, // Certificado
    rejected: 6, // Rechazado
    fileError: 7, // Error en Archivo
    unregisteredCompany: 8, // Empresa no registrada
    fileProcessed: 9, // Archivo Procesado
    unrelatedProfessional: 10,
};

export default {
    $_statusCode: statusCode,

    //Segmento de Fechas

    /**
     * Descripción: Hora
     */
    $_startTime: '00:00:00',

    /**
     * Descripción: Formato fecha
     */
    $_DateFormat: 'yyyy-MM-dd',

    /**
     * Descripción: Formato Hora
     */
    $_TimeFormat: 'HH:mm:ss',

    //Segmento de Configuración del BaseServerDataTable

    /**
     * Descripción: tiempo a ejecutar función al API
     */
    $_DefaultTimer: 300,

    /**
     * Descripción: tiempo a ejecutar función al API, cuando escribe input
     */
    $_InputTimer: 1000,

    /**
     * Descripción: tiempo a ejecutar función al click / dbClick
     */
    $_clickDelay: 212,

    /**
     * Descripción: items por pagina
     */
    $_itemsPerPage: {
        'items-per-page-options': [5, 10, 15, 20],
    },

    // Configuración Vuex - sessionStorage

    $_jwtToken: 'jwtTokenBackOffice',

    $_alert: 'alertBackOffice',

    $_status: 'statusBackOffice',

    $_app: 'appBackOffice',

    $_permissionList: 'permissionListBackOffice',

    $_encryptKey: '$_buoAppBackOffice',

    $_security: 1,
};

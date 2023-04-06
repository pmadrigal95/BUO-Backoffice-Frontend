/**
 * Descripción: Mensajes de la aplicación
 *
 * @displayName BaseLocalHelper
 */

export default {
    // Segmento de Labels

    /**
     * Descripción: Btn Nuevo
     */
    $_LabelBtnNew: 'Nuevo',

    /**
     * Descripción: Btn Editar
     */
    $_LabelBtnEdit: 'Editar',

    /**
     * Descripción: Btn Eliminar
     */
    $_LabelBtnDelete: 'Eliminar',

    /**
     * Descripción: Btn Refrescar
     */
    $_LabelBtnRefresh: 'Refrescar',

    /**
     * Descripción: Btn Filtro
     */
    $_LabelBtnFilter: 'Filtro',

    /**
     * Descripción: Btn Configuración
     */
    $_LabelBtnConfig: 'Configuración',

    /**
     * Registros seleccionados
     */

    $_RowCount(count) {
        let result;

        if (count && count > 0) {
            result =
                count === 1
                    ? `${count} Seleccionado`
                    : `${count} Seleccionados`;
        }

        return result;
    },

    /**
     * Descripción: Btn Cancelar
     */
    $_LabelBtnGoOut: 'Cancelar',

    /**
     * Descripción: Btn Cerrar Sesión
     */
    $_LabelBtnSigout: 'Cerrar Sesión',

    /**
     * Descripción: Btn Ingresar
     */
    $_LabelBtnSigIn: 'Ingresar',

    /**
     * Descripción: Btn Guardar
     */
    $_LabelBtnSend: 'Guardar',

    /**
     * Descripción: Btn Seleccionar
     */
    $_LabelBtnSelected: 'Seleccionar',

    /**
     * Descripción: Btn Buscar
     */
    $_LabelBtnmobilSearch: 'Filtrar',

    /**
     * Descripción: Cargando
     */
    $_loadingMessage: 'Cargando... Por favor espere',

    // Segmento de Mensajes

    /**
     * Descripción: Seleccionar fila
     */
    $_MsgMustSelectRegister: 'Primero debe seleccionar un registro.',

    /**
     * Descripción: Seleccionar fila
     */
    $_MsgErrorAndRetry: 'Error! Por favor intentarlo de nuevo.',

    $_pleaseDownload:
        '¡Oops! Ha ocurrido un error. Por favor utiliza la opción de descargar.',

    /**
     * Descripción: Registro Duplicado
     */
    $_MsgnotAddDuplicate(val) {
        return `El registro ${val} se encuentra previamente registrado.`;
    },

    /**
     * Descripción: Seleccionar fila validación
     */
    $_MsgRowNotSelected: 'Debe seleccionar al menos un registro',

    /**
     * Descripción: Seleccionar fila validación
     */
    $_MsgRowNotMultiSelected:
        'Sólo es posible realizar la acción con un registro al mismo tiempo',

    /**
     * Descripción: eliminar fila validación
     */
    $_MsgDeletedNotAllowed: 'No se pudo eliminar el registro indicado',

    /**
     * Descripción: iBaseInputList
     */
    $_MsgRowNoExistesDb:
        'El registro seleccionado no fue ubicado en la base de datos del sistema, el grid se actualizara.',

    /**
     * Descripción: Validación
     */
    $_MsgMaximumSelected(val) {
        return `Sólo puede seleccionar ${val} elemento`;
    },

    /**
     * Descripción: Validación
     */
    $_MsgGenericError:
        'Ocurrió un problema, por favor comuníquese con el encargado del sitio.',

    /**
     * Descripción: Success
     */
    $_MsgGenericSuccess: 'Acción realizada con éxito.',

    /**
     * Descripción: Success
     */
    $_MsgErrorAction: 'No se puede realizar dicha acción.',

    /**
     * Descripción: Validación
     */
    $_MsgUserSessionExpired:
        'La sesión ha caducado o usted no ha sido autenticado o autorizado.',

    /**
     * Descripción: Validación
     */
    $_MsgUserBadPwd: 'El usuario o contraseña es incorrecto.',

    // Segmento de Válidaciones Inputs

    /**
     * Descripción: Validación
     */
    $_MsgFieldRequired(val) {
        return `El campo ${val} es requerido.`;
    },

    /**
     * Descripción: Validación
     */
    $_MsgFieldMaxlengthInvalid(val, max) {
        return `La extensión del campo ${val} sobrepasa el máximo valor permitido: ${max} caracteres.`;
    },

    /**
     * Descripción: Validación
     */
    $_MsgFieldRangeInvalid(val, max, min) {
        return `La extensión del campo ${val} no cumple el rango permitido de ${min} a ${max} caracteres.`;
    },

    /**
     * Descripción: Validación
     */
    $_MsgFieldRangeNumberInvalid(val, max, min) {
        return `El campo ${val} no cumple el rango permitido de ${min} a ${max}.`;
    },

    /**
     * Descripción: Validación
     */
    $_MsgFieldRangeNumberMinInvalid(val, min) {
        return `El campo ${val} debe ser mayor a ${min}`;
    },

    /**
     * Descripción: Validación
     */
    $_MsgFieldAllowedValueInvalid(val) {
        return `El campo ${val} posee caracteres no válidos.`;
    },

    /**
     * Descripción: Validación
     */
    $_MsgFieldAllowedValueInvalidPwd(val) {
        return `El campo ${val} posee caracteres no válidos.`;
    },

    /**
     * Descripción: Validación
     */
    $_MsgFieldAllowedExtInvalid(val) {
        return `El campo ${val} posee extención no válida.`;
    },

    /**
     * Descripción: Validación
     */
    $_MsgComponentSettingInvalid(val) {
        return `El Componente ${val} posee una configuración no válida`;
    },

    /**
     * Descripción: Validación
     */
    $_MsgFileAllowedExtensionInvalid(val, documentType) {
        return `El campo ${val} no posee la extensión válida de ${documentType}`;
    },

    /**
     * Descripción: Validación
     */
    $_MsgFileAllowedMimeInvalid() {
        return `El campo no posee un tipo de mime válido.`;
    },

    /**
     * Descripción: Validación
     */
    $_MsgFileAllowedSizeImagesInvalid(val, width, height) {
        const dimensions =
            width == undefined
                ? `${height}px de alto`
                : height == undefined
                ? `${width}px de ancho`
                : `${width}px de ancho y ${height}px de alto`;

        return `El campo ${val} no posee tamaño válido de ${dimensions}.`;
    },

    /**
     * Descripción: Validación
     */
    $_MsgDelete(val) {
        if (val === 1) {
            return `¿Está seguro de eliminar ${val} elemento?`;
        } else {
            return `¿Está seguro de eliminar ${val} elementos?`;
        }
    },

    /**
     * Descripción: Validación
     */
    $_MsgPDAError(val) {
        return `Selecciona por lo menos ${val} palabras más.`;
    },

    /**
     * Descripción: Navegador Problema
     */

    $_MsgUserBadBrowser: 'Navegador incompatible con este módulo o función.',

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

/**
 * Descripción: Configuracion de Filtros de los Grids
 *
 * @displayName baseFilterSettingsHelper
 */

/**
 * Organizacion BUO
 */

const buoId = 1;

/**
 * Get companyId
 */
const getCompanyId = (userCompanyId, companyId) => {
    if (userCompanyId !== buoId && !companyId) {
        return userCompanyId;
    }

    if (companyId) {
        return companyId;
    }
};

/**
 * Configuracion extraParams
 */
const extraParams = ({ companyId, userId, qualificationId, statusId }) => {
    let array = [];

    if (companyId) {
        array.push({
            name: 'organizacionId',
            value: companyId,
        });
    }

    if (userId) {
        array.push({
            name: 'usuarioId',
            value: userId,
        });
    }

    if (qualificationId) {
        array.push({
            name: 'cualificacionId',
            value: qualificationId,
        });
    }

    if (statusId) {
        array.push({
            name: 'estadoId',
            value: statusId,
        });
    }

    return array;
};

/**
 * Configuracion BaseServerDataTable
 */
const userSetting = ({ companyId, departmentId, singleSelect }) => {
    return {
        endpoint: departmentId
            ? `user/findByDeep/${departmentId}`
            : 'user/findBy',
        columns: [
            {
                text: 'Empresa',
                align: 'start',
                value: 'nombreOrganizacion',
                show: companyId === buoId,
            },
            {
                text: 'Área / Departamento',
                align: 'start',
                value: 'nombreDepartamento',
                show: departmentId != undefined,
            },
            {
                text: 'Nombre',
                align: 'start',
                value: 'nombre',
                show: false,
            },
            {
                text: 'Primer Apellido',
                align: 'start',
                value: 'primerApellido',
                show: false,
            },
            {
                text: 'Segundo Apellido',
                align: 'start',
                value: 'segundoApellido',
                show: false,
            },
            {
                text: 'Nombre Completo',
                align: 'start',
                value: 'nombreCompleto',
                show: true,
            },
            {
                text: 'Correo',
                align: 'start',
                value: 'correo',
                show: true,
            },
            {
                text: 'Username',
                align: 'start',
                value: 'username',
                show: false,
            },
            {
                text: 'País',
                align: 'start',
                value: 'nombrePais',
                show: false,
            },
            {
                text: 'Wallet Activo',
                type: 'bool',
                align: 'center',
                value: 'walletActivo',
                show: true,
            },
            {
                text: 'Test PDA',
                type: 'bool',
                align: 'center',
                value: 'conPda',
                show: true,
            },
            {
                text: 'Estado',
                align: 'center',
                type: 'chip',
                value: 'nombreEstado',
                show: false,
            },
            {
                text: 'Identificación',
                align: 'start',
                value: 'identificacion',
                show: false,
            },
            {
                text: 'Género',
                align: 'start',
                value: 'nombreGenero',
                show: false,
            },
            {
                text: 'Ciudad',
                align: 'start',
                value: 'ciudad',
                show: false,
            },
            {
                text: 'Teléfono',
                align: 'start',
                value: 'telefono',
                show: false,
            },
            {
                text: 'Fecha Activación',
                align: 'start',
                value: 'fechaActivacionFormato',
                show: true,
            },
        ],
        key: 'id',
        singleSelect: singleSelect,
        multiSelect: !singleSelect,
    };
};

export const baseFilterSettingsHelper = {
    /**
     * Configuracion companyId
     */
    $_getCompanyId(userCompanyId, companyId) {
        return getCompanyId(userCompanyId, companyId);
    },

    /**
     * Configuracion extraParams
     */
    $_setExtraParams({ companyId, userId, qualificationId, statusId }) {
        return extraParams({ companyId, userId, qualificationId, statusId });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setUserSetting({ companyId, departmentId, singleSelect }) {
        return userSetting({ companyId, departmentId, singleSelect });
    },
};

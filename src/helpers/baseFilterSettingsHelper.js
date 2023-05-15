/**
 * Descripción: Configuracion de Filtros de los Grids
 *
 * @displayName baseFilterSettingsHelper
 */

/**
 * Configuracion BaseServerDataTable
 */
const userSetting = (companyId, departmentId, singleSelect) => {
    return {
        endpoint: departmentId
            ? `user/findByDeep/${departmentId}`
            : 'user/findBy',
        columns: [
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
                align: 'center',
                value: 'identificacion',
                show: false,
            },
            {
                text: 'Género',
                align: 'center',
                value: 'nombreGenero',
                show: false,
            },
            {
                text: 'Ciudad',
                align: 'center',
                value: 'ciudad',
                show: false,
            },
            {
                text: 'Teléfono',
                align: 'center',
                value: 'telefono',
                show: false,
            },
            {
                text: 'Username',
                align: 'center',
                value: 'username',
                show: false,
            },
            {
                text: 'Empresa',
                align: 'start',
                value: 'nombreOrganizacion',
                show: companyId === 1,
            },
            {
                text: 'Área / Departamento',
                align: 'start',
                value: 'nombreDepartamento',
                show: departmentId != undefined,
            },
        ],
        key: 'id',
        singleSelect: singleSelect,
    };
};

export const baseFilterSettingsHelper = {
    /**
     * Configuracion BaseServerDataTable
     */
    $_setUserSetting(companyId, departmentId, singleSelect) {
        return userSetting(companyId, departmentId, singleSelect);
    },
};

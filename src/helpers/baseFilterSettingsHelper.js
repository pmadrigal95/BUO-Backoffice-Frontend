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
const getCompanyId = ({ userCompanyId, companyId, filterCompanyId }) => {
    if (userCompanyId !== buoId && !companyId) {
        return userCompanyId;
    }

    if (companyId) {
        return companyId;
    } else if (filterCompanyId) {
        return filterCompanyId;
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
const userSetting = ({
    key,
    companyId,
    departmentId,
    singleSelect,
    isFilter,
}) => {
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
                show: isFilter ? false : true,
            },
            {
                text: 'Test PDA',
                type: 'bool',
                align: 'center',
                value: 'conPda',
                show: isFilter ? false : true,
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
                show: isFilter ? false : true,
            },
        ],
        key: key ? key : 'id',
        singleSelect: singleSelect,
        multiSelect: !singleSelect,
    };
};

/**
 * Configuracion BaseServerDataTable
 */
const companySetting = ({ key, singleSelect, isFilter }) => {
    return {
        endpoint: 'organizacion/findBy',
        columns: [
            {
                text: 'Nombre',
                align: 'start',
                value: 'nombre',
                show: true,
            },
            {
                text: 'Nombre Contacto',
                align: 'start',
                value: 'nombreContacto',
                show: isFilter ? true : false,
            },
            {
                text: 'Correo Contacto',
                align: 'start',
                value: 'correoContacto',
                show: isFilter ? true : false,
            },
            {
                text: 'Token Colaborador',
                type: 'number',
                align: 'start',
                value: 'tokenUsuario',
                show: false,
            },
            {
                text: 'Colaboradores',
                type: 'number',
                align: 'end',
                value: 'totalUsuarios',
                show: isFilter ? false : true,
            },
            {
                text: 'Wallets Activas',
                type: 'number',
                align: 'end',
                value: 'walletsActivas',
                show: isFilter ? false : true,
            },
            {
                text: 'Certifica Inmediato',
                type: 'bool',
                align: 'center',
                value: 'certificaInmediato',
                show: false,
            },
            {
                text: 'Mostrar Puestos Genéricos',
                type: 'bool',
                align: 'center',
                value: 'mostrarPuestosGenericos',
                show: false,
            },
            {
                text: 'Demo',
                type: 'bool',
                align: 'center',
                value: 'esClienteDemo',
                show: true,
            },
            {
                text: 'Estado',
                align: 'center',
                type: 'chip',
                value: 'nombreEstado',
                show: true,
            },
            {
                text: 'Industria',
                align: 'start',
                value: 'nombreIndustria',
                show: false,
            },
            {
                text: 'País',
                align: 'start',
                value: 'nombrePais',
                show: false,
            },
            {
                text: 'Ciudad',
                align: 'start',
                value: 'ciudad',
                show: false,
            },
            {
                text: 'Descripción',
                align: 'start',
                value: 'descripcion',
                show: false,
            },
        ],
        key: key ? key : 'id',
        singleSelect: singleSelect,
        multiSelect: !singleSelect,
    };
};

/**
 * Configuracion BaseServerDataTable
 */
const abilitySetting = ({
    key,
    companyId,
    categoryId,
    singleSelect,
    isFilter,
    method,
}) => {
    const finalApi = method
        ? method
        : categoryId
        ? `cualificacion/findByDeep/${categoryId}`
        : 'cualificacion/findBy';

    return {
        endpoint: finalApi,
        columns: [
            {
                text: 'Definición',
                align: 'start',
                value: 'definicion',
                show: true,
            },
            {
                text: 'Descripción',
                align: 'start',
                value: 'otroNombre',
                show: false,
            },
            {
                text: 'Propósito',
                align: 'start',
                value: 'proposito',
                show: false,
            },
            {
                text: 'Ámbito Ocupacional',
                align: 'start',
                value: 'ambitoOcupacional',
                show: false,
            },
            {
                text: 'Link',
                align: 'start',
                value: 'link',
                show: false,
            },
            {
                text: 'Interna',
                type: 'bool',
                align: 'center',
                value: 'esInterna',
                show: companyId === buoId,
            },
            {
                text: 'Categoría',
                align: 'start',
                value: 'nombreCategoria',
                show: true,
            },
            {
                text: 'Categoría Superior',
                align: 'start',
                value: 'nombreCategoriaPadre',
                show: false,
            },
            {
                text: 'Empresa',
                align: 'start',
                value: 'nombreOrganizacion',
                show: method ? true : isFilter ? false : companyId === buoId,
            },
            {
                text: 'Tipo',
                align: 'start',
                value: 'nombreTipoCualificacion',
                show: false,
            },
            {
                text: 'Estado',
                align: 'center',
                type: 'chip',
                value: 'nombreEstado',
                show: false,
            },
            {
                text: 'Modificado Por',
                align: 'start',
                value: 'nombreUsuarioModifica',
                show: false,
            },
        ],
        key: key ? key : 'id',
        singleSelect: singleSelect,
        multiSelect: !singleSelect,
    };
};

/**
 * Configuracion BaseServerDataTable
 */
const microAbilitySetting = ({ key, companyId, singleSelect, isFilter }) => {
    return {
        endpoint: 'competencia/findBy',
        columns: [
            {
                text: 'Indicador',
                align: 'start',
                value: 'definicionCualificacion',
                show: true,
            },
            {
                text: 'Definición',
                align: 'start',
                value: 'definicion',
                show: true,
            },
            {
                text: 'Interna',
                type: 'bool',
                align: 'center',
                value: 'esInterna',
                show: companyId === buoId,
            },
            {
                text: 'Empresa',
                align: 'start',
                value: 'nombreOrganizacion',
                show: isFilter ? false : companyId === buoId,
            },
            {
                text: 'Estado',
                align: 'center',
                type: 'chip',
                value: 'nombreEstado',
                show: false,
            },
        ],
        key: key ? key : 'id',
        singleSelect: singleSelect,
        multiSelect: !singleSelect,
    };
};

/**
 * Configuracion BaseServerDataTable
 */
const dinamycAbilitySetting = ({ departmentId, singleSelect }) => {
    return {
        endpoint: `ability/findBy/${departmentId ? departmentId : '0'}`,
        singleSelect: singleSelect,
        multiSelect: !singleSelect,
        dynamic: true,
    };
};

/**
 * Configuracion BaseServerDataTable
 */
const dinamycMicroAbilitySetting = ({ departmentId, singleSelect }) => {
    return {
        endpoint: `abilityDetails/findBy/${departmentId ? departmentId : '0'}`,
        singleSelect: singleSelect,
        multiSelect: !singleSelect,
        dynamic: true,
    };
};

/**
 * Configuracion BaseServerDataTable
 */
const dinamycTalentSetting = ({ departmentId, singleSelect }) => {
    return {
        endpoint: `talent/findBy/${departmentId ? departmentId : '0'}`,
        singleSelect: singleSelect,
        multiSelect: !singleSelect,
        dynamic: true,
    };
};

/**
 * Configuracion BaseServerDataTable
 */
const approvalSetting = ({ key, companyId, singleSelect, isFilter }) => {
    return {
        endpoint: 'empleadoCompetencia/findBy',
        columns: [
            {
                text: 'Nombre Empleado',
                align: 'start',
                value: 'nombreEmpleado',
                show: true,
            },
            {
                text: 'Indicador',
                align: 'start',
                value: 'definicionCualificacion',
                show: true,
            },
            {
                text: 'Micro-Indicador',
                align: 'start',
                value: 'definicionCompetencia',
                show: true,
            },
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
                show: false,
            },
            {
                text: 'Comentario',
                align: 'start',
                value: 'comentario',
                show: false,
            },
            {
                text: 'Comentario Usuario',
                align: 'start',
                value: 'comentarioUsuario',
                show: false,
            },
            {
                text: 'Estado',
                type: 'chip',
                align: 'center',
                value: 'nombreEstado',
                show: false,
            },
            {
                text: 'Carga Masiva',
                type: 'bool',
                align: 'center',
                value: 'esCargaMasiva',
                show: false,
            },
            {
                text: 'Fecha Ingreso',
                align: 'start',
                value: 'ingresadoFormato',
                show: false,
            },
            {
                text: 'Categoría',
                align: 'start',
                value: 'nombreCategoria',
                show: isFilter ? true : false,
            },
        ],

        key: key ? key : 'id',
        singleSelect: singleSelect,
        multiSelect: !singleSelect,
    };
};

/**
 * Configuracion BaseServerDataTable
 */
const categorySetting = ({ key, companyId, singleSelect, isFilter }) => {
    return {
        endpoint: 'categoria/findBy',
        columns: [
            {
                text: 'Nivel Superior',
                align: 'start',
                value: 'nombrePadre',
                show: isFilter ? false : true,
            },
            {
                text: 'Nombre',
                align: 'start',
                value: 'nombre',
                show: true,
            },
            {
                text: 'Descripción',
                align: 'start',
                value: 'descripcion',
                show: false,
            },
            {
                text: 'Empresa',
                align: 'start',
                value: 'nombreOrganizacion',
                show: companyId === buoId,
            },
            {
                text: 'Interna',
                type: 'bool',
                align: 'center',
                value: 'esInterna',
                show: companyId === buoId,
            },
            {
                text: 'Estado',
                align: 'center',
                type: 'chip',
                value: 'nombreEstado',
                show: false,
            },
            {
                text: 'Creado por',
                align: 'start',
                value: 'nombreUsuarioModifica',
                show: false,
            },
        ],
        key: key ? key : 'id',
        singleSelect: singleSelect,
        multiSelect: !singleSelect,
    };
};

/**
 * Configuracion BaseServerDataTable
 */
const departmentSetting = ({ key, companyId, singleSelect, isFilter }) => {
    return {
        endpoint: 'departamento/findBy',
        columns: [
            {
                text: 'Nivel Superior',
                align: 'start',
                value: 'etiquetaNivelPadre',
                show: false,
            },
            {
                text: 'Nivel',
                align: 'start',
                value: 'etiquetaNivel',
                show: false,
            },
            {
                text: 'Nombre',
                align: 'start',
                value: 'nombre',
                show: true,
            },
            {
                text: 'Área / Departamento',
                align: 'start',
                value: 'nombrePadre',
                show: true,
            },
            {
                text: 'Empresa',
                align: 'start',
                value: 'nombreOrganizacion',
                show: companyId === buoId,
            },
            {
                text: 'Administrador',
                align: 'start',
                value: 'nombreUsuarioAdmin',
                show: isFilter ? true : false,
            },
            {
                text: 'Correo Administrador',
                align: 'start',
                value: 'correoUsuarioAdmin',
                show: isFilter ? true : false,
            },
            {
                text: 'Teléfono Administrador',
                align: 'start',
                value: 'telefonoUsuarioAdmin',
                show: false,
            },
            {
                text: 'Colaboradores',
                align: 'end',
                value: 'cantidadColaboradores',
                show: isFilter ? false : true,
            },
            {
                text: 'Descripción',
                align: 'start',
                value: 'descripcion',
                show: false,
            },
            {
                text: 'Estado',
                align: 'center',
                type: 'chip',
                value: 'nombreEstado',
                show: false,
            },
            {
                text: 'Creado por',
                align: 'start',
                value: 'nombreUsuarioModifica',
                show: false,
            },
        ],
        key: key ? key : 'id',
        singleSelect: singleSelect,
        multiSelect: !singleSelect,
    };
};

/**
 * Configuracion BaseServerDataTable
 */
const assessmentTypeSetting = ({ key, companyId, singleSelect, isFilter }) => {
    return {
        endpoint: 'tipoPrueba/findBy',
        columns: [
            {
                text: 'Empresa',
                align: 'start',
                value: 'nombreOrganizacion',
                show: companyId === buoId,
            },
            {
                text: 'Departamento',
                align: 'start',
                value: 'nombreDepartamento',
                show: false,
            },
            {
                text: 'Nivel Superior',
                align: 'start',
                value: 'nombrePadre',
                show: isFilter ? false : true,
            },
            {
                text: 'Nombre',
                align: 'start',
                value: 'nombre',
                show: true,
            },
            {
                text: 'Descripción',
                align: 'start',
                value: 'descripcion',
                show: false,
            },
            {
                text: 'Interna',
                type: 'bool',
                align: 'center',
                value: 'esInterna',
                show: companyId === buoId,
            },
            {
                text: 'Estado',
                align: 'center',
                type: 'chip',
                value: 'nombreEstado',
                show: false,
            },
            {
                text: 'Creado Por',
                align: 'start',
                value: 'nombreUsuarioCrea',
                show: false,
            },
        ],
        key: key ? key : 'id',
        singleSelect: singleSelect,
        multiSelect: !singleSelect,
    };
};

/**
 * Configuracion BaseServerDataTable
 */
const assessmentSetting = ({
    key,
    companyId,
    assessmentTypeId,
    singleSelect,
}) => {
    return {
        endpoint: assessmentTypeId
            ? `prueba/findByDeep/${assessmentTypeId}`
            : 'prueba/findBy',
        columns: [
            {
                text: 'Empresa',
                align: 'start',
                value: 'nombreOrganizacion',
                show: companyId === buoId,
            },
            {
                text: 'Departamento',
                align: 'start',
                value: 'nombreDepartamento',
                show: false,
            },
            {
                text: 'Tipo',
                align: 'start',
                value: 'nombreTipoPrueba',
                show: true,
            },
            {
                text: 'Assessment',
                align: 'start',
                value: 'nombre',
                show: true,
            },
            {
                text: 'Descripción',
                align: 'start',
                value: 'descripcion',
                show: false,
            },
            {
                text: 'Enlace',
                align: 'start',
                value: 'enlace',
                show: false,
            },
            {
                text: 'Estado',
                align: 'center',
                type: 'chip',
                value: 'nombreEstado',
                show: false,
            },
            {
                text: 'Creado Por',
                align: 'start',
                value: 'nombreUsuarioCrea',
                show: false,
            },
        ],
        key: key ? key : 'id',
        singleSelect: singleSelect,
        multiSelect: !singleSelect,
    };
};

/**
 * Configuracion BaseServerDataTable
 */
const userAssessmentSetting = ({
    key,
    companyId,
    departmentId,
    singleSelect,
    isFilter,
}) => {
    return {
        endpoint: departmentId
            ? `usuarioPrueba/findByDeep/${departmentId}`
            : 'usuarioPrueba/findBy',
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
                value: 'nombreUsuario',
                show: true,
            },
            {
                text: 'Correo',
                align: 'start',
                value: 'correo',
                show: isFilter ? true : false,
            },
            {
                text: 'Tipo',
                align: 'start',
                value: 'nombreTipoPrueba',
                show: true,
            },
            {
                text: 'Assessment',
                align: 'start',
                value: 'nombrePrueba',
                show: true,
            },
            {
                text: 'Asignado',
                align: 'center',
                type: 'bool',
                value: 'asignado',
                show: true,
            },
            {
                text: 'Completado',
                align: 'center',
                type: 'bool',
                value: 'completado',
                show: true,
            },
            {
                text: 'Resultado',
                type: 'color',
                value: 'resultado',
                show: true,
            },
            {
                text: 'Fecha Asignación',
                align: 'start',
                value: 'fechaAsignacionFormato',
                show: false,
            },
            {
                text: 'Fecha Completado',
                align: 'start',
                value: 'fechaCompletadaFormato',
                show: false,
            },
        ],
        key: key ? key : 'id',
        singleSelect: singleSelect,
        multiSelect: !singleSelect,
    };
};

/**
 * Configuracion BaseServerDataTable
 */
const promotionalCodeSetting = ({ key, singleSelect, isFilter }) => {
    return {
        endpoint: 'codigoPromocion/findBy',
        columns: [
            {
                text: 'Código',
                align: 'start',
                value: 'codigo',
                show: true,
            },
            {
                text: 'Nombre Producto',
                align: 'start',
                value: 'nombreProducto',
                show: true,
            },
            {
                text: 'Compra Gratis',
                align: 'center',
                type: 'bool',
                value: 'compraGratis',
                show: true,
            },
            {
                text: 'Monto Descuento',
                type: 'number',
                align: 'end',
                value: 'montoDescuento',
                show: false,
            },
            {
                text: 'Porcentaje Descuento',
                type: 'number',
                align: 'end',
                value: 'porcentajeDescuento',
                show: false,
            },
            {
                text: 'Licencia',
                type: 'bool',
                align: 'center',
                value: 'esLicencia',
                show: true,
            },
            {
                text: 'Fecha Expiración',
                align: 'start',
                value: 'fechaExpiracionFormato',
                show: false,
            },
            {
                text: 'Uso Máximo',
                type: 'number',
                align: 'end',
                value: 'usoMaximo',
                show: false,
            },
            {
                text: 'Uso Actual',
                type: 'number',
                align: 'end',
                value: 'usoActual',
                show: isFilter ? true : false,
            },
            {
                text: 'Estado',
                align: 'center',
                type: 'chip',
                value: 'nombreEstado',
                show: false,
            },
            {
                text: 'Fecha Creación',
                align: 'start',
                value: 'fechaCreacionFormato',
                show: false,
            },
            {
                text: 'Creado Por',
                align: 'start',
                value: 'nombreUsuario',
                show: false,
            },
        ],
        key: key ? key : 'id',
        singleSelect: singleSelect,
        multiSelect: !singleSelect,
    };
};

export const baseFilterSettingsHelper = {
    /**
     * Configuracion companyId
     */
    $_getCompanyId({ userCompanyId, companyId, filterCompanyId }) {
        return getCompanyId({ userCompanyId, companyId, filterCompanyId });
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
    $_setUserSetting(key, companyId, departmentId, singleSelect, isFilter) {
        return userSetting(
            key,
            companyId,
            departmentId,
            singleSelect,
            isFilter
        );
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setCompanySetting({ key, singleSelect, isFilter }) {
        return companySetting({ key, singleSelect, isFilter });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setAbilitySetting({
        key,
        companyId,
        categoryId,
        singleSelect,
        isFilter,
        method,
    }) {
        return abilitySetting({
            key,
            companyId,
            categoryId,
            singleSelect,
            isFilter,
            method,
        });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setMicroAbilitySetting({ key, companyId, singleSelect, isFilter }) {
        return microAbilitySetting({ key, companyId, singleSelect, isFilter });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setDinamycAbilitySetting({ departmentId, singleSelect }) {
        return dinamycAbilitySetting({ departmentId, singleSelect });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setDinamycMicroAbilitySetting({ departmentId, singleSelect }) {
        return dinamycMicroAbilitySetting({ departmentId, singleSelect });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setDinamycTalentSetting({ departmentId, singleSelect }) {
        return dinamycTalentSetting({ departmentId, singleSelect });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setApprovalSetting({ key, companyId, singleSelect, isFilter }) {
        return approvalSetting({ key, companyId, singleSelect, isFilter });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setCategorySetting({ key, companyId, singleSelect, isFilter }) {
        return categorySetting({ key, companyId, singleSelect, isFilter });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setDepartmentSetting({ key, companyId, singleSelect, isFilter }) {
        return departmentSetting({ key, companyId, singleSelect, isFilter });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setAssessmentTypeSetting({ key, companyId, singleSelect, isFilter }) {
        return assessmentTypeSetting({
            key,
            companyId,
            singleSelect,
            isFilter,
        });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setAssessmentSetting({
        key,
        companyId,
        assessmentTypeId,
        singleSelect,
        isFilter,
    }) {
        return assessmentSetting({
            key,
            companyId,
            assessmentTypeId,
            singleSelect,
            isFilter,
        });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setUserAssessmentSetting({
        key,
        companyId,
        departmentId,
        singleSelect,
        isFilter,
    }) {
        return userAssessmentSetting({
            key,
            companyId,
            departmentId,
            singleSelect,
            isFilter,
        });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setPromotionalCodeSetting({ key, singleSelect, isFilter }) {
        return promotionalCodeSetting({ key, singleSelect, isFilter });
    },
};

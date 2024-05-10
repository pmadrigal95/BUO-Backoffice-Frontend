/**
 * Descripción: Configuracion de Columnas de Filtros de los Grids
 *
 * @displayName baseFilterColumnsHelper
 */

import store from '@/store/index';

/**
 * Config Cache
 */
const setUpCache = ({ pageView, columns, isFilter }) => {
    store.dispatch(
        `filters/${isFilter ? '$_clean_advfilter' : '$_clean_filter'}`,
        pageView,
        { root: true }
    );

    store.dispatch(
        `filters/${isFilter ? '$_set_advfilter' : '$_set_filter'}`,
        {
            [pageView]: columns,
        },
        { root: true }
    );
};

/**
 * Columnas
 */
/**
 * Configuracion BaseServerDataTable
 */
const userColumns = (departmentId, isBuoUser, isFilter) => {
    return [
        {
            text: 'Empresa',
            align: 'start',
            value: 'nombreOrganizacion',
            show: isBuoUser,
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
            text: 'Psychometric',
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
        {
            text: 'Fecha Ingreso',
            align: 'start',
            value: 'fechaIngresoFormato',
            show: isFilter ? false : true,
        },
        {
            text: 'Fecha Ingreso Departamento',
            align: 'start',
            value: 'fechaIngresoDepartamentoFormato',
            show: false,
        },
        {
            text: 'Fecha Salida',
            align: 'start',
            value: 'fechaTerminacionFormato',
            show: isFilter ? false : true,
        },
        {
            text: 'Renuncia',
            type: 'bool',
            align: 'center',
            value: 'esRenuncia',
            show: isFilter ? false : true,
        },
        {
            text: 'Supervisor',
            align: 'start',
            value: 'nombreSupervisor',
            show: false,
        },
        {
            text: 'Puesto',
            align: 'start',
            value: 'nombrePuesto',
            show: false,
        },
        {
            text: 'Candidato',
            type: 'bool',
            align: 'center',
            value: 'esCandidato',
            show: true,
        },
    ];
};

/**
 * Configuracion BaseServerDataTable
 */
const companyColumns = (isFilter) => {
    return [
        {
            text: 'Código de registro',
            align: 'start',
            value: 'codigoSignUp',
            show: false,
        },
        {
            text: 'Cantidad de uso del código',
            align: 'start',
            value: 'UsuariosCodigo',
            show: false,
        },
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
            text: 'Psychometric Premium',
            type: 'bool',
            align: 'center',
            value: 'pdaPremium',
            show: true,
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
    ];
};

/**
 * Configuracion BaseServerDataTable
 */
const abilityColumns = (isBuoUser, show) => {
    return [
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
            show: isBuoUser,
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
            show: show,
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
    ];
};

/**
 * Configuracion BaseServerDataTable
 */
const microAbilityColumns = (isBuoUser, isFilter) => {
    return [
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
            show: isBuoUser,
        },
        {
            text: 'Empresa',
            align: 'start',
            value: 'nombreOrganizacion',
            show: isFilter ? false : isBuoUser,
        },
        {
            text: 'Estado',
            align: 'center',
            type: 'chip',
            value: 'nombreEstado',
            show: false,
        },
    ];
};

/**
 * Configuracion BaseServerDataTable
 */
const approvalColumns = (isBuoUser, isFilter) => {
    return [
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
            show: isBuoUser,
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
    ];
};

/**
 * Configuracion BaseServerDataTable
 */
const categoryColumns = (isBuoUser, isFilter) => {
    return [
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
            show: isBuoUser,
        },
        {
            text: 'Interna',
            type: 'bool',
            align: 'center',
            value: 'esInterna',
            show: isBuoUser,
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
    ];
};

/**
 * Configuracion BaseServerDataTable
 */
const departmentColumns = (isBuoUser, isFilter) => {
    return [
        {
            text: 'Etiqueta Superior',
            align: 'start',
            value: 'etiquetaNivelPadre',
            show: false,
        },
        {
            text: 'Etiqueta',
            align: 'start',
            value: 'etiquetaNivel',
            show: false,
        },
        {
            text: 'Nivel',
            align: 'start',
            value: 'nivel',
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
            show: isBuoUser,
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
    ];
};

/**
 * Configuracion BaseServerDataTable
 */
const assessmentTypeColumns = (isBuoUser, isFilter) => {
    return [
        {
            text: 'Empresa',
            align: 'start',
            value: 'nombreOrganizacion',
            show: isBuoUser,
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
            show: isBuoUser,
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
    ];
};

/**
 * Configuracion BaseServerDataTable
 */
const departureUsersColumns = (isBuoUser) => {
    return [
        {
            text: 'Empresa',
            align: 'start',
            value: 'nombreOrganizacion',
            show: isBuoUser,
        },
        {
            text: 'Colaborador',
            align: 'start',
            value: 'nombreUsuario',
            show: true,
        },
        {
            text: 'Tipo de Salida',
            align: 'start',
            value: 'nombreTipoRazonSalida',
            show: true,
        },
        {
            text: 'Descripción',
            align: 'start',
            value: 'descripcion',
            show: true,
        },
        {
            text: 'Fecha Creación',
            align: 'start',
            value: 'fechaCreacionFormato',
            show: false,
        },
    ];
};

/**
 * Configuracion BaseServerDataTable
 */
const departureReasonTypeColumns = (isBuoUser) => {
    return [
        {
            text: 'Empresa',
            align: 'start',
            value: 'nombreOrganizacion',
            show: isBuoUser,
        },
        {
            text: 'Nombre',
            align: 'start',
            value: 'nombre',
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
            text: 'Fecha Creación',
            align: 'start',
            value: 'fechaCreacionFormato',
            show: false,
        },
    ];
};

const assessmentColumns = (isBuoUser) => {
    return [
        {
            text: 'Empresa',
            align: 'start',
            value: 'nombreOrganizacion',
            show: isBuoUser,
        },
        {
            text: 'Departamento',
            align: 'start',
            value: 'nombreDepartamento',
            show: false,
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
            text: 'Tipo',
            align: 'start',
            value: 'nombreTipoPrueba',
            show: true,
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
    ];
};

/**
 * Configuracion BaseServerDataTable
 */
const userAssessmentColumns = (departmentId, isBuoUser, isFilter) => {
    return [
        {
            text: 'Empresa',
            align: 'start',
            value: 'nombreOrganizacion',
            show: isBuoUser,
        },
        {
            text: 'Área / Departamento',
            align: 'start',
            value: 'nombreDepartamento',
            show: departmentId != undefined,
        },
        {
            text: 'Assessment',
            align: 'start',
            value: 'nombrePrueba',
            show: true,
        },
        {
            text: 'Tipo',
            align: 'start',
            value: 'nombreTipoPrueba',
            show: true,
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
            type: 'number',
            value: 'resultado',
            show: true,
        },
        {
            text: 'Nivel',
            type: 'color',
            value: 'nivel',
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
    ];
};

/**
 * Configuracion BaseServerDataTable
 */
const securityColumns = (isFilter) => {
    return [
        {
            text: 'Empresa',
            align: 'start',
            value: 'nombreOrganizacion',
            show: isFilter ? true : false,
        },
        {
            text: 'Permiso',
            align: 'start',
            value: 'nombre',
            show: true,
        },
        {
            text: 'Descripción',
            align: 'start',
            value: 'descripcion',
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
            text: 'Creado Por',
            align: 'start',
            value: 'nombreUsuarioCrea',
            show: false,
        },
        {
            text: 'Fecha Creación',
            align: 'start',
            value: 'fechaCreacionFormato',
            show: false,
        },
        {
            text: 'Modificado Por',
            align: 'start',
            value: 'nombreUsuarioModifica',
            show: false,
        },
        {
            text: 'Fecha Modificación',
            align: 'start',
            value: 'fechaModificacionFormato',
            show: false,
        },
    ];
};

/**
 * Configuracion BaseServerDataTable
 */
const securityActionsColumns = (isFilter) => {
    return [
        {
            text: 'Código',
            align: 'start',
            value: 'codigo',
            show: false,
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
            show: true,
        },
        {
            text: 'Tipo',
            align: 'start',
            value: 'tipo',
            show: false,
        },
        {
            text: 'Es interna',
            align: 'start',
            value: 'interna',
            show: isFilter ? true : false,
        },
    ];
};

/**
 * Configuracion BaseServerDataTable
 */
const securityActionsPerRoleColumns = (isFilter) => {
    return [
        {
            text: 'Acción',
            align: 'start',
            value: 'nombreAccion',
            show: true,
        },
        {
            text: 'Descripción',
            align: 'start',
            value: 'descripcionAccion',
            show: true,
        },
        {
            text: 'Rol',
            align: 'start',
            value: 'nombrePerfil',
            show: false,
        },
        {
            text: 'Creado Por',
            align: 'start',
            value: 'nombreUsuarioCrea',
            show: isFilter ? true : false,
        },
        {
            text: 'Fecha Creación',
            align: 'start',
            value: 'fechaCreacionFormato',
            show: isFilter ? true : false,
        },
    ];
};

/**
 * Configuracion BaseServerDataTable
 */
const securityUsersPerRoleColumns = (isFilter) => {
    return [
        {
            text: 'Nombre',
            align: 'start',
            value: 'nombreUsuario',
            show: true,
        },
        {
            text: 'Correo',
            align: 'start',
            value: 'username',
            show: true,
        },
        {
            text: 'Permiso',
            align: 'start',
            value: 'nombrePerfil',
            show: false,
        },
        {
            text: 'Creado Por',
            align: 'start',
            value: 'nombreUsuarioCrea',
            show: isFilter ? true : false,
        },
        {
            text: 'Fecha Creación',
            align: 'start',
            value: 'fechaCreacionFormato',
            show: isFilter ? true : false,
        },
    ];
};

/**
 * Configuracion BaseServerDataTable
 */
const promotionalCodeColumns = (isFilter) => {
    return [
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
    ];
};

/**
 * Exports
 */
export const baseFilterColumnsHelper = {
    /**
     * Configuracion BaseServerDataTable
     */
    $_setUserColumns({ isFilter, pageView, isBuoUser, departmentId }) {
        const columns = userColumns(departmentId, isBuoUser, isFilter);
        setUpCache({ pageView, columns, isFilter });
        return columns;
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setAbilityColumns({ isFilter, pageView, isBuoUser, show }) {
        const columns = abilityColumns(isBuoUser, show);
        setUpCache({ pageView, columns, isFilter });
        return columns;
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setCompanyColumns({ isFilter, pageView }) {
        const columns = companyColumns(isFilter);
        setUpCache({ pageView, columns, isFilter });
        return columns;
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setMicroAbilityColumns({ isFilter, pageView, isBuoUser }) {
        const columns = microAbilityColumns(isBuoUser, isFilter);
        setUpCache({ pageView, columns, isFilter });
        return columns;
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setApprovalColumns({ isFilter, pageView, isBuoUser }) {
        const columns = approvalColumns(isBuoUser, isFilter);
        setUpCache({ pageView, columns, isFilter });
        return columns;
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setCategoryColumns({ isFilter, pageView, isBuoUser }) {
        const columns = categoryColumns(isBuoUser, isFilter);
        setUpCache({ pageView, columns, isFilter });
        return columns;
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setDepartmentColumns({ isFilter, pageView, isBuoUser }) {
        const columns = departmentColumns(isBuoUser, isFilter);
        setUpCache({ pageView, columns, isFilter });
        return columns;
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setAssessmentTypeColumns({ isFilter, pageView, isBuoUser }) {
        const columns = assessmentTypeColumns(isBuoUser, isFilter);
        setUpCache({ pageView, columns, isFilter });
        return columns;
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setDepartureUsersColumns({ isFilter, pageView, isBuoUser }) {
        const columns = departureUsersColumns(isBuoUser);
        setUpCache({ pageView, columns, isFilter });
        return columns;
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setDepartureReasonTypeColumns({ isFilter, pageView, isBuoUser }) {
        const columns = departureReasonTypeColumns(isBuoUser);
        setUpCache({ pageView, columns, isFilter });
        return columns;
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setAssessmentColumns({ isFilter, pageView, isBuoUser }) {
        const columns = assessmentColumns(isBuoUser);
        setUpCache({ pageView, columns, isFilter });
        return columns;
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setUserAssessmentColumns({
        isFilter,
        pageView,
        isBuoUser,
        departmentId,
    }) {
        const columns = userAssessmentColumns(
            departmentId,
            isBuoUser,
            isFilter
        );
        setUpCache({ pageView, columns, isFilter });
        return columns;
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setSecurityColumns({ isFilter, pageView }) {
        const columns = securityColumns(isFilter);
        setUpCache({ pageView, columns, isFilter });
        return columns;
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setSecurityActionsColumns({ isFilter, pageView }) {
        const columns = securityActionsColumns(isFilter);
        setUpCache({ pageView, columns, isFilter });
        return columns;
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setSecurityActionsPerRoleColumns({ isFilter, pageView }) {
        const columns = securityActionsPerRoleColumns(isFilter);
        setUpCache({ pageView, columns, isFilter });
        return columns;
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setSecurityUsersPerRoleColumns({ isFilter, pageView }) {
        const columns = securityUsersPerRoleColumns(isFilter);
        setUpCache({ pageView, columns, isFilter });
        return columns;
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setPromotionalCodeColumns({ isFilter, pageView }) {
        const columns = promotionalCodeColumns(isFilter);
        setUpCache({ pageView, columns, isFilter });
        return columns;
    },
};

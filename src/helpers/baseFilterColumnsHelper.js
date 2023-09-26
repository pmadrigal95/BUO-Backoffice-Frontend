/**
 * Descripción: Configuracion de Columnas de Filtros de los Grids
 *
 * @displayName baseFilterSettingsHelper
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
    $_setAbilityColumns({ isFilter, pageView, isBuoUser, show }) {
        const columns = abilityColumns(isBuoUser, show);
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
    $_setPromotionalCodeColumns({ isFilter, pageView }) {
        const columns = promotionalCodeColumns(isFilter);
        setUpCache({ pageView, columns, isFilter });
        return columns;
    },
};

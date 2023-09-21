/**
 * Descripción: Configuracion de Columnas de Filtros de los Grids
 *
 * @displayName baseFilterSettingsHelper
 */

import store from '@/store/index';

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

export const baseFilterColumnsHelper = {
    /**
     * Configuracion BaseServerDataTable
     */
    $_setPromotionalCodeColumns({ isFilter, pageView }) {
        const columns = promotionalCodeColumns(isFilter);

        store.dispatch('filters/$_clean_filter', pageView, { root: true });

        store.dispatch(
            'filters/$_set_filter',
            {
                [pageView]: columns,
            },
            { root: true }
        );

        return columns;
    },
};

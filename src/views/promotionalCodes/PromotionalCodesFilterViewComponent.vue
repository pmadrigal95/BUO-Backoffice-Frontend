<script>
/**
 * Descripción: Pantalla Filtro Codigo Promocionales
 *
 * @displayName PromotionalCodesFilterViewComponent
 *
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

export default {
    name: 'PromotionalCodesFilterViewComponent',

    components: {
        BaseCardViewComponent,
        BaseServerDataTable,
    },

    computed: {
        ...mapGetters('authentication', ['user']),

        /**
         * Configuracion BaseServerDataTable
         */
        setting() {
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
                        show: false,
                    },
                    {
                        text: 'Estado',
                        align: 'center',
                        value: 'nombreEstado',
                        show: true,
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
                key: 'id',
            };
        },

        write() {
            const result = baseSecurityHelper.$_ReadPermission(
                'PromotionalCodesViewComponent',
                baseSecurityHelper.$_write
            );
            return result;
        },
    },

    methods: {
        /**
         * Body Request
         */
        $_createBodyRequestDelete(row) {
            const request = {
                userId: this.user.userId,
                id: row[0].id,
            };
            return request;
        },

        /**
         * Delete Function
         */
        $_fnDeletePromotionalCode(row) {
            httpService
                .post(
                    'codigoPromocion/deactivate',
                    this.$_createBodyRequestDelete(row)
                )
                .then((response) => {
                    if (response != undefined) {
                        this.$refs.PromotionalCodeFilter.$_ParamsToAPI();
                    }
                });
        },

        /**
         * Pantalla Editor
         */
        $_promotionalCodesEditor(params) {
            this.$router.push({
                name: 'PromotionalCodesEditorViewComponent',
                params: params && { Id: params.selected[this.setting.key] },
            });
        },
    },
};
</script>

<template>
    <BaseCardViewComponent title="Códigos Promocionales">
        <div slot="card-text">
            <BaseServerDataTable
                ref="PromotionalCodeFilter"
                :setting="setting"
                :fnNew="write ? $_promotionalCodesEditor : undefined"
                :fnEdit="write ? $_promotionalCodesEditor : undefined"
                :fnDelete="write ? $_fnDeletePromotionalCode : undefined"
            />
        </div>
    </BaseCardViewComponent>
</template>

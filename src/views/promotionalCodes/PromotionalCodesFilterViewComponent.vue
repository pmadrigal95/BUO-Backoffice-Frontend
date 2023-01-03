<script>
/**
 * Descripción: Pantalla Filtro Codigo Promocionales
 *
 * @displayName PromotionalCodesFilterViewComponent
 *
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

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

    data() {
        return {
            loading: false,
        };
    },

    computed: {
        ...mapGetters('authentication', ['user']),

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
                        align: 'end',
                        value: 'montoDescuento',
                        show: false,
                    },
                    {
                        text: 'Porcentaje Descuento',
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
                        align: 'end',
                        value: 'usoMaximo',
                        show: false,
                    },
                    {
                        text: 'Uso Actual',
                        align: 'end',
                        value: 'usoActual',
                        show: false,
                    },
                    {
                        text: 'Estado',
                        align: 'start',
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
    },

    methods: {
        /**
         * Functions required for delete promotional code.
         */

        $_getUserId() {
            return this.user.userId;
        },

        $_createBodyRequestDelete(row) {
            const request = {
                userId: this.$_getUserId(),
                id: row[0].id,
            };
            return request;
        },

        $_fnDeletePromotionalCode(row) {
            const body = this.$_createBodyRequestDelete(row);
            this.loading = true;
            httpService
                .post('codigoPromocion/deactivate', body)
                .then((response) => {
                    if (response != undefined) {
                        this.$refs.PromotionalCodeFilter.$_ParamsToAPI();
                    }
                    this.loading = false;
                });
        },

        /**
         * Function to show a view to edit or add promocional code.
         */

        $_fnNewPromotionalCode() {
            this.$router.push({
                name: 'PromotionalCodesEditorViewComponent',
            });
        },

        $_fnEditPromotionalCode(row) {
            this.$router.push({
                name: 'PromotionalCodesEditorViewComponent',
                params: { id: row.selected.id },
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
                :fnNew="$_fnNewPromotionalCode"
                :fnEdit="$_fnEditPromotionalCode"
                :fnDelete="$_fnDeletePromotionalCode"
            />
        </div>
    </BaseCardViewComponent>
</template>

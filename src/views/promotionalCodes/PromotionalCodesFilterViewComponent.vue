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
    import('@/components/core/grids/BaseServerDataTable.vue');

const BaseDatePicker = () => import('@/components/core/forms/BaseDatePicker');

export default {
    name: 'PromotionalCodesFilterViewComponent',

    components: {
        BaseCardViewComponent,
        BaseServerDataTable,
        BaseDatePicker,
    },
    data() {
        return {
            params: this.$_Object(),
            products: [
                { product: 'Tokens', value: 1 },
                { product: 'Prueba PDA', value: 2 },
            ],
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
                        text: 'Monto Descuento',
                        align: 'start',
                        value: 'montoDescuento',
                        show: true,
                    },
                    {
                        text: 'Estado',
                        align: 'start',
                        value: 'estadoId',
                        show: true,
                    },
                ],
                key: 'id',
            };
        },
    },

    methods: {
        $_Object() {
            return {
                id: undefined,
                usuarioId: this.user.userId,
                codigo: undefined,
                fechaExpiracion: undefined,
                productoId: 2,
                montoDescuento: undefined,
                porcentajeDescuento: undefined,
                usoMaximo: undefined,
                esLicencia: undefined,
                compraGratis: undefined,
                estadoId: undefined,
            };
        },

        $_fnNew() {
            httpService
                .post('codigoPromocion/save', this.params)
                .then((response) => {
                    if (response != undefined) {
                        alert(response);
                    } else {
                        alert('error');
                    }
                });
        },
        $_fnEdit(row) {
            alert(`Hola soy: ${row.selected.id}`);
        },
        $_fnDelete() {
            httpService
                .post('codigoPromocion/deactivate', this.params)
                .then((response) => {
                    if (response != undefined) {
                        console.log(response);
                    }
                });
        },
        $_open() {
            this.$refs['popUp'].$_openModal();
        },
        $_fnCleanLicense() {
            this.params.fechaExpiracion = undefined;
            this.params.usoMaximo = undefined;
        },
        $_fnCleanBuyFree() {
            this.params.montoDescuento = undefined;
            this.params.porcentajeDescuento = undefined;
        },
    },
};
</script>

<template>
    <div>
        <BasePopUp
            ref="popUp"
            :maxWidth="$vuetify.breakpoint.mobile ? '100%' : '600'"
            scrollable
            :isDrawer="true"
        >
            <div slot="Content">
                <v-card flat height="100%" width="100%">
                    <v-card-title>Código Promocional</v-card-title>
                    <v-card-text>
                        <BaseForm :method="$_fnNew">
                            <div slot="body">
                                <v-row>
                                    <v-col cols="12" md="12">
                                        <BaseInput
                                            label="Código"
                                            v-model="params.codigo"
                                            :max="6"
                                            :min="3"
                                            :validate="['range']"
                                        />
                                        <BaseSelect
                                            label="Producto"
                                            v-model="params.productoId"
                                            :endpoint="products"
                                            itemText="product"
                                            itemValue="value"
                                            readonly
                                        ></BaseSelect>
                                        <BaseSwitch
                                            label="Es Licencia"
                                            v-model="params.esLicencia"
                                            @change="$_fnCleanLicense"
                                        ></BaseSwitch>
                                        <BaseDatePicker
                                            label="Fecha de expiración"
                                            appendIcon="mdi-magnify"
                                            v-model="params.fechaExpiracion"
                                            v-if="!params.esLicencia"
                                        />
                                        <BaseInput
                                            label="Uso Máximo"
                                            v-model="params.usoMaximo"
                                            type="number"
                                            :validate="['number']"
                                            v-if="params.esLicencia"
                                        />
                                        <BaseSwitch
                                            label="Compra Gratis"
                                            v-model="params.compraGratis"
                                            @change="$_fnCleanBuyFree"
                                        ></BaseSwitch>
                                        <BaseInput
                                            label="Monto Descuento"
                                            v-model="params.montoDescuento"
                                            type="number"
                                            :validate="['number']"
                                            v-if="!params.compraGratis"
                                        />
                                        <BaseInput
                                            label="Porcentaje Descuento"
                                            type="number"
                                            v-model="params.porcentajeDescuento"
                                            :validate="['number']"
                                            v-if="!params.compraGratis"
                                        />
                                        <BaseSwitch
                                            v-model="params.estadoId"
                                            :label="
                                                params.estadoId
                                                    ? 'Activo'
                                                    : 'Inactivo'
                                            "
                                        ></BaseSwitch>
                                    </v-col>
                                </v-row>
                            </div>
                        </BaseForm>
                    </v-card-text>
                </v-card>
            </div>
        </BasePopUp>
        <BaseCardViewComponent title="Códigos Promocionales" v-if="user">
            <div slot="card-text">
                <!--Componente Editor -->
                <BaseServerDataTable
                    ref="PromotionalCodesFilter"
                    :setting="setting"
                    :fnNew="$_open"
                    :fnEdit="$_fnEdit"
                    :fnDelete="$_fnDelete"
                />
            </div>
        </BaseCardViewComponent>
    </div>
</template>

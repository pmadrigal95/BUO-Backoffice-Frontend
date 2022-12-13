<script>
/**
 * Descripción: Pantalla Codigo Promocionales
 *
 * @displayName PromotionalCodesViewComponent
 *
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

const BaseDatePicker = () => import('@/components/core/forms/BaseDatePicker');

export default {
    name: 'PromotionalCodesViewComponent',

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
            hasPercentageDiscount: undefined,
            statusUser: false,
            loading: false,
        };
    },

    computed: {
        ...mapGetters('authentication', ['user']),

        setStatusDisplay() {
            return this.statusUser ? 'Activo' : 'Inactivo';
        },

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
                        value: 'nombreEstado',
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
                id: 0,
                usuarioId: undefined,
                codigo: undefined,
                fechaExpiracion: undefined,
                productoId: 2,
                montoDescuento: undefined,
                porcentajeDescuento: undefined,
                usoMaximo: undefined,
                esLicencia: false,
                compraGratis: false,
                estadoId: true,
            };
        },

        $_getUserId() {
            return this.user.userId;
        },

        $_setUserIdToParams() {
            this.params.usuarioId = this.$_getUserId();
        },

        $_cleanSendToAPI() {
            this.params = this.$_Object();
        },

        $_setConditionUserToParams() {
            this.params.estadoId = this.statusUser ? 2 : 1;
        },

        $_getConditionUserToParams() {
            this.statusUser = this.params.estadoId == 1 ? false : true;
        },

        $_postToApi(action, body) {
            this.loading = true;
            httpService.post(action, body).then((response) => {
                if (response != undefined) {
                    this.$refs.PromotionalCodesFilter.$_ParamsToAPI();
                    this.$_cleanSendToAPI();
                }
                this.loading = false;
            });
        },

        $_formatDate(dateToConvert) {
            return baseSharedFnHelper.$_parseArrayToDateISOString(
                dateToConvert
            );
        },

        $_getToPromotionalCode(id) {
            this.$_open();
            this.loading = true;
            httpService.get(`codigoPromocion/${id}`).then((response) => {
                if (response != undefined) {
                    this.params = response.data;
                    if (!this.params.esLicencia) {
                        this.params.fechaExpiracion = this.$_formatDate(
                            this.params.fechaExpiracion
                        );
                    }
                    this.$_getConditionUserToParams();
                }
                this.loading = false;
            });
        },

        $_open() {
            this.$_cleanSendToAPI();
            this.$refs['popUp'].$_openModal();
        },

        $_cleanLicense() {
            this.params.fechaExpiracion = undefined;
            this.params.usoMaximo = undefined;
        },

        $_cleanBuyFree() {
            this.params.montoDescuento = undefined;
            this.params.porcentajeDescuento = undefined;
        },

        $_createBodyRequestDelete(row) {
            const request = {
                userId: this.$_getUserId(),
                id: row[0].id,
            };
            return request;
        },

        $_fnNew() {
            this.$_setUserIdToParams();
            this.$_setConditionUserToParams();
            this.$_postToApi('codigoPromocion/save', this.params);
        },

        $_fnEdit(row) {
            this.$_setUserIdToParams();
            const promotionalCodeId = row.selected.id;
            this.$_getToPromotionalCode(promotionalCodeId);
        },

        $_fnDelete(row) {
            const request = this.$_fnCreateBodyRequestDelete(row);
            this.$_postToApi('codigoPromocion/deactivate', request);
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
                        <BaseSkeletonLoader
                            v-if="loading"
                            type="article, actions"
                        />
                        <BaseForm :method="$_fnNew" v-else>
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
                                            @change="$_cleanLicense"
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
                                            @change="$_cleanBuyFree"
                                        ></BaseSwitch>
                                        <v-radio-group
                                            v-model="hasPercentageDiscount"
                                            mandatory
                                            v-if="!params.compraGratis"
                                        >
                                            <v-card class="mb-5" outlined>
                                                <v-card-text>
                                                    <v-radio
                                                        label="Porcentaje Descuento"
                                                        value="true"
                                                        @change="$_cleanBuyFree"
                                                        class="mb-5"
                                                    ></v-radio>
                                                    <BaseInput
                                                        label="Porcentaje Descuento"
                                                        type="number"
                                                        v-model="
                                                            params.porcentajeDescuento
                                                        "
                                                        :validate="['number']"
                                                        v-if="
                                                            !params.compraGratis &&
                                                            hasPercentageDiscount ===
                                                                'true'
                                                        "
                                                    />
                                                </v-card-text>
                                            </v-card>
                                            <v-card outlined>
                                                <v-card-text>
                                                    <v-radio
                                                        label="Monto Descuento"
                                                        value="false"
                                                        @change="$_cleanBuyFree"
                                                        class="mb-2"
                                                    ></v-radio>
                                                    <BaseInput
                                                        label="Monto Descuento"
                                                        v-model="
                                                            params.montoDescuento
                                                        "
                                                        type="number"
                                                        :validate="['number']"
                                                        v-if="
                                                            !params.compraGratis &&
                                                            hasPercentageDiscount ===
                                                                'false'
                                                        "
                                                    />
                                                </v-card-text>
                                            </v-card>
                                        </v-radio-group>

                                        <BaseSwitch
                                            v-model="statusUser"
                                            :label="setStatusDisplay"
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
                <BaseServerDataTable
                    ref="PromotionalCodeFilter"
                    :setting="setting"
                    :fnNew="$_open"
                    :fnEdit="$_fnEdit"
                    :fnDelete="$_fnDelete"
                />
            </div>
        </BaseCardViewComponent>
    </div>
</template>

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
            hasPercentageDiscount: undefined,
            promotionalCodeStatus: true,
            loading: false,
            componentKey: 0,
        };
    },

    computed: {
        ...mapGetters('authentication', ['user']),

        setStatusDisplay() {
            return `Estado ${
                this.promotionalCodeStatus ? 'Activo' : 'Inactivo'
            }`;
        },

        productList() {
            return [
                { product: 'Tokens', value: 1 },
                { product: 'Prueba PDA', value: 2 },
            ];
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
        forceRerender() {
            this.componentKey += 1;
        },

        $_Object() {
            return {
                id: 0,
                usuarioId: undefined,
                codigo: undefined,
                fechaExpiracion: undefined,
                fechaExpiracionFormato: undefined,
                productoId: 2,
                montoDescuento: undefined,
                porcentajeDescuento: undefined,
                usoMaximo: undefined,
                esLicencia: false,
                compraGratis: true,
                estadoId: true,
            };
        },

        $_open() {
            this.forceRerender();
            this.$_cleanSendToAPI();
            this.$refs['popUp'].$_openModal();
        },

        $_setUserIdToParams() {
            this.params.usuarioId = this.$_getUserId();
        },

        $_cleanLicense() {
            typeof this.params.esLicencia === undefined ? false : true;
            if (this.params.esLicencia) {
                this.params.fechaExpiracion = undefined;
                this.params.fechaExpiracionFormato = undefined;
            } else {
                this.params.usoMaximo = undefined;
            }
        },

        $_setDefaultBuyFreeToParams() {
            this.params.compraGratis = true;
            this.$_cleanBuyFree();
        },

        $_cleanBuyFree() {
            if (this.params.compraGratis) {
                this.params.montoDescuento = undefined;
                this.params.porcentajeDescuento = undefined;
            } else if (
                this.params.montoDescuento > 0 &&
                !this.hasPercentageDiscount
            ) {
                this.params.porcentajeDescuento = undefined;
            } else if (
                this.params.porcentajeDescuento > 0 &&
                this.hasPercentageDiscount
            ) {
                this.params.montoDescuento = undefined;
            }
        },

        /**
         * Function for clean the object after to send a request to api.
         */

        $_cleanSendToAPI() {
            this.params = this.$_Object();
        },

        $_formatDateExpiry(fechaExpiracion) {
            if (fechaExpiracion != null) {
                this.params.fechaExpiracion =
                    baseSharedFnHelper.$_parseArrayToDateISOString(
                        fechaExpiracion
                    );
            }
        },

        /**
         * Function to get the information about promotional code.
         * @param {*} id
         */

        $_getToPromotionalCode(id) {
            this.$_open();
            this.loading = true;
            httpService.get(`codigoPromocion/${id}`).then((response) => {
                if (response != undefined) {
                    this.params = response.data;
                    if (!this.params.compraGratis) {
                        this.$_setDefaultBuyFreeToParams();
                    }
                    this.$_formatDateExpiry(this.params.fechaExpiracion);
                    this.$_getConditionUserToParams();
                }
                this.loading = false;
            });
        },

        /**
         * Genery function for send request to api.
         * @param {*} action
         * @param {*} body
         */

        $_postToApi(action, body) {
            this.loading = true;
            httpService.post(action, body).then((response) => {
                if (response != undefined) {
                    this.$refs.PromotionalCodeFilter.$_ParamsToAPI();
                    this.$refs.popUp.$_checkStatus() && this.$_open();
                }
                this.loading = false;
            });
        },

        /**
         * Functions for change de status user for request to api.
         */

        $_setConditionUserToParams() {
            this.params.estadoId = this.promotionalCodeStatus ? 2 : 1;
        },

        $_getConditionUserToParams() {
            this.promotionalCodeStatus =
                this.params.estadoId == 1 ? false : true;
        },

        /**
         * Function for add or edit a promotional code to api.
         */

        $_fnNew() {
            this.$_setUserIdToParams();
            this.$_setConditionUserToParams();
            this.$_cleanLicense();
            this.$_cleanBuyFree();
            this.$_postToApi('codigoPromocion/save', this.params);
        },

        /**
         * Function for edit a promotional code.
         */

        $_fnEdit(row) {
            const promotionalCodeId = row.selected.id;
            this.$_getToPromotionalCode(promotionalCodeId);
        },

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

        $_fnDelete(row) {
            const request = this.$_createBodyRequestDelete(row);
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
        >
            <div slot="Content">
                <v-card flat height="100%" width="100%">
                    <v-card-title>Código Promocional</v-card-title>
                    <v-card-text>
                        <BaseSkeletonLoader
                            v-if="loading"
                            type="article, actions"
                        />
                        <BaseForm
                            :method="$_fnNew"
                            v-else
                            :key="componentKey"
                            :cancel="$_open"
                        >
                            <div slot="body">
                                <v-row>
                                    <v-col cols="12" md="12">
                                        <BaseInput
                                            mask="XXXXXX"
                                            label="Código"
                                            v-model="params.codigo"
                                            :max="6"
                                            :min="3"
                                            :validate="['range']"
                                        />
                                        <BaseSelect
                                            label="Producto"
                                            v-model="params.productoId"
                                            :endpoint="productList"
                                            itemText="product"
                                            itemValue="value"
                                            :validate="['text']"
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
                                            reqCurrentMinDate
                                            :validate="['text']"
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
                                            disabled
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
                                                        :value="true"
                                                        @change="$_cleanBuyFree"
                                                        class="mb-5"
                                                    ></v-radio>
                                                    <BaseInput
                                                        label="Porcentaje Descuento"
                                                        v-model="
                                                            params.porcentajeDescuento
                                                        "
                                                        :max="99"
                                                        :min="1"
                                                        :validate="[
                                                            'percentage',
                                                        ]"
                                                        v-if="
                                                            !params.compraGratis &&
                                                            hasPercentageDiscount
                                                        "
                                                    />
                                                </v-card-text>
                                            </v-card>
                                            <v-card outlined>
                                                <v-card-text>
                                                    <v-radio
                                                        label="Monto Descuento"
                                                        :value="false"
                                                        @change="$_cleanBuyFree"
                                                        class="mb-5"
                                                    ></v-radio>
                                                    <BaseInput
                                                        :min="0"
                                                        label="Monto Descuento"
                                                        v-model="
                                                            params.montoDescuento
                                                        "
                                                        :validate="['number02']"
                                                        v-if="
                                                            !params.compraGratis &&
                                                            !hasPercentageDiscount
                                                        "
                                                    />
                                                </v-card-text>
                                            </v-card>
                                        </v-radio-group>

                                        <BaseSwitch
                                            v-model="promotionalCodeStatus"
                                            :label="setStatusDisplay"
                                            @change="$_setConditionUserToParams"
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

<script>
/**
 * Descripción: Pantalla Editor Código  Promocionales
 *
 * @displayName PromotionalCodesEditorViewComponent
 *
 */

import { mapGetters } from 'vuex';

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper';

import httpService from '@/services/axios/httpService';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseDatePicker = () => import('@/components/core/forms/BaseDatePicker');

export default {
    name: 'PromotionalCodesEditorViewComponent',

    components: {
        BaseCardViewComponent,
        BaseDatePicker,
    },

    data() {
        return {
            params: this.$_Object(),
            hasPercentageDiscount: undefined,
            promotionalCodeStatus: true,
            loading: false,
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
    },

    created() {
        this.$_getObject();
    },

    mounted() {
        this.$vuetify.theme.dark = false;
        this.$vuetify.theme.themes.light.background =
            this.$vuetify.theme.themes.light.white;
    },

    destroyed() {
        this.$vuetify.theme.themes.light.background =
            this.$vuetify.theme.themes.light.clouds;
    },

    methods: {
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

        /**
         * Function that receives the object to know if it should be edited or added
         */

        $_getObject() {
            const id = this.$router.currentRoute.params.id;
            if (id) {
                this.$_getToPromotionalCode(id);
            }
        },

        /**
         * Function to return the PromotionalCodesFilterViewComponent
         */
        $_returnToFilter() {
            this.$router.push({
                name: 'PromotionalCodesFilterViewComponent',
            });
        },

        /**
         * Function for format the object
         */

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
            typeof this.params.compraGratis === undefined ? false : true;
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

        $_formatDateExpiry(fechaExpiracion) {
            if (fechaExpiracion != null) {
                this.params.fechaExpiracion =
                    baseSharedFnHelper.$_parseArrayToDateISOString(
                        fechaExpiracion
                    );
            }
        },

        /**
         * Function for clean the object after to send a request to api.
         */

        $_cleanSendToAPI() {
            this.params = this.$_Object();
        },

        /**
         * Function to get the information about promotional code.
         * @param {*} id
         */

        $_getToPromotionalCode(id) {
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
                    this.$_returnToFilter();
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
            this.promotionalCodeStatus = this.params.estadoId != 1;
        },

        $_setUserIdToParams() {
            this.params.usuarioId = this.user.userId;
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
    },
};
</script>

<template>
    <BaseCardViewComponent
        title="Códigos Promocionales"
        class="mx-auto"
        md="6"
        offset="3"
    >
        <div slot="card-text">
            <BaseSkeletonLoader v-if="loading" type="article, actions" />
            <BaseForm :method="$_fnNew" :cancel="$_returnToFilter" v-else>
                <div slot="body">
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
                                    v-model="params.porcentajeDescuento"
                                    :max="99"
                                    :min="1"
                                    :validate="['percentage']"
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
                                    v-model="params.montoDescuento"
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
                </div>
            </BaseForm>
        </div>
    </BaseCardViewComponent>
</template>

<script>
/**
 * Descripción: Pantalla Editor Código  Promocionales
 *
 * @displayName PromotionalCodesEditorViewComponent
 *
 */

//TODO: Implementar logica cuando la compra no es gratis!

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper';

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
            entity: this.$_Object(),
            loading: false,
        };
    },

    computed: {
        ...mapGetters('authentication', ['user']),

        productList() {
            return [
                { product: 'Tokens', value: 1 },
                { product: 'Prueba PDA', value: 2 },
            ];
        },

        statusList() {
            return [
                { product: 'Activo', value: 2 },
                { product: 'Inactivo', value: 1 },
            ];
        },
    },

    created() {
        /**
         * Determinar si Es nuevo / editor
         */
        this.$_getObject();

        this.entity.usuarioId = this.user.userId;

        //TODO: How to implement on vue router the background config
        this.$vuetify.theme.themes.light.background =
            this.$vuetify.theme.themes.light.white;
    },

    destroyed() {
        this.$vuetify.theme.themes.light.background =
            this.$vuetify.theme.themes.light.clouds;
    },

    methods: {
        /**
         * Entity Object
         */
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
                esLicencia: undefined,
                compraGratis: true,
                estadoId: 2,
            };
        },

        /**
         * Determinar si Es nuevo / editor
         */
        $_getObject() {
            let data = this.$router.currentRoute.params.Id;
            if (data) {
                //HttpServices a la vista para obtener Vista
                this.loading = true;
                httpService.get(`codigoPromocion/${data}`).then((response) => {
                    this.loading = false;
                    if (response != undefined) {
                        // Encontro la entidad
                        this.entity = BaseArrayHelper.SetObject(
                            {},
                            response.data
                        );

                        this.entity.fechaExpiracion =
                            baseSharedFnHelper.$_parseArrayToDateISOString(
                                this.entity.fechaExpiracion
                            );
                    }
                });
            }
        },

        $_isLicense() {
            if (this.entity.esLicencia) {
                this.entity.fechaExpiracion = undefined;
            } else {
                this.entity.usoMaximo = undefined;
            }
        },

        $_sendToApi() {
            this.loading = true;

            this.$_isLicense();
            let object = BaseArrayHelper.SetObject({}, this.entity);

            httpService
                .post('codigoPromocion/save', object)
                .then((response) => {
                    this.loading = false;

                    if (response != undefined) {
                        //Logica JS luego de la acción exitosa!!!
                        this.$_returnToFilter();
                    }
                });
        },

        /**
         * Function to return the PromotionalCodesFilterViewComponent
         */
        $_returnToFilter() {
            this.$router.push({
                name: 'PromotionalCodesFilterViewComponent',
            });
        },
    },
};
</script>

<template>
    <BaseCardViewComponent
        title="Código Promocional"
        :btnAction="$_returnToFilter"
        class="mx-auto"
        md="6"
        offset="3"
    >
        <div slot="card-text">
            <BaseSkeletonLoader v-if="loading" type="article, actions" />
            <BaseForm :method="$_sendToApi" :cancel="$_returnToFilter" v-else>
                <div slot="body">
                    <v-row dense>
                        <v-col cols="12">
                            <BaseInput
                                mask="XXXXXX"
                                label="Código"
                                v-model.trim="entity.codigo"
                                :max="6"
                                :min="3"
                                :validate="['range']"
                            />
                        </v-col>
                        <v-col cols="12">
                            <BaseSelect
                                label="Producto"
                                v-model="entity.productoId"
                                :endpoint="productList"
                                itemText="product"
                                itemValue="value"
                                :validate="['text']"
                            />
                        </v-col>
                        <v-col cols="12">
                            <BaseSwitch
                                label="Es Licencia"
                                v-model="entity.esLicencia"
                            />
                        </v-col>
                        <v-col cols="12">
                            <BaseInput
                                label="Uso Máximo"
                                v-model.number="entity.usoMaximo"
                                v-if="entity.esLicencia"
                                type="number"
                                :validate="['number']"
                            />

                            <BaseDatePicker
                                v-else
                                label="Fecha de expiración"
                                appendIcon="mdi-calendar-month"
                                v-model="entity.fechaExpiracion"
                                reqCurrentMinDate
                                :validate="['text']"
                            />
                        </v-col>
                        <v-col cols="12">
                            <BaseSwitch
                                disabled
                                label="Compra Gratis"
                                v-model="entity.compraGratis"
                            />
                        </v-col>
                        <v-col cols="12">
                            <BaseSelect
                                label="Estado"
                                v-model="entity.estadoId"
                                :endpoint="statusList"
                                itemText="product"
                                itemValue="value"
                                :validate="['text']"
                            />
                        </v-col>
                    </v-row>
                </div>
            </BaseForm>
        </div>
    </BaseCardViewComponent>
</template>

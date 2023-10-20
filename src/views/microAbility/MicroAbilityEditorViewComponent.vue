<script>
/**
 * Descripción: Pantalla Editor Micro Habilidades
 *
 * @displayName MicroAbilityEditorViewComponent
 *
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

import {
    baseFilterSettingsHelper,
    baseDataTableColumnsHelper,
} from '@/helpers/baseFilterSettingsHelper';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseInputDataTable = () =>
    import('@/components/core/forms/BaseInputDataTable');

export default {
    name: 'MicroAbilityEditorViewComponent',

    components: {
        BaseCardViewComponent,
        BaseInputDataTable,
    },

    data() {
        return {
            entity: this.$_Object(),
            loading: false,
            componentKey: 0,
        };
    },

    computed: {
        ...mapGetters('authentication', ['user', 'buoId']),

        ...mapGetters('filters', ['advfiltersBypageView', 'dialogViewById']),

        companyDialogView() {
            return this.dialogViewById('companyDialog');
        },

        abilityDialogView() {
            return this.dialogViewById('simpleAbilityDialog');
        },

        /**
         * Extra Params
         */
        extraParams() {
            return baseFilterSettingsHelper.$_setExtraParams({
                companyId: this.entity.organizacionId,
            });
        },

        /**
         * Configuracion BaseInputDataTable
         */
        companySetting() {
            return baseFilterSettingsHelper.$_setCompanySetting({
                isFilter: true,
                singleSelect: true,
                list: this.advfiltersBypageView(this.companyDialogView),
                pageView: this.companyDialogView,
            });
        },

        /**
         * Configuracion BaseServerDataTable
         */
        abilitySetting() {
            return baseFilterSettingsHelper.$_setAbilitySetting({
                companyId: this.user.companyId,
                isFilter: true,
                singleSelect: true,
                list: this.advfiltersBypageView(this.abilityDialogView),
                pageView: this.abilityDialogView,
            });
        },
    },

    watch: {
        /**
         * Actualizar calendarios
         */
        'entity.organizacionId': {
            handler(newValue, oldValue) {
                if (oldValue) {
                    this.$_forceUpdateComponente();
                }
            },
            immediate: true,
        },
    },

    mounted() {
        /**
         * Determinar si Es nuevo / editor
         */
        this.$_getObject();

        //TODO: How to implement on vue router the background config
        this.$vuetify.theme.themes.light.background =
            this.$vuetify.theme.themes.light.white;

        this.$_reviewQueryParams();
    },

    destroyed() {
        this.$vuetify.theme.themes.light.background =
            this.$vuetify.theme.themes.light.clouds;
    },

    methods: {
        $_setCompanyFilter() {
            baseDataTableColumnsHelper.$_setCompanyColumns({
                isFilter: true,
                pageView: this.companyDialogView,
            });
        },

        $_setAbilityFilter() {
            baseDataTableColumnsHelper.$_setAbilityColumns({
                companyId: this.user.companyId,
                isFilter: true,
                pageView: this.abilityDialogView,
            });
        },

        /**
         * Force Update Component
         */
        $_forceUpdateComponente() {
            this.entity.definicionCualificacion = undefined;
            this.entity.cualificacionId = undefined;
            this.componentKey = this.componentKey + 1;
        },

        $_reviewQueryParams() {
            if (this.$router.currentRoute.query.cualificacionId) {
                this.entity.cualificacionId =
                    this.$router.currentRoute.query.cualificacionId;
            }

            if (this.$router.currentRoute.query.organizacionId) {
                this.entity.organizacionId =
                    this.$router.currentRoute.query.organizacionId;
            } else if (this.user.companyId != this.buoId) {
                this.entity.organizacionId = this.user.companyId;
            }
        },

        /**
         * Entity Object
         */
        $_Object() {
            return {
                id: 0,
                definicion: undefined,
                esInterna: undefined,
                cualificacionId: undefined,
                organizacionId: undefined,
                usuarioModificaId: undefined,
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
                httpService.get(`competencia/${data}`).then((response) => {
                    this.loading = false;
                    if (response != undefined) {
                        // Encontro la entidad
                        this.entity = BaseArrayHelper.SetObject(
                            {},
                            response.data
                        );
                    }
                });
            }
        },

        $_sendToApi() {
            this.loading = true;
            this.entity.usuarioModificaId = this.user.userId;
            let object = BaseArrayHelper.SetObject({}, this.entity);

            httpService
                .post('competencia/saveForm', object)
                .then((response) => {
                    this.loading = false;

                    if (response != undefined) {
                        //Logica JS luego de la acción exitosa!!!
                        this.$_returnToFilter();
                    }
                });
        },

        /**
         * Function Go Back
         */
        $_returnToFilter() {
            this.$router.back();
        },
    },
};
</script>

<template>
    <BaseCardViewComponent
        title="Micro-Indicador"
        :btnAction="$_returnToFilter"
        class="mx-auto"
        md="6"
        offset="3"
        v-if="user"
    >
        <div slot="card-text">
            <BaseSkeletonLoader v-if="loading" type="article, actions" />
            <BaseForm
                v-else
                :block="$vuetify.breakpoint.mobile"
                :method="$_sendToApi"
                :cancel="$_returnToFilter"
            >
                <div slot="body">
                    <v-row dense>
                        <v-col cols="12">
                            <BaseInput
                                label="Definición"
                                :max="1000"
                                v-model.trim="entity.definicion"
                                :validate="['text']"
                            />
                        </v-col>
                        <v-col cols="12" v-if="user.companyId === buoId">
                            <BaseInputDataTable
                                label="Empresa"
                                :pageView="companyDialogView"
                                :setting="companySetting"
                                itemText="nombre"
                                :editText="entity.nombreOrganizacion"
                                v-model.number="entity.organizacionId"
                                :validate="['requiered']"
                                v-if="
                                    !$router.currentRoute.query
                                        .organizacionId && companySetting
                                "
                                :fnResetConfig="$_setCompanyFilter"
                            />
                        </v-col>
                        <v-col cols="12">
                            <BaseInputDataTable
                                label="Indicador"
                                :pageView="abilityDialogView"
                                :extraParams="extraParams"
                                :readonly="!entity.organizacionId"
                                :setting="abilitySetting"
                                :editText="entity.definicionCualificacion"
                                v-model.number="entity.cualificacionId"
                                :validate="['requiered']"
                                :key="componentKey"
                                v-if="
                                    !$router.currentRoute.query
                                        .cualificacionId && abilitySetting
                                "
                                :fnResetConfig="$_setAbilityFilter"
                            />
                        </v-col>
                        <v-col cols="12" v-if="user.companyId === buoId">
                            <BaseSwitch
                                label="Interna"
                                v-model="entity.esInterna"
                                :disabled="user.companyId != buoId"
                            />
                        </v-col>
                        <v-col cols="12">
                            <BaseRadioGroup
                                v-model="entity.estadoId"
                                endpoint="status"
                                :validate="['requiered']"
                            />
                        </v-col>
                    </v-row>
                </div>
            </BaseForm>
        </div>
    </BaseCardViewComponent>
</template>

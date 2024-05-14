<script>
/**
 * Descripción: Pantalla Editor Salida de usuarios
 *
 * @displayName DepartureUsersEditorViewComponent
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
    name: 'DepartureUsersEditorViewComponent',

    components: {
        BaseInputDataTable,
        BaseCardViewComponent,
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

        userDialogView() {
            return this.dialogViewById('userDialog');
        },

        departureReasonTypeDialogView() {
            return this.dialogViewById('DepartureReasonTypeDialog');
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
         userSetting() {
            return baseFilterSettingsHelper.$_setUserSetting({
                companyId: this.user.companyId,
                isFilter: true,
                singleSelect: true,
                list: this.advfiltersBypageView(this.userDialogView),
                pageView: this.userDialogView,
            });
        },

        /**
         * Configuracion BaseServerDataTable
         */
        departureReasonTypeSetting() {
            return baseFilterSettingsHelper.$_setDepartureReasonTypeSetting({
                isFilter: true,
                singleSelect: true,
                list: this.advfiltersBypageView(
                    this.departureReasonTypeDialogView
                ),
                pageView: this.departureReasonTypeDialogView,
            });
        },
    },

    created() {
        /**
         * Determinar si Es nuevo / editor
         */
        this.$_getObject();

        this.entity.organizacionId =
            this.user.companyId === this.buoId
                ? undefined
                : this.user.companyId;

        //TODO: How to implement on vue router the background config
        this.$vuetify.theme.themes.light.background =
            this.$vuetify.theme.themes.light.white;
    },

    destroyed() {
        this.$vuetify.theme.themes.light.background =
            this.$vuetify.theme.themes.light.clouds;
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

    methods: {
        $_setCompanyFilter() {
            baseDataTableColumnsHelper.$_setCompanyColumns({
                isFilter: true,
                pageView: this.companyDialogView,
            });
        },

        $_setDepartureReasonTypeFilter() {
            baseDataTableColumnsHelper.$_setDepartureReasonTypeColumns({
                isFilter: true,
                pageView: this.departureReasonTypeDialogView,
                companyId: this.user.companyId,
            });
        },

        /**
         * Force Update Component
         */
        $_forceUpdateComponente() {
            this.tipoRazonSalidaId = undefined;
            this.componentKey = this.componentKey + 1;
        },

        $_setUserFilter() {
            baseDataTableColumnsHelper.$_setUserColumns({
                companyId: this.user.companyId,
                isFilter: true,
                pageView: this.userDialogView,
            });
        },

        /**
         * Entity Object
         */
        $_Object() {
            return {
                id: undefined,
                descripcion: undefined,
                tipoRazonSalidaId: undefined,
                nombreTipoRazonSalida: undefined,
                organizacionId: undefined,
                nombreOrganizacion: undefined,
                nombreUsuario: undefined,
                usuarioId: undefined,
            };
        },

        $_setToUser() {
            this.entity.usuarioModificaId = this.user.userId;
        },

        /**
         * Determinar si Es nuevo / editor
         */
        $_getObject() {
            let data = this.$router.currentRoute.params.Id;
            if (data) {
                //HttpServices a la vista para obtener Vista
                this.loading = true;
                httpService.get(`salidaUsuario/${data}`).then((response) => {
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
            this.$_setToUser();

            httpService
                .post(
                    'salidaUsuario/saveForm',
                    BaseArrayHelper.SetObject({}, this.entity)
                )
                .then((response) => {
                    this.loading = false;

                    if (response != undefined) {
                        //Logica JS luego de la acción exitosa!!!
                        this.$_returnToFilter();
                    }
                });
        },

        /**
         * Function to return the DepartureUsersFilterViewComponent
         */
        $_returnToFilter() {
            this.$router.push({
                name: 'DepartureUsersFilterViewComponent',
            });
        },
    },
};
</script>

<template>
    <BaseCardViewComponent
        title="Salida de colaboradores"
        :btnAction="$_returnToFilter"
        class="mx-auto"
        md="6"
        offset="3"
    >
        <div slot="card-text">
            <BaseSkeletonLoader v-if="loading" type="article, actions" />
            <BaseForm
                :block="$vuetify.breakpoint.mobile"
                :method="$_sendToApi"
                :cancel="$_returnToFilter"
                v-else
            >
                <div slot="body">
                    <v-row dense>
                        <v-col cols="12" v-if="user.companyId === buoId">
                            <BaseInputDataTable
                                label="Empresa"
                                v-if="companySetting"
                                :pageView="companyDialogView"
                                :setting="companySetting"
                                :editText="entity.nombreOrganizacion"
                                v-model.number="entity.organizacionId"
                                itemText="nombre"
                                :validate="['requiered']"
                                :fnResetConfig="$_setCompanyFilter"
                            />
                        </v-col>
                        <v-col cols="12">
                            <BaseInputDataTable
                                label="Colaborador "
                                v-if="userSetting"
                                :pageView="userDialogView"
                                :setting="userSetting"
                                :extraParams="extraParams"
                                itemText="nombreCompleto"
                                :readonly="extraParams.length == 0"
                                :editText="entity.nombreUsuario"
                                v-model="entity.usuarioId"
                                :key="componentKey"
                                :fnResetConfig="$_setUserFilter"
                                :validate="['requiered']"
                            />
                        </v-col>
                        <v-col cols="12">
                            <BaseInputDataTable
                                label="Tipo de razón de salida"
                                v-if="departureReasonTypeSetting"
                                :pageView="departureReasonTypeDialogView"
                                :setting="departureReasonTypeSetting"
                                :extraParams="extraParams"
                                itemText="nombre"
                                :readonly="extraParams.length == 0"
                                :editText="entity.nombreTipoRazonSalida"
                                v-model="entity.tipoRazonSalidaId"
                                :key="componentKey"
                                :fnResetConfig="$_setDepartureReasonTypeFilter"
                                :validate="['requiered']"
                            />
                        </v-col>
                        <v-col cols="12">
                            <BaseTextArea
                                label="Descripción"
                                v-model.trim="entity.descripcion"
                                :validate="['text']"
                                :max="2000"
                                counter="2000"
                                rows="6"
                            />
                        </v-col>
                    </v-row>
                </div>
            </BaseForm>
        </div>
    </BaseCardViewComponent>
</template>

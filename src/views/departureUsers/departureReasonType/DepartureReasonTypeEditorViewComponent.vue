<script>
/**
 * Descripción: Pantalla Editor Tipo de salida de usuarios
 *
 * @displayName DepartureReasonTypeEditorViewComponent
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
    name: 'DepartureReasonTypeEditorViewComponent',

    components: {
        BaseInputDataTable,
        BaseCardViewComponent,
    },
    data() {
        return {
            entity: this.$_Object(),
            loading: false,
        };
    },

    computed: {
        ...mapGetters('authentication', ['user', 'buoId']),

        ...mapGetters('filters', ['advfiltersBypageView', 'dialogViewById']),

        companyDialogView() {
            return this.dialogViewById('companyDialog');
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

    methods: {
        $_setCompanyFilter() {
            baseDataTableColumnsHelper.$_setCompanyColumns({
                isFilter: true,
                pageView: this.companyDialogView,
            });
        },

        /**
         * Entity Object
         */
        $_Object() {
            return {
                id: undefined,
                nombre: undefined,
                estadoId: 2,
                organizacionId: undefined,
                nombreOrganizacion: undefined,
                usuarioModificaId: undefined,
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
                httpService.get(`tipoRazonSalida/${data}`).then((response) => {
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
                    'tipoRazonSalida/saveForm',
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
         * Function to return the DepartureReasonTypeFilterViewComponent
         */
        $_returnToFilter() {
            this.$router.push({
                name: 'DepartureReasonTypeFilterViewComponent',
            });
        },
    },
};
</script>

<template>
    <BaseCardViewComponent
        title="Tipos de razones de salidas"
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
                                itemText="nombre"
                                :editText="entity.nombreOrganizacion"
                                v-model.number="entity.organizacionId"
                                :fnResetConfig="$_setCompanyFilter"
                            />
                        </v-col>
                        <v-col cols="12">
                            <BaseInput
                                label="Nombre"
                                v-model.number="entity.nombre"
                                :validate="['text']"
                                :max="100"
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

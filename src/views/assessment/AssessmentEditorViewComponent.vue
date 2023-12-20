<script>
/**
 * Descripción: Pantalla Crear Assessment
 *
 * @displayName AssessmentEditorViewComponent
 *
 */

import { mapGetters } from 'vuex';

import baseFnFile from '@/helpers/baseFnFile';

// import httpService from '@/services/axios/httpService';

import {
    baseFilterSettingsHelper,
    baseDataTableColumnsHelper,
} from '@/helpers/baseFilterSettingsHelper';

const BaseInputTreeview = () =>
    import('@/components/core/treeview/BaseInputTreeview');

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseInputDataTable = () =>
    import('@/components/core/forms/BaseInputDataTable.vue');

const StepViewComponent = () =>
    import('@/views/user/bulkLoad/components/StepViewComponent.vue');

const BaseInputFile = () => import('@/components/core/forms/BaseInputFile');

export default {
    name: 'AssessmentEditorViewComponent',

    components: {
        BaseCardViewComponent,
        BaseInputDataTable,
        StepViewComponent,
        BaseInputTreeview,
        BaseInputFile,
    },

    data() {
        return {
            loading: false,
            entity: this.$_Object(),
            warningList: undefined,
            //fileType: baseFnFile.$_extensionsName.text,
            fileType: [
                baseFnFile.$_extensionsName.text,
                baseFnFile.$_extensionsName.json,
            ],
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
        setting() {
            return baseFilterSettingsHelper.$_setCompanySetting({
                isFilter: true,
                singleSelect: true,
                list: this.advfiltersBypageView(this.companyDialogView),
                pageView: this.companyDialogView,
            });
        },
    },

    created() {
        //TODO: How to implement on vue router the background config
        this.$vuetify.theme.themes.light.background =
            this.$vuetify.theme.themes.light.white;

        this.$_setCompany();
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
                id: undefined,
                nombre: undefined,
                descripcion: undefined,
                tipoPruebaId: undefined,
                nombreTipoPrueba: undefined,
                enlace: undefined,
                estadoId: 2,
                organizacionId: undefined,
                nombreOrganizacion: undefined,
                usuarioModificaId: undefined,
                file: undefined,
            };
        },

        $_setCompany() {
            this.entity.organizacionId =
                this.user.companyId === this.buoId
                    ? undefined
                    : this.user.companyId;
        },

        $_setCompanyFilter() {
            baseDataTableColumnsHelper.$_setCompanyColumns({
                isFilter: true,
                pageView: this.companyDialogView,
            });
        },

        //TODO: How to implement a dinamic name for file to download depending of organization
        $_sendToApi() {
            console.log('Hola');
        },

        /**
         * Function to return the AssessmentFilterViewComponent
         */
        $_returnToFilter() {
            this.$router.push({
                name: 'AssessmentFilterViewComponent',
            });
        },
    },
};
</script>

<template>
    <BaseCardViewComponent
        title="Crear Buo Assessment"
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
                        <v-col cols="12" v-if="user.companyId == buoId">
                            <StepViewComponent
                                icon="mdi-numeric-1-circle"
                                description="Selecciona la empresa."
                                iconColor="greenC900"
                                :validate="['requiered']"
                            ></StepViewComponent>
                        </v-col>

                        <v-col cols="12" v-if="user.companyId == buoId">
                            <BaseInputDataTable
                                v-if="setting"
                                :pageView="companyDialogView"
                                label="Buscar empresa"
                                itemText="nombre"
                                :setting="setting"
                                v-model.number="entity.organizacionId"
                                :fnResetConfig="$_setCompanyFilter"
                            />
                        </v-col>

                        <v-col cols="12" class="mb-2">
                            <StepViewComponent
                                :icon="`mdi-numeric-${
                                    user.companyId != buoId ? '1' : '2'
                                }-circle`"
                                description="Realiza el proceso manual en ChatGPT."
                                iconColor="greenC900"
                                font=" BUO-Paragraph-Medium"
                            ></StepViewComponent>
                        </v-col>

                        <v-col cols="12" class="mb-4">
                            <StepViewComponent
                                :icon="`mdi-numeric-${
                                    user.companyId != buoId ? '2' : '3'
                                }-circle`"
                                description="Completa la siguente información relaciona al Buo Assessment."
                                iconColor="greenC900"
                                font="BUO-Paragraph-Medium"
                            ></StepViewComponent>
                        </v-col>

                        <v-col cols="12">
                            <BaseInput
                                label="Nombre"
                                v-model.number="entity.nombre"
                                :validate="['text']"
                                :max="200"
                            />
                        </v-col>

                        <v-col cols="12">
                            <BaseInputTreeview
                                label="Tipo de assessment"
                                v-model.number="entity.tipoPruebaId"
                                itemText="nombre"
                                itemChildren="subTipos"
                                :editText="entity.nombreTipoPrueba"
                                :endpoint="`tipoPrueba/findAllTreeForm/${entity.organizacionId}`"
                                :readonly="!entity.organizacionId"
                                :validate="['requiered']"
                            />
                        </v-col>

                        <v-col cols="12">
                            <BaseTextArea
                                label="Descripción general"
                                v-model.trim="entity.descripcion"
                                :validate="['optionalText']"
                                :max="200"
                                counter="200"
                            />
                        </v-col>

                        <v-col cols="12">
                            <StepViewComponent
                                :icon="`mdi-numeric-${
                                    user.companyId != buoId ? '3' : '4'
                                }-circle`"
                                description="Sube el archivo generado desde ChatGPT o bien copia el resultado de ChatGPT en el área designada."
                                iconColor="greenC900"
                                font="BUO-Paragraph-Medium"
                            ></StepViewComponent>
                        </v-col>

                        <v-col cols="12">
                            <BaseInputFile
                                outlined
                                :fileType="fileType"
                                label="Archivo"
                                showSize
                                appendIcon="mdi-progress-upload"
                                counter
                                placeholder="Arrastra y suelta tu archivo aquí o búscalo"
                                :validate="['optionalFile']"
                                v-model="entity.file"
                                :disabled="!this.entity.organizacionId"
                            />
                        </v-col>

                        <v-col cols="12">
                            <v-divider></v-divider>
                        </v-col>

                        <v-col cols="12">
                            <BaseTextArea
                                label="Resultado de ChatGPT"
                                v-model.trim="entity.descripcion"
                                :validate="['optionalText']"
                                counter
                            />
                        </v-col>
                    </v-row>
                </div>
            </BaseForm>
        </div>
    </BaseCardViewComponent>
</template>

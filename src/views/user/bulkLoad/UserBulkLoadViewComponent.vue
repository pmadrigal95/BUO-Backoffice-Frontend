<script>
/**
 * Descripción: Pantalla Carga Masiva  Usuarios
 *
 * @displayName UserBulkLoadViewComponent
 *
 */

import { mapGetters } from 'vuex';

import baseFnFile from '@/helpers/baseFnFile';

import httpService from '@/services/axios/httpService';

import { baseFilterSettingsHelper } from '@/helpers/baseFilterSettingsHelper';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseInputDataTable = () =>
    import('@/components/core/forms/BaseInputDataTable.vue');

const StepViewComponent = () =>
    import('@/views/user/bulkLoad/components/StepViewComponent.vue');

const BaseInputFile = () => import('@/components/core/forms/BaseInputFile');

export default {
    name: 'UserBulkLoadViewComponent',

    components: {
        BaseCardViewComponent,
        BaseInputDataTable,
        StepViewComponent,
        BaseInputFile,
    },

    data() {
        return {
            loading: false,
            loadingDownload: false,
            file: undefined,
            organizacionId: undefined,
            warningList: undefined,
            fileType: baseFnFile.$_extensionsName.excel,
        };
    },

    computed: {
        ...mapGetters('authentication', ['user', 'buoId']),

        /**
         * Configuracion BaseInputDataTable

         */
        setting() {
            return baseFilterSettingsHelper.$_setCompanySetting({
                isFilter: true,
                singleSelect: true,
            });
        },
    },

    created() {
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
        $_reviewQueryParams() {
            if (this.$router.currentRoute.query.organizacionId) {
                this.organizacionId =
                    this.$router.currentRoute.query.organizacionId;
            }

            if (this.user.companyId != this.buoId) {
                this.organizacionId = this.user.companyId;
            }
        },

        //TODO: How to implement a dinamic name for file to download depending of organization
        $_sendToApi() {
            this.loading = true;
            httpService
                .post(
                    `cargaMasivaEmpleados/addEmployees/${this.organizacionId}`,
                    {
                        excelFile: this.file,
                    }
                )
                .then((response) => {
                    this.loading = false;
                    if (response != undefined) {
                        //Logica JS luego de la acción exitosa!!!
                        this.warningList = response.data.response;
                        this.warningList.length > 0
                            ? this.$refs.popUp.$_openModal()
                            : this.$_returnToFilter();
                    }
                });
        },

        $_getFile() {
            this.loadingDownload = true;
            httpService
                .get(`cargaMasivaEmpleados/getFile/${this.organizacionId}`)
                .then((response) => {
                    this.loadingDownload = false;
                    baseFnFile.$_dowloadFile(
                        response.data.fileEncoded,
                        response.data.fileName,
                        this.fileType
                    );
                });
        },

        /**
         * Function to return the UserFilterViewComponent
         */
        $_returnToFilter() {
            this.$router.back();
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
            :isDrawer="false"
        >
            <div slot="Content">
                <v-card flat height="100%" width="100%">
                    <v-card-title class="BUO-Heading-Small buo-word-break"
                        >Resultados de la carga masiva
                    </v-card-title>
                    <v-card-text>
                        <v-list>
                            <v-list-item
                                v-for="item in warningList"
                                :key="item.id"
                            >
                                <v-list-item-avatar>
                                    <v-icon color="yellowWarning900">
                                        mdi-alert-circle
                                    </v-icon>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title
                                        class="buo-none-word-break buo-white-space BUO-Paragraph-Small mb-3"
                                        >{{
                                            item.descripcion
                                        }}</v-list-item-title
                                    >
                                    <v-divider></v-divider>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>
            </div>
        </BasePopUp>
        <BaseCardViewComponent
            title="Agrega a tus colaboradores"
            :btnAction="$_returnToFilter"
            class="mx-auto"
            md="6"
            offset="3"
        >
            <div slot="card-text">
                <BaseSkeletonLoader v-if="loading" type="article, actions" />
                <BaseForm
                    :method="$_sendToApi"
                    :cancel="$_returnToFilter"
                    v-else
                >
                    <div slot="body">
                        <v-row dense>
                            <v-col cols="12" v-if="user.companyId == buoId">
                                <StepViewComponent
                                    v-if="
                                        !$router.currentRoute.query
                                            .organizacionId
                                    "
                                    icon="mdi-numeric-1-circle"
                                    description="Selecciona la empresa."
                                    iconColor="greenC900"
                                    font="BUO-Paragraph-Medium"
                                    :validate="['requiered']"
                                ></StepViewComponent>
                            </v-col>

                            <v-col cols="12" v-if="user.companyId == buoId">
                                <BaseInputDataTable
                                    v-if="
                                        !$router.currentRoute.query
                                            .organizacionId
                                    "
                                    label="Buscar empresa"
                                    :setting="setting"
                                    v-model.number="organizacionId"
                                />
                            </v-col>

                            <v-col cols="12" class="mb-2">
                                <StepViewComponent
                                    :icon="`mdi-numeric-${
                                        user.companyId != buoId ||
                                        $router.currentRoute.query
                                            .organizacionId
                                            ? '1'
                                            : '2'
                                    }-circle`"
                                    description="Descarga el siguiente archivo Excel."
                                    iconColor="greenC900"
                                    font=" BUO-Paragraph-Medium"
                                ></StepViewComponent>
                            </v-col>

                            <v-col cols="12" class="mb-4">
                                <v-alert color="greenA400" dense>
                                    <v-row align="center">
                                        <v-col class="shrink">
                                            <v-icon large color="greenB800">
                                                mdi-microsoft-excel
                                            </v-icon>
                                        </v-col>
                                        <v-col class="grow">
                                            <h1
                                                class="greenB800--text BUO-Paragraph-Medium"
                                            >
                                                CargaMasivaBUO_template.xlsx
                                            </h1>
                                        </v-col>
                                        <v-col class="shrink">
                                            <v-btn
                                                class="mx-2"
                                                :loading="loadingDownload"
                                                fab
                                                dark
                                                elevation="0"
                                                small
                                                color="greenB800"
                                                @click="$_getFile"
                                                :disabled="!this.organizacionId"
                                            >
                                                <v-icon dark>
                                                    mdi mdi-download
                                                </v-icon>
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-alert>
                            </v-col>

                            <v-col cols="12" class="mb-4">
                                <StepViewComponent
                                    icon="mdi-numeric-3-circle"
                                    description="Edita el mismo archivo con los datos de tus colaboradores, siguiendo el formato del archivo sin alterarlo."
                                    iconColor="greenC900"
                                    font="BUO-Paragraph-Medium"
                                ></StepViewComponent>
                            </v-col>

                            <v-col cols="12">
                                <StepViewComponent
                                    icon="mdi-numeric-4-circle"
                                    description="Sube el archivo editado."
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
                                    :validate="['extension']"
                                    v-model="file"
                                    :disabled="!this.organizacionId"
                                ></BaseInputFile>
                            </v-col>
                        </v-row>
                    </div>
                </BaseForm>
            </div>
        </BaseCardViewComponent>
    </div>
</template>

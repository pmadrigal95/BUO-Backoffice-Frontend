<script>
/**
 * Descripción: Pantalla Carga Masiva  Usuarios
 *
 * @displayName UserBulkLoadViewComponent
 *
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

//import baseFnFile from '@/helpers/baseFnFile';

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
            file: undefined,
            organizacionId: undefined,
            downloadFile: undefined,
            warningList: undefined,
        };
    },

    computed: {
        ...mapGetters('authentication', ['user']),

        /**
         * Configuracion BaseInputDataTable

         */
        setting() {
            return {
                endpoint: 'organizacion/findBy',
                columns: [
                    {
                        text: 'Nombre',
                        align: 'start',
                        value: 'nombre',
                        show: true,
                    },
                    {
                        text: 'Nombre Contacto',
                        align: 'start',
                        value: 'nombreContacto',
                        show: false,
                    },
                    {
                        text: 'Correo Contacto',
                        align: 'start',
                        value: 'correoContacto',
                        show: false,
                    },
                    {
                        text: 'Token Usuario',
                        align: 'start',
                        value: 'tokenUsuario',
                        show: false,
                    },
                    {
                        text: 'Usuarios',
                        align: 'end',
                        value: 'totalUsuarios',
                        show: true,
                    },
                    {
                        text: 'Wallets Activas',
                        align: 'end',
                        value: 'walletsActivas',
                        show: true,
                    },
                    {
                        text: 'Certifica Inmediato',
                        type: 'bool',
                        align: 'center',
                        value: 'certificaInmediato',
                        show: false,
                    },
                    {
                        text: 'Mostrar Puestos Genéricos',
                        type: 'bool',
                        align: 'center',
                        value: 'mostrarPuestosGenericos',
                        show: false,
                    },
                    {
                        text: 'Demo',
                        type: 'bool',
                        align: 'center',
                        value: 'esClienteDemo',
                        show: true,
                    },
                    {
                        text: 'Estado',
                        align: 'center',
                        value: 'nombreEstado',
                        show: true,
                    },
                    {
                        text: 'Industria',
                        align: 'start',
                        value: 'nombreIndustria',
                        show: false,
                    },
                    {
                        text: 'País',
                        align: 'start',
                        value: 'nombrePais',
                        show: false,
                    },
                    {
                        text: 'Ciudad',
                        align: 'start',
                        value: 'ciudad',
                        show: false,
                    },
                    {
                        text: 'Descripción',
                        align: 'start',
                        value: 'descripcion',
                        show: false,
                    },
                ],
                key: 'id',
            };
        },
    },

    created() {
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
         * Body Request
         */

        $_sendToApi() {
            this.loading = true;
            const object = { excel: this.file };
            httpService
                .post(
                    `cargaMasivaEmpleados/addEmployees/${this.organizacionId}`,
                    object
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
            this.loading = true;
            httpService
                .get(`cargaMasivaEmpleados/getFile/${this.organizacionId}`)
                .then((response) => {
                    this.loading = false;
                    /*let textblob = new Blob([response.data], {
                        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    });*/
                    let dwnlnk = document.createElement(response);
                    document.body.appendChild(dwnlnk);
                    dwnlnk.click();
                    dwnlnk.remove();
                });
            /*.then((response) => {
                    this.loading = false;
                    if (response != undefined) {
                        this.downloadFile = response.data;
                        this.$_generateReport(this.downloadFile);
                    }
                });*/
        },

        /**
         * Function to return the UserFilterViewComponent
         */
        $_returnToFilter() {
            this.$router.push({
                name: 'UserFilterViewComponent',
            });
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
            title=""
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
                                        v-text="item.descripcion"
                                    ></v-list-item-title>
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
                            <v-col cols="12">
                                <StepViewComponent
                                    icon="mdi-numeric-1-circle"
                                    description="Selecciona la empresa."
                                    iconColor="greenC900"
                                    font="grey700--text BUO-Paragraph-Medium"
                                ></StepViewComponent>
                            </v-col>

                            <v-col cols="12">
                                <BaseInputDataTable
                                    label="Buscar empresa"
                                    :setting="setting"
                                    v-model.number="organizacionId"
                                    :validate="['text']"
                                />
                            </v-col>

                            <v-col cols="12" class="mb-2" v-if="false">
                                <StepViewComponent
                                    icon="mdi-numeric-2-circle"
                                    description="Descarga el siguiente archivo Excel."
                                    iconColor="greenC900"
                                    font="grey700--text BUO-Paragraph-Medium"
                                ></StepViewComponent>
                            </v-col>

                            <v-col cols="12" class="mb-4" v-if="false">
                                <v-alert color="greenA400" dense>
                                    <v-row align="center">
                                        <v-col class="shrink">
                                            <v-icon large color="greenB800">
                                                mdi mdi-microsoft-excel
                                            </v-icon>
                                        </v-col>
                                        <v-col class="grow">
                                            <h1
                                                class="greenB800--text BUO-Paragraph-Medium"
                                            >
                                                Colaboradores.xlsx
                                            </h1>
                                        </v-col>
                                        <v-col class="shrink">
                                            <v-btn
                                                class="mx-2"
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
                                    icon="mdi-numeric-2-circle"
                                    description="Edita el mismo archivo con los datos de tus colaboradores, siguiendo el formato del archivo sin alterarlo."
                                    iconColor="greenC900"
                                    font="grey700--text BUO-Paragraph-Medium"
                                ></StepViewComponent>
                            </v-col>

                            <v-col cols="12">
                                <StepViewComponent
                                    icon="mdi-numeric-3-circle"
                                    description="Sube el archivo editado."
                                    iconColor="greenC900"
                                    font="grey700--text BUO-Paragraph-Medium"
                                ></StepViewComponent>
                            </v-col>

                            <v-col cols="12">
                                <BaseInputFile
                                    outlined
                                    fileType="excel"
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

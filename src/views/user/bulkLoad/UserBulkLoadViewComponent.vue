<script>
/**
 * Descripción: Pantalla Carga Masiva  Usuarios
 *
 * @displayName UserBulkLoadViewComponent
 *
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper';

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
            entity: this.$_Object(),
            loading: false,
        };
    },

    computed: {
        ...mapGetters('authentication', ['user']),

        statusList() {
            return [
                { product: 'Activo', value: 2 },
                { product: 'Inactivo', value: 1 },
            ];
        },

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
        /**
         * Determinar si Es nuevo / editor
         */
        this.$_getObject();

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
                nombre: undefined,
                primerApellido: undefined,
                segundoApellido: undefined,
                identificacion: undefined,
                paisId: undefined,
                ciudad: undefined,
                correo: undefined,
                username: undefined,
                generoId: undefined,
                fechaNacimiento: undefined,
                telefono: undefined,
                nombreOrganizacion: undefined,
                organizacionId: undefined,
                estadoId: 2,
                usuarioModificaId: undefined,
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
                httpService.get(`user/${data}`).then((response) => {
                    this.loading = false;
                    if (response != undefined) {
                        // Encontro la entidad
                        this.entity = BaseArrayHelper.SetObject(
                            {},
                            response.data
                        );

                        this.entity.fechaNacimiento =
                            baseSharedFnHelper.$_parseArrayToDateISOString(
                                this.entity.fechaNacimiento
                            );
                    }
                });
            }
        },

        $_setToUser() {
            this.entity.usuarioModificaId = this.user.userId;
        },

        $_sendToApi() {
            this.loading = true;
            this.$_setToUser();
            let object = BaseArrayHelper.SetObject({}, this.entity);

            httpService.post('user/saveUserForm', object).then((response) => {
                this.loading = false;

                if (response != undefined) {
                    //Logica JS luego de la acción exitosa!!!
                    this.$_returnToFilter();
                }
            });
        },

        /**
         * Function to return the UserFilterViewComponent
         */
        $_returnToFilter() {
            this.$router.push({
                name: 'UserFilterViewComponent',
            });
        },

        $_fnTest() {
            alert('hola');
        },
    },
};
</script>

<template>
    <BaseCardViewComponent
        title="Agrega a tus colaboradores"
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
                        <v-col cols="12" class="mb-2">
                            <StepViewComponent
                                icon="mdi-numeric-1-circle"
                                description="Descarga el siguiente archivo Excel."
                                iconColor="#54ABB0"
                                font="grey700--text BUO-Paragraph-Medium"
                            ></StepViewComponent>
                        </v-col>

                        <v-col cols="12" class="mb-4">
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
                                            Nombre documento.xlsx
                                        </h1>
                                    </v-col>
                                    <v-col class="shrink">
                                        <v-btn
                                            class="mx-2"
                                            fab
                                            dark
                                            small
                                            color="greenB800"
                                            @click="$_fnTest"
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
                                iconColor="#54ABB0"
                                font="grey700--text BUO-Paragraph-Medium"
                            ></StepViewComponent>
                        </v-col>

                        <v-col cols="12">
                            <StepViewComponent
                                icon="mdi-numeric-3-circle"
                                description="Selecciona la empresa."
                                iconColor="#54ABB0"
                                font="grey700--text BUO-Paragraph-Medium"
                            ></StepViewComponent>
                        </v-col>

                        <v-col cols="12">
                            <BaseInputDataTable
                                label="Buscar empresa"
                                :setting="setting"
                                :editText="entity.nombreOrganizacion"
                                v-model.number="entity.organizacionId"
                            />
                        </v-col>

                        <v-col cols="12">
                            <StepViewComponent
                                icon="mdi-numeric-4-circle"
                                description="Sube el archivo editado."
                                iconColor="#54ABB0"
                                font="grey700--text BUO-Paragraph-Medium"
                            ></StepViewComponent>
                        </v-col>

                        <v-col cols="12">
                            <BaseInputFile></BaseInputFile>
                        </v-col>
                    </v-row>
                </div>
            </BaseForm>
        </div>
    </BaseCardViewComponent>
</template>

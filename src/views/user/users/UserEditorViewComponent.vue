<script>
/**
 * Descripción: Pantalla Editor Usuarios
 *
 * @displayName UserEditorViewComponent
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

const BaseDatePicker = () => import('@/components/core/forms/BaseDatePicker');

export default {
    name: 'UserEditorViewComponent',

    components: {
        BaseCardViewComponent,
        BaseDatePicker,
        BaseInputDataTable,
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
    },
};
</script>

<template>
    <BaseCardViewComponent
        title="Usuarios"
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
                                label="Nombre"
                                v-model.trim="entity.nombre"
                                :validate="['text']"
                            />
                        </v-col>

                        <v-col cols="12">
                            <BaseInput
                                label="Primer apellido"
                                v-model.trim="entity.primerApellido"
                                :validate="['text']"
                            />
                        </v-col>

                        <v-col cols="12">
                            <BaseInput
                                label="Segundo apellido"
                                v-model.trim="entity.segundoApellido"
                                :validate="['optionalText']"
                            />
                        </v-col>

                        <v-col cols="12">
                            <BaseInput
                                label="Identificación"
                                v-model.trim="entity.identificacion"
                                :validate="['optionalText']"
                            />
                        </v-col>

                        <v-col cols="12">
                            <BaseSelect
                                label="País"
                                endpoint="pais/list"
                                itemText="nombre"
                                itemValue="id"
                                v-model.number="entity.paisId"
                                :validate="['optionalText']"
                            />
                        </v-col>

                        <v-col cols="12">
                            <BaseInput
                                label="Ciudad"
                                v-model.trim="entity.ciudad"
                                :validate="['optionalText']"
                            />
                        </v-col>

                        <v-col cols="12">
                            <BaseInput
                                label="Correo electrónico"
                                v-model.trim="entity.correo"
                                :validate="['email']"
                            />
                        </v-col>

                        <v-col cols="12">
                            <BaseInput
                                label="Username"
                                v-model.trim="entity.username"
                                :validate="['email']"
                            />
                        </v-col>

                        <v-col cols="12">
                            <BaseSelect
                                label="Género"
                                endpoint="genero/list"
                                itemText="nombre"
                                itemValue="id"
                                v-model.number="entity.generoId"
                                :validate="['optionalText']"
                            />
                        </v-col>

                        <v-col cols="12">
                            <BaseDatePicker
                                label="Fecha de nacimiento"
                                appendIcon="mdi-calendar-month"
                                v-model.trim="entity.fechaNacimiento"
                                :validate="['optionalText']"
                                reqCurrentMaxDate
                            />
                        </v-col>

                        <v-col cols="12">
                            <BaseInput
                                label="Número de teléfono"
                                v-model.trim="entity.telefono"
                                :validate="['optionalText']"
                            />
                        </v-col>

                        <v-col cols="12">
                            <BaseInputDataTable
                                label="Empresa"
                                :setting="setting"
                                :editText="entity.nombreOrganizacion"
                                v-model.number="entity.organizacionId"
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

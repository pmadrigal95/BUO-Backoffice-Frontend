<script>
/**
 * Descripción: Pantalla Editor Empresas
 *
 * @displayName CompanyEditorViewComponent
 *
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

export default {
    name: 'CompanyEditorViewComponent',

    components: {
        BaseCardViewComponent,
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
                { name: 'Activo', id: 2 },
                { name: 'Inactivo', id: 1 },
                { name: 'Empresa no registrada', id: 8 },
            ];
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
                descripcion: undefined,
                estadoId: 2,
                certificaInmediato: false,
                industriaId: undefined,
                paisId: undefined,
                ciudad: undefined,
                nombreContacto: undefined,
                correoContacto: undefined,
                mostrarPuestosGenericos: false,
                esClienteDemo: false,
                tokenUsuario: undefined,
                usuarioId: undefined,
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
                httpService.get(`organizacion/${data}`).then((response) => {
                    this.loading = false;
                    if (response != undefined) {
                        // Encontro la entidad
                        console.log(response.data);
                        this.entity = BaseArrayHelper.SetObject(
                            {},
                            response.data
                        );
                    }
                });
            }
        },

        $_fnSetToUser() {
            this.entity.usuarioId = this.user.userId;
        },

        $_sendToApi() {
            this.loading = true;

            this.$_fnSetToUser();

            let object = BaseArrayHelper.SetObject({}, this.entity);

            httpService
                .post('organizacion/saveForm', object)
                .then((response) => {
                    this.loading = false;
                    if (response != undefined) {
                        //Logica JS luego de la acción exitosa!!!
                        this.$_returnToFilter();
                    }
                });
        },

        /**
         * Function to return the CompanyFilterViewComponent
         */
        $_returnToFilter() {
            this.$router.push({
                name: 'CompanyFilterViewComponent',
            });
        },
    },
};
</script>

<template>
    <BaseCardViewComponent
        title="Empresas"
        subtitle="Datos Generales"
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
                        <v-col cols="12">
                            <BaseInput
                                label="Nombre de la Empresa"
                                v-model.trim="entity.nombre"
                                :validate="['text']"
                            />
                        </v-col>

                        <v-col cols="12">
                            <BaseSelect
                                label="Industría"
                                endpoint="industria/getAllActive"
                                itemText="nombre"
                                itemValue="id"
                                v-model="entity.industriaId"
                                :validate="['optionalText']"
                            />
                        </v-col>

                        <v-col cols="12">
                            <BaseSelect
                                label="País"
                                endpoint="pais/list"
                                itemText="nombre"
                                itemValue="id"
                                v-model="entity.paisId"
                                :validate="['text']"
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
                                label="Nombre del representante"
                                v-model.trim="entity.nombreContacto"
                                :validate="['text']"
                            />
                        </v-col>

                        <v-col cols="12">
                            <BaseInput
                                label="Correo del representante"
                                v-model.trim="entity.correoContacto"
                                :validate="['email']"
                            />
                        </v-col>

                        <v-col cols="12">
                            <BaseInput
                                label="Cantidad Tokens"
                                v-model.number="entity.tokenUsuario"
                                :validate="['optionalNumber']"
                            />
                        </v-col>

                        <v-col cols="12">
                            <BaseTextArea
                                label="Descripción general de la actividad"
                                v-model.trim="entity.descripcion"
                                :validate="['optionalText']"
                                :max="200"
                                counter="200"
                            />
                        </v-col>

                        <v-col cols="12">
                            <BaseSwitch
                                label="Es Certificado Inmediato"
                                v-model="entity.certificaInmediato"
                            />
                        </v-col>

                        <v-col cols="12">
                            <BaseSwitch
                                label="Mostrar puestos genéricos"
                                v-model="entity.mostrarPuestosGenericos"
                            />
                        </v-col>

                        <v-col cols="12">
                            <BaseSwitch
                                label="Es cliente demo"
                                v-model="entity.esClienteDemo"
                            />
                        </v-col>

                        <v-col cols="12">
                            <BaseRadioGroup
                                v-model="entity.estadoId"
                                :endpoint="statusList"
                                :validate="['requiered']"
                            />
                        </v-col>
                    </v-row>
                </div>
            </BaseForm>
        </div>
    </BaseCardViewComponent>
</template>

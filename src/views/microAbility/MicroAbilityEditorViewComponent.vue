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

        /**
         * Extra Params
         */
        extraParams() {
            return this.entity.organizacionId
                ? [
                      {
                          name: 'organizacionId',
                          value: this.entity.organizacionId,
                      },
                  ]
                : undefined;
        },

        /**
         * Configuracion BaseInputDataTable
         */
        companySetting() {
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
                        show: true,
                    },
                    {
                        text: 'Correo Contacto',
                        align: 'start',
                        value: 'correoContacto',
                        show: true,
                    },
                    {
                        text: 'Token Colaborador',
                        align: 'start',
                        value: 'tokenUsuario',
                        show: false,
                    },
                    {
                        text: 'Colaboradores',
                        align: 'end',
                        value: 'totalUsuarios',
                        show: false,
                    },
                    {
                        text: 'Wallets Activas',
                        align: 'end',
                        value: 'walletsActivas',
                        show: false,
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

        /**
         * Configuracion BaseServerDataTable
         */
        abilitySetting() {
            return {
                endpoint: 'cualificacion/findBy',
                columns: [
                    {
                        text: 'Definición',
                        align: 'start',
                        value: 'definicion',
                        show: true,
                    },
                    {
                        text: 'Descripción',
                        align: 'start',
                        value: 'otroNombre',
                        show: false,
                    },
                    {
                        text: 'Propósito',
                        align: 'start',
                        value: 'proposito',
                        show: false,
                    },
                    {
                        text: 'Ámbito Ocupacional',
                        align: 'start',
                        value: 'ambitoOcupacional',
                        show: false,
                    },
                    {
                        text: 'Link',
                        align: 'start',
                        value: 'link',
                        show: false,
                    },
                    {
                        text: 'interna',
                        type: 'bool',
                        align: 'center',
                        value: 'esInterna',
                        show: true,
                    },
                    {
                        text: 'Categoría',
                        align: 'start',
                        value: 'nombreCategoria',
                        show: true,
                    },
                    {
                        text: 'Categoría Superior',
                        align: 'start',
                        value: 'nombreCategoriaPadre',
                        show: false,
                    },
                    {
                        text: 'Empresa',
                        align: 'start',
                        value: 'nombreOrganizacion',
                        show: false,
                    },
                    {
                        text: 'Tipo',
                        align: 'start',
                        value: 'nombreTipoCualificacion',
                        show: false,
                    },
                    {
                        text: 'Estado',
                        align: 'center',
                        value: 'nombreEstado',
                        show: true,
                    },
                    {
                        text: 'Modificado Por',
                        align: 'start',
                        value: 'nombreUsuarioModifica',
                        show: false,
                    },
                ],
                key: 'id',
            };
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

        this.$_setValues();

        this.$_reviewQueryParams();
    },

    destroyed() {
        this.$vuetify.theme.themes.light.background =
            this.$vuetify.theme.themes.light.clouds;
    },

    methods: {
        /**
         * Force Update Component
         */
        $_forceUpdateComponente() {
            this.entity.definicionCualificacion = undefined;
            this.entity.cualificacionId = undefined;
            this.componentKey = this.componentKey + 1;
        },

        $_reviewQueryParams() {
            console.log(this.$router.currentRoute.query);

            if (this.$router.currentRoute.query.cualificacionId) {
                this.entity.cualificacionId =
                    this.$router.currentRoute.query.cualificacionId;
            }

            if (this.$router.currentRoute.query.organizacionId) {
                this.entity.organizacionId =
                    this.$router.currentRoute.query.organizacionId;
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

        $_setValues() {
            this.entity.organizacionId = this.$_reviewCompany();
        },

        $_reviewCompany() {
            let result,
                data = this.$router.currentRoute.params.Id;
            if (data) {
                result = this.entity.organizacionId;
            } else {
                if (this.user.companyId != this.buoId)
                    result = this.user.companyId;
            }

            return result;
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
        title="Micro Habilidad"
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
                                :setting="companySetting"
                                :editText="entity.nombreOrganizacion"
                                v-model.number="entity.organizacionId"
                                :validate="['requiered']"
                                v-if="
                                    !$router.currentRoute.query.organizacionId
                                "
                            />
                        </v-col>
                        <v-col cols="12">
                            <BaseInputDataTable
                                label="Habilidad"
                                :extraParams="extraParams"
                                :readonly="extraParams == undefined"
                                :setting="abilitySetting"
                                :editText="entity.definicionCualificacion"
                                v-model.number="entity.cualificacionId"
                                :validate="['requiered']"
                                :key="componentKey"
                                v-if="
                                    !$router.currentRoute.query.cualificacionId
                                "
                            />
                        </v-col>
                        <v-col cols="12">
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

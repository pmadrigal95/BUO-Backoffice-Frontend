<script>
/**
 * Descripción: Pantalla Editor Tipo de Assessments
 *
 * @displayName AssessmentTypeEditorViewComponent
 *
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

import { baseFilterSettingsHelper } from '@/helpers/baseFilterSettingsHelper';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseInputDataTable = () =>
    import('@/components/core/forms/BaseInputDataTable');

const BaseInputTreeview = () =>
    import('@/components/core/treeview/BaseInputTreeview');

export default {
    name: 'AssessmentTypeEditorViewComponent',

    components: {
        BaseInputTreeview,
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

        /**
         * Configuracion BaseInputDataTable
         */
        companySetting() {
            return baseFilterSettingsHelper.$_setCompanySetting({
                isFilter: true,
                singleSelect: true,
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
                    this.entity.padreId = undefined;
                }
            },
            immediate: true,
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
        /**
         * Entity Object
         */
        $_Object() {
            return {
                id: undefined,
                padreId: undefined,
                nombrePadre: undefined,
                nombre: undefined,
                descripcion: undefined,
                esInterna: undefined,
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
                httpService.get(`tipoPrueba/${data}`).then((response) => {
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
            let object = BaseArrayHelper.SetObject({}, this.entity);

            httpService.post('tipoPrueba/save', object).then((response) => {
                this.loading = false;

                if (response != undefined) {
                    //Logica JS luego de la acción exitosa!!!
                    this.$_returnToFilter();
                }
            });
        },

        /**
         * Function to return the AssessmentTypeFilterViewComponent
         */
        $_returnToFilter() {
            this.$router.back();
        },
    },
};
</script>

<template>
    <BaseCardViewComponent
        title="Tipos de assessments"
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
                                :setting="companySetting"
                                :editText="entity.nombreOrganizacion"
                                v-model.number="entity.organizacionId"
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
                            <BaseInputTreeview
                                label="Nivel Superior"
                                v-model.number="entity.padreId"
                                :editText="entity.nombrePadre"
                                :readonly="!entity.organizacionId"
                                itemText="nombre"
                                itemChildren="subTipos"
                                :endpoint="`tipoPrueba/findAllTreeForm/${entity.organizacionId}`"
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
                        <v-col cols="12" v-if="user.companyId === buoId">
                            <BaseSwitch
                                :disabled="user.companyId != buoId"
                                label="Interna"
                                v-model="entity.esInterna"
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

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

import {
    baseFilterSettingsHelper,
    baseDataTableColumnsHelper,
} from '@/helpers/baseFilterSettingsHelper';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseInputDataTable = () =>
    import('@/components/core/forms/BaseInputDataTable.vue');

const BaseDatePicker = () => import('@/components/core/forms/BaseDatePicker');

const BaseInputTreeview = () =>
    import('@/components/core/treeview/BaseInputTreeview');

export default {
    name: 'UserEditorViewComponent',

    components: {
        BaseDatePicker,
        BaseInputTreeview,
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

        ...mapGetters('filters', [
            'advfiltersBypageView',
            'dialogViewById',
            'filtersBypageView',
            'pageViewById',
        ]),

        companyDialogView() {
            return this.dialogViewById('companyDialog');
        },

        securityDialogView() {
            return this.pageViewById('securityFilter');
        },

        /**
         * Configuracion BaseInputDataTable

         */
        settingOrganization() {
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
        settingRole() {
            return baseFilterSettingsHelper.$_setSecuritySetting({
                isFilter: true,
                singleSelect: false,
                list: this.filtersBypageView(this.securityDialogView),
                pageView: this.securityDialogView,
            });
        },

        /**
         * Extra Params
         */
        extraParams() {
            return baseFilterSettingsHelper.$_setExtraParams({
                companyId: this.entity.organizacionId,
            });
        },

        userTypeList() {
            return [
                { name: 'Normal', id: 0 },
                { name: 'Super administrador', id: 1 },
                { name: 'Administrador de empresa', id: 2 },
            ];
        },
    },

    created() {
        /**
         * Determinar si Es nuevo / editor
         */
        this.$_getObject();

        this.$_reviewQueryParams();

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
                    this.entity.departamentoId = undefined;
                    this.entity.perfilIds = undefined;
                    this.componentKey++;
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
                nombreDepartamento: undefined,
                departamentoId: undefined,
                estadoId: 2,
                tipoUsuarioId: 0,
                usuarioModificaId: undefined,
                perfilIds: undefined,
                fechaIngreso: undefined,
                fechaTerminacion: undefined,
                esRenuncia: false,
            };
        },

        $_reviewQueryParams() {
            if (this.$router.currentRoute.query.organizacionId) {
                this.entity.organizacionId =
                    this.$router.currentRoute.query.organizacionId;
            }

            if (this.user.companyId != this.buoId) {
                this.entity.organizacionId = this.user.companyId;
            }
        },

        $_setToUser() {
            this.entity.usuarioModificaId = this.user.userId;
        },

        $_setRoleListToEditor() {
            this.entity.roleNames =
                this.entity?.perfilList &&
                this.entity?.perfilList.map((x) => {
                    return { id: x.id, nombre: x.nombre };
                });
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

                        this.entity.fechaIngreso =
                            baseSharedFnHelper.$_parseArrayToDateISOString(
                                this.entity.fechaIngreso
                            );

                        this.entity.fechaTerminacion =
                            baseSharedFnHelper.$_parseArrayToDateISOString(
                                this.entity.fechaTerminacion
                            );

                        this.$_setRoleListToEditor();
                    }
                });
            }
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
            this.$router.back();
        },
    },
};
</script>

<template>
    <BaseCardViewComponent
        title="Colaborador"
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
                            />
                        </v-col>

                        <v-col cols="12">
                            <BaseInput
                                label="Identificación"
                                v-model.trim="entity.identificacion"
                            />
                        </v-col>

                        <v-col cols="12">
                            <BaseSelect
                                label="País"
                                endpoint="pais/list"
                                itemText="nombre"
                                itemValue="id"
                                v-model.number="entity.paisId"
                            />
                        </v-col>

                        <v-col cols="12">
                            <BaseInput
                                label="Ciudad"
                                v-model.trim="entity.ciudad"
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
                            />
                        </v-col>

                        <v-col cols="12">
                            <BaseDatePicker
                                label="Fecha de nacimiento"
                                appendIcon="mdi-calendar-month"
                                v-model.trim="entity.fechaNacimiento"
                                reqCurrentMaxDate
                            />
                        </v-col>

                        <v-col cols="12">
                            <BaseInput
                                label="Número de teléfono"
                                v-model.trim="entity.telefono"
                            />
                        </v-col>

                        <v-col cols="12" v-if="user.companyId === buoId">
                            <BaseInputDataTable
                                v-if="
                                    !$router.currentRoute.query
                                        .organizacionId && settingOrganization
                                "
                                label="Empresa"
                                itemText="nombre"
                                :setting="settingOrganization"
                                :pageView="companyDialogView"
                                :editText="entity.nombreOrganizacion"
                                v-model.number="entity.organizacionId"
                                :fnResetConfig="$_setCompanyFilter"
                            />
                        </v-col>

                        <v-col cols="12">
                            <BaseInputTreeview
                                label="Área / Departamento"
                                v-model.number="entity.departamentoId"
                                :editText="entity.nombreDepartamento"
                                :readonly="!entity.organizacionId"
                                itemText="nombre"
                                itemChildren="subDepartamentos"
                                :endpoint="`departamento/findAllTree/${entity.organizacionId}`"
                            />
                        </v-col>

                        <v-col cols="12">
                            <BaseInputDataTable
                                label="Permisos"
                                v-if="settingRole"
                                :pageView="securityDialogView"
                                :setting="settingRole"
                                :extraParams="extraParams"
                                itemText="nombre"
                                :readonly="extraParams.length == 0"
                                :editText="entity.roleNames"
                                v-model="entity.perfilIds"
                                :key="componentKey"
                            />
                        </v-col>

                        <v-col cols="12" v-if="user.companyId === buoId">
                            <BaseRadioGroup
                                label="Tipo de usuario"
                                v-model="entity.tipoUsuarioId"
                                :endpoint="userTypeList"
                            />
                        </v-col>

                        <v-col cols="12">
                            <BaseDatePicker
                                label="Fecha de ingreso"
                                appendIcon="mdi-calendar-month"
                                v-model.trim="entity.fechaIngreso"
                                :max="entity.fechaTerminacion"
                                reqCurrentMaxDate
                            />
                        </v-col>

                        <v-col cols="12">
                            <BaseDatePicker
                                label="Fecha de salida"
                                appendIcon="mdi-calendar-month"
                                v-model.trim="entity.fechaTerminacion"
                                :min="entity.fechaIngreso"
                            />
                        </v-col>

                        <v-col cols="12">
                            <BaseSwitch
                                label="Renuncia"
                                v-model="entity.esRenuncia"
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

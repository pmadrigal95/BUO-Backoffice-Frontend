<script>
/**
 * Descripción: Pantalla Editor Departamentos
 *
 * @displayName DepartmentEditorViewComponent
 *
 */

import { mapGetters, mapActions } from 'vuex';

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
    name: 'DepartmentEditorViewComponent',

    components: {
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

        ...mapGetters('filters', ['advfiltersBypageView', 'dialogViewById']),

        companyDialogView() {
            return this.dialogViewById('companyDialog');
        },

        userDialogView() {
            return this.dialogViewById('userDialog');
        },

        /**
         * Extra Params
         */
        extraParams() {
            return baseFilterSettingsHelper.$_setExtraParams({
                companyId: this.entity.organizacionId,
            });
        },

        /**
         * Configuracion BaseInputDataTable
         */
        companySetting() {
            return this.advfiltersBypageView(this.companyDialogView);
        },

        /**
         * Configuracion BaseServerDataTable
         */
        userSetting() {
            return this.advfiltersBypageView(this.userDialogView);
        },
    },

    created() {
        /**
         * Determinar si Es nuevo / editor
         */
        this.$_getObject();

        this.$_reviewQueryParams();

        this.$_setFilter();

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
                    this.$_forceUpdateComponente();
                }
            },
            immediate: true,
        },
    },

    methods: {
        ...mapActions('filters', ['$_set_advfilter']),

        $_setCompanyFilter() {
            const dialogView = this.advfiltersBypageView(
                this.companyDialogView
            );

            if (!dialogView) {
                this.$_set_advfilter({
                    [this.companyDialogView]:
                        baseFilterSettingsHelper.$_setCompanySetting({
                            isFilter: true,
                            singleSelect: true,
                        }),
                });
            }
        },

        $_setUserFilter() {
            const dialogView = this.advfiltersBypageView(this.userDialogView);

            if (!dialogView) {
                this.$_set_advfilter({
                    [this.userDialogView]:
                        baseFilterSettingsHelper.$_setUserSetting({
                            companyId: this.user.companyId,
                            isFilter: true,
                            singleSelect: false,
                        }),
                });
            }
        },

        $_setFilter() {
            this.$_setCompanyFilter();
            this.$_setUserFilter();
        },

        /**
         * Force Update Component
         */
        $_forceUpdateComponente() {
            this.entity.padreId = undefined;
            this.entity.usuarioAdminIds = undefined;
            this.componentKey = this.componentKey + 1;
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

        /**
         * Entity Object
         */
        $_Object() {
            return {
                id: 0,
                nombre: undefined,
                padreId: undefined,
                organizacionId: undefined,
                descripcion: undefined,
                etiquetaNivel: undefined,
                estadoId: 2,
                usuarioAdminIds: undefined,
                usuarioModificaId: undefined,
            };
        },

        $_setToUser() {
            this.entity.usuarioModificaId = this.user.userId;
        },

        $_setAdminUserListToEditor() {
            this.entity.usuarioAdminNames =
                this.entity?.adminsDepartamento &&
                this.entity?.adminsDepartamento.map((x) => {
                    return { id: x.usuarioId, nombreCompleto: x.nombre };
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
                httpService.get(`departamento/${data}`).then((response) => {
                    this.loading = false;
                    if (response != undefined) {
                        // Encontro la entidad
                        this.entity = BaseArrayHelper.SetObject(
                            {},
                            response.data
                        );

                        this.$_setAdminUserListToEditor();
                    }
                });
            }
        },

        $_sendToApi() {
            this.loading = true;
            this.$_setToUser();
            let object = BaseArrayHelper.SetObject({}, this.entity);

            httpService.post('departamento/save', object).then((response) => {
                if (response != undefined) {
                    //Logica JS luego de la acción exitosa!!!
                    this.$_returnToFilter();
                }

                this.loading = false;
            });
        },

        /**
         * Function to return the PromotionalCodesFilterViewComponent
         */
        $_returnToFilter() {
            this.$router.back();
        },
    },
};
</script>

<template>
    <BaseCardViewComponent
        title="Área / Departamento"
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
                                v-if="
                                    !$router.currentRoute.query
                                        .organizacionId && companySetting
                                "
                                :pageView="companyDialogView"
                                label="Empresa"
                                :setting="companySetting"
                                :editText="entity.nombreOrganizacion"
                                v-model.number="entity.organizacionId"
                                :fnResetConfig="$_setCompanyFilter"
                            />
                        </v-col>
                        <v-col cols="12">
                            <BaseInput
                                label="Nivel"
                                :max="50"
                                v-model.number="entity.etiquetaNivel"
                                :validate="['optionalText']"
                            />
                        </v-col>
                        <v-col cols="12">
                            <BaseInput
                                label="Nombre"
                                v-model.number="entity.nombre"
                                :validate="['text']"
                            />
                        </v-col>
                        <v-col cols="12">
                            <BaseInputTreeview
                                label="Área / Departamento"
                                v-model.number="entity.padreId"
                                :editText="entity.nombrePadre"
                                :readonly="!entity.organizacionId"
                                itemText="nombre"
                                itemChildren="subDepartamentos"
                                :endpoint="`departamento/findAllTree/${entity.organizacionId}`"
                            />
                        </v-col>
                        <v-col cols="12">
                            <BaseInputDataTable
                                label="Administrador"
                                v-if="userSetting"
                                :pageView="userDialogView"
                                :setting="userSetting"
                                :extraParams="extraParams"
                                itemText="nombreCompleto"
                                :readonly="extraParams.length == 0"
                                :editText="entity.usuarioAdminNames"
                                v-model="entity.usuarioAdminIds"
                                :key="componentKey"
                                :fnResetConfig="$_setUserFilter"
                            />
                        </v-col>
                        <v-col cols="12">
                            <BaseTextArea
                                label="Descripción general"
                                v-model.trim="entity.descripcion"
                                :validate="['optionalText']"
                                :max="250"
                                counter="250"
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

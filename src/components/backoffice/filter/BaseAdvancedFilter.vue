<script>
/**
 * Descripción: Filtros Avanzados
 *
 * @displayName BaseAdvancedFilter
 */

import { mapGetters, mapActions } from 'vuex';

import { baseFilterSettingsHelper } from '@/helpers/baseFilterSettingsHelper';

const BaseInputDataTable = () =>
    import('@/components/core/forms/BaseInputDataTable');

const BaseInputTreeview = () =>
    import('@/components/core/treeview/BaseInputTreeview');

export default {
    name: 'BaseAdvancedFilter',

    props: {
        show: {
            type: Boolean,
            default: true,
        },

        title: {
            type: String,
            default: undefined,
        },

        requiredCompany: {
            type: Boolean,
            default: true,
        },

        isDepartment: {
            type: Boolean,
            default: false,
        },

        isIndicator: {
            type: Boolean,
            default: false,
        },

        isUser: {
            type: Boolean,
            default: false,
        },

        isIndicatorCategory: {
            type: Boolean,
            default: false,
        },

        isAssessmentType: {
            type: Boolean,
            default: false,
        },

        assessmentTypeEndpoint: {
            type: String,
            default: 'findAllTreeForm',
        },

        isAssessment: {
            type: Boolean,
            default: false,
        },

        requiredResetStep: {
            type: Boolean,
            default: false,
        },

        /**
         * V-model
         */
        value: {
            type: Object,
            required: true,
        },
    },

    components: {
        BaseInputDataTable,
        BaseInputTreeview,
    },

    data() {
        return {
            temp: this.$_Object(),
            componentKey: 0,
            filterKey: 0,
            companyKey: 0,
            assessmentKey: 0,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        ...mapGetters('authentication', ['user', 'buoId']),

        ...mapGetters('filters', ['advfiltersBypageView', 'dialogViewById']),

        companyDialogView() {
            return this.dialogViewById('companyDialog');
        },

        userDialogView() {
            return this.dialogViewById('userDialog');
        },

        abilityDialogView() {
            return this.dialogViewById('abilityDialog');
        },

        assessmentDialogView() {
            return this.dialogViewById('assessmentDialog');
        },

        /**
         * Extra Params
         */
        extraParams() {
            return baseFilterSettingsHelper.$_setExtraParams({
                companyId: this.temp.companyId,
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

        /**
         * Configuracion BaseServerDataTable
         */
        abilitySetting() {
            return this.advfiltersBypageView(this.abilityDialogView);
        },

        /**
         * Configuracion BaseServerDataTable
         */
        assessmentSetting() {
            return this.advfiltersBypageView(this.assessmentDialogView);
        },
    },

    created() {
        this.$_clean();
        this.$_setFilter();
    },

    watch: {
        'temp.companyId': {
            handler(newValue, oldValue) {
                if (oldValue != newValue) {
                    this.$_cleanFilter();
                }
            },
            immediate: true,
        },

        /**
         * Actualizar
         */
        'temp.departmentId': {
            handler(newValue, oldValue) {
                if (oldValue != newValue) {
                    this.$_cleanFilter(false);
                }
            },
            immediate: true,
        },

        /**
         * Actualizar
         */
        'temp.assessmentTypeId': {
            handler(newValue, oldValue) {
                if (oldValue != newValue) {
                    this.temp.assessmentId = undefined;
                    this.assessmentKey++;
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
                            departmentId: this.temp.departmentId,
                            isFilter: true,
                            singleSelect: false,
                        }),
                });
            }
        },

        $_setAbilityFilter() {
            const dialogView = this.advfiltersBypageView(
                this.abilityDialogView
            );

            if (!dialogView) {
                this.$_set_advfilter({
                    [this.abilityDialogView]:
                        baseFilterSettingsHelper.$_setAbilitySetting({
                            companyId: this.user.companyId,
                            method: 'cualificacion/findByFilter',
                            isFilter: true,
                            singleSelect: false,
                        }),
                });
            }
        },

        $_setAssessmentFilter() {
            const dialogView = this.advfiltersBypageView(
                this.assessmentDialogView
            );

            if (!dialogView) {
                this.$_set_advfilter({
                    [this.assessmentDialogView]:
                        baseFilterSettingsHelper.$_setAssessmentSetting({
                            apiEndpoint: 'findByDeepWithDefault',
                            companyId: this.user.companyId,
                            assessmentTypeId: this.temp.assessmentTypeId,
                            isFilter: true,
                            singleSelect: true,
                        }),
                });
            }
        },

        $_setFilter() {
            this.$_setCompanyFilter();
            this.$_setUserFilter();
            this.$_setAbilityFilter();
            this.$_setAssessmentFilter();
        },

        /**
         * Entity Object
         */
        $_Object() {
            return {
                companyId: undefined,
                departmentId: undefined,
                userId: undefined,
                indicatorId: undefined,
                categoryId: undefined,
                assessmentTypeId: undefined,
                assessmentId: undefined,
            };
        },

        $_setCompanyDefault() {
            this.temp.companyId = this.user.companyId;
            this.temp.companyName = this.user.companyName;
        },

        $_reviewCompanyId() {
            this.temp.companyId = undefined;
            this.temp.companyName = undefined;

            if (this.requiredCompany) {
                this.$_setCompanyDefault();
            }

            if (this.user.companyId != this.buoId) {
                this.$_setCompanyDefault();
            }
        },

        $_setParams() {
            this.value.companyId = this.temp.companyId;

            if (this.isDepartment) {
                this.value.departmentId = this.temp.departmentId;
            }

            if (this.isIndicator) {
                this.value.indicatorId = this.temp.indicatorId;
            }

            if (this.isUser) {
                this.value.userId = this.temp.userId;
            }

            if (this.isIndicatorCategory) {
                this.value.categoryId = this.temp.categoryId;
            }

            if (this.isAssessmentType) {
                this.value.assessmentTypeId = this.temp.assessmentTypeId;
            }

            if (this.isAssessment) {
                this.value.assessmentId = this.temp.assessmentId;
            }

            if (this.requiredResetStep) {
                this.value.step = 0;
            }

            this.componentKey++;
        },

        $_clean() {
            this.$_cleanFilter();
            this.$_reviewCompanyId();
            this.companyKey++;
            this.$_setParams();
        },

        $_cleanFilter(clearDepartment = true) {
            this.temp.departmentId = clearDepartment
                ? undefined
                : this.temp.departmentId;
            this.temp.userId = undefined;
            this.temp.indicatorId = undefined;
            this.temp.categoryId = undefined;
            this.temp.assessmentTypeId = undefined;
            this.temp.assessmentId = undefined;
            this.filterKey++;
        },
    },
};
</script>

<template>
    <section>
        <v-row dense v-show="show">
            <v-col cols="12" md="6">
                <BaseForm
                    :block="$vuetify.breakpoint.mobile"
                    labelBtn="Buscar"
                    :method="$_setParams"
                    actionsColor="background"
                >
                    <div slot="body">
                        <v-row dense justify="start">
                            <p
                                v-if="title"
                                class="BUO-Paragraph-Large-SemiBold mb-1"
                                :class="[app ? 'white--text' : 'grey700--text']"
                            >
                                {{ title }}
                            </p>
                            <v-col cols="12" v-if="companySetting">
                                <BaseInputDataTable
                                    v-if="user.companyId === buoId"
                                    :pageView="companyDialogView"
                                    label="Empresa"
                                    :setting="companySetting"
                                    :editText="temp.companyName"
                                    v-model.number="temp.companyId"
                                    :validate="['requiered']"
                                    :key="companyKey"
                                />
                            </v-col>

                            <v-col cols="12" v-if="isDepartment">
                                <BaseInputTreeview
                                    label="Área / Departamento"
                                    v-model.number="temp.departmentId"
                                    :readonly="!temp.companyId"
                                    itemText="nombre"
                                    itemChildren="subDepartamentos"
                                    :endpoint="`departamento/findAllTree/${temp.companyId}`"
                                />
                            </v-col>

                            <v-col cols="12" v-if="isUser">
                                <BaseInputDataTable
                                    v-if="userSetting"
                                    label="Colaboradores"
                                    :pageView="userDialogView"
                                    :setting="userSetting"
                                    :extraParams="extraParams"
                                    itemText="nombreCompleto"
                                    :readonly="!temp.companyId"
                                    :editText="temp.nombre"
                                    v-model="temp.userId"
                                    :key="filterKey"
                                />
                            </v-col>

                            <v-col cols="12" v-if="isIndicatorCategory">
                                <BaseInputTreeview
                                    label="Categoría"
                                    v-model.number="temp.categoryId"
                                    :readonly="!temp.companyId"
                                    itemText="nombre"
                                    itemChildren="subCategorias"
                                    :endpoint="`categoria/findAllTree/${temp.companyId}`"
                                />
                            </v-col>

                            <v-col cols="12" v-if="isIndicator">
                                <BaseInputDataTable
                                    v-if="abilitySetting"
                                    label="¿Cuáles indicadores necesitas?"
                                    :pageView="abilityDialogView"
                                    :setting="abilitySetting"
                                    :extraParams="extraParams"
                                    :readonly="
                                        extraParams == undefined ||
                                        !temp.companyId
                                    "
                                    :editText="temp.definicion"
                                    v-model="temp.indicatorId"
                                    :key="filterKey"
                                    :validate="['requiered']"
                                />
                            </v-col>

                            <v-col cols="12" v-if="isAssessmentType">
                                <BaseInputTreeview
                                    label="Tipo de assessment"
                                    v-model.number="temp.assessmentTypeId"
                                    :readonly="!temp.companyId"
                                    itemText="nombre"
                                    itemChildren="subTipos"
                                    :endpoint="`tipoPrueba/${assessmentTypeEndpoint}/${temp.companyId}`"
                                />
                            </v-col>

                            <v-col cols="12" v-if="isAssessment">
                                <BaseInputDataTable
                                    label="Assessment"
                                    v-if="assessmentSetting"
                                    :pageView="assessmentDialogView"
                                    :setting="assessmentSetting"
                                    :extraParams="extraParams"
                                    itemText="nombre"
                                    :readonly="!temp.assessmentTypeId"
                                    v-model.number="temp.assessmentId"
                                    :key="assessmentKey"
                                />
                            </v-col>
                        </v-row>
                    </div>
                    <div slot="Beforebtns">
                        <v-btn
                            class="ma-1 no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                            elevation="0"
                            large
                            outlined
                            @click="$_clean"
                            :block="$vuetify.breakpoint.mobile"
                            :color="app ? 'blueProgress600' : 'blue800'"
                        >
                            Limpiar
                        </v-btn>
                    </div>
                </BaseForm>
            </v-col>
        </v-row>
        <section :key="componentKey" class="pt-2">
            <!-- @slot Agregar Contenido del form -->
            <slot name="body"></slot>
        </section>
    </section>
</template>

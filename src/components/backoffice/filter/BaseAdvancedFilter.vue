<script>
/**
 * Descripción: Filtros Avanzados
 *
 * @displayName BaseAdvancedFilter
 */

import { v4 as uuidv4 } from 'uuid';

import { mapGetters } from 'vuex';

import {
    baseFilterSettingsHelper,
    baseDataTableColumnsHelper,
} from '@/helpers/baseFilterSettingsHelper';

import baseDateHelper from '@/helpers/baseDateHelper';

const BaseInputDataTable = () =>
    import('@/components/core/forms/BaseInputDataTable');

const BaseInputTreeview = () =>
    import('@/components/core/treeview/BaseInputTreeview');

const BaseDatePicker = () => import('@/components/core/forms/BaseDatePicker');

export default {
    name: 'BaseAdvancedFilter',

    props: {
        dense: {
            type: Boolean,
            default: false,
        },

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

        isMonth: {
            type: Boolean,
            default: false,
        },

        requiredMonth: {
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
        BaseDatePicker,
    },

    data() {
        return {
            temp: this.$_Object(),
            componentKey: 0,
            filterKey: 0,
            companyKey: 0,
            assessmentKey: 0,
            valid: true,
            refForm: 'BaseAdvancedFilterForm_',
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
        userSetting() {
            return baseFilterSettingsHelper.$_setUserSetting({
                companyId: this.user.companyId,
                departmentId: this.temp.departmentId,
                isFilter: true,
                singleSelect: false,
                list: this.advfiltersBypageView(this.userDialogView),
                pageView: this.userDialogView,
            });
        },

        /**
         * Configuracion BaseServerDataTable
         */
        abilitySetting() {
            return baseFilterSettingsHelper.$_setAbilitySetting({
                companyId: this.user.companyId,
                method: 'cualificacion/findByFilter',
                isFilter: true,
                singleSelect: false,
                list: this.advfiltersBypageView(this.abilityDialogView),
                pageView: this.abilityDialogView,
            });
        },

        /**
         * Configuracion BaseServerDataTable
         */
        assessmentSetting() {
            return baseFilterSettingsHelper.$_setAssessmentSetting({
                apiEndpoint: 'findByDeepWithDefault',
                companyId: this.user.companyId,
                assessmentTypeId: this.temp.assessmentTypeId,
                isFilter: true,
                singleSelect: true,
                list: this.advfiltersBypageView(this.assessmentDialogView),
                pageView: this.assessmentDialogView,
            });
        },

        currentMonth() {
            return baseDateHelper.$_setCurrentMonth();
        },
    },

    created() {
        this.$_clean();

        const randomID = uuidv4();

        /**
         * Config Inicial ID
         */
        this.refForm = this.refForm + randomID;
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
        $_setCompanyFilter() {
            baseDataTableColumnsHelper.$_setCompanyColumns({
                isFilter: true,
                pageView: this.companyDialogView,
            });
        },

        $_setUserFilter() {
            baseDataTableColumnsHelper.$_setUserColumns({
                companyId: this.user.companyId,
                departmentId: this.temp.departmentId,
                isFilter: true,
                pageView: this.userDialogView,
            });
        },

        $_setAbilityFilter() {
            baseDataTableColumnsHelper.$_setAbilityColumns({
                companyId: this.user.companyId,
                method: 'cualificacion/findByFilter',
                isFilter: true,
                pageView: this.abilityDialogView,
            });
        },

        $_setAssessmentFilter() {
            baseDataTableColumnsHelper.$_setAssessmentColumns({
                companyId: this.user.companyId,
                isFilter: true,
                pageView: this.assessmentDialogView,
            });
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
                month: this.$_setCurrentMonth(),
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

            if (this.isMonth) {
                this.value.month = this.temp.month;
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
            this.temp.month = this.$_setCurrentMonth();
            this.filterKey++;
        },

        $_setCurrentMonth() {
            return this.requiredMonth ? this.currentMonth : undefined;
        },

        /**
         * Valida el form y ejecuta la función 'method'
         */
        $_submit() {
            if (this.beforeClick != undefined) {
                this.beforeClick();
            }

            if (this.$refs[this.refForm].validate()) {
                this.$_setParams();
                this.$nextTick(() => {
                    if (this.$refs[this.refForm] != undefined) {
                        this.$refs[this.refForm].resetValidation();
                    }
                });
            }
        },
    },
};
</script>

<template>
    <section>
        <v-form
            :ref="refForm"
            v-model="valid"
            lazy-validation
            @submit.prevent
            @keyup.enter.native="$_submit"
            class="d-flex flex-wrap"
            v-if="show"
        >
            <section
                v-if="companySetting && user.companyId == this.buoId"
                :class="[
                    $vuetify.breakpoint.smAndDown
                        ? 'sizeMobileComponent'
                        : 'sizeComponent mx-1',
                ]"
            >
                <BaseInputDataTable
                    v-if="user.companyId === buoId"
                    :pageView="companyDialogView"
                    label="Empresa"
                    :setting="companySetting"
                    :editText="temp.companyName"
                    v-model.number="temp.companyId"
                    itemText="nombre"
                    :validate="['requiered']"
                    :key="companyKey"
                    :fnResetConfig="$_setCompanyFilter"
                    :denseInput="dense"
                />
            </section>

            <section
                v-if="isDepartment"
                :class="[
                    $vuetify.breakpoint.smAndDown
                        ? 'sizeMobileComponent'
                        : 'sizeComponent mx-1',
                ]"
            >
                <BaseInputTreeview
                    label="Área / Departamento"
                    :denseInput="dense"
                    v-model.number="temp.departmentId"
                    :readonly="!temp.companyId"
                    itemText="nombre"
                    itemChildren="subDepartamentos"
                    :endpoint="`departamento/findAllTree/${temp.companyId}`"
                />
            </section>

            <section
                v-if="isUser"
                :class="[
                    $vuetify.breakpoint.smAndDown
                        ? 'sizeMobileComponent'
                        : 'sizeComponent mx-1',
                ]"
            >
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
                    :fnResetConfig="$_setUserFilter"
                    :denseInput="dense"
                />
            </section>

            <section
                v-if="isIndicatorCategory"
                :class="[
                    $vuetify.breakpoint.smAndDown
                        ? 'sizeMobileComponent'
                        : 'sizeComponent mx-1',
                ]"
            >
                <BaseInputTreeview
                    label="Categoría"
                    :denseInput="dense"
                    v-model.number="temp.categoryId"
                    :readonly="!temp.companyId"
                    itemText="nombre"
                    itemChildren="subCategorias"
                    :endpoint="`categoria/findAllTree/${temp.companyId}`"
                />
            </section>

            <section
                v-if="isIndicator"
                :class="[
                    $vuetify.breakpoint.smAndDown
                        ? 'sizeMobileComponent'
                        : 'sizeComponent mx-1',
                ]"
            >
                <BaseInputDataTable
                    v-if="abilitySetting"
                    :denseInput="dense"
                    label="¿Cuáles indicadores necesitas?"
                    :pageView="abilityDialogView"
                    :setting="abilitySetting"
                    :extraParams="extraParams"
                    :readonly="extraParams == undefined || !temp.companyId"
                    :editText="temp.definicion"
                    v-model="temp.indicatorId"
                    :key="filterKey"
                    :validate="['requiered']"
                    :fnResetConfig="$_setAbilityFilter"
                />
            </section>

            <section
                v-if="isAssessmentType"
                :class="[
                    $vuetify.breakpoint.smAndDown
                        ? 'sizeMobileComponent'
                        : 'sizeComponent mx-1',
                ]"
            >
                <BaseInputTreeview
                    label="Tipo de assessment"
                    :denseInput="dense"
                    v-model.number="temp.assessmentTypeId"
                    :readonly="!temp.companyId"
                    itemText="nombre"
                    itemChildren="subTipos"
                    :endpoint="`tipoPrueba/${assessmentTypeEndpoint}/${temp.companyId}`"
                />
            </section>

            <section
                v-if="isAssessment"
                :class="[
                    $vuetify.breakpoint.smAndDown
                        ? 'sizeMobileComponent'
                        : 'sizeComponent mx-1',
                ]"
            >
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
                    :fnResetConfig="$_setAssessmentFilter"
                    :denseInput="dense"
                />
            </section>

            <section
                v-if="isMonth"
                :class="[
                    $vuetify.breakpoint.smAndDown
                        ? 'sizeMobileComponent'
                        : 'sizeComponent mx-1',
                ]"
            >
                <BaseDatePicker
                    label="Período"
                    type="month"
                    :dense="dense"
                    appendIcon="mdi-calendar-month"
                    :max="currentMonth"
                    v-model="temp.month"
                    :validate="['text']"
                />
            </section>

            <v-btn
                class="no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                :class="[
                    $vuetify.breakpoint.mobile ? 'sizeMobileComponent' : 'mx-1',
                ]"
                elevation="0"
                :color="app ? 'white' : 'primary'"
                large
                outlined
                :block="$vuetify.breakpoint.mobile"
                @click="$_clean"
                :height="dense ? 41 : 55"
            >
                Limpiar</v-btn
            >

            <v-btn
                class="no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                :class="[
                    $vuetify.breakpoint.mobile
                        ? 'my-4 sizeMobileComponent'
                        : 'mx-1',
                ]"
                elevation="0"
                color="primary"
                large
                dark
                :block="$vuetify.breakpoint.mobile"
                depressed
                @click="$_submit"
                :height="dense ? 41 : 55"
            >
                Buscar
            </v-btn>
        </v-form>

        <section :key="componentKey">
            <!-- @slot Agregar Contenido del form -->
            <slot name="body"></slot>
        </section>
    </section>
</template>

<style scoped>
.sizeComponent {
    width: 290px;
}

.sizeMobileComponent {
    width: 100%;
}
</style>

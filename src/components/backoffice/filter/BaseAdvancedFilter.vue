<script>
/**
 * Descripción: Filtros Avanzados
 *
 * @displayName BaseAdvancedFilter
 */

import { mapGetters } from 'vuex';

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
            default: true,
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
            default: true,
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
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        ...mapGetters('authentication', ['user', 'buoId']),

        /**
         * Extra Params
         */
        extraParams() {
            return baseFilterSettingsHelper.$_setExtraParams({
                companyId: this.temp.organizacionId,
            });
        },

        /**
         * Configuracion BaseInputDataTable
         */
        companySetting() {
            return baseFilterSettingsHelper.$_setCompanySetting({
                isFilter: true,
                singleSelect: true,
            });
        },

        /**
         * Configuracion BaseServerDataTable
         */
        userSetting() {
            return baseFilterSettingsHelper.$_setUserSetting({
                companyId: this.user.companyId,
                departmentId: this.temp.departamentoId,
                isFilter: true,
                singleSelect: false,
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
            });
        },
    },

    created() {
        this.$_clean();
    },

    watch: {
        'temp.organizacionId': {
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
        'temp.departamentoId': {
            handler(newValue, oldValue) {
                if (oldValue != newValue) {
                    this.$_cleanFilter(false);
                }
            },
            immediate: true,
        },
    },

    methods: {
        /**
         * Entity Object
         */
        $_Object() {
            return {
                organizacionId: undefined,
                departamentoId: undefined,
                usuarioId: undefined,
                cualificacionId: undefined,
                categoriaId: undefined,
                tipoPruebaId: undefined,
            };
        },

        $_setCompanyDefault() {
            this.temp.organizacionId = this.user.companyId;
            this.temp.companyName = this.user.companyName;
        },

        $_reviewCompanyId() {
            if (this.requiredCompany) {
                this.$_setCompanyDefault();
            }

            if (this.user.companyId != this.buoId) {
                this.$_setCompanyDefault();
            }
        },

        $_setParams() {
            console.log(this.temp);
        },

        $_clean() {
            this.$_cleanFilter();
            this.$_reviewCompanyId();
            this.companyKey++;
            this.componentKey++;
        },

        $_cleanFilter(clearDepartment = true) {
            this.temp.departamentoId = clearDepartment
                ? undefined
                : this.temp.departamentoId;
            this.temp.usuarioId = undefined;
            this.temp.cualificacionId = undefined;
            this.temp.categoriaId = undefined;
            this.temp.tipoPruebaId = undefined;
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
                >
                    <div slot="body">
                        <v-col cols="12">
                            <p
                                v-if="title"
                                class="BUO-Paragraph-Large-SemiBold"
                                :class="[app ? 'white--text' : 'grey700--text']"
                            >
                                {{ title }}
                            </p>

                            <BaseInputDataTable
                                v-if="user.companyId === buoId"
                                label="Empresa"
                                :setting="companySetting"
                                :editText="temp.companyName"
                                v-model.number="temp.organizacionId"
                                :validate="['requiered']"
                                :key="companyKey"
                            />
                        </v-col>

                        <v-col cols="12" v-if="isDepartment">
                            <BaseInputTreeview
                                label="Área / Departamento"
                                v-model.number="temp.departamentoId"
                                :readonly="!temp.organizacionId"
                                itemText="nombre"
                                itemChildren="subDepartamentos"
                                :endpoint="`departamento/findAllTree/${temp.organizacionId}`"
                            />
                        </v-col>

                        <v-col cols="12" v-if="isUser">
                            <BaseInputDataTable
                                label="Colaboradores"
                                :setting="userSetting"
                                :extraParams="extraParams"
                                itemText="nombreCompleto"
                                :readonly="!temp.organizacionId"
                                :editText="temp.nombre"
                                v-model="temp.usuarioId"
                                :key="filterKey"
                            />
                        </v-col>

                        <v-col cols="12" v-if="isIndicatorCategory">
                            <BaseInputTreeview
                                label="Categoría"
                                v-model.number="temp.categoriaId"
                                :readonly="!temp.organizacionId"
                                itemText="nombre"
                                itemChildren="subCategorias"
                                :endpoint="`categoria/findAllTree/${temp.organizacionId}`"
                            />
                        </v-col>

                        <v-col cols="12" v-if="isIndicator">
                            <BaseInputDataTable
                                label="¿Cuáles indicadores necesitas?"
                                :setting="abilitySetting"
                                :extraParams="extraParams"
                                :readonly="
                                    extraParams == undefined ||
                                    !temp.organizacionId
                                "
                                :editText="temp.definicion"
                                v-model="temp.cualificacionId"
                                :validate="['requiered']"
                            />
                        </v-col>

                        <v-col cols="12">
                            <BaseInputTreeview
                                label="Tipo de assessment"
                                v-model.number="temp.tipoPruebaId"
                                :readonly="!temp.organizacionId"
                                itemText="nombre"
                                itemChildren="subTipos"
                                :endpoint="`tipoPrueba/findAllTree/${temp.organizacionId}`"
                            />
                        </v-col>
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

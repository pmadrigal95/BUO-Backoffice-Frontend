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
            default: true,
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
            test: undefined,
            componentKey: 0,
            filterKey: 0,
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
        // 'temp.organizacionId': {
        //     handler(newValue, oldValue) {
        //         console.log(newValue, oldValue);
        //         if (oldValue) {
        //             if (this.isDepartment) {
        //                 this.temp.departamentoId = undefined;
        //             }

        //             if (this.isIndicator) {
        //                 this.temp.cualificacionId = undefined;
        //             }

        //             this.filterKey++;
        //         }
        //     },
        //     immediate: true,
        // },

        test: {
            handler(newValue, oldValue) {
                console.log(newValue);
                console.log(oldValue);
            },
            // immediate: true,
            deep: true,
        },
    },

    methods: {
        /**
         * Entity Object
         */
        $_Object() {
            return {
                organizacionId: undefined,
                companyName: undefined,
            };
        },

        $_setCompanyDefault() {
            this.temp = {};
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
            console.log('object');
        },

        $_clean() {
            this.$_reviewCompanyId();
            this.filterKey++;
            console.log(this.temp);
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
                    <div slot="body" :key="filterKey">
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
                                v-model="test"
                                :validate="['requiered']"
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

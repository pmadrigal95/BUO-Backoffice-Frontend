<script>
/**
 * Descripción: Pantalla para información corporativa
 *
 * @displayName CorporateInfoViewComponent
 *
 */

import { mapGetters } from 'vuex';

import { baseFilterSettingsHelper } from '@/helpers/baseFilterSettingsHelper';

import baseDateHelper from '@/helpers/baseDateHelper';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

const BaseDatePicker = () => import('@/components/core/forms/BaseDatePicker');

const BaseInputDataTable = () =>
    import('@/components/core/forms/BaseInputDataTable.vue');

export default {
    name: 'CorporateInfoViewComponent',

    props: {
        entity: {
            type: Object,
            required: true,
        },
    },

    components: {
        BaseDatePicker,
        BaseInputDataTable,
    },

    data() {
        return {
            componentKey: 0,
            componentDateKey: 0,
        };
    },

    computed: {
        ...mapGetters('filters', ['filtersBypageView', 'pageViewById']),

        msg() {
            return 'Hemos realizado una actualización en los campos de fechas del colaborador. Por favor, tómate un momento para revisar y asegurarte de que tus fechas estén actualizadas correctamente.';
        },

        validateInitialDate() {
            return this.entity.organizacionId ? ['text'] : undefined;
        },

        validateDepartmentDate() {
            return this.entity.departamentoId ? ['text'] : undefined;
        },

        jobDialogView() {
            return this.pageViewById('securityFilter');
        },

        /**
         * Configuracion BaseServerDataTable
         */
        settingJob() {
            return baseFilterSettingsHelper.$_setJobSetting({
                isFilter: true,
                singleSelect: false,
                list: this.filtersBypageView(this.jobDialogView),
                pageView: this.jobDialogView,
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
    },

    watch: {
        /**
         * Actualizar calendarios
         */
        'entity.organizacionId': {
            handler(newValue, oldValue) {
                this.componentDateKey++;
                if (oldValue) {
                    this.entity.departamentoId = undefined;
                    this.entity.perfilIds = undefined;
                }
            },
            immediate: true,
        },

        /**
         * Actualizar calendarios
         */
        'entity.departamentoId': {
            handler(newValue, oldValue) {
                if (oldValue) {
                    this.$_updateDepartmentDate(newValue);
                    this.componentDateKey++;
                }
            },
            immediate: true,
        },

        /**
         * Actualizar calendarios
         */
        'entity.fechaIngreso': {
            handler(newValue, oldValue) {
                if (oldValue) {
                    this.$_updateInitDate(newValue);
                    this.componentDateKey++;
                }
            },
            immediate: true,
        },

        /**
         * Actualizar calendarios
         */
        'entity.fechaTerminacion': {
            handler(newValue, oldValue) {
                if (oldValue) {
                    this.$_updateEndDate(newValue);
                    this.componentDateKey++;
                }
            },
            immediate: true,
        },
    },

    methods: {
        $_updateDepartmentDate(departamentoId) {
            if (!departamentoId) {
                this.entity.fechaIngresoDepartamento = undefined;
                return;
            }

            const today = baseDateHelper.$_setCurrentDate();

            if (!this.entity.fechaIngreso) {
                this.entity.fechaIngreso = today;
                this.entity.fechaIngresoDepartamento = today;
            } else {
                this.entity.fechaIngresoDepartamento =
                    baseDateHelper.$_compareDates({
                        firstDate: this.entity.fechaIngreso,
                        secondDate: today,
                    }) &&
                    (!this.entity.fechaTerminacion ||
                        baseDateHelper.$_compareDates({
                            firstDate: this.entity.fechaTerminacion,
                            secondDate: today,
                            operator: '>=',
                        }))
                        ? today
                        : undefined;
            }

            baseNotificationsHelper.Message(false, this.msg);
        },

        $_updateInitDate(fechaIngreso) {
            if (!fechaIngreso) {
                this.entity.fechaIngresoDepartamento = undefined;
                this.entity.fechaTerminacion = undefined;
            } else {
                this.entity.fechaIngresoDepartamento =
                    this.entity.fechaIngresoDepartamento &&
                    baseDateHelper.$_compareDates({
                        firstDate: this.entity.fechaIngreso,
                        secondDate: this.entity.fechaIngresoDepartamento,
                    })
                        ? this.entity.fechaIngresoDepartamento
                        : undefined;

                this.entity.fechaTerminacion =
                    this.entity.fechaTerminacion &&
                    baseDateHelper.$_compareDates({
                        firstDate: this.entity.fechaIngreso,
                        secondDate: this.entity.fechaTerminacion,
                    })
                        ? this.entity.fechaTerminacion
                        : undefined;
            }

            baseNotificationsHelper.Message(false, this.msg);
        },

        $_updateEndDate(fechaTerminacion) {
            if (!fechaTerminacion) {
                this.entity.esRenuncia = false;
            } else {
                this.entity.fechaIngresoDepartamento =
                    this.entity.fechaIngresoDepartamento &&
                    baseDateHelper.$_compareDates({
                        firstDate: this.entity.fechaTerminacion,
                        secondDate: this.entity.fechaIngresoDepartamento,
                        operator: '>=',
                    })
                        ? this.entity.fechaIngresoDepartamento
                        : undefined;
            }

            baseNotificationsHelper.Message(false, this.msg);
        },
    },
};
</script>

<template>
    <v-row dense>
        <v-col cols="12">
            <BaseDatePicker
                label="Fecha de ingreso"
                appendIcon="mdi-calendar-month"
                v-model.trim="entity.fechaIngreso"
                :max="entity.fechaTerminacion"
                reqCurrentMaxDate
                :validate="validateInitialDate"
                :key="componentDateKey"
            />
        </v-col>

        <v-col cols="12">
            <BaseDatePicker
                :disabled="!entity.fechaIngreso || !entity.departamentoId"
                label="Fecha de ingreso al departamento"
                appendIcon="mdi-calendar-month"
                v-model.trim="entity.fechaIngresoDepartamento"
                :min="entity.fechaIngreso"
                :max="entity.fechaTerminacion"
                reqCurrentMaxDate
                :validate="validateDepartmentDate"
                :key="componentDateKey"
            />
        </v-col>

        <v-col cols="12">
            <BaseDatePicker
                :disabled="!entity.fechaIngreso"
                label="Fecha de salida"
                appendIcon="mdi-calendar-month"
                v-model.trim="entity.fechaTerminacion"
                :min="entity.fechaIngreso"
                :key="componentDateKey"
                reqCurrentMaxDate
            />
        </v-col>

        <v-col cols="12">
            <BaseSwitch
                :disabled="!entity.fechaTerminacion"
                label="Renuncia"
                v-model="entity.esRenuncia"
            />
        </v-col>

        <v-col cols="12">
            <BaseSwitch label="Candidato" v-model="entity.esCandidato" />
        </v-col>

        <v-col cols="12">
            <BaseInputDataTable
                label="Puesto"
                v-if="settingJob"
                :pageView="jobDialogView"
                :setting="settingJob"
                :extraParams="extraParams"
                itemText="nombre"
                :readonly="extraParams.length == 0"
                :editText="entity.nombrePuesto"
                v-model="entity.puestoId"
                :key="componentKey"
            />
        </v-col>
    </v-row>
</template>

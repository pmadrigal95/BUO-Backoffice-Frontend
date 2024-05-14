<script>
/**
 * Descripción: Pantalla para información laboral
 *
 * @displayName WorkInfoViewComponent
 *
 */
import baseDateHelper from '@/helpers/baseDateHelper';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

const BaseDatePicker = () => import('@/components/core/forms/BaseDatePicker');

export default {
    name: 'WorkInfoViewComponent',

    props: {
        entity: {
            type: Object,
            required: true,
        },

        enabledWatcher: {
            type: Boolean,
            requered: true,
        },
    },

    components: {
        BaseDatePicker,
    },

    data() {
        return {
            componentDateKey: 0,
        };
    },

    computed: {
        msg() {
            return 'Hemos realizado una actualización en los campos de fechas del colaborador. Por favor, tómate un momento para revisar y asegurarte de que tus fechas estén actualizadas correctamente.';
        },

        validateInitialDate() {
            return this.entity.organizacionId ? ['text'] : undefined;
        },

        validateDepartmentDate() {
            return this.entity.departamentoId ? ['text'] : undefined;
        },
    },

    watch: {
        /**
         * Actualizar calendarios
         */
        'entity.organizacionId': {
            handler(newValue, oldValue) {
                this.componentDateKey++;
                if (oldValue && this.enabledWatcher) {
                    this.entity.departamentoId = undefined;
                    this.entity.perfilIds = undefined;
                    console.log(
                        'entity.organizacionId:' +
                            'newValue ' +
                            newValue +
                            'oldValue ' +
                            oldValue
                    );
                }
            },
            immediate: true,
        },

        /**
         * Actualizar calendarios
         */
        'entity.departamentoId': {
            handler(newValue, oldValue) {
                if (oldValue && this.enabledWatcher) {
                    this.$_updateDepartmentDate(newValue);
                    this.componentDateKey++;
                    console.log('entity.departamentoId');
                    console.log(JSON.stringify(this.entity));
                }
            },
            immediate: true,
        },

        /**
         * Actualizar calendarios
         */
        'entity.fechaIngreso': {
            handler(newValue, oldValue) {
                if (oldValue && this.enabledWatcher) {
                    this.$_updateInitDate(newValue);
                    this.componentDateKey++;
                    console.log(
                        'entity.fechaIngreso:' +
                            'newValue ' +
                            newValue +
                            'oldValue ' +
                            oldValue
                    );
                    console.log(JSON.stringify(this.entity));
                }
            },
            immediate: true,
        },

        /**
         * Actualizar calendarios
         */
        'entity.fechaTerminacion': {
            handler(newValue, oldValue) {
                if (oldValue && this.enabledWatcher) {
                    this.$_updateEndDate(newValue);
                    this.componentDateKey++;
                    console.log('entity.fechaTerminacion');
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
                :readonly="entity.esCandidato"
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
                :readonly="entity.esCandidato"
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
                :readonly="entity.esCandidato"
            />
        </v-col>

        <v-col cols="12">
            <BaseSwitch
                :disabled="!entity.fechaTerminacion"
                label="Renuncia"
                v-model="entity.esRenuncia"
                :readonly="entity.esCandidato"
            />
        </v-col>
    </v-row>
</template>

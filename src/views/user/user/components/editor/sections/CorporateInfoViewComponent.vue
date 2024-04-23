<script>
/**
 * Descripción: Pantalla para información corporativa
 *
 * @displayName CorporateInfoViewComponent
 *
 */

 
export default {
    name: 'CorporateInfoViewComponent',

    props: {
        entity: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            componentDateKey: 0,
        };
    },

    computed: {
        validateInitialDate() {
            return this.entity.organizacionId ? ['text'] : undefined;
        },

        validateDepartmentDate() {
            return this.entity.departamentoId ? ['text'] : undefined;
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
    </v-row>
</template>

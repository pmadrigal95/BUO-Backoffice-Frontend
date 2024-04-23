<script>
/**
 * Descripción: Pantalla para información personal
 *
 * @displayName PersonalInfoViewComponent
 *
 */

export default {
    name: 'PersonalInfoViewComponent',

    props: {
        entity: {
            type: Object,
            required: true,
        },
    },
};
</script>

<template>
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
            <BaseDatePicker
                label="Fecha de nacimiento"
                appendIcon="mdi-calendar-month"
                v-model.trim="entity.fechaNacimiento"
                reqCurrentMaxDate
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
            <BaseInput
                label="Número de teléfono"
                v-model.trim="entity.telefono"
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
            <BaseInput label="Ciudad" v-model.trim="entity.ciudad" />
        </v-col>
    </v-row>
</template>

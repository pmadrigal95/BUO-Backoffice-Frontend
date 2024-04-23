<script>
/**
 * Descripción: Pantalla para información de la cuenta
 *
 * @displayName AccountInfoViewComponent
 *
 */

export default {
    name: 'AccountInfoViewComponent',

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
    </v-row>
</template>

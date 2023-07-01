<script>
/**
 * Descripción: Pantalla Asignacion
 *
 * @displayName UserFilterViewComponent
 *
 */

import { mapGetters } from 'vuex';

export default {
    name: 'AssessmentViewComponent',

    computed: {
        ...mapGetters('theme', ['app']),
    },
};
</script>

<template>
    <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                :color="app ? 'blueProgress600' : 'blue800'"
                elevation="0"
                class="ma-1 no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                outlined
                small
                v-bind="attrs"
                v-on="on"
            >
                Assessment
                <v-icon right>mdi-chevron-down</v-icon>
            </v-btn>
        </template>
        <span>hola</span>
    </v-menu>
</template>

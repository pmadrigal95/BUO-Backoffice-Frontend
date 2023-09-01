<script>
/**
 * Descripción: Componente para crear un menú de acciones
 *
 * @displayName BaseMenuGrid
 *
 */

import { mapGetters } from 'vuex';

const BaseMenuItemsRecursive = () =>
    import('@/components/core/grids/BaseMenuItemsRecursive');

export default {
    name: 'BaseMenuGrid',

    props: {
        actions: {
            type: Array,
            require: true,
        },

        title: {
            type: String,
            default: 'Acciones',
        },
    },

    components: {
        BaseMenuItemsRecursive,
    },

    computed: {
        ...mapGetters('theme', ['app']),
    },
};
</script>

<template>
    <section>
        <v-menu
            :close-on-content-click="false"
            :open-on-hover="!$vuetify.breakpoint.mobile"
            bottom
            offset-y
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    :color="app ? 'blueProgress600' : 'blue900'"
                    elevation="0"
                    class="ma-1 no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                    :class="{ 'mt-4': $vuetify.breakpoint.mobile }"
                    outlined
                    small
                    v-bind="attrs"
                    v-on="on"
                >
                    {{ title }}
                    <v-icon right>mdi-chevron-down</v-icon>
                </v-btn>
            </template>
            <section
                class="mt-1 rounded-lg"
                :class="[app ? 'background' : 'white']"
            >
                <BaseMenuItemsRecursive :actions="actions" />
            </section>
        </v-menu>
    </section>
</template>

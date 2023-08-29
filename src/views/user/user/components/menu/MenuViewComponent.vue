<script>
/**
 * Descripción: Pantalla Menú de acciones
 *
 * @displayName MenuViewComponent
 *
 */

import { mapGetters } from 'vuex';

const MenuItemsViewComponent = () =>
    import('@/views/user/user/components/menu//MenuItemsViewComponent');

export default {
    name: 'MenuViewComponent',

    props: {
        actions: {
            type: Array,
            require: true,
        },
    },

    components: {
        MenuItemsViewComponent,
    },

    computed: {
        ...mapGetters('theme', ['app']),
    },
};
</script>

<template>
    <section>
        <v-menu offset-y transition="scale-transition"  :close-on-click="false">
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    :color="app ? 'blueProgress600' : 'blue900'"
                    elevation="0"
                    class="ma-1 no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                    outlined
                    small
                    v-bind="attrs"
                    v-on="on"
                >
                    Otras acciones
                    <v-icon right>mdi-chevron-down</v-icon>
                </v-btn>
            </template>
            <section
                class="mt-1 rounded-lg"
                :class="[app ? 'background' : 'white']"
            >
                <v-list>
                    <MenuItemsViewComponent :actions="actions" />
                </v-list>
            </section>
        </v-menu>
    </section>
</template>

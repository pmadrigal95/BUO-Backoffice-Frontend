<script>
/**
 * Descripción: Pantalla Menú de acciones
 *
 * @displayName MenuViewComponent
 *
 */

import { mapGetters } from 'vuex';

export default {
    name: 'MenuItemsViewComponent',

    props: {
        actions: {
            type: Array,
            require: true,
        },
    },

    computed: {
        ...mapGetters('theme', ['app']),
    },
};
</script>

<template>
    <section>
        <section v-for="action in actions" :key="action.id">
            <v-list-group
                v-if="
                    action &&
                    action.subActions &&
                    action.subActions.length 
                   
                "
                no-action
            >
                <v-list-item-content slot="activator">
                    <v-list-item-title
                        ><span
                            class="BUO-Paragraph-Small-SemiBold"
                            :class="app ? 'white--text' : 'blue900--text'"
                            >{{ action.title }}</span
                        ></v-list-item-title
                    >
                </v-list-item-content>
                <v-divider class="mx-4"></v-divider>
                <MenuItemsViewComponent :actions="action.subActions" />
            </v-list-group>
            <v-list-item
                @click="action.fn"
                style="cursor: pointer"
                v-else-if="action.permission"
            >
                <v-list-item-action>
                    <v-icon :color="app ? 'blueProgress600' : 'blue900'">{{
                        `mdi-${action.icon}`
                    }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title
                        class="BUO-Paragraph-Small"
                        :class="app ? 'white--text' : 'grey700--text'"
                        >{{ action.title }}</v-list-item-title
                    >
                </v-list-item-content>
            </v-list-item>
        </section>
    </section>
</template>

<script>
/**
 * Descripción: Componente recursivo que crea las acciones del menú
 *
 * @displayName BaseMenuItemsRecursive
 *
 */

import { mapGetters } from 'vuex';

export default {
    name: 'BaseMenuItemsRecursive',

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
    <v-list dense>
        <section v-for="(action, index) in actions" :key="index">
            <v-list-group
                v-if="action && action.children && action.children.length"
                no-action
            >
                <template slot="activator">
                    <v-list-item-icon>
                        <v-icon
                            v-if="action.icon"
                            :color="app ? 'blueProgress600' : 'blue900'"
                            >{{ `mdi-${action.icon}` }}</v-icon
                        >
                    </v-list-item-icon>
                    <v-list-item-title
                        ><span
                            class="BUO-Paragraph-Small-SemiBold"
                            :class="app ? 'white--text' : 'blue900--text'"
                            >{{ action.title }}</span
                        ></v-list-item-title
                    >
                </template>
                <v-divider class="mx-4"></v-divider>
                <BaseMenuItemsRecursive :actions="action.children" />
            </v-list-group>
            <v-list-item
                @click="action.fn"
                style="cursor: pointer"
                v-else-if="action.show"
            >
                <v-list-item-action>
                    <v-icon
                        v-if="action.icon"
                        :color="app ? 'blueProgress600' : 'blue900'"
                        >{{ `mdi-${action.icon}` }}</v-icon
                    >
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title
                        class="BUO-Paragraph-Small"
                        :class="app ? 'white--text' : 'grey700--text'"
                        >{{ action.title}}</v-list-item-title
                    >
                </v-list-item-content>
            </v-list-item>
        </section>
    </v-list>
</template>

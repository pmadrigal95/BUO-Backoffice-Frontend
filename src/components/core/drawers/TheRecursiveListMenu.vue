<script>
/**
 * Descripción: Display Menu Lateral
 *
 * @displayName TheRecursiveListMenu
 */

import { mapGetters } from 'vuex';

export default {
    name: 'TheRecursiveListMenu',

    props: ['permissions'],

    computed: {
        ...mapGetters('theme', ['app']),
    },
};
</script>

<template>
    <v-list dense>
        <v-list-item-group :color="app ? undefined : 'blue900'">
            <template v-for="(item, group, single) in permissions">
                <v-tooltip
                    right
                    v-if="item && item.subMenu && item.subMenu.length"
                    :key="group"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-list-group
                            v-bind="attrs"
                            v-on="on"
                            :prepend-icon="
                                item.icono ? `mdi-${item.icono}` : undefined
                            "
                            v-model="item.active"
                            no-action
                        >
                            <v-list-item-content slot="activator">
                                <v-list-item-title
                                    class="BUO-Paragraph-Small"
                                    >{{ item.nombreUI }}</v-list-item-title
                                >
                            </v-list-item-content>
                            <TheRecursiveListMenu
                                class="py-0 pl-3"
                                :permissions="item.subMenu"
                            />
                        </v-list-group>
                    </template>
                    <span>{{ item.nombreUI }}</span>
                </v-tooltip>
                <v-tooltip right v-else :key="single">
                    <template v-slot:activator="{ on, attrs }">
                        <v-list-item
                            :to="{ name: item.rutaURL }"
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-list-item-icon>
                                <v-icon>mdi-{{ item.icono }}</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title
                                    class="BUO-Paragraph-Small-SemiBold"
                                    >{{ item.nombreUI }}</v-list-item-title
                                >
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                    <span>{{ item.nombreUI }}</span>
                </v-tooltip>
            </template>
        </v-list-item-group>
    </v-list>
</template>

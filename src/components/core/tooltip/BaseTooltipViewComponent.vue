<script>
/**
 * Descripción: Pantalla  BaseTooltipViewComponent
 *
 * @displayName BaseTooltipViewComponent
 *
 */

import { mapGetters } from 'vuex';

export default {
    name: 'BaseTooltipViewComponent',

    computed: {
        ...mapGetters('theme', ['app']),
    },
};
</script>

<template>
    <v-menu open-on-hover top offset-y>
        <template v-slot:activator="{ on, attrs }">
            <section class="activator" v-bind="attrs" v-on="on">
                <slot name="activator"></slot>
            </section>
        </template>

        <v-card flat class="rounded-lg" height="100%" width="100%">
            <v-card-title
                class="BUO-Label-XSmall ma-3"
                :class="[app ? 'white--text' : 'grey700--text']"
            >
                <slot name="title"></slot>
            </v-card-title>
            <v-card-text
                class="BUO-Heading-XSmall ma-3"
                :class="[app ? 'white--text' : 'grey600--text']"
            >
                <slot name="text"></slot>
            </v-card-text>
            <v-card-actions>
                <v-layout justify-end align-center>
                    <slot name="actions"></slot>
                </v-layout>
            </v-card-actions>
        </v-card>
    </v-menu>
</template>

<style scoped>
.activator:hover {
    cursor: pointer;
}
</style>

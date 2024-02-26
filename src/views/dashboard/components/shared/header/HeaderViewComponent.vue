<script>
/**
 * Descripción: Pantalla  HeaderViewComponent
 *
 * @displayName HeaderViewComponent
 *
 */

import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'HeaderViewComponent',

    props: {
        title: {
            type: String,
            required: true,
        },
    },

    computed: {
        ...mapGetters('theme', ['app']),

        ...mapGetters('dashboard', ['showFilter']),
    },

    methods: {
        ...mapActions('dashboard', ['show_filter_user']),
    },
};
</script>

<template>
    <v-layout align-center justify-space-between class="mb-4">
        <section v-if="title">
            <span class="BUO-Heading-Small">{{ title }}</span>
        </section>
        <section>
            <v-btn
                icon
                :color="app ? 'white' : 'black'"
                @click="show_filter_user"
            >
                <v-icon>{{
                    `mdi-filter${showFilter ? '' : '-off'}-outline`
                }}</v-icon>
            </v-btn>
        </section>
    </v-layout>
</template>

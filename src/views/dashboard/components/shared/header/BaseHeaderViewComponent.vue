<script>
/**
 * Descripción: Pantalla  BaseHeaderViewComponent
 *
 * @displayName BaseHeaderViewComponent
 *
 */

import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'BaseHeaderViewComponent',

    props: {
        title: {
            type: String,
            required: true,
        },

        type: {
            type: String,
            requiered: true,
        },
    },

    computed: {
        ...mapGetters('theme', ['app']),

        ...mapGetters('dashboard', ['showFilter']),
    },

    methods: {
        ...mapActions('dashboard', ['show_filter_user', 'set_dashboard_by_id']),

        $_getToAPi() {
            this.set_dashboard_by_id(this.type);
        },
    },
};
</script>

<template>
    <v-layout
        align-center
        :justify-space-between="title"
        :justify-end="!title"
        class="mb-4"
    >
        <section v-if="title">
            <span class="BUO-Heading-Small">{{ title }}</span>
        </section>
        <section>
            <section>
                <v-row dense>
                    <slot name="btns" />
                    <v-btn
                        icon
                        :color="app ? 'white' : 'black'"
                        @click="$_getToAPi"
                    >
                        <v-icon> mdi-sync </v-icon>
                    </v-btn>

                    <v-btn
                        icon
                        :color="app ? 'white' : 'black'"
                        @click="show_filter_user"
                    >
                        <v-icon>{{
                            `mdi-filter${showFilter ? '' : '-off'}-outline`
                        }}</v-icon>
                    </v-btn>
                </v-row>
            </section>
        </section>
    </v-layout>
</template>

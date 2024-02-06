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

    computed: {
        ...mapGetters('theme', ['app']),

        ...mapGetters('dashboard', ['showFilter']),

        ...mapGetters('authentication', ['user', 'buoId']),

        display() {
            return (
                this.user.companyId !== this.buoId &&
                !this.$vuetify.breakpoint.mobile
            );
        },
    },

    methods: {
        ...mapActions('dashboard', ['show_filter_user']),
    },
};
</script>

<template>
    <v-layout
        :justify-end="!display"
        :justify-space-between="display"
        align-end
        class="pl-3"
    >
        <span
            v-if="display"
            class="BUO-Paragraph-Large-SemiBold"
            :class="[app ? 'white--text' : 'grey700--text']"
            >{{ user.companyName }}</span
        >
        <v-layout justify-end align-end>
            <v-btn
                icon
                :color="app ? 'clouds' : 'black'"
                @click="show_filter_user"
            >
                <v-icon>{{
                    `mdi-filter${showFilter ? '' : '-off'}-outline`
                }}</v-icon>
            </v-btn>

            <v-img
                src="https://buo-resources.s3.us-east-2.amazonaws.com/b2b/HRInsightsBuo.svg"
                alt=""
                max-height="30"
                max-width="200"
                contain
            />
        </v-layout>
    </v-layout>
</template>

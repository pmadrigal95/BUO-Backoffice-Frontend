<script>
/**
 * Descripción: Pantalla  HeaderViewComponent
 *
 * @displayName HeaderViewComponent
 *
 */

import { mapGetters } from 'vuex';

export default {
    name: 'HeaderViewComponent',

    computed: {
        ...mapGetters('theme', ['app']),

        ...mapGetters('authentication', ['user', 'buoId']),

        display() {
            return (
                this.user.companyId !== this.buoId &&
                !this.$vuetify.breakpoint.mobile
            );
        },
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
        <v-img
            src="https://buo-resources.s3.us-east-2.amazonaws.com/b2b/HRInsightsBuo.svg"
            alt=""
            max-height="30"
            max-width="200"
            contain
        />
    </v-layout>
</template>

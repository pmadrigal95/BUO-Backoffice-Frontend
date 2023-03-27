<script>
/**
 * Descripción: Componente Menú Top
 *
 * @displayName TheToolbar
 */

import { mapState, mapActions } from 'vuex';

import baseConfigHelper from '@/helpers/baseConfigHelper';

export default {
    name: 'TheToolbar',

    props: {
        show: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        ...mapState('theme', ['app']),
    },

    watch: {
        app: {
            handler(value) {
                this.$vuetify.theme.dark = value;
            },
        },
    },

    created() {
        this.$vuetify.theme.dark = this.app;
    },

    methods: {
        ...mapActions('theme', ['change_mode']),

        ...mapActions('navbar', ['changeStatus']),

        $_changeTheme() {
            this.change_mode([baseConfigHelper.$_app, !this.app]);
        },
    },
};
</script>

<template>
    <v-app-bar app elevate-on-scroll color="transparent">
        <v-app-bar-nav-icon
            v-if="$vuetify.breakpoint.smAndDown"
            @click="changeStatus"
        ></v-app-bar-nav-icon>

        <v-spacer></v-spacer>
        <!-- @slot Use este slot para agregar botones -->
        <slot name="buttons"></slot>

        <v-btn icon @click="$_changeTheme">
            <v-icon>{{
                app ? 'mdi-weather-sunny' : 'mdi-weather-night'
            }}</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<style lang="scss" scoped>
.v-app-bar {
    backdrop-filter: blur(10px);
    .v-btn:not(.v-btn--text):not(.v-btn--outlined):focus:before {
        opacity: 0;
    }
}
@supports not (backdrop-filter: blur(10px)) {
    .theme--light .v-app-bar {
        background-color: rgba(242, 245, 248, 0.8) !important;
    }
    .theme--dark .v-app-bar {
        background-color: rgba(18, 18, 18, 0.8) !important;
    }
}
</style>

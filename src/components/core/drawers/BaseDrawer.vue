<script>
/**
 * Descripción: componente menú lateral
 *
 * @displayName BaseDrawer
 */

import { mapGetters } from 'vuex';

export default {
    name: 'BaseDrawer',

    data() {
        return {
            mini: true,
            drawer: null,
        };
    },

    computed: {
        /**
         * Nombre de Usuario
         */
        ...mapGetters('authentication', ['user']),

        ...mapGetters('navbar', ['status']),

        usernameDisplay() {
            const usernameSplit = this.user.name
                ? this.user.name.split(' ')
                : undefined;

            let username;

            if (usernameSplit && usernameSplit.length > 0) {
                username =
                    usernameSplit.length === 1
                        ? usernameSplit[0]
                        : `${usernameSplit[0]} ${usernameSplit[1].charAt(0)}.`;
            }

            return username;
        },

        initials() {
            const usernameSplit = this.user.name
                ? this.user.name.split(' ')
                : undefined;

            let username;

            if (usernameSplit && usernameSplit.length > 0) {
                username =
                    usernameSplit.length === 1
                        ? usernameSplit[0]
                        : `${usernameSplit[0].charAt(
                              0
                          )}${usernameSplit[1].charAt(0)}`;
            }

            return username;
        },
    },

    watch: {
        status() {
            this.drawer = true;
        },
    },
};
</script>

<template>
    <v-navigation-drawer
        app
        height="100%"
        v-model="drawer"
        :permanent="$vuetify.breakpoint.mdAndUp"
        :absolute="$vuetify.breakpoint.mdAndUp"
        style="max-height: 100% !important"
        :temporary="$vuetify.breakpoint.smAndDown"
    >
        <v-list-item two-line class="px-2" v-if="user">
            <v-list-item-avatar>
                <v-avatar color="yellowWarning900">
                    <span
                        class="white--text BUO-Paragraph-Medium-SemiBold"
                        v-if="user.photoUrl == undefined"
                        >{{ initials }}</span
                    >

                    <img v-else :src="user.photoUrl" alt="photoUrl" />
                </v-avatar>
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title class="BUO-Paragraph-Medium-SemiBold">{{
                    usernameDisplay
                }}</v-list-item-title>
                <v-list-item-subtitle class="BUO-Label-XSmall"
                    >BUO Backoffice</v-list-item-subtitle
                >
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <!-- @slot Agregar Contenido -->
        <slot name="container"></slot>
    </v-navigation-drawer>
</template>

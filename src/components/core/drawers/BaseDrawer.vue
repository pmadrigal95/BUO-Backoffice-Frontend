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
        v-if="$vuetify.breakpoint.smAndDown"
        temporary
        v-model="drawer"
        app
    >
        <v-list-item two-line class="px-2">
            <v-list-item-avatar>
                <v-avatar color="buoAvatar">
                    <span
                        class="white--text text-h5"
                        v-if="user.photoUrl == undefined"
                        >{{ user.name.charAt(0).toUpperCase() }}</span
                    >

                    <img v-else :src="user.photoUrl" alt="photoUrl" />
                </v-avatar>
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title>{{ user.name }}</v-list-item-title>
                <v-list-item-subtitle>Administrador</v-list-item-subtitle>
            </v-list-item-content>

            <v-btn
                icon
                @click.stop="mini = !mini"
                v-if="this.$vuetify.breakpoint.mdAndUp"
            >
                <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
        </v-list-item>

        <v-divider></v-divider>
        <!-- @slot Agregar Contenido -->
        <slot name="container"></slot>
    </v-navigation-drawer>
    <v-navigation-drawer
        v-else
        app
        permanent
        absolute
        height="100%"
        v-model="drawer"
        :mini-variant.sync="mini"
        style="max-height: 100% !important"
    >
        <v-list-item two-line class="px-2">
            <v-list-item-avatar>
                <v-avatar color="buoAvatar">
                    <span
                        class="white--text text-h5"
                        v-if="user.photoUrl == undefined"
                        >{{ user.name.charAt(0).toUpperCase() }}</span
                    >

                    <img v-else :src="user.photoUrl" alt="photoUrl" />
                </v-avatar>
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title>{{ user.name }}</v-list-item-title>
                <v-list-item-subtitle>Administrador</v-list-item-subtitle>
            </v-list-item-content>

            <v-btn
                icon
                @click.stop="mini = !mini"
                v-if="this.$vuetify.breakpoint.mdAndUp"
            >
                <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
        </v-list-item>

        <v-divider></v-divider>
        <!-- @slot Agregar Contenido -->
        <slot name="container"></slot>
    </v-navigation-drawer>
</template>

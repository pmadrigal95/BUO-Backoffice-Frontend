<script>
/**
 * Descripción: componente menú lateral
 *
 * @displayName BaseDrawer
 */

import { mapGetters, mapActions } from 'vuex';

import baseConfigHelper from '@/helpers/baseConfigHelper';

export default {
    name: 'BaseDrawer',

    data() {
        return {
            mini: false,
            drawer: null,
            search: undefined,
            count: 0,
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

        '$vuetify.breakpoint.smAndDown'(value) {
            if (value) this.mini = false;
        },
    },

    methods: {
        ...mapActions('security', ['$_security_filter']),

        filter() {
            const time = baseConfigHelper.$_DefaultTimer;
            this.count++;

            /**
             * Ejecuta una petición, en determinado tiempo
             */
            if (this.count === 1) {
                setTimeout(() => {
                    this.$_security_filter(this.search);
                    this.count = 0;
                }, time);
            }
        },

        clean() {
            this.search = undefined;
            this.filter();
        },
    },
};
</script>

<template>
    <v-navigation-drawer
        app
        height="100%"
        v-model="drawer"
        :mini-variant.sync="mini"
        :permanent="$vuetify.breakpoint.mdAndUp"
        :absolute="$vuetify.breakpoint.mdAndUp"
        style="max-height: auto !important"
        :temporary="$vuetify.breakpoint.smAndDown"
    >
        <v-list-item two-line class="px-2" v-if="user">
            <v-list-item-avatar>
                <v-avatar :color="user.colorAvatar">
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
            <v-btn
                icon
                @click.stop="mini = !mini"
                v-if="$vuetify.breakpoint.mdAndUp"
            >
                <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
        </v-list-item>

        <v-divider></v-divider>

        <div class="inputSearch" v-if="!mini">
            <BaseInput
                @keyup="filter"
                @click:clear="clean"
                placeholder="Buscar"
                dense
                rounded
                clearable
                v-model="search"
                prepend-inner-icon="mdi-magnify"
            />
        </div>

        <!-- @slot Agregar Contenido -->
        <slot name="container"></slot>
    </v-navigation-drawer>
</template>

<style>
.inputSearch {
    text-align: center;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 15px;
    margin-bottom: -30px;
}
</style>

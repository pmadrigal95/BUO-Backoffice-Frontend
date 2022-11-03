<script>
/**
 * Descripción: Componente Menú Top
 *
 * @displayName TheToolbar
 */

import { mapState, mapActions } from 'vuex';

const TheBreadcrumbs = () => import('@/layouts/app/TheBreadcrumbs');

import baseLocalHelper from '@/helpers/baseLocalHelper';

export default {
    name: 'TheToolbar',

    components: {
        TheBreadcrumbs,
    },

    props: {
        show: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            menu: false,
            showTokens: false,
            module: this.$router.currentRoute.meta.module,
            key: 0,
        };
    },

    computed: {
        /**
         * Nombre de Usuario
         */
        ...mapState('authentication', ['user']),

        ...mapState('theme', ['app']),
    },

    watch: {
        app: {
            handler(value) {
                this.$vuetify.theme.dark = value;
            },
        },

        $route() {
            this.module = this.$router.currentRoute.meta.module;
            this.key = this.key2 + 1;
        },
    },

    created() {
        this.$vuetify.theme.dark = this.app;
    },

    methods: {
        ...mapActions('navbar', ['changeStatus']),

        ...mapActions('authentication', ['logout']),

        ...mapActions('theme', ['change_mode']),

        $_goProfile() {
            alert('Hola');
        },

        $_SignOut() {
            this.logout(false);
        },

        $_changeTheme() {
            this.change_mode([baseLocalHelper.$_app, !this.app]);
        },
    },
};
</script>

<template>
    <v-app-bar
        :clipped-left="$vuetify.breakpoint.smAndUp"
        app
        elevate-on-scroll
        color="transparent"
    >
        <v-app-bar-nav-icon
            v-if="$vuetify.breakpoint.mdAndUp"
            @click="changeStatus"
            color="primary"
        ></v-app-bar-nav-icon>

        <v-toolbar-title>
            <TheBreadcrumbs :show="show" v-if="$vuetify.breakpoint.mdAndUp" />

            <v-list-item two-line v-else-if="$vuetify.breakpoint.smAndDown">
                <v-list-item-action>
                    <v-badge
                        bordered
                        bottom
                        color="success"
                        dot
                        offset-x="10"
                        offset-y="10"
                    >
                        <v-avatar size="40" color="primary">
                            <span
                                class="white--text text-h5"
                                v-if="user.photoUrl == undefined"
                                >{{ user.name.charAt(0).toUpperCase() }}</span
                            >

                            <img v-else :src="user.photoUrl" alt="photoUrl" />
                        </v-avatar>
                    </v-badge>
                </v-list-item-action>
                <v-list-item-content class="ms-n3">
                    <v-list-item-title class="BUO-Paragraph-Large">{{
                        user.name
                    }}</v-list-item-title>
                    <v-list-item-subtitle class="BUO-Paragraph-Small">
                        Administrador
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <!-- @slot Use este slot para agregar botones -->
        <slot name="buttons"></slot>

        <v-btn icon @click="$_changeTheme">
            <v-icon>{{
                app ? 'mdi-weather-sunny' : 'mdi-weather-night'
            }}</v-icon>
        </v-btn>

        <div class="text-center" v-if="$vuetify.breakpoint.mdAndUp">
            <v-menu
                v-model="menu"
                :close-on-content-click="false"
                offset-x
                bottom
                open-on-hover
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-badge
                        bordered
                        bottom
                        color="success"
                        dot
                        offset-x="10"
                        offset-y="10"
                    >
                        <v-avatar
                            size="40"
                            v-bind="attrs"
                            v-on="on"
                            color="primary"
                        >
                            <span
                                class="white--text text-h5"
                                v-if="user.photoUrl == undefined"
                                >{{ user.name.charAt(0).toUpperCase() }}</span
                            >

                            <img v-else :src="user.photoUrl" alt="photoUrl" />
                        </v-avatar>
                    </v-badge>
                </template>

                <v-card>
                    <v-list>
                        <v-list-item>
                            <v-list-item-action>
                                <v-badge
                                    bordered
                                    bottom
                                    color="success"
                                    dot
                                    offset-x="10"
                                    offset-y="10"
                                >
                                    <v-avatar size="40" color="primary">
                                        <span
                                            class="white--text text-h5"
                                            v-if="user.photoUrl == undefined"
                                            >{{
                                                user.name
                                                    .charAt(0)
                                                    .toUpperCase()
                                            }}</span
                                        >

                                        <img
                                            v-else
                                            :src="user.photoUrl"
                                            alt="photoUrl"
                                        />
                                    </v-avatar>
                                </v-badge>
                            </v-list-item-action>

                            <v-list-item-content>
                                <v-list-item-title
                                    v-if="user && user.name"
                                    class="BUO-Paragraph-Large"
                                    >{{ user.name }}</v-list-item-title
                                >
                                <v-list-item-subtitle>
                                    Administrador
                                </v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-action> </v-list-item-action>
                        </v-list-item>
                    </v-list>

                    <v-divider></v-divider>

                    <v-list class="BUO-Paragraph-Medium">
                        <v-list-item @click="$_SignOut">
                            <v-list-item-action>
                                <v-btn icon>
                                    <v-icon>mdi-logout-variant</v-icon>
                                </v-btn></v-list-item-action
                            >
                            <v-list-item-content>
                                <v-list-item-title
                                    >Cerrar Sesión</v-list-item-title
                                >
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-menu>
        </div>

        <!-- @Menu -->
        <v-app-bar-nav-icon
            v-if="$vuetify.breakpoint.smAndDown"
            @click="changeStatus"
            color="primary"
        ></v-app-bar-nav-icon>
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

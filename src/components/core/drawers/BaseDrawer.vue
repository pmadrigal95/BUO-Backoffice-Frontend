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
        ...mapGetters('authentication', [
            'user',
            'userAvatar',
            'usernameDisplay',
        ]),

        ...mapGetters('navbar', ['status']),

        ...mapGetters('theme', ['app']),
    },

    created() {
        if (!this.userAvatar) {
            this.get_user_avatar(this.user.userId);
        }
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

        ...mapActions('authentication', ['get_user_avatar']),

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
                <BaseSkeletonLoader v-if="!userAvatar" type="avatar" />
                <v-avatar :color="user.colorAvatar" v-else-if="userAvatar">
                    <span
                        class="white--text BUO-Paragraph-Medium-SemiBold"
                        v-if="userAvatar.length == 2"
                        >{{ userAvatar }}</span
                    >

                    <v-img
                        v-else
                        contain
                        :src="`data:image/jpeg;base64,${userAvatar}`"
                        :lazy-src="`data:image/jpeg;base64,${userAvatar}`"
                        alt="photoUrl"
                    >
                        <template v-slot:placeholder>
                            <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                            >
                                <v-progress-circular
                                    indeterminate
                                    color="grey lighten-5"
                                ></v-progress-circular>
                            </v-row>
                        </template>
                    </v-img>
                </v-avatar>
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title
                    class="BUO-Paragraph-Medium-SemiBold"
                    :class="[app ? 'white--text' : 'grey700--text']"
                    >{{ usernameDisplay }}</v-list-item-title
                >
                <v-list-item-subtitle
                    class="BUO-Label-XSmall"
                    :class="[app ? 'blueProgress600--text' : 'grey600--text']"
                    >{{ user.email }}</v-list-item-subtitle
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

        <section class="inputSearch" v-if="!mini">
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
        </section>

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

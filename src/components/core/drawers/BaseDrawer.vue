<script>
/**
 * Descripción: componente menú lateral
 *
 * @displayName BaseDrawer
 */

import { mapState, mapActions } from 'vuex';

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper';

export default {
    name: 'BaseDrawer',

    props: {
        status: {
            requiered: true,
        },
    },

    data: () => ({
        icons: [
            {
                icon: 'https://buo-resources.s3.us-east-2.amazonaws.com/FB.png',
                url: 'https://www.facebook.com/getbuo',
            },
            {
                icon: 'https://buo-resources.s3.us-east-2.amazonaws.com/insta.png',
                url: 'https://www.instagram.com/getbuo/',
            },
            {
                icon: 'https://buo-resources.s3.us-east-2.amazonaws.com/in.png',
                url: 'https://www.linkedin.com/company/getbuo/',
            },
        ],
    }),

    methods: {
        ...mapActions('navbar', ['changeStatus']),

        goToSocialMedia(url) {
            baseSharedFnHelper.$_openNewTab(url);
        },
    },

    computed: {
        ...mapState('theme', ['app']),
    },
};
</script>

<template>
    <v-navigation-drawer
        app
        :stateless="true"
        v-model="status"
        :clipped="
            $vuetify.breakpoint.mobile ? false : $vuetify.breakpoint.smAndUp
        "
        :right="$vuetify.breakpoint.mobile"
        :width="270"
        :temporary="$vuetify.breakpoint.mobile"
        :class="[$vuetify.breakpoint.smAndDown ? 'mobileBorder' : null]"
        color="background"
    >
        <!-- Icono Buo -->
        <div v-if="$vuetify.breakpoint.mobile" style="margin: 8%">
            <v-row justify="end" align-content="end">
                <v-layout align-end justify-end>
                    <v-col cols="10">
                        <v-img
                            contain
                            max-width="25"
                            width="100%"
                            :src="require('@/assets/app/common/buoLogo.svg')"
                        ></v-img>
                    </v-col>
                    <v-col cols="2">
                        <v-btn
                            icon
                            :color="app ? 'success' : 'primary'"
                            @click="changeStatus"
                        >
                            <v-icon large>mdi-window-close</v-icon>
                        </v-btn>
                    </v-col>
                </v-layout>
            </v-row>
        </div>
        <!-- @slot Agregar Contenido -->
        <slot name="container"></slot>

        <!-- @ Footer -->
        <template v-slot:append v-if="$vuetify.breakpoint.mobile">
            <v-row>
                <v-col cols="8" offset="1">
                    <v-btn v-for="(item, i) in icons" :key="i" icon>
                        <v-img
                            contain
                            max-width="60%"
                            width="100%"
                            @click="goToSocialMedia(item.url)"
                            :src="item.icon"
                        />
                    </v-btn>
                </v-col>
                <v-col cols="3">
                    <v-btn class="ma-1" icon>
                        <v-icon color="black">mdi-cog</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </template>
    </v-navigation-drawer>
</template>

<style scope>
.pointer {
    cursor: pointer;
}

.mobileBorder {
    border-radius: 24px 0px 0px !important;
}
</style>

<script>
/**
 * Descripción: Pantalla  BaseStadisticCardViewComponent
 *
 * @displayName BaseStadisticCardViewComponent
 *
 */
import { mapGetters } from 'vuex';

export default {
    name: 'BaseStadisticCardViewComponent',

    props: {
        title: {
            type: String,
            default: undefined,
        },

        subtitle: {
            type: String,
            default: undefined,
        },

        description: {
            type: String,
            default: undefined,
        },

        iconCard: {
            type: String,
            default: undefined,
        },

        fnCard: {
            type: Function,
            default: () => {},
        },

        directionContent: {
            type: String,
            default: 'flex-row',
        },

        justifyContent: {
            type: String,
            default: 'justify-center',
        },

        alignContent: {
            type: String,
            default: 'align-center',
        },

        colorIcon: {
            type: String,
            default: undefined,
        },

        directionIcon: {
            type: String,
            default: undefined,
        },

        titleButton: {
            type: String,
            default: undefined,
        },

        fnButton: {
            type: Function,
            default: () => {},
        },

        directionButton: {
            type: String,
            default: 'justify-end',
        },
    },

    computed: {
        ...mapGetters('theme', ['app']),
    },

    methods: {
        $_fnButton() {
            this.fnButton();
        },

        $_fnCard() {
            this.fnCard();
        },
    },
};
</script>

<template>
    <v-card flat class="rounded-lg" height="100%" width="100%">
        <v-card-title
            class="BUO-Label-Small-SemiBold"
            :class="[app ? 'white--text' : 'grey700--text']"
            v-if="title"
        >
            {{ title }}
            <v-layout justify-end v-if="iconCard">
                <v-btn icon :color="app ? 'clouds' : 'black'" @click="$_fnCard">
                    <v-icon>{{ this.iconCard }}</v-icon>
                </v-btn>
            </v-layout>
        </v-card-title>
        <v-card-text>
            <section
                class="d-flex"
                :class="`${directionContent} ${justifyContent} ${alignContent}`"
            >
                <section class="flex-grow-0 flex-shrink-0">
                    <strong
                        class="pr-4"
                        :class="[
                            app ? 'blue900--text' : 'grey700--text',
                            $vuetify.breakpoint.mobile
                                ? 'BUO-Display-XSmall'
                                : 'BUO-Display-XSmall',
                        ]"
                        >{{ this.subtitle }}</strong
                    >
                </section>

                <section class="flex-grow-1">
                    <v-icon
                        v-if="colorIcon || directionIcon"
                        :color="colorIcon"
                        >{{
                            directionIcon === 'up'
                                ? 'mdi-menu-up'
                                : 'mdi-menu-down'
                        }}</v-icon
                    >
                    <p
                        class="BUO-Label-XSmall"
                        :class="[
                            app ? 'blueProgress600--text' : 'grey700--text',
                        ]"
                    >
                        {{ this.description }}
                    </p>
                </section>
            </section>
        </v-card-text>
        <v-card-actions v-if="titleButton">
            <section class="d-flex flex-row" :class="directionButton">
                <v-btn text color="blue900" @click="$_fnButton()">{{
                    titleButton
                }}</v-btn>
            </section>
        </v-card-actions>
    </v-card>
</template>

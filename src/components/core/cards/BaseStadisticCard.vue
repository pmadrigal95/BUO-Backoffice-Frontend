<script>
/**
 * Descripción: Cards de Indicadores
 *
 * @displayName BaseStadisticCard
 */

import { mapGetters } from 'vuex';

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper';

export default {
    name: 'BaseStadisticCard',

    props: {
        title: {
            type: String,
            default: undefined,
        },

        subtitle: {
            type: String,
            default: undefined,
        },

        icon: {
            type: String,
            default: undefined,
        },

        value: {
            type: Number,
            default: undefined,
        },

        previousValue: {
            type: Number,
            default: undefined,
        },

        percentage: {
            type: Number,
            default: undefined,
        },

        isUp: {
            type: Boolean,
            default: true,
        },

        isPercentage: {
            type: Boolean,
            default: false,
        },

        fn: {
            type: Function,
            default: undefined,
        },

        color: {
            type: String,
            default: undefined,
        },
    },

    computed: {
        ...mapGetters('theme', ['app']),

        $_percentage() {
            return `${this.percentage.toFixed(2)} %`;
        },

        valueFormat() {
            return baseSharedFnHelper.$_formatNumber(this.value);
        },

        previousValueFormat() {
            return baseSharedFnHelper.$_formatNumber(this.previousValue);
        },
    },
};
</script>

<template>
    <v-hover v-slot="{ hover }" open-delay="200">
        <v-card
            flat
            min-height="130"
            :elevation="hover && fn ? 8 : 0"
            class="mx-2 rounded-lg"
            :class="{ 'on-hover': hover }"
            :hover="fn != undefined"
            :color="color"
        >
            <v-card-text
                class="pt-6 pb-2"
                @click="fn != undefined ? fn() : () => {}"
            >
                <v-layout justify-start>
                    <v-icon
                        :color="app ? 'blueProgress600' : 'blue800'"
                        large
                        class="pr-6 align-self-center"
                        >{{ `mdi-${icon}` }}</v-icon
                    >
                    <section class="align-self-center">
                        <div class="pb-4">
                            <h1
                                class="BUO-Heading-XSmall"
                                :class="[
                                    app
                                        ? 'blueProgress600--text'
                                        : 'blue800--text',
                                ]"
                            >
                                {{ valueFormat }}
                            </h1>
                            <h1
                                class="BUO-Paragraph-Small-SemiBold"
                                :class="[app ? 'white--text' : 'grey700--text']"
                            >
                                {{ subtitle }}
                            </h1>
                        </div>
                        <div>
                            <p class="grey500--text BUO-Label-XSmall">
                                {{ title }} |
                                <v-menu
                                    :close-on-content-click="false"
                                    top
                                    offset-x
                                    open-on-hover
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <span
                                            v-bind="attrs"
                                            v-on="on"
                                            style="cursor: pointer"
                                            :class="
                                                isUp
                                                    ? 'greenA800--text'
                                                    : 'redError900--text'
                                            "
                                            >{{ $_percentage }}</span
                                        >
                                    </template>
                                    <v-card width="100%" elevation="3">
                                        <v-card-text class="pt-6 pb-2">
                                            <div class="pb-4">
                                                <h1
                                                    class="BUO-Heading-XSmall"
                                                    :class="[
                                                        app
                                                            ? 'blueProgress600--text'
                                                            : 'blue800--text',
                                                    ]"
                                                >
                                                    {{ previousValueFormat }}
                                                </h1>
                                                <h1
                                                    class="BUO-Paragraph-Small-SemiBold"
                                                    :class="[
                                                        app
                                                            ? 'white--text'
                                                            : 'grey700--text',
                                                    ]"
                                                >
                                                    Periodo Anterior
                                                </h1>
                                            </div>
                                        </v-card-text>
                                    </v-card>
                                </v-menu>
                                <v-icon
                                    :color="isUp ? 'greenA800' : 'redError900'"
                                    >{{
                                        isUp ? 'mdi-menu-up' : 'mdi-menu-down'
                                    }}</v-icon
                                >
                            </p>
                        </div>
                    </section>
                </v-layout>
            </v-card-text>
        </v-card>
    </v-hover>
</template>

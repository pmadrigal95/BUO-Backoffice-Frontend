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

        fnCallback: {
            type: Function,
            default: () => {},
        },

        percentage: {
            type: Number,
            default: undefined,
        },

        isUp: {
            type: Boolean,
            default: false,
        },

        description: {
            type: String,
            default: undefined,
        },
    },

    computed: {
        ...mapGetters('theme', ['app']),
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
            <v-layout justify-end>
                <v-btn
                    icon
                    :color="app ? 'clouds' : 'black'"
                    @click="fnCallback"
                >
                    <v-icon>mdi-arrow-expand</v-icon>
                </v-btn>
            </v-layout>
        </v-card-title>
        <v-card-text>
            <section class="d-flex flex-row justify-end align-center">
                <section class="flex-grow-0 flex-shrink-0">
                    <strong
                        class="pr-4"
                        :class="[
                            app ? 'blue900--text' : 'grey700--text',
                            $vuetify.breakpoint.mobile
                                ? 'BUO-Display-XSmall'
                                : 'BUO-Display-XSmall',
                        ]"
                        >{{ this.percentage }} %</strong
                    >
                </section>

                <section class="flex-grow-1">
                    <v-icon :color="isUp ? 'redError900' : 'greenA800'">{{
                        isUp ? 'mdi-menu-up' : 'mdi-menu-down'
                    }}</v-icon>
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
    </v-card>
</template>

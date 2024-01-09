<script>
/**
 * Descripción: Pantalla  StadisticCardViewComponent
 *
 * @displayName StadisticCardViewComponent
 *
 */
import { mapGetters } from 'vuex';

export default {
    name: 'StadisticCardViewComponent',

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
    <v-card
        flat
        class="rounded-lg"
        height="178"
        :width="$vuetify.breakpoint.mobile ? '100%' : '288'"
    >
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
            <v-layout align-end>
                <div>
                    <strong
                        class="pr-4"
                        :class="[
                            app ? 'blue900--text' : 'grey700--text',
                            $vuetify.breakpoint.mobile
                                ? 'BUO-Display-XSmall'
                                : 'BUO-Display-Small',
                        ]"
                        >{{ this.percentage }} %</strong
                    >
                    <section>
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
                </div>
                <p></p>
            </v-layout>
        </v-card-text>
    </v-card>
</template>

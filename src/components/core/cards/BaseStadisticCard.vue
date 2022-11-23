<script>
/**
 * Descripción: Cards de Indicadores
 *
 * @displayName BaseStadisticCard
 */

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
    },

    computed: {
        $_percentage() {
            return `${this.percentage.toFixed(2)} %`;
        },
    },
};
</script>

<template>
    <v-card outlined flat class="rounded-lg" :hover="fn != undefined">
        <div @click="fn != undefined ? fn() : () => {}">
            <v-row>
                <v-col cols="3" align-self="center">
                    <v-avatar class="ma-3" size="82" tile>
                        <v-progress-circular
                            v-if="!isPercentage"
                            size="70"
                            width="2"
                            rotate="268"
                            value="100"
                            :color="isUp ? 'greenA900' : 'redError900'"
                            >{{ value }}
                        </v-progress-circular>
                    </v-avatar>
                </v-col>
                <v-col cols="9">
                    <v-card-text>
                        <v-row dense align-content="center" justify="start">
                            <v-col cols="12">
                                <v-icon v-if="icon" color="blue800">{{
                                    `mdi-${icon}`
                                }}</v-icon>
                                <div class="BUO-Label-XSmall">
                                    {{ title }} |
                                    <v-tooltip top>
                                        <template
                                            v-slot:activator="{ on, attrs }"
                                        >
                                            <span
                                                style="cursor: pointer"
                                                :class="
                                                    isUp
                                                        ? 'BUO-greenA900'
                                                        : 'BUO-redError900'
                                                "
                                                v-bind="attrs"
                                                v-on="on"
                                                >{{ $_percentage }}</span
                                            >
                                        </template>
                                        <div style="text-align: center">
                                            <strong>Periodo Anterior</strong>
                                            <br />
                                            <span>{{ previousValue }}</span>
                                        </div>
                                    </v-tooltip>
                                    <v-icon
                                        :color="
                                            isUp ? 'greenA900' : 'redError900'
                                        "
                                        >{{
                                            isUp
                                                ? 'mdi-menu-up'
                                                : 'mdi-menu-down'
                                        }}</v-icon
                                    >
                                </div>
                                <div class="BUO-Paragraph-Small">
                                    {{ subtitle }}
                                </div>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-col>
            </v-row>
        </div>
    </v-card>
</template>

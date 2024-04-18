<script>
/**
 * Descripción: Slider reutilizable
 *
 * @displayName BaseSlider
 */

import { mapGetters } from 'vuex';

export default {
    name: 'BaseSlider',

    inheritAttrs: false,

    props: {
        /**
         * append-icon
         * No Requerido
         */
        icon: {
            type: String,
            default: undefined,
        },

        /**
         * Label del input
         * Requerido
         */
        label: {
            type: String,
            default: undefined,
        },

        /**
         * V-model
         */
        value: {
            type: [String, Number],
        },

        /**
         * Caracteres max
         * Default: 100
         */
        max: {
            type: Number,
            default: 100,
        },

        /**
         * Caracteres min
         * Default: 0
         */
        min: {
            type: Number,
            default: 0,
        },
    },

    data() {
        return {
            counter: this.value,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        listeners() {
            return {
                ...this.$listeners,
                input: this.$_updateValue,
            };
        },

        color() {
            if (this.counter < 10) return 'blue700';
            if (this.counter < 20) return 'blue900';
            if (this.counter < 30) return 'greenC900';
            if (this.counter < 60) return 'greenB900';
            return 'greenA800';
        },
    },

    /**
     * Metodos click icon
     */
    methods: {
        $_updateValue(event) {
            this.$emit('input', event);
        },

        decrement() {
            this.counter--;
            this.$_updateValue(this.counter);
        },

        increment() {
            this.counter++;
            this.$_updateValue(this.counter);
        },

        change() {
            this.$_updateValue(this.counter);
        },
    },
};
</script>

<template>
    <v-sheet
        outlined
        rounded="xl"
        :color="app ? 'grey600' : 'grey500'"
        width="100%"
        height="100%"
    >
        <v-card flat class="mx-auto rounded-xl">
            <v-toolbar flat dense color="transparent">
                <v-toolbar-title v-if="label">
                    <span
                        class="BUO-Paragraph-Large"
                        :class="[app ? 'white--text' : 'grey700--text']"
                        >{{ label }}</span
                    >
                </v-toolbar-title>
            </v-toolbar>

            <v-card-text>
                <v-row class="mb-4" justify="space-between" align="center">
                    <v-col class="text-left">
                        <span
                            class="BUO-Display-Medium"
                            :class="[app ? 'clouds--text' : 'black--text']"
                            v-text="counter"
                        ></span>
                    </v-col>
                    <v-col class="text-right" v-if="icon">
                        <v-btn large :color="color" dark depressed fab small>
                            <v-icon>mdi-{{ icon }}</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>

                <v-slider
                    v-model="counter"
                    :color="color"
                    track-color="grey"
                    always-dirty
                    :min="min"
                    :max="max"
                    @change="change"
                >
                    <template v-slot:prepend>
                        <v-icon :color="color" @click="decrement">
                            mdi-minus-circle
                        </v-icon>
                    </template>

                    <template v-slot:append>
                        <v-icon :color="color" @click="increment">
                            mdi-plus-circle
                        </v-icon>
                    </template>
                </v-slider>
            </v-card-text>
        </v-card>
    </v-sheet>
</template>

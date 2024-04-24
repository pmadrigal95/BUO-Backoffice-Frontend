<script>
/**
 * Descripción: Pantalla  ProgressCircularComponent
 *
 * @displayName ProgressCircularComponent
 *
 */

import { mapGetters } from 'vuex';

import baseDataVisualizationColorsHelper from '@/helpers/baseDataVisualizationColorsHelper';

export default {
    name: 'ProgressCircularComponent',

    props: {
        color: {
            type: String,
            default: undefined,
        },

        title: {
            type: String,
            default: undefined,
        },

        value: {
            type: [Number, String],
            required: true,
        },

        isLandscape: {
            type: Boolean,
            default: false,
        },

        isPercentage: {
            type: Boolean,
            default: false,
        },

        maxValue: {
            type: [Number, String],
            default: 100,
        },

        width: {
            type: [Number, String],
            default: undefined,
        },

        size: {
            type: [Number, String],
            default: undefined,
        },
    },

    computed: {
        ...mapGetters('theme', ['app']),

        $_color() {
            return this.color
                ? this.color
                : this.isPercentage
                ? baseDataVisualizationColorsHelper.$_getColorByName(
                      'lightGreen'
                  ).main
                : baseDataVisualizationColorsHelper.$_getColorByName('yellow')
                      .main;
        },

        $_orientation() {
            return this.isLandscape ? 'row' : 'column';
        },

        $_size() {
            return this.size ? this.size : this.isLandscape ? 40 : 111;
        },

        $_value() {
            if (this.maxValue === 100) return this.value;

            return (this.value * 100) / this.maxValue;
        },

        $_valueDisplay() {
            return this.isPercentage ? `${this.value}%` : this.value;
        },

        $_width() {
            return this.width ? this.width : this.isLandscape ? 8 : 10;
        },
    },
};
</script>

<template>
    <v-layout
        align-center
        justify-center
        :class="`d-flex flex-${$_orientation}`"
    >
        <v-progress-circular
            :width="$_width"
            :size="$_size"
            :value="$_value"
            :color="$_color"
        >
            <span
                v-if="!isLandscape"
                class="BUO-Paragraph-Small-SemiBold"
                :class="[app ? 'white--text' : 'grey700--text']"
                >{{ $_valueDisplay }}</span
            >
        </v-progress-circular>
        <section
            class="ml-4"
            v-if="isLandscape"
            :class="[app ? 'white--text' : 'grey700--text']"
        >
            <div class="BUO-Label-Small-SemiBold">
                {{ title }}
            </div>
            <div class="BUO-Label-Small">{{ $_valueDisplay }}</div>
        </section>
        <span
            v-else-if="!isLandscape"
            class="BUO-Label-XSmall-SemiBold pt-3"
            :class="[app ? 'white--text' : 'grey700--text']"
            >{{ title }}</span
        >
    </v-layout>
</template>

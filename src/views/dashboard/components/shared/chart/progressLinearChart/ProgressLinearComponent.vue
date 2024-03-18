<script>
/**
 * Descripción: Pantalla  ProgressLinearComponent
 *
 * @displayName ProgressLinearComponent
 *
 */

import { mapGetters } from 'vuex';

import baseDataVisualizationColorsHelper from '@/helpers/baseDataVisualizationColorsHelper';

const BaseBasicCardViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/card/BaseBasicCardViewComponent'
    );

export default {
    name: 'ProgressLinearComponent',

    props: {
        title: {
            type: String,
            default: undefined,
        },

        subtitle: {
            type: String,
            default: undefined,
        },

        list: {
            type: Array,
            required: true,
        },

        showValue: {
            type: Boolean,
            default: true,
        },

        color: {
            type: String,
            default: 'lightBlue',
        },

        isOnlyChart: {
            type: Boolean,
            default: true,
        },

        chartColumns: {
            type: [Number, String],
            default: 12,
        },

        contentColumns: {
            type: [Number, String],
            default: 12,
        },
    },

    components: { BaseBasicCardViewComponent },

    data() {
        return {
            showContent: !this.isOnlyChart,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        maxValue() {
            const result = Math.max(...this.list.map((o) => o.value));

            return result > 100 ? result : 100;
        },

        md() {
            return this.showContent ? this.chartColumns : 12;
        },
    },

    methods: {
        $_getPercentage(value) {
            if (this.maxValue === 100) return value;

            return (value * 100) / this.maxValue;
        },

        $_setColor(index) {
            const color = baseDataVisualizationColorsHelper.$_getColorByName(
                this.color
            );

            if (this.showValue) return color.main;

            switch (index) {
                case 0:
                    return color.main;
                case 1:
                    return color.secondary80;
                case 2:
                    return color.secondary70;
                case 3:
                    return color.secondary60;
                case 4:
                    return color.secondary50;
                case 5:
                    return color.secondary40;
                case 6:
                    return color.secondary0;

                default:
                    return baseDataVisualizationColorsHelper.$_randomColor()
                        .main;
            }
        },
    },
};
</script>

<template>
    <BaseBasicCardViewComponent :title="title" :subtitle="subtitle">
        <section slot="top-actions">
            <v-btn
                v-if="!isOnlyChart"
                icon
                :color="app ? 'clouds' : 'black'"
                @click="showContent = !showContent"
            >
                <v-icon>{{
                    `mdi-${
                        showContent ? 'information' : 'information-off-outline'
                    }`
                }}</v-icon>
            </v-btn>
        </section>
        <section slot="card-text">
            <v-row>
                <v-col cols="12" :md="md" align-self="center">
                    <v-list dense v-if="maxValue">
                        <v-list-item v-for="(item, i) in list" :key="i">
                            <v-list-item-content>
                                <v-list-item-title>
                                    <section
                                        class="d-flex flex-no-wrap justify-space-between buo-word-break mb-2"
                                    >
                                        <span
                                            class="BUO-Paragraph-Small buo-word-break buo-white-space"
                                            :class="
                                                app
                                                    ? 'white--text'
                                                    : 'grey600--text'
                                            "
                                        >
                                            {{ item.name }}
                                        </span>
                                        <span
                                            class="BUO-Paragraph-Small buo-word-break buo-white-space"
                                            :class="
                                                app
                                                    ? 'white--text'
                                                    : 'grey600--text'
                                            "
                                            v-if="showValue"
                                        >
                                            {{ item.value }}
                                        </span>
                                    </section>
                                    <v-progress-linear
                                        rounded
                                        height="9"
                                        :value="$_getPercentage(item.value)"
                                        :background-color="
                                            showValue ? undefined : 'white'
                                        "
                                        :color="$_setColor(i)"
                                    />
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-col>
                <v-col
                    cols="12"
                    :md="contentColumns"
                    align-self="center"
                    v-if="showContent"
                >
                    <slot name="content"></slot>
                </v-col>
            </v-row>
        </section>
    </BaseBasicCardViewComponent>
</template>

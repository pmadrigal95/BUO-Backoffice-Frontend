<script>
/**
 * Descripción: Pantalla ReportViewComponent
 *
 * @displayName PreviewHeaderViewComponent
 *
 */

import { mapGetters } from 'vuex';

import baseDataVisualizationColorsHelper from '@/helpers/baseDataVisualizationColorsHelper';

export default {
    name: 'PreviewHeaderViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    computed: {
        ...mapGetters('theme', ['app']),
    },

    methods: {
        $_setColorDegradedChart(value) {
            const x = Math.round(value * 100);
            switch (true) {
                case x === 100:
                    return 'main';
                case x > 50 && x < 100:
                    return 'secondary80';
                case x === 50:
                    return 'secondary70';
                case x < 50 && x > 0:
                    return 'secondary60';
                case x === 0:
                    return 'secondary50';
                default:
                    return 'transparent';
            }
        },

        $_setChartColor(value) {
            const palette =
                baseDataVisualizationColorsHelper.$_getColorByName('darkGreen');

            const degradedColor = this.$_setColorDegradedChart(value);

            return palette[degradedColor];
        },
    },
};
</script>

<template>
    <v-list-item three-line v-if="entity && entity.preview">
        <v-list-item-avatar size="60">
            <v-progress-circular
                size="60"
                width="4"
                :value="Math.round(entity.preview.nivel * 100)"
                rotate="90"
                :color="$_setChartColor(entity.preview.nivel)"
                ><span
                    class="BUO-Label-XSmall"
                    :class="[app ? 'white--text' : 'grey700--text']"
                    >{{ entity.preview.resultado }}</span
                >
            </v-progress-circular>
        </v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-title
                class="buo-word-break buo-white-space BUO-Heading-Small"
            >
                {{ entity.preview.nombreUsuario }}
            </v-list-item-title>
            <v-list-item-subtitle
                class="BUO-Label-Small-SemiBold"
                :class="[app ? 'blueProgress600--text' : 'grey600--text']"
            >
                {{ entity.preview.nombreTipoPrueba }}
            </v-list-item-subtitle>
            <v-list-item-subtitle
                class="BUO-Label-Small-SemiBold"
                :class="[app ? 'blueProgress600--text' : 'grey600--text']"
            >
                {{ entity.preview.nombrePrueba }}
            </v-list-item-subtitle>
        </v-list-item-content>
    </v-list-item>
</template>

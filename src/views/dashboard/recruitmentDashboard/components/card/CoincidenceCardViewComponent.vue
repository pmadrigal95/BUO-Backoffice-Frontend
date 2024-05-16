<script>
/**
 * Descripción: Pantalla  CoincidenceCardViewComponent
 *
 * @displayName CoincidenceCardViewComponent
 *
 */

import baseColorConfig from '@/views/dashboard/components/shared/row-display/color-percentage-display';

const BaseBasicCardViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/card/BaseBasicCardViewComponent'
    );

const ProgressCircularComponent = () =>
    import(
        '@/views/dashboard/components/shared/chart/progressCircularChart/ProgressCircularComponent'
    );

export default {
    name: 'CoincidenceCardViewComponent',

    props: {
        chartData: {
            type: Array,
            requiered: true,
        },
    },

    components: { BaseBasicCardViewComponent, ProgressCircularComponent },

    methods: {
        $_setColor(value) {
            return baseColorConfig.$_setColor(value);
        },
    },
};
</script>

<template>
    <BaseBasicCardViewComponent
        title="Coincidencia"
        v-if="chartData.length > 0"
    >
        <v-row slot="card-text">
            <v-col
                cols="6"
                v-for="(item, i) in chartData"
                :key="i"
                class="my-auto"
            >
                <ProgressCircularComponent
                    :title="item.title"
                    :value="item.value.toFixed(2)"
                    :color="$_setColor(item.value.toFixed(2))"
                    isLandscape
                    isPercentage
                />
            </v-col>
        </v-row>
    </BaseBasicCardViewComponent>
</template>

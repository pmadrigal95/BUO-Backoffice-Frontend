<script>
/**
 * Descripción: Pantalla  StatisticalRotationCardsViewComponent
 *
 * @displayName StatisticalRotationCardsViewComponent
 *
 */

const BaseStadisticCardViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/card/BaseStadisticCardViewComponent'
    );

export default {
    name: 'StatisticalRotationCardsViewComponent',

    props: {
        chartData: {
            type: Array,
            required: true,
        },

        innerWidth: {
            type: [Number, String],
            default: undefined,
        },

        width: {
            type: String,
            default: '288px',
        },

        height: {
            type: String,
            default: '177px',
        },
    },

    components: { BaseStadisticCardViewComponent },
};
</script>

<template>
    <v-row>
        <v-slide-group>
            <v-slide-item v-for="(item, i) in chartData" :key="i">
                <v-card
                    class="transparent pt-4 mx-2"
                    elevation="0"
                    flat
                    :height="height"
                    :width="width"
                >
                    <BaseStadisticCardViewComponent
                        :title="item.title"
                        :subtitle="item.percentage"
                        :colorIcon="item.color"
                        :directionIcon="item.direction"
                        :description="item.description"
                    />
                </v-card>
            </v-slide-item>
        </v-slide-group>
    </v-row>
</template>

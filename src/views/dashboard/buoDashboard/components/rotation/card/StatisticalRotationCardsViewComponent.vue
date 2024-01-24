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
            default: '288px',
        },

        innerHeight: {
            type: [Number, String],
            default: '177px',
        },
    },

    components: { BaseStadisticCardViewComponent },

    data: () => ({
        model: null,
    }),

    computed: {
        data() {
            return [
                { title: 'Rotación a', percentage: '10%' },
                { title: 'Rotación b', percentage: '10%' },
                { title: 'Rotación c', percentage: '10%' },
                { title: 'Rotación d', percentage: '10%' },
            ];
        },
    },
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
                    :height="innerHeight"
                    :width="innerWidth"
                >
                    <BaseStadisticCardViewComponent
                        :title="item.title"
                        :subtitle="item.percentage"
                        colorIcon="greenA800"
                        directionIcon="down"
                        description="-3.5 vs el mes anterior"
                    />
                </v-card>
            </v-slide-item>
        </v-slide-group>
    </v-row>
</template>

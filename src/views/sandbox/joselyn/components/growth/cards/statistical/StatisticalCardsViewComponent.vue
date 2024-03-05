<script>
/**
 * Descripción: Pantalla  StatisticalCardsViewComponent
 *
 * @displayName StatisticalCardsViewComponent
 *
 */

const BaseStadisticCardViewComponent = () =>
    import(
        '@/views/sandbox/joselyn/components/shared/cards/BaseStadisticCardViewComponent'
    );

export default {
    name: 'StatisticalCardsViewComponent',

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

    methods: {
        $_test() {
            alert('hola');
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
                    :height="height"
                    :width="width"
                >
                    <BaseStadisticCardViewComponent
                        :title="item.title"
                        :subtitle="item.percentage"
                        :colorIcon="item.color"
                        :directionIcon="item.direction"
                        :description="item.description"
                        :type="item.type"
                        :fnButton="$_test"
                        titleButton="Ver más"
                    />
                </v-card>
            </v-slide-item>
        </v-slide-group>
    </v-row>
</template>

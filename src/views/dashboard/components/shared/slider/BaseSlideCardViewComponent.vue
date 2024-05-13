<script>
/**
 * Descripción: Pantalla  BaseSlideCardViewComponent
 *
 * @displayName BaseSlideCardViewComponent
 *
 */

const BaseStadisticCardViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/card/BaseStadisticCardViewComponent'
    );

const OpenVacantViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/recruitment/card/OpenVacantViewComponent'
    );

export default {
    name: 'BaseSlideCardViewComponent',

    props: {
        chartData: {
            type: Array,
            required: true,
        },

        width: {
            type: String,
            default: '288px',
        },

        height: {
            type: String,
            default: '177px',
        },

        type: {
            type: String,
            default: 'BaseStadisticCardViewComponent',
        },

        callback: {
            type: Function,
            default: undefined,
        },
    },

    components: { BaseStadisticCardViewComponent, OpenVacantViewComponent },
};
</script>

<template>
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
                    :title="item?.title"
                    :subtitle="item?.percentage"
                    :colorIcon="item?.color"
                    :directionIcon="item?.direction"
                    :description="item?.description"
                    v-if="type === 'BaseStadisticCardViewComponent'"
                />

                <OpenVacantViewComponent
                    :chartData="item"
                    :fn="callback ? callback : undefined"
                    class="mx-2"
                    v-else-if="type === 'OpenVacantViewComponent'"
                />
            </v-card>
        </v-slide-item>
    </v-slide-group>
</template>

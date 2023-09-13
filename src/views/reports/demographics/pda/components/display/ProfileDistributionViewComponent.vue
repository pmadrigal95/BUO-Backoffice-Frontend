<script>
/**
 * Descripción: Pantalla
 *
 * @displayName ProfileDistributionViewComponent
 *
 */

import baseDataVisualizationColorsHelper from '@/views/reports/demographics/pda/components/shared/baseDataVisualizationColorsHelper';

const BaseCardViewComponent = () =>
    import(
        '@/views/reports/demographics/pda/components/shared/BaseCardViewComponent'
    );

const StackedBarChartViewComponent = () =>
    import(
        '@/views/reports/demographics/pda/components/chart/StackedBarChartViewComponent'
    );

export default {
    name: 'ProfileDistributionViewComponent',

    props: {
        data: {
            type: Object,
            required: true,
        },
    },

    components: {
        BaseCardViewComponent,
        StackedBarChartViewComponent,
    },

    computed: {
        chartData() {
            return {
                labels: this.data.labels,
                datasets: this.data.dataSet.map((item) => this.$_setItem(item)),
            };
        },

        showLegend() {
            return this.$vuetify.breakpoint.mobile ? true : false;
        },
    },

    methods: {
        $_setItem(item) {
            return {
                label: item.label,
                data: item.data,
                backgroundColor: baseDataVisualizationColorsHelper.$_getColor({
                    profile: item.color.toLowerCase(),
                    type: 'backgroundColor',
                }),
                hoverBackgroundColor:
                    baseDataVisualizationColorsHelper.$_getColor({
                        profile: item.color.toLowerCase(),
                        type: 'hoverBackgroundColor',
                    }),
                hoverBorderColor: baseDataVisualizationColorsHelper.$_getColor({
                    profile: item.color.toLowerCase(),
                    type: 'hoverBorderColor',
                }),
                borderColor: baseDataVisualizationColorsHelper.$_getColor({
                    profile: item.color.toLowerCase(),
                    type: 'borderColor',
                }),
            };
        },
    },
};
</script>

<template>
    <BaseCardViewComponent
        title="Perfil Conductual"
        subtitle="Distribución de perfiles conductuales por área"
    >
        <section slot="body">
            <!-- <BaseSkeletonLoader v-if="!data" type="card" /> -->
            <StackedBarChartViewComponent
                :data="chartData"
                :showLegend="showLegend"
            />
        </section>
    </BaseCardViewComponent>
</template>

<script>
/**
 * Descripción: Pantalla
 *
 * @displayName ProfileAccumulatedViewComponent
 *
 */

const BaseCardViewComponent = () =>
    import(
        '@/views/reports/demographics/pda/components/shared/BaseCardViewComponent'
    );

const PieChartViewComponent = () =>
    import(
        '@/views/reports/demographics/pda/components/chart/PieChartViewComponent'
    );

export default {
    name: 'ProfileAccumulatedViewComponent',

    props: {
        isDepartmentFilter: {
            type: Boolean,
            default: false,
        },

        data: {
            type: Object,
            required: true,
        },
    },

    components: {
        BaseCardViewComponent,
        PieChartViewComponent,
    },

    computed: {
        chartData() {
            // return {
            //     labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
            //     datasets: [
            //         {
            //             backgroundColor: [
            //                 '#c5fac0',
            //                 '#fae1c0',
            //                 '#c0cefa',
            //                 '#fac0c0',
            //             ],
            //             hoverBackgroundColor: [
            //                 '#98eee2',
            //                 '#dffac0',
            //                 '#fad4c0',
            //                 '#c0faf8',
            //             ],
            //             hoverBorderColor: [
            //                 '#98eee2',
            //                 '#dffac0',
            //                 '#fad4c0',
            //                 '#c0faf8',
            //             ],
            //             borderColor: [
            //                 '#41B800',
            //                 '#E46600',
            //                 '#00D8FE',
            //                 '#DD1B00',
            //             ],
            //             data: [40, 20, 80, 10],
            //         },
            //     ],
            // };

            return {
                labels: this.data.labels,
                datasets: [{ data: this.data.data }],
            };
        },
    },
};
</script>

<template>
    <BaseCardViewComponent
        title="Perfil Conductual"
        :subtitle="`Demográfico Acumulado de Perfiles en ${
            isDepartmentFilter ? 'un área' : 'toda la empresa'
        }`"
    >
        <section slot="body">
            <!-- <BaseSkeletonLoader v-if="!data" type="card" /> -->
            <PieChartViewComponent :data="chartData" />
        </section>
    </BaseCardViewComponent>
</template>

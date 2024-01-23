<script>
/**
 * Descripción: Pantalla  DisplayViewComponent
 *
 * @displayName DisplayViewComponent
 *
 */

import httpService from '@/services/axios/httpService';

// import BaseArrayHelper from '@/helpers/baseArrayHelper';

// const WordsChartViewComponent = () =>
//     import(
//         '@/views/sandBox/components/dashboard/chart/words/WordsChartViewComponent'
//     );

// const BenefitViewComponent = () =>
//     import(
//         '@/views/sandBox/components/dashboard/chart/progress-linear/BenefitViewComponent'
//     );

// const HistoricalRotationChartComponent = () =>
//     import(
//         '@/views/sandBox/components/dashboard/chart/line/HistoricalRotationChartComponent'
//     );

// const RotationViewComponent = () =>
//     import(
//         '@/views/sandBox/components/dashboard/chart/progress-linear/RotationViewComponent'
//     );

// const ExitInterviewsChartComponent = () =>
//     import(
//         '@/views/sandBox/components/dashboard/chart/pie-doughnut/ExitInterviewsChartComponent'
//     );

// const ManagersRotationChartComponent = () =>
//     import(
//         '@/views/sandBox/components/dashboard/chart/pie-doughnut/ManagersRotationChartComponent'
//     );

// const EmployeeDeparturesChartComponent = () =>
//     import(
//         '@/views/sandBox/components/dashboard/chart/pie-doughnut/EmployeeDeparturesChartComponent'
//     );

// const DesertionSeniorityViewComponent = () =>
//     import(
//         '@/views/sandBox/components/dashboard/chart/progress-linear/DesertionSeniorityViewComponent'
//     );

// const AscendingPersonalitiesChartComponent = () =>
//     import(
//         '@/views/sandBox/components/dashboard/chart/pie-doughnut/AscendingPersonalitiesChartComponent'
//     );

export default {
    name: 'DisplayViewComponent',

    props: {
        filter: {
            type: Object,
            required: true,
        },

        innerWidth: {
            type: [Number, String],
            required: true,
        },
    },

    components: {
        // BenefitViewComponent,
        // RotationViewComponent,
        // WordsChartViewComponent,
        // ExitInterviewsChartComponent,
        // ManagersRotationChartComponent,
        // DesertionSeniorityViewComponent,
        // EmployeeDeparturesChartComponent,
        // HistoricalRotationChartComponent,
        // AscendingPersonalitiesChartComponent,
    },

    data: () => ({
        loading: false,
        entity: undefined,
    }),

    computed: {
        rowSize() {
            let size = undefined;

            switch (true) {
                case this.innerWidth <= 1024:
                    size = { one: 12, two: 12, three: 12 };
                    break;
                case this.innerWidth < 1800 && this.innerWidth > 1024:
                    size = { one: 6, two: 6, three: 6 };
                    break;
                default:
                    size = { one: 4, two: 4, three: 6 };
                    break;
            }

            return size;
        },
    },

    created() {
        this.$_getToAPi();
    },

    methods: {
        $_getToAPi() {
            this.loading = true;

            httpService
                .post('dashboard/rotacion/detalles', this.filter)
                .then((response) => {
                    this.loading = false;

                    if (response != undefined) {
                        console.log(response.data);
                        //Logica JS luego de la acción exitosa!!!
                        // this.entity = BaseArrayHelper.SetObject(
                        //     {},
                        //     response.data
                        // );
                    }
                });
        },
    },
};
</script>

<template>
    <BaseSkeletonLoader
        v-if="loading"
        type="image, date-picker-days, date-picker-days, image"
    />
    <v-row v-else>
        <v-col cols="12" md="12">
            <!-- <HistoricalRotationChartComponent /> -->
        </v-col>

        <v-col cols="12" :md="rowSize.one">
            <!-- <RotationViewComponent /> -->
        </v-col>

        <v-col cols="12" :md="rowSize.one">
            <!-- <EmployeeDeparturesChartComponent /> -->
        </v-col>

        <v-col cols="12" :md="rowSize.one">
            <!-- <WordsChartViewComponent /> -->
        </v-col>

        <v-col cols="12" :md="rowSize.two">
            <!-- <BenefitViewComponent /> -->
        </v-col>

        <v-col cols="12" :md="rowSize.two">
            <!-- <ManagersRotationChartComponent /> -->
        </v-col>

        <v-col cols="12" :md="rowSize.two">
            <!-- <ExitInterviewsChartComponent /> -->
        </v-col>

        <v-col cols="12" :md="rowSize.three">
            <!-- <AscendingPersonalitiesChartComponent /> -->
        </v-col>

        <v-col cols="12" :md="rowSize.three">
            <!-- <DesertionSeniorityViewComponent /> -->
        </v-col>
    </v-row>
</template>

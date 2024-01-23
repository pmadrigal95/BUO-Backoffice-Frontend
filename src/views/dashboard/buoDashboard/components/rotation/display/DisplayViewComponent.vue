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
        windowSize: {
            x: 0,
            y: 0,
        },
        loading: false,
        entity: undefined,
    }),

    computed: {
        rowSize() {
            return this.windowSize.x <= 1024
                ? { one: 12, two: 12, three: 12 }
                : this.windowSize.x < 1800 && this.windowSize.x > 1024
                ? { one: 6, two: 6, three: 6 }
                : { one: 4, two: 4, three: 6 };
        },
    },

    created() {
        this.$_getToAPi();
    },

    mounted() {
        this.onResize();
    },

    methods: {
        onResize() {
            this.windowSize = { x: window.innerWidth, y: window.innerHeight };
        },

        $_setFilter() {
            return {
                organizacionId: this.filter.companyId,
                departamentoId: this.filter.departmentId
                    ? this.filter.departmentId
                    : 0,
                fecha: `${this.filter.month}-01T00:00:00`,
            };
        },

        $_getToAPi() {
            this.loading = true;

            httpService
                .post('dashboard/rotacion/detalles', this.$_setFilter())
                .then((response) => {
                    this.loading = false;

                    if (response != undefined) {
                        console.log(response);
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
    <BaseSkeletonLoader v-if="loading" type="list-item" />
    <v-row v-resize="onResize" v-else>
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

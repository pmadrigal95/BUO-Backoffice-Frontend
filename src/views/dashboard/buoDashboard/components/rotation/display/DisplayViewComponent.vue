<script>
/**
 * Descripción: Pantalla  DisplayViewComponent
 *
 * @displayName DisplayViewComponent
 *
 */

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

// const WordsChartViewComponent = () =>
//     import(
//         '@/views/sandBox/components/dashboard/chart/words/WordsChartViewComponent'
//     );

const StatisticalRotationCardsViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/rotation/card/StatisticalRotationCardsViewComponent'
    );

// const BenefitViewComponent = () =>
//     import(
//         '@/views/dashboard/buoDashboard/components/rotation/chart/progressLinearChart/BenefitViewComponent'
//     );

const HistoricalRotationChartComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/rotation/chart/linealChart/HistoricalRotationChartComponent'
    );

const RotationViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/rotation/chart/progressLinearChart/RotationViewComponent'
    );

const ExitInterviewsChartComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/rotation/chart/pie/ExitInterviewsChartComponent'
    );

const ManagersRotationChartComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/rotation/chart/pie/ManagersRotationChartComponent'
    );

const EmployeeDeparturesChartComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/rotation/chart/bubbleChart/EmployeeDeparturesChartComponent'
    );

const DesertionSeniorityViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/rotation/chart/progressLinearChart/DesertionSeniorityViewComponent'
    );

const AscendingPersonalitiesChartComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/rotation/chart/bubbleChart/AscendingPersonalitiesChartComponent'
    );

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
        RotationViewComponent,
        // WordsChartViewComponent,
        ExitInterviewsChartComponent,
        ManagersRotationChartComponent,
        DesertionSeniorityViewComponent,
        EmployeeDeparturesChartComponent,
        HistoricalRotationChartComponent,
        StatisticalRotationCardsViewComponent,
        AscendingPersonalitiesChartComponent,
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
                        //Logica JS luego de la acción exitosa!!!
                        this.entity = BaseArrayHelper.SetObject(
                            {},
                            response.data
                        );
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
    <section v-else>
        <section class="my-6">
            <StatisticalRotationCardsViewComponent
                v-if="entity.cardList && entity.cardList.length > 0"
                :chartData="entity.cardList"
                :innerWidth="innerWidth"
            />
        </section>
        <v-row>
            <v-col cols="12" md="12" v-if="entity.historicUser">
                <HistoricalRotationChartComponent
                    :chartData="entity.historicUser"
                />
            </v-col>

            <v-col
                cols="12"
                :md="rowSize.one"
                v-if="
                    entity.departmentRotation &&
                    entity.departmentRotation.length > 0
                "
            >
                <RotationViewComponent :chartData="entity.departmentRotation" />
            </v-col>

            <v-col cols="12" :md="rowSize.one" v-if="entity.quantityDispersion">
                <EmployeeDeparturesChartComponent
                    :chartData="entity.quantityDispersion"
                />
            </v-col>

            <v-col cols="12" :md="rowSize.one">
                <!-- <WordsChartViewComponent /> -->
            </v-col>

            <v-col cols="12" :md="rowSize.two" v-if="entity.managersPie">
                <ManagersRotationChartComponent
                    :chartData="entity.managersPie"
                />
            </v-col>

            <v-col cols="12" :md="rowSize.two" v-if="entity.exitPie">
                <ExitInterviewsChartComponent :chartData="entity.exitPie" />
            </v-col>

            <v-col cols="12" :md="rowSize.two">
                <!-- <BenefitViewComponent /> -->
            </v-col>

            <v-col
                cols="12"
                :md="rowSize.three"
                v-if="entity.tenureProgress && entity.tenureProgress.length > 0"
            >
                <DesertionSeniorityViewComponent
                    :chartData="entity.tenureProgress"
                />
            </v-col>

            <v-col cols="12" :md="rowSize.three" v-if="entity.personalities">
                <AscendingPersonalitiesChartComponent
                    :chartData="entity.personalities"
                />
            </v-col>
        </v-row>
    </section>
</template>

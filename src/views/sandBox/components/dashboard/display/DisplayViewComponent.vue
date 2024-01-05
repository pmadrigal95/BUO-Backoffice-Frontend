<script>
/**
 * Descripción: Pantalla  DisplayViewComponent
 *
 * @displayName DisplayViewComponent
 *
 */

const WordsChartViewComponent = () =>
    import(
        '@/views/sandBox/components/dashboard/chart/words/WordsChartViewComponent'
    );

const BenefitViewComponent = () =>
    import(
        '@/views/sandBox/components/dashboard/chart/progress-linear/BenefitViewComponent'
    );

const RotationViewComponent = () =>
    import(
        '@/views/sandBox/components/dashboard/chart/progress-linear/RotationViewComponent'
    );

const ExitInterviewsChartComponent = () =>
    import(
        '@/views/sandBox/components/dashboard/chart/pie-doughnut/ExitInterviewsChartComponent'
    );

const ManagersRotationChartComponent = () =>
    import(
        '@/views/sandBox/components/dashboard/chart/pie-doughnut/ManagersRotationChartComponent'
    );

const EmployeeDeparturesChartComponent = () =>
    import(
        '@/views/sandBox/components/dashboard/chart/pie-doughnut/EmployeeDeparturesChartComponent'
    );

const DesertionSeniorityViewComponent = () =>
    import(
        '@/views/sandBox/components/dashboard/chart/progress-linear/DesertionSeniorityViewComponent'
    );

const AscendingPersonalitiesChartComponent = () =>
    import(
        '@/views/sandBox/components/dashboard/chart/pie-doughnut/AscendingPersonalitiesChartComponent'
    );

export default {
    name: 'DisplayViewComponent',

    components: {
        BenefitViewComponent,
        RotationViewComponent,
        WordsChartViewComponent,
        ExitInterviewsChartComponent,
        ManagersRotationChartComponent,
        DesertionSeniorityViewComponent,
        EmployeeDeparturesChartComponent,
        AscendingPersonalitiesChartComponent,
    },
};
</script>

<template>
    <v-row>
        <v-col cols="12" md="6">
            <RotationViewComponent />
        </v-col>

        <v-col cols="12" md="6">
            <WordsChartViewComponent />
        </v-col>

        <v-col cols="12" md="6">
            <DesertionSeniorityViewComponent />
        </v-col>

        <v-col cols="12" md="6">
            <BenefitViewComponent />
        </v-col>

        <v-col cols="12" md="12">
            <ManagersRotationChartComponent />
        </v-col>

        <v-col cols="12" md="12">
            <ExitInterviewsChartComponent />
        </v-col>

        <v-col cols="12" md="4">
            <AscendingPersonalitiesChartComponent />
        </v-col>
        <v-col cols="12" md="4">
            <AscendingPersonalitiesChartComponent />
        </v-col>
        <v-col cols="12" md="4">
            <AscendingPersonalitiesChartComponent />
        </v-col>

        <v-col cols="12" md="12">
            <EmployeeDeparturesChartComponent />
        </v-col>
    </v-row>
</template>

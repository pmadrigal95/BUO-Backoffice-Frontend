<script>
/**
 * Descripción: Pantalla  DisplayViewComponent
 *
 * @displayName DisplayViewComponent
 *
 */

const RotationViewComponent = () =>
    import(
        '@/views/sandBox/components/dashboard/chart/progress-linear/RotationViewComponent'
    );

const BenefitViewComponent = () =>
    import(
        '@/views/sandBox/components/dashboard/chart/progress-linear/BenefitViewComponent'
    );

const DesertionSeniorityViewComponent = () =>
    import(
        '@/views/sandBox/components/dashboard/chart/progress-linear/DesertionSeniorityViewComponent'
    );

export default {
    name: 'DisplayViewComponent',

    components: {
        RotationViewComponent,
        BenefitViewComponent,
        DesertionSeniorityViewComponent,
    },
};
</script>

<template>
    <v-row>
        <v-col cols="12" md="6">
            <RotationViewComponent />
        </v-col>

        <v-col cols="12" md="6">
            <BenefitViewComponent />
        </v-col>

        <v-col cols="12" md="6">
            <DesertionSeniorityViewComponent />
        </v-col>
    </v-row>
</template>

<script>
/**
 * Descripción: Pantalla  ContainerViewComponent
 *
 * @displayName ContainerViewComponent
 *
 */

const DisplayViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/recruitment/display/DisplayViewComponent'
    );

const VacantDashboardViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/recruitment/display/VacantDashboardViewComponent'
    );

export default {
    name: 'ContainerViewComponent',

    props: {
        settings: {
            type: Object,
            requiered: true,
        },
    },

    components: {
        DisplayViewComponent,
        VacantDashboardViewComponent,
    },
};
</script>

<template>
    <v-window v-model="settings.step" touchless>
        <v-window-item :value="0">
            <DisplayViewComponent :settings="settings" />
        </v-window-item>

        <v-window-item :value="1">
            <VacantDashboardViewComponent
                :settings="settings"
                v-if="settings.step === 1"
            />
        </v-window-item>
    </v-window>
</template>

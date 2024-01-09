<script>
/**
 * Descripción: Pantalla  SandBox1
 *
 * @displayName SandBox1
 *
 */

const DashboardViewComponent = () =>
    import('@/views/sandBox/components/dashboard/DashboardViewComponent');

export default {
    name: 'SandBox1',

    components: {
        DashboardViewComponent,
    },
};
</script>

<template>
    <div>
        <v-container fluid>
            <DashboardViewComponent />
        </v-container>
    </div>
</template>

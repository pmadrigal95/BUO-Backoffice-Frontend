<script>
/**
 * Descripción: Pantalla  GrowthDashboardViewComponent
 *
 * @displayName GrowthDashboardViewComponent
 *
 */

const BaseTemplateViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/template/BaseTemplateViewComponent'
    );

const ContainerViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/growth/container/ContainerViewComponent'
    );

export default {
    name: 'GrowthDashboardViewComponent',

    components: {
        BaseTemplateViewComponent,
        ContainerViewComponent,
    },

    computed: {
        type() {
            return 'growth';
        },
    },
};
</script>

<template>
    <BaseTemplateViewComponent title="Crecimiento" :type="type">
        <section slot="body">
            <ContainerViewComponent />
        </section>
    </BaseTemplateViewComponent>
</template>

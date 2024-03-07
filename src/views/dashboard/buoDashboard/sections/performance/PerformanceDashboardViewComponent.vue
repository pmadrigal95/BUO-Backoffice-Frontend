<script>
/**
 * Descripción: Pantalla  PerformanceDashboardViewComponent
 *
 * @displayName PerformanceDashboardViewComponent
 *
 */

const BaseTemplateViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/template/BaseTemplateViewComponent'
    );

const ContainerViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/performance/container/ContainerViewComponent'
    );

export default {
    name: 'PerformanceDashboardViewComponent',

    components: {
        BaseTemplateViewComponent,
        ContainerViewComponent,
    },

    computed: {
        type() {
            return 'performance';
        },
    },
};
</script>

<template>
    <BaseTemplateViewComponent title="Desempeño" :type="type">
        <section slot="body">
            <ContainerViewComponent />
        </section>
    </BaseTemplateViewComponent>
</template>

<script>
/**
 * Descripción: Pantalla  HomeDashboardViewComponent
 *
 * @displayName HomeDashboardViewComponent
 *
 */

const BaseTemplateViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/template/BaseTemplateViewComponent'
    );

const ContainerViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/home/container/ContainerViewComponent'
    );

export default {
    name: 'HomeDashboardViewComponent',

    components: {
        BaseTemplateViewComponent,
        ContainerViewComponent,
    },

    computed: {
        type() {
            return 'home';
        },
    },
};
</script>

<template>
    <BaseTemplateViewComponent title="Home" :type="type">
        <section slot="body">
            <ContainerViewComponent />
        </section>
    </BaseTemplateViewComponent>
</template>

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

// const ContainerViewComponent = () =>
//     import(
//         '@/views/dashboard/buoDashboard/components/growth/container/ContainerViewComponent'
//     );

export default {
    name: 'GrowthDashboardViewComponent',

    props: {
        innerWidth: {
            type: [Number, String],
            required: true,
        },
    },

    components: {
        BaseTemplateViewComponent,
        // ContainerViewComponent,
    },
};
</script>

<template>
    <BaseTemplateViewComponent title="Crecimiento" type="rotation">
        <section slot="body">
            <span>Hola</span>
        </section>
    </BaseTemplateViewComponent>
</template>

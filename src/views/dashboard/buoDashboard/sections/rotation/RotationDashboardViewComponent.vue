<script>
/**
 * Descripción: Pantalla  RotationDashboardViewComponent
 *
 * @displayName RotationDashboardViewComponent
 *
 */

const BaseTemplateViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/template/BaseTemplateViewComponent'
    );

const ContainerViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/rotation/container/ContainerViewComponent'
    );

export default {
    name: 'RotationDashboardViewComponent',

    props: {
        innerWidth: {
            type: [Number, String],
            required: true,
        },
    },

    components: {
        BaseTemplateViewComponent,
        ContainerViewComponent,
    },

    computed: {
        type() {
            return 'rotation';
        },
    },
};
</script>

<template>
    <BaseTemplateViewComponent title="Rotación" :type="type">
        <section slot="body">
            <ContainerViewComponent :innerWidth="innerWidth" :type="type" />
        </section>
    </BaseTemplateViewComponent>
</template>

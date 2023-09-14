<script>
/**
 * Descripción: Pantalla  demographics
 *
 * @displayName ContainerViewComponent
 *
 */

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const AdvFiltersViewComponent = () =>
    import(
        '@/views/demographics/assessments/components/filters/AdvFiltersViewComponent'
    );

export default {
    name: 'ContainerViewComponent',

    components: {
        BaseCardViewComponent,
        AdvFiltersViewComponent,
    },
};
</script>

<template>
    <BaseCardViewComponent
        title="Buo Assessments Demographics"
        subtitle="Datos que Inspiran, Decisiones que Transforman: Buo Assessments Demographics."
    >
        <div slot="card-text">
            <AdvFiltersViewComponent />
        </div>
    </BaseCardViewComponent>
</template>

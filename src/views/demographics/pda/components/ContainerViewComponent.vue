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
        '@/views/demographics/pda/components/filters/AdvFiltersViewComponent'
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
        title="Psychometric Demographics"
        subtitle="Datos que Inspiran, Decisiones que Transforman: Psychometric Demographics."
    >
        <div slot="card-text">
            <AdvFiltersViewComponent />
        </div>
    </BaseCardViewComponent>
</template>

<script>
/**
 * Descripción: Pantalla  demographics
 *
 * @displayName BuoPdaDemographicsViewComponent
 *
 */

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

export default {
    name: 'BuoPdaDemographicsViewComponent',

    components: {
        BaseCardViewComponent,
    },
};
</script>

<template>
    <BaseCardViewComponent title="Test" subtitle="Test">
        <div slot="card-text">
            <span>Hola</span>
        </div>
    </BaseCardViewComponent>
</template>

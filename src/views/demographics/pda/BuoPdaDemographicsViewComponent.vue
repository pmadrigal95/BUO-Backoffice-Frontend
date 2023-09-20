<script>
/**
 * Descripción: Pantalla  demographics
 *
 * @displayName BuoPdaDemographicsViewComponent
 *
 */

const ContainerViewComponent = () =>
    import('@/views/demographics/pda/components/ContainerViewComponent');

export default {
    name: 'BuoPdaDemographicsViewComponent',

    components: {
        ContainerViewComponent,
    },
};
</script>

<template>
    <ContainerViewComponent />
</template>

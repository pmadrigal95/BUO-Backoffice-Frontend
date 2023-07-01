<script>
/**
 * Descripción: Pantalla Filtro Habilidades
 *
 * @displayName AbilityFilterViewComponent
 *
 */
const ContainerViewComponent = () =>
    import('@/views/ability/components/filter/ContainerViewComponent');

export default {
    name: 'AbilityFilterViewComponent',

    props: {
        organizacionId: {
            type: [Number, String],
        },
    },

    components: {
        ContainerViewComponent,
    },
};
</script>

<template>
    <ContainerViewComponent :organizacionId="organizacionId" />
</template>

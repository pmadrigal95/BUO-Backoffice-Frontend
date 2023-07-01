<script>
/**
 * Descripción: Pantalla Filtro Usuarios
 *
 * @displayName UserFilterViewComponent
 *
 */

const ContainerViewComponent = () =>
    import('@/views/user/user/components/ContainerViewComponent');

export default {
    name: 'UserFilterViewComponent',

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

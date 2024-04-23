<script>
/**
 * Descripción: Pantalla Editor Usuarios
 *
 * @displayName UserEditorViewComponent
 *
 */
const ContainerViewComponent = () =>
    import('@/views/user/user/components/editor/ContainerViewComponent');

export default {
    name: 'UserEditorViewComponent',

    components: {
        ContainerViewComponent,
    },
};
</script>

<template>
    <ContainerViewComponent />
</template>

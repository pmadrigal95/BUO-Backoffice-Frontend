<script>
/**
 * Descripción: Pantalla  Seguridad
 *
 * @displayName SecurityEditorViewComponent
 *
 */

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const ContainerViewComponent = () =>
    import('@/views/security/components/editor/ContainerViewComponent');

export default {
    name: 'SecurityEditorViewComponent',

    components: {
        BaseCardViewComponent,
        ContainerViewComponent,
    },

    methods: {
        /**
         * Function to return the SecurityFilterViewComponent
         */
        $_returnToFilter() {
            this.$router.push({
                name: 'SecurityFilterViewComponent',
            });
        },
    },
};
</script>

<template>
    <BaseCardViewComponent title="Crear Permiso" :btnAction="$_returnToFilter">
        <div slot="card-text">
            <ContainerViewComponent />
        </div>
    </BaseCardViewComponent>
</template>

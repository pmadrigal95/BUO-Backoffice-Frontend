<script>
/**
 * Descripción: Pantalla  Certificaciones
 *
 * @displayName AssignmentViewComponent
 *
 */

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const ContainerViewComponent = () =>
    import('@/views/setIndicator/shared/ContainerViewComponent');

export default {
    name: 'AssignmentViewComponent',

    components: {
        BaseCardViewComponent,
        ContainerViewComponent,
    },
};
</script>

<template>
    <BaseCardViewComponent
        title="Empodera el crecimiento de tu equipo"
        subtitle="Asignación de indicadores para alcanzar el éxito."
    >
        <div slot="card-text">
            <ContainerViewComponent />
        </div>
    </BaseCardViewComponent>
</template>

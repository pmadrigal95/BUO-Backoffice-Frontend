<script>
/**
 * Descripción: Pantalla  Certificaciones
 *
 * @displayName EvaluationViewComponent
 *
 */

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const ContainerViewComponent = () =>
    import('@/views/setIndicator/shared/ContainerViewComponent');

export default {
    name: 'EvaluationViewComponent',

    components: {
        BaseCardViewComponent,
        ContainerViewComponent,
    },
};
</script>

<template>
    <BaseCardViewComponent
        title="Empodera el crecimiento de tu equipo"
        subtitle="Evaluación de indicadores para alcanzar el éxito."
    >
        <div slot="card-text">
            <ContainerViewComponent :requiredTutors="true" />
        </div>
    </BaseCardViewComponent>
</template>

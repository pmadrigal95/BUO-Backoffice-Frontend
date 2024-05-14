<script>
/**
 * Descripción: Pantalla  NotFoundCardViewComponent
 *
 * @displayName NotFoundCardViewComponent
 *
 */

const BaseNotFoundCardViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/card/BaseNotFoundCardViewComponent'
    );

export default {
    name: 'NotFoundCardViewComponent',

    props: {
        description: {
            type: String,
            default:
                'Una vez que los candidatos completen el proceso los resultados aparecerán aca.',
        },
    },

    components: { BaseNotFoundCardViewComponent },
};
</script>

<template>
    <BaseNotFoundCardViewComponent :description="description" />
</template>

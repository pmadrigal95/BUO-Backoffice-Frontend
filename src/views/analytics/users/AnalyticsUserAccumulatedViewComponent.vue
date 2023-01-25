<script>
/**
 * Descripción: Pantalla Analytics
 *
 * @displayName AnalyticsUserAccumulatedViewComponent
 */

const AnalyticsUserViewComponent = () =>
    import('@/views/analytics/users/AnalyticsUserViewComponent');

export default {
    name: 'AnalyticsUserAccumulatedViewComponent',

    components: {
        AnalyticsUserViewComponent,
    },
};
</script>

<template>
    <AnalyticsUserViewComponent endpoint="acumulados" />
</template>

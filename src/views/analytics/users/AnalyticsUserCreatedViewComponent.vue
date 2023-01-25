<script>
/**
 * Descripción: Pantalla Analytics
 *
 * @displayName AnalyticsUserCreatedViewComponent
 */

const AnalyticsUserViewComponent = () =>
    import('@/views/analytics/users/AnalyticsUserViewComponent');

export default {
    name: 'AnalyticsUserCreatedViewComponent',

    components: {
        AnalyticsUserViewComponent,
    },
};
</script>

<template>
    <AnalyticsUserViewComponent />
</template>

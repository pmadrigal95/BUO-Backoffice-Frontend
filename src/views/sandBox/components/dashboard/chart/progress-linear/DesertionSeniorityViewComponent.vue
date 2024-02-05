<script>
/**
 * Descripción: Pantalla  DesertionSeniorityViewComponent
 *
 * @displayName DesertionSeniorityViewComponent
 *
 */

const ProgressLinearComponent = () =>
    import(
        '@/views/sandBox/components/dashboard/shared/progress-linear/ProgressLinearComponent'
    );

export default {
    name: 'DesertionSeniorityViewComponent',

    components: { ProgressLinearComponent },

    computed: {
        fake() {
            return [
                { name: '10+', value: '20' },
                { name: '5-10', value: '68' },
                { name: '3-5', value: '80' },
                { name: '1-3', value: '40' },
            ];
        },
    },
};
</script>

<template>
    <ProgressLinearComponent
        title="Antigüedad de deserción (años)"
        :list="fake"
    />
</template>

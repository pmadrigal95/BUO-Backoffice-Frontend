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
                { name: '+50', value: '20' },
                { name: '40-50', value: '68' },
                { name: '30-40', value: '80' },
                { name: '20-30', value: '40' },
            ];
        },
    },
};
</script>

<template>
    <ProgressLinearComponent
        title="Antigüedad de deserción"
        subtitle="Edad"
        :list="fake"
        :showValue="false"
    />
</template>

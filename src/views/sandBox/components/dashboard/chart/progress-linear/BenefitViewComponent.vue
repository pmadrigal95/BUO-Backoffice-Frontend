<script>
/**
 * Descripción: Pantalla  BenefitViewComponent
 *
 * @displayName BenefitViewComponent
 *
 */

const ProgressLinearComponent = () =>
    import(
        '@/views/sandBox/components/dashboard/shared/progress-linear/ProgressLinearComponent'
    );

export default {
    name: 'BenefitViewComponent',

    components: { ProgressLinearComponent },

    computed: {
        fake() {
            return [
                { name: 'Beneficio 1', value: '456' },
                { name: 'Beneficio 2', value: '342' },
                { name: 'Beneficio 3', value: '300' },
                { name: 'Beneficio 4', value: '148' },
                { name: 'Beneficio 5', value: '148' },
            ];
        },
    },
};
</script>

<template>
    <ProgressLinearComponent title="Beneficios" :list="fake" />
</template>

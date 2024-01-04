<script>
/**
 * Descripción: Pantalla  RotationViewComponent
 *
 * @displayName RotationViewComponent
 *
 */

const ProgressLinearComponent = () =>
    import(
        '@/views/sandBox/components/dashboard/shared/progress-linear/ProgressLinearComponent'
    );

export default {
    name: 'RotationViewComponent',

    components: { ProgressLinearComponent },

    computed: {
        fake() {
            return [
                { name: 'Contabilidad', value: '456' },
                { name: 'Ventas', value: '342' },
                { name: 'Customer Service', value: '300' },
                { name: 'Marketing', value: '148' },
                { name: 'Mantenimiento', value: '148' },
            ];
        },
    },
};
</script>

<template>
    <ProgressLinearComponent title="Puestos con mayor rotación" :list="fake" />
</template>

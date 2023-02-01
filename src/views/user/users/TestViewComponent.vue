<script>
/**
 * Descripción: Pantalla Filtro Test
 *
 * @displayName TestFilterViewComponent
 *
 */
//const userFilter = () => import('@/views/user/UserFilterViewComponent');

const BaseInputFile = () => import('@/components/core/forms/BaseInputFile');

export default {
    name: 'TestViewComponent',
    components: {
        BaseInputFile,
    },
};
</script>

<template>
    <BaseInputFile></BaseInputFile>
</template>

<script>
/**
 * Descripción: Pantalla Filtro Test
 *
 * @displayName TestFilterViewComponent
 *
 */
const userFilter = () => import('@/views/user/UserFilterViewComponent');

export default {
    name: 'TestViewComponent',
    components: {
        userFilter,
    },
};
</script>

<template>
    <userFilter :empresa="1"></userFilter>
</template>

<script>
/**
 * Descripción: Pantalla Inicio
 *
 * @displayName HomeViewComponent
 */

export default {
    name: 'HomeViewComponent',

    mounted() {
        this.$router.push({
            name: 'PromotionalCodesFilterViewComponent',
        });
    },
};
</script>

<template>
    <div></div>
</template>

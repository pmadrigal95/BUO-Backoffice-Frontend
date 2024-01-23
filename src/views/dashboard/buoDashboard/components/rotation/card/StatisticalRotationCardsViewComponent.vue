<script>
/**
 * Descripción: Pantalla  StatisticalRotationCardsViewComponent
 *
 * @displayName StatisticalRotationCardsViewComponent
 *
 */

export default {
    name: 'StatisticalRotationCardsViewComponent',

    props: {
        chartData: {
            type: Array,
            required: true,
        },

        innerWidth: {
            type: [Number, String],
            required: true,
        },
    },

    components: {},
};
</script>

<template>
    <span>Aqui van las cartas</span>
</template>

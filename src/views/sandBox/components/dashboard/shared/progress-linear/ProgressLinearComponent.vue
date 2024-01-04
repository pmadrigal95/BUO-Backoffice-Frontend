<script>
/**
 * Descripción: Pantalla  ProgressLinearComponent
 *
 * @displayName ProgressLinearComponent
 *
 */

export default {
    name: 'ProgressLinearComponent',

    props: {
        title: {
            type: String,
            default: undefined,
        },

        entity: {
            type: Object,
            requiered: true,
        },

        // buffer-value
        bufferValue: {
            type: [Number, String],
            default: 100,
        },
    },
};
</script>

<template>
    <p>Hola</p>
</template>

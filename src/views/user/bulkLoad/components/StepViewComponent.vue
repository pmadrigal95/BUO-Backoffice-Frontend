<script>
/**
 * Descripción: Steps
 *
 * @displayName StepViewComponent
 */

export default {
    name: 'StepViewComponent',

    props: {
        description: {
            type: String,
            default: undefined,
        },

        icon: {
            type: String,
            default: undefined,
        },

        iconColor: {
            type: String,
            default: undefined,
        },

        font: {
            type: String,
            default: undefined,
        },
    },
};
</script>

<template>
    <div>
        <p :class="font">
            <v-icon class="pb-1" :color="iconColor">{{ icon }}</v-icon>
            {{ description }}
        </p>
    </div>
</template>

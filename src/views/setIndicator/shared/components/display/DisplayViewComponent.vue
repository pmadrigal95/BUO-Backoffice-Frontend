<script>
/**
 * Descripción: Pantalla Display
 *
 * @displayName DisplayViewComponent
 *
 */

export default {
    name: 'DisplayViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },

        requiredTutors: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<template>
    <v-window v-model="entity.step" touchless v-if="entity.companyId">
        <v-window-item :value="0">
            <span>0</span>
        </v-window-item>

        <v-window-item :value="1">
            <span>1</span>
        </v-window-item>

        <v-window-item :value="2">
            <span>2</span>
        </v-window-item>

        <v-window-item :value="3">
            <span>3</span>
        </v-window-item>
    </v-window>
</template>

<script>
/**
 * Descripción: Pantalla Pruebas
 *
 * @displayName HeaderAssessmentEditor
 */

export default {
    name: 'HeaderAssessmentEditor',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    methods: {
        $fnCancel() {
            this.entity.step.headerStep = 0;
        },
    },
};
</script>

<template>
    <v-slide-x-transition appear>
        <p>Editor</p>
    </v-slide-x-transition>
</template>

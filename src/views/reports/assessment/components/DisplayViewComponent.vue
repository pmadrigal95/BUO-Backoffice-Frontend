<script>
/**
 * Descripción: Pantalla Display
 *
 * @displayName DisplayViewComponent
 *
 */

const FilterViewComponent = () =>
    import('@/views/reports/assessment/components/FilterViewComponent');

export default {
    name: 'DisplayViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    components: {
        FilterViewComponent,
    },

    // data() {
    //     return {
    //         key: 0,
    //     };
    // },

    // watch: {
    //     /**
    //      * Actualizar
    //      */
    //     'entity.step': {
    //         handler() {
    //             this.key++;
    //         },
    //         immediate: true,
    //     },
    // },
};
</script>

<template>
    <v-window v-model="entity.step" touchless>
        <v-window-item :value="0">
            <FilterViewComponent />
        </v-window-item>

        <v-window-item :value="1">
            <span>Hola</span>
        </v-window-item>
    </v-window>
</template>

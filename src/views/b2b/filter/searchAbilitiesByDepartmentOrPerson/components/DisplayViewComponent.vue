<script>
/**
 * Descripción: Pantalla Busqueda de habilidades
 *
 * @displayName DisplayViewComponent
 *
 */

const AbilityCardViewComponent = () =>
    import(
        '@/views/b2b/filter/searchAbilitiesByDepartmentOrPerson/components/AbilityCardViewComponent'
    );

// const AbilityFilterViewComponent = () =>
//     import(
//         '@/views/b2b/filter/searchAbilitiesByDepartmentOrPerson/components/AbilityFilterViewComponent'
//     );

export default {
    name: 'DisplayViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    components: {
        AbilityCardViewComponent,
        //AbilityFilterViewComponent,
    },
};
</script>

<template>
    <v-window v-model="entity.step" touchless>
        <v-window-item :value="0">
            <AbilityCardViewComponent :entity="entity" />
            <!-- <AbilityFilterViewComponent :entity="entity" /> -->
        </v-window-item>
    </v-window>
</template>

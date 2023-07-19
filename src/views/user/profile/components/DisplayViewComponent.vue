<script>
/**
 * Descripción: Pantalla Busqueda de habilidades
 *
 * @displayName DisplayViewComponent
 *
 */

const FilterViewComponent = () =>
    import('@/views/user/profile/components/FilterViewComponent');

const ProfileViewComponent = () =>
    import('@/views/user/profile/components/ProfileViewComponent');

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
        ProfileViewComponent,
    },
};
</script>

<template>
    <v-window v-model="entity.step" touchless>
        <v-window-item :value="0">
            <FilterViewComponent :entity="entity" />
        </v-window-item>

        <v-window-item :value="1">
            <ProfileViewComponent :entity="entity" />
        </v-window-item>
    </v-window>
</template>

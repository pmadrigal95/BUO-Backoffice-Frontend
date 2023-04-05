<script>
/**
 * Descripción: Pantalla Busqueda de habilidades
 *
 * @displayName DisplayViewComponent
 *
 */

const FilterViewComponent = () =>
    import(
        '@/views/b2b/filter/searchPeopleByAbility/components/FilterViewComponent'
    );

const CardViewComponent = () =>
    import(
        '@/views/b2b/filter/searchPeopleByAbility/components/CardViewComponent'
    );

const ProfileViewComponent = () =>
    import(
        '@/views/b2b/filter/searchPeopleByAbility/components/ProfileViewComponent'
    );

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
        CardViewComponent,
        ProfileViewComponent,
    },

    data() {
        return {
            key: 0,
        };
    },

    watch: {
        /**
         * Actualizar
         */
        'entity.step': {
            handler() {
                this.key++;
            },
            immediate: true,
        },
    },
};
</script>

<template>
    <v-window v-model="entity.step" touchless>
        <v-window-item :value="0">
            <CardViewComponent :entity="entity" />
            <FilterViewComponent :entity="entity" />
        </v-window-item>

        <v-window-item :value="1">
            <ProfileViewComponent :entity="entity" :key="key" />
        </v-window-item>
    </v-window>
</template>

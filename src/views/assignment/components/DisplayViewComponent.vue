<script>
/**
 * Descripción: Pantalla Busqueda de habilidades
 *
 * @displayName DisplayViewComponent
 *
 */

const UserFilterViewComponent = () =>
    import('@/views/assignment/components/UserFilterViewComponent');

const AbilityFilterViewComponent = () =>
    import('@/views/assignment/components/AbilityFilterViewComponent');

const ConfirmationViewComponent = () =>
    import('@/views/assignment/components/ConfirmationViewComponent');

export default {
    name: 'DisplayViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    components: {
        UserFilterViewComponent,
        AbilityFilterViewComponent,
        ConfirmationViewComponent,
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
            <UserFilterViewComponent :entity="entity" />
        </v-window-item>

        <v-window-item :value="1">
            <AbilityFilterViewComponent :entity="entity" />
        </v-window-item>

        <v-window-item :value="2">
            <UserFilterViewComponent :entity="entity" />
        </v-window-item>

        <v-window-item :value="3">
            <ConfirmationViewComponent
                :entity="entity"
                :key="key"
                v-if="this.entity.selected"
            />
        </v-window-item>
    </v-window>
</template>

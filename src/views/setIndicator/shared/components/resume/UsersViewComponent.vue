<script>
/**
 * Descripción: Pantalla UsersViewComponent
 *
 * @displayName UsersViewComponent
 *
 */

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

const UserListDisplayViewComponent = () =>
    import(
        '@/views/setIndicator/shared/components/resume/shared/UserListDisplayViewComponent'
    );

export default {
    name: 'UsersViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },

        list: {
            type: Array,
            requiered: true,
        },

        callback: {
            type: Function,
            requiered: true,
        },
    },

    components: {
        BaseCustomsButtonsGrid,
        UserListDisplayViewComponent,
    },

    methods: {
        $_returnToUserFilter() {
            delete this.entity.selected;
            this.entity.step = 0;
        },
    },
};
</script>

<template>
    <UserListDisplayViewComponent
        :list="list"
        :callback="callback"
        v-if="list && list.length > 0"
    />
    <v-row class="ml-1" v-else>
        <v-col cols="12">
            <BaseSwitch
                :disabled="true"
                :value="true"
                label="Asignar a todos sus colaboradores."
            />
        </v-col>
        <v-col cols="12">
            <v-layout justify-center align-center>
                <BaseCustomsButtonsGrid
                    label="Buscar y seleccionar Colaboradores"
                    :fnMethod="$_returnToUserFilter"
                    icon="mdi-account-search"
                />
            </v-layout>
        </v-col>
    </v-row>
</template>

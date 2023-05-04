<script>
/**
 * Descripción: Pantalla
 *
 * @displayName UserListViewComponent
 *
 */

import baseDataVisualizationColorsHelper from '@/helpers/baseDataVisualizationColorsHelper';

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

export default {
    name: 'UserListViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    components: {
        BaseCustomsButtonsGrid,
    },

    data() {
        return {
            key: 0,
            useAllEmployees: true,
        };
    },

    methods: {
        initials(name) {
            const usernameSplit = name ? name.split(' ') : undefined;

            let username;

            if (usernameSplit && usernameSplit.length > 0) {
                username =
                    usernameSplit.length === 1
                        ? usernameSplit[0]
                        : `${usernameSplit[0].charAt(
                              0
                          )}${usernameSplit[1].charAt(0)}`;
            }

            return username;
        },

        color(index) {
            return baseDataVisualizationColorsHelper.$_getColor(index).main;
        },

        $_delete(index) {
            this.entity.selected.userList =
                this.entity.selected.userList.filter((x) => x.userId != index);
            this.key++;
        },

        $_returnToUserFilter() {
            delete this.entity.selected;
            this.entity.step = 0;
        },
    },
};
</script>

<template>
    <v-card
        flat
        height="300"
        class="overflow-auto"
        v-if="entity?.selected?.userList.length > 0"
    >
        <v-list two-line :key="key">
            <v-list-item v-for="(item, i) in entity.selected.userList" :key="i">
                <v-list-item-avatar :color="color(i)">
                    <span class="white--text BUO-Paragraph-Medium-SemiBold">{{
                        initials(item.name)
                    }}</span>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title class="BUO-Paragraph-Medium">{{
                        item.name
                    }}</v-list-item-title>

                    <v-list-item-subtitle class="BUO-Label-XSmall">{{
                        item.departamentId
                    }}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                    <v-btn icon @click="$_delete(item.userId)" class="pb-1">
                        <v-icon color="grey500"
                            >mdi-close-circle-outline</v-icon
                        >
                    </v-btn>
                </v-list-item-action>
            </v-list-item>
        </v-list>
    </v-card>
    <v-row class="ml-1" v-else>
        <v-col cols="12">
            <BaseSwitch
                :disabled="true"
                v-model="useAllEmployees"
                label="Asignar a todos sus colaboradores."
            />
        </v-col>
        <v-col cols="12">
            <BaseCustomsButtonsGrid
                label="Buscar y seleccionar Colaboradores"
                :fnMethod="$_returnToUserFilter"
                icon="mdi-account-search"
                block
            />
        </v-col>
    </v-row>
</template>

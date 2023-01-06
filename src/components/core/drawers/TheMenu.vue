<script>
/**
 * Descripción: componente menú lateral
 *
 * @displayName TheMenu
 */

import { mapGetters } from 'vuex';

const BaseDrawer = () => import('@/components/core/drawers/BaseDrawer');

export default {
    name: 'TheMenu',

    components: {
        BaseDrawer,
    },

    data() {
        return {
            tree: [],
            search: null,
            caseSensitive: false,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        ...mapGetters('security', ['permissionList', 'loadingSecurity']),

        filter() {
            return this.caseSensitive
                ? (item, search, textKey) => item[textKey].indexOf(search) > -1
                : undefined;
        },
    },
};
</script>

<template>
    <BaseDrawer>
        <div slot="container" class="BUO-Label-Small-SemiBold">
            <div class="inputSearch">
                <BaseInput
                    dense
                    rounded
                    clearable
                    v-model="search"
                    prepend-inner-icon="mdi-magnify"
                />
            </div>
            <BaseSkeletonLoader v-if="loadingSecurity" type="list-item" />
            <v-treeview
                v-else
                transition
                activatable
                v-model="tree"
                :items="permissionList"
                item-text="nombreUI"
                item-key="nombre"
                item-children="subMenu"
                :search="search"
                :filter="filter"
                :open="tree"
                open-on-click
                expand-icon="mdi-chevron-down"
            >
                <template v-slot:prepend="{ item, open }">
                    <v-icon v-if="!item.icono">
                        {{
                            open
                                ? 'mdi-folder-open-outline'
                                : 'mdi-folder-outline'
                        }}
                    </v-icon>
                    <v-icon v-else> mdi-{{ item.icono }} </v-icon>
                </template>
            </v-treeview>
            <!--<v-list dense>
                <v-list-item-group :color="app ? undefined : 'blue900'">
                    <v-list-item
                        v-for="item in items"
                        :key="item.title"
                        link
                        :to="{ name: item.module }"
                    >
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title class="BUO-Paragraph-Medium">{{
                                item.title
                            }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>-->
        </div>
    </BaseDrawer>
</template>

<style>
.inputSearch {
    text-align: center;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 15px;
    margin-bottom: -25px;
}

.v-treeview-node__label {
    flex: 1;
    font-size: inherit;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: break-spaces !important;
}
</style>

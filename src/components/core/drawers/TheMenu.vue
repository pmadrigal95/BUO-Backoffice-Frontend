<script>
/**
 * Descripción: componente menú lateral
 *
 * @displayName TheMenu
 */

import { mapState } from 'vuex';

//import httpService from '@/services/axios/httpService';

const BaseSkeletonLoader = () =>
    import('@/components/core/loaders/BaseSkeletonLoader');

const BaseDrawer = () => import('@/components/core/drawers/BaseDrawer');

export default {
    name: 'TheMenu',

    components: {
        BaseSkeletonLoader,
        BaseDrawer,
    },

    data() {
        return {
            loading: false,
            caseSensitive: false,
            search: null,
            tree: [],
            items: [
                {
                    id: 1,
                    name: 'Cerrar Sesión',
                    file: 'mdi-logout-variant',
                    path: 'LoginViewComponent',
                },
            ],
        };
    },

    watch: {
        search: {
            handler(value) {
                if (value != undefined && value != null && value != '') {
                    this.tree = [2, 7, 9, 13, 15, 18];
                } else {
                    this.tree = [];
                }
            },
        },
    },

    computed: {
        /**
         * Status Global del menú close / open
         */
        ...mapState('navbar', ['status']),

        filter() {
            return this.caseSensitive
                ? (item, search, textKey) => item[textKey].indexOf(search) > -1
                : undefined;
        },
    },

    methods: {
        $_getAction(selected) {
            if (selected.length > 0) {
                const id = selected[0];
                const route = this.$_getId(id);
                if (this.$route.name != route) {
                    this.$router.push({ name: route });
                }
            }
        },

        $_getId(id) {
            {
                let result = this.items
                    .filter((x) => x.id == id)
                    .map((e) => e.path);

                if (result.length == 0) {
                    let finalResult = [];
                    this.items.forEach((element) => {
                        if (element?.children) {
                            let dato = element?.children
                                .filter((x) => x.id == id)
                                .map((e) => e.path);
                            if (dato[0] != undefined) {
                                finalResult.push(dato[0]);
                            }
                        }
                    });
                    return finalResult[0];
                } else {
                    return result[0];
                }
            }
        },
    },
};
</script>

<template>
    <BaseDrawer :status="status">
        <div slot="container" class="BUO-Paragraph-Medium">
            <v-list-item>
                <v-list-item-content style="text-align: center">
                    <v-list-item-subtitle>
                        <v-text-field
                            outlined
                            rounded
                            dense
                            v-model="search"
                            label="Buscar Módulo"
                            flat
                            solo
                            hide-details
                            clearable
                            prepend-inner-icon="mdi-magnify"
                        ></v-text-field>
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <!-- @ Use Loanding... -->
            <BaseSkeletonLoader v-if="loading" type="list-item" />
            <!-- @ Use Menú -->
            <v-treeview
                transition
                :items="items"
                :search="search"
                :filter="filter"
                activatable
                item-text="name"
                item-key="id"
                open-on-click
                @update:active="$_getAction"
                :open="tree"
            >
                <template v-slot:prepend="{ item, open }">
                    <v-icon v-if="!item.file">
                        {{
                            open
                                ? 'mdi-folder-open-outline'
                                : 'mdi-folder-outline'
                        }}
                    </v-icon>
                    <v-icon v-else>
                        {{ item.file }}
                    </v-icon>
                </template>
            </v-treeview>
        </div>
    </BaseDrawer>
</template>

<style scope lang="sass">
.v-list-item__icon:first-child
    margin-right: 0px !important
.v-list-group__items
    margin-left: 40px !important
</style>

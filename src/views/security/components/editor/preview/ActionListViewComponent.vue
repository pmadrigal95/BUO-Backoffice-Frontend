<script>
/**
 * Descripción: Pantalla
 *
 * @displayName UserListViewComponent
 *
 */

import baseDataVisualizationColorsHelper from '@/helpers/baseDataVisualizationColorsHelper';

const DeleteItemViewComponent = () =>
    import(
        '@/views/security/components/editor/preview/DeleteItemViewComponent.vue'
    );

export default {
    name: 'ActionListViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    components: {
        DeleteItemViewComponent,
    },

    computed: {
        list() {
            return this.entity.form.tempAccionIds;
        },
    },

    methods: {
        color(index) {
            return baseDataVisualizationColorsHelper.$_getColor(index).main;
        },

        $_delete(index) {
            this.$refs.popUpDelete.$_open(index);
        },

        $_updateList(index) {
            const result = [...this.list.filter((x) => x.actionId != index)];
            this.entity.form.tempAccionIds = result;
        },
    },
};
</script>

<template>
    <section>
        <DeleteItemViewComponent ref="popUpDelete" :callback="$_updateList" />
        <v-card
            flat
            :height="list.length > 6 ? '300' : '100%'"
            class="overflow-auto"
            v-if="list.length > 0"
        >
            <v-list two-line>
                <v-list-item v-for="(item, i) in list" :key="i">
                    <v-list-item-avatar :color="color(i)">
                        <v-icon color="white"> mdi-check-circle </v-icon>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title class="BUO-Paragraph-Medium">{{
                            item.name
                        }}</v-list-item-title>

                        <v-list-item-subtitle class="BUO-Label-XSmall">{{
                            item.description
                        }}</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                        <v-btn
                            icon
                            @click="$_delete(item.actionId)"
                            class="pb-1"
                        >
                            <v-icon color="grey500"
                                >mdi-close-circle-outline</v-icon
                            >
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
            </v-list>
        </v-card>
    </section>
</template>

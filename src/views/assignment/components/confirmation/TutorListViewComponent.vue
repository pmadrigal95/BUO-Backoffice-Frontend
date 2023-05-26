<script>
/**
 * Descripción: Pantalla
 *
 * @displayName TutorListViewComponent
 *
 */

import baseDataVisualizationColorsHelper from '@/helpers/baseDataVisualizationColorsHelper';

export default {
    name: 'TutorListViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    data() {
        return {
            key: 0,
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
            this.entity.selected.tutorList =
                this.entity.selected.tutorList.filter((x) => x.userId != index);
            this.key++;
        },
    },
};
</script>

<template>
    <v-card
        flat
        height="180"
        class="overflow-auto"
        v-if="entity?.selected?.tutorList.length > 0"
    >
        <v-list two-line :key="key">
            <v-list-item
                v-for="(item, i) in entity.selected.tutorList"
                :key="i"
            >
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
</template>

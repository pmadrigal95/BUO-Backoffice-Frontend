<script>
/**
 * Descripción: componente menú lateral
 *
 * @displayName TheMenu
 */

import { mapState } from 'vuex';

//import httpService from '@/services/axios/httpService';

const BaseDrawer = () => import('@/components/core/drawers/BaseDrawer');

export default {
    name: 'TheMenu',

    components: {
        BaseDrawer,
    },

    computed: {
        ...mapState('theme', ['app']),
    },

    data() {
        return {
            items: [
                {
                    title: 'Buo Analytics',
                    icon: 'mdi-chart-box-outline',
                    module: 'AnalyticsViewComponent',
                },
                {
                    title: 'Cerrar sesión',
                    icon: 'mdi-logout-variant',
                    module: 'LoginViewComponent',
                },
            ],
        };
    },
};
</script>

<template>
    <BaseDrawer>
        <div slot="container">
            <v-list dense>
                <v-list-item-group :color="app ? undefined : 'primary'">
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
            </v-list>
        </div>
    </BaseDrawer>
</template>

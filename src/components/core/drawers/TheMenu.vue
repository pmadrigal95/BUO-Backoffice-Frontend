<script>
/**
 * Descripción: componente menú lateral
 *
 * @displayName TheMenu
 */

import { mapGetters } from 'vuex';

const BaseDrawer = () => import('@/components/core/drawers/BaseDrawer');

const TheRecursiveListMenu = () =>
    import('@/components/core/drawers/TheRecursiveListMenu');

export default {
    name: 'TheMenu',

    components: {
        BaseDrawer,
        TheRecursiveListMenu,
    },

    computed: {
        ...mapGetters('theme', ['app']),

        ...mapGetters('security', ['permissionListTEMP', 'loadingSecurity']),
    },
};
</script>

<template>
    <BaseDrawer>
        <div slot="container">
            <BaseSkeletonLoader v-if="loadingSecurity" type="list-item" />
            <TheRecursiveListMenu v-else :permissions="permissionListTEMP" />
            <v-list dense>
                <v-list-item :to="{ name: 'LoginViewComponent' }">
                    <v-list-item-icon>
                        <v-icon>mdi-login-variant</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title
                            ><span
                                class="BUO-Paragraph-Small-SemiBold"
                                :class="[app ? 'white--text' : 'grey700--text']"
                                >Cerrar sesión</span
                            ></v-list-item-title
                        >
                    </v-list-item-content>
                </v-list-item></v-list
            >
        </div>
    </BaseDrawer>
</template>

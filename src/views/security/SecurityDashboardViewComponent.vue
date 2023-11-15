<script>
/**
 * Descripción: Pantalla  Seguridad
 *
 * @displayName SecurityDashboardViewComponent
 *
 */

import { mapGetters } from 'vuex';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const RoleViewComponent = () =>
    import('@/views/security/components/dashboard/role/RoleViewComponent');

const ActionPerRoleFilterViewComponent = () =>
    import(
        '@/views/security/components/dashboard/actions/ActionPerRoleFilterViewComponent'
    );

const UserPerRoleFilterViewComponent = () =>
    import(
        '@/views/security/components/dashboard/users/UserPerRoleFilterViewComponent'
    );

export default {
    name: 'SecurityDashboardViewComponent',

    components: {
        RoleViewComponent,
        BaseCardViewComponent,
        ActionPerRoleFilterViewComponent,
        UserPerRoleFilterViewComponent,
    },

    data() {
        return {
            loading: false,
            panel: [0, 1],
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),
    },

    created() {
        if (!this.$router.currentRoute.params.Id) {
            this.$_returnToFilter();
        }
    },

    methods: {
        /**
         * Function to return the SecurityFilterViewComponent
         */
        $_returnToFilter() {
            this.$router.push({
                name: 'SecurityFilterViewComponent',
            });
        },
    },
};
</script>

<template>
    <BaseCardViewComponent
        :btnAction="$_returnToFilter"
        v-if="$router.currentRoute.params.Id"
    >
        <div slot="card-text">
            <RoleViewComponent :id="$router.currentRoute.params.Id * 1" />

            <v-card flat color="transparent" class="mt-5">
                <v-expansion-panels multiple flat v-model="panel">
                    <v-expansion-panel>
                        <v-expansion-panel-header
                            ><div
                                :class="[
                                    $vuetify.breakpoint.smAndDown
                                        ? 'BUO-Paragraph-Large'
                                        : 'BUO-Heading-Small',

                                    app
                                        ? 'blueProgress600--text'
                                        : 'blue900--text',
                                ]"
                            >
                                Acciones
                            </div></v-expansion-panel-header
                        >
                        <v-expansion-panel-content>
                            <ActionPerRoleFilterViewComponent
                                :id="$router.currentRoute.params.Id * 1"
                            />
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-header
                            ><div
                                :class="[
                                    $vuetify.breakpoint.smAndDown
                                        ? 'BUO-Paragraph-Large'
                                        : 'BUO-Heading-Small',
                                    app
                                        ? 'blueProgress600--text'
                                        : 'blue900--text',
                                ]"
                            >
                                Colaboradores
                            </div></v-expansion-panel-header
                        >
                        <v-expansion-panel-content>
                            <UserPerRoleFilterViewComponent
                                :id="$router.currentRoute.params.Id * 1"
                            />
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-card>
        </div>
    </BaseCardViewComponent>
</template>

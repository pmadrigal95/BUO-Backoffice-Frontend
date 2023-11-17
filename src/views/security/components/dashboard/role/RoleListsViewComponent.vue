<script>
/**
 * Descripción: Pantalla  Seguridad
 *
 * @displayName RoleListsViewComponent
 *
 */

import { mapGetters } from 'vuex';

const ActionPerRoleFilterViewComponent = () =>
    import(
        '@/views/security/components/dashboard/actions/ActionPerRoleFilterViewComponent'
    );

const UserPerRoleFilterViewComponent = () =>
    import(
        '@/views/security/components/dashboard/users/UserPerRoleFilterViewComponent'
    );

export default {
    name: 'RoleListsViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    components: {
        ActionPerRoleFilterViewComponent,
        UserPerRoleFilterViewComponent,
    },

    data() {
        return {
            panel: [0, 1],
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),
    },
};
</script>

<template>
    <v-card flat color="transparent" class="mt-5">
        <v-expansion-panels multiple flat v-model="panel">
            <v-expansion-panel>
                <v-expansion-panel-header
                    ><div
                        :class="[
                            $vuetify.breakpoint.smAndDown
                                ? 'BUO-Paragraph-Large'
                                : 'BUO-Heading-Small',

                            app ? 'blueProgress600--text' : 'blue900--text',
                        ]"
                    >
                        Acciones
                    </div></v-expansion-panel-header
                >
                <v-expansion-panel-content>
                    <ActionPerRoleFilterViewComponent :id="entity.id" />
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
                <v-expansion-panel-header
                    ><div
                        :class="[
                            $vuetify.breakpoint.smAndDown
                                ? 'BUO-Paragraph-Large'
                                : 'BUO-Heading-Small',
                            app ? 'blueProgress600--text' : 'blue900--text',
                        ]"
                    >
                        Colaboradores
                    </div></v-expansion-panel-header
                >
                <v-expansion-panel-content>
                    <UserPerRoleFilterViewComponent
                        :id="entity.id"
                        :organizacionId="entity.organizacionId"
                    />
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-card>
</template>

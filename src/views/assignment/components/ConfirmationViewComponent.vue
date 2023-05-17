<script>
/**
 * Descripción: Pantalla Busqueda de talento
 *
 * @displayName FilterViewComponent
 *
 */

const StepViewComponent = () =>
    import('@/views/user/bulkLoad/components/StepViewComponent');

const AbilityListViewComponent = () =>
    import(
        '@/views/assignment/components/confirmation/AbilityListViewComponent'
    );

const StatusViewComponent = () =>
    import('@/views/assignment/components/confirmation/StatusViewComponent');

const UserListViewComponent = () =>
    import('@/views/assignment/components/confirmation/UserListViewComponent');

const TutorListViewComponent = () =>
    import('@/views/assignment/components/confirmation/TutorListViewComponent');

export default {
    name: 'ConfirmationViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    components: {
        StepViewComponent,
        StatusViewComponent,
        UserListViewComponent,
        TutorListViewComponent,
        AbilityListViewComponent,
    },

    data() {
        return {
            panel: [1],
        };
    },

    methods: {
        $_goBack() {
            delete this.entity.selected.tutorList;
            this.entity.step = 2;
        },
    },
};
</script>

<template>
    <div>
        <v-layout justify-space-between>
            <StepViewComponent
                icon="mdi-numeric-4-circle"
                description="Seleccionar Micro-Indicadores"
                iconColor="greenC900"
                font="grey700--text BUO-Paragraph-Medium"
            />
            <div>
                <v-btn
                    fab
                    x-small
                    color="primary"
                    @click="$_goBack"
                    elevation="0"
                    class="mx-1"
                >
                    <v-icon dark> mdi-chevron-left </v-icon>
                </v-btn>

                <v-btn fab x-small elevation="0" disabled>
                    <v-icon dark> mdi-chevron-right </v-icon>
                </v-btn>
            </div>
        </v-layout>
        <v-expansion-panels multiple flat v-model="panel">
            <v-expansion-panel v-if="entity.selected.userList">
                <v-expansion-panel-header
                    ><div
                        :class="[
                            $vuetify.breakpoint.smAndDown
                                ? 'BUO-Paragraph-Large'
                                : 'BUO-Heading-Small',
                        ]"
                    >
                        Colaboradores
                    </div></v-expansion-panel-header
                >
                <v-expansion-panel-content>
                    <UserListViewComponent :entity="entity" />
                </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel v-if="entity.selected.abilityIdList">
                <v-expansion-panel-header
                    ><div
                        :class="[
                            $vuetify.breakpoint.smAndDown
                                ? 'BUO-Paragraph-Large'
                                : 'BUO-Heading-Small',
                        ]"
                    >
                        Indicadores
                    </div></v-expansion-panel-header
                >
                <v-expansion-panel-content>
                    <AbilityListViewComponent
                        :abilityIdList="entity.selected.abilityIdList"
                        :entity="entity"
                    />
                </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel
                v-if="
                    entity.selected.tutorList &&
                    entity.selected.tutorList.length > 0
                "
            >
                <v-expansion-panel-header
                    ><div
                        :class="[
                            $vuetify.breakpoint.smAndDown
                                ? 'BUO-Paragraph-Large'
                                : 'BUO-Heading-Small',
                        ]"
                    >
                        Supervisores
                    </div></v-expansion-panel-header
                >
                <v-expansion-panel-content>
                    <TutorListViewComponent :entity="entity" />
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
        <v-divider class="my-3"></v-divider>
        <StatusViewComponent :entity="entity" />
    </div>
</template>

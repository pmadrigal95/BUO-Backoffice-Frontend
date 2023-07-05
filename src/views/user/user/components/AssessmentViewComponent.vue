<script>
/**
 * Descripción: Pantalla Asignacion
 *
 * @displayName UserFilterViewComponent
 *
 */

import { mapGetters } from 'vuex';

const BaseInputTreeview = () =>
    import('@/components/core/treeview/BaseInputTreeview');

export default {
    name: 'AssessmentViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },

        organizacionId: {
            type: [Number, String],
        },

        fn: {
            type: Function,
            requiered: true,
        },
    },

    components: { BaseInputTreeview },

    data() {
        return {
            key: 0,
            loading: false,
            form: this.$_Object(),
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        ...mapGetters('authentication', ['user', 'buoId']),

        actions() {
            return [
                {
                    id: 1,
                    icon: 'pencil-box-outline',
                    value: 'Asignar',
                    fn: this.$_setAssessment,
                },
                {
                    id: 2,
                    icon: 'pencil-box-multiple-outline',
                    value: 'Asignación Masiva',
                    fn: this.$_setAssessments,
                },
            ];
        },
    },

    watch: {
        /**
         * Actualizar Dialog
         */
        entity: {
            handler(newValue, oldValue) {
                if (newValue && newValue.companyId) {
                    this.$_reviewStatus(newValue);
                }

                console.log(oldValue);
            },
            immediate: true,
            deep: true,
        },
    },

    methods: {
        $_Object() {
            return {
                type: undefined,
            };
        },

        $_open() {
            if (!this.$refs['popUp'].$_checkStatus()) {
                this.$refs['popUp'].$_openModal();
            }
        },

        $_setAssessment() {
            this.fn(true);
        },

        $_setAssessments() {
            this.fn();
        },

        $_delete(index) {
            this.entity.userList = this.entity?.userList.filter(
                (x) => x.userId != index
            );
            this.key++;
        },

        $_sendToApi() {},

        $_openAssessment(value) {
            if (value.userList && value.userList.length > 0) {
                this.$_open();
            }
        },

        $_openAssessments() {
            if (this.user.companyId === this.buoId && !this.organizacionId) {
                return;
            }

            this.$_open();
        },

        $_reviewStatus(value) {
            if (value.isMultiple) {
                this.$_openAssessments(value);
            } else {
                this.$_openAssessment(value);
            }
        },
    },
};
</script>

<template>
    <section>
        <BasePopUp
            ref="popUp"
            :maxWidth="$vuetify.breakpoint.mobile ? '100%' : '600'"
            scrollable
            :isDrawer="
                this.$router.currentRoute.name !==
                'CompanyDashboardViewComponent'
            "
        >
            <div slot="Content">
                <BaseSkeletonLoader v-if="loading" type="article, actions" />

                <BaseForm :method="$_sendToApi" :cancel="$_open" v-else>
                    <div slot="body">
                        <section
                            class="text-left BUO-Heading-Small mb-2"
                            :class="[
                                app ? 'blueProgress600--text' : 'blue900--text',
                            ]"
                        >
                            Asignar Assessment
                        </section>
                        <v-card outlined flat class="rounded-lg mb-5">
                            <v-card-text>
                                <v-row dense>
                                    <v-col cols="12">
                                        <BaseInputTreeview
                                            v-if="entity && entity.companyId"
                                            label="Tipo de assessment"
                                            v-model.number="form.type"
                                            itemText="nombre"
                                            itemChildren="subCategorias"
                                            :endpoint="`tipoPrueba/findAllTree/${entity.companyId}`"
                                            :validate="['requiered']"
                                        />
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                        <section
                            class="text-left BUO-Heading-Small mb-2"
                            :class="[
                                app ? 'blueProgress600--text' : 'blue900--text',
                            ]"
                        >
                            Detalles de asignación
                        </section>
                        <v-card outlined flat class="rounded-lg">
                            <v-card-text>
                                <v-row dense>
                                    <v-col cols="12">
                                        <section
                                            v-if="
                                                entity.userList &&
                                                entity?.userList.length > 0
                                            "
                                            :key="key"
                                        >
                                            <section
                                                class="text-left BUO-Paragraph-Large"
                                                :class="[
                                                    app
                                                        ? 'white--text'
                                                        : 'black--text',
                                                ]"
                                            >
                                                Colaboradores
                                            </section>
                                            <div class="pb-3">
                                                <v-chip-group column>
                                                    <div
                                                        v-for="(
                                                            item, i
                                                        ) in entity.userList"
                                                        :key="i"
                                                    >
                                                        <v-chip
                                                            :color="
                                                                app
                                                                    ? 'blueProgress600'
                                                                    : 'blue900'
                                                            "
                                                            outlined
                                                            class="py-1 BUO-Label-Small"
                                                            style="
                                                                height: auto;
                                                                white-space: normal;
                                                            "
                                                            close
                                                            close-icon="mdi-close"
                                                            @click="
                                                                $_delete(
                                                                    item.userId
                                                                )
                                                            "
                                                            @click:close="
                                                                $_delete(
                                                                    item.userId
                                                                )
                                                            "
                                                        >
                                                            {{ item.name }}
                                                        </v-chip>
                                                    </div>
                                                </v-chip-group>
                                            </div>
                                        </section>
                                        <BaseSwitch
                                            :disabled="true"
                                            v-else
                                            v-model="form.useAllEmployees"
                                            label="Asignar el assessment a todos sus
                                                colaboradores."
                                        />
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </div>
                </BaseForm>
            </div>
        </BasePopUp>

        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    :color="app ? 'blueProgress600' : 'blue900'"
                    elevation="0"
                    class="ma-1 no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                    outlined
                    small
                    v-bind="attrs"
                    v-on="on"
                >
                    Assessment
                    <v-icon right>mdi-chevron-down</v-icon>
                </v-btn>
            </template>
            <section
                class="mt-1 rounded-lg"
                :class="[app ? 'background' : 'white']"
            >
                <section v-for="action in actions" :key="action.id">
                    <v-list-item @click="action.fn" style="cursor: pointer">
                        <v-list-item-action>
                            <v-icon>{{ `mdi-${action.icon}` }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>{{
                                action.value
                            }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </section>
            </section>
        </v-menu>
    </section>
</template>

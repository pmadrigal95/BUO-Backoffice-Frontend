<script>
/**
 * Descripción: Pantalla Asignacion
 *
 * @displayName UserFilterViewComponent
 *
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import { baseFilterSettingsHelper } from '@/helpers/baseFilterSettingsHelper';

const BaseInputDataTable = () =>
    import('@/components/core/forms/BaseInputDataTable');

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

    components: { BaseInputDataTable, BaseInputTreeview },

    data() {
        return {
            key: 0,
            loading: false,
            componentKey: 0,
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

        /**
         * Extra Params
         */
        extraParams() {
            return baseFilterSettingsHelper.$_setExtraParams({
                companyId: this.entity?.companyId,
            });
        },

        /**
         * Configuracion BaseServerDataTable
         */
        assessmentSetting() {
            return baseFilterSettingsHelper.$_setAssessmentSetting({
                companyId: this.user.companyId,
                assessmentTypeId: this.form.assessmentTypeId,
                isFilter: true,
                singleSelect: true,
            });
        },
    },

    watch: {
        /**
         * Actualizar Dialog
         */
        entity: {
            handler(newValue, oldValue) {
                if (newValue && newValue.companyId && newValue != oldValue) {
                    this.$_reviewStatus(newValue);
                }
            },
            deep: true,
        },

        'entity.list': {
            handler(newValue, oldValue) {
                if (
                    newValue &&
                    newValue.length == 0 &&
                    oldValue &&
                    oldValue.length > 0
                ) {
                    if (
                        this.user.companyId === this.buoId &&
                        !this.organizacionId
                    ) {
                        this.$_close();
                    }
                }
            },
            immediate: true,
        },

        'form.assessmentTypeId': {
            handler(newValue, oldValue) {
                if (oldValue) {
                    this.$_forceUpdateComponente();
                }
            },
            immediate: true,
        },
    },

    methods: {
        $_forceUpdateComponente() {
            this.form.assessmentId = undefined;
            this.componentKey = this.componentKey + 1;
        },

        $_Object() {
            return {
                assessmentTypeId: undefined,
                assessmentId: undefined,
            };
        },

        $_open() {
            if (!this.$refs['popUp'].$_checkStatus()) {
                this.form = this.$_Object();
                this.$refs['popUp'].$_openModal();
            }
        },

        $_close() {
            if (this.$refs['popUp'].$_checkStatus()) {
                this.form = this.$_Object();
                this.$refs['popUp'].$_openModal();
            }
        },

        $_setAssessment() {
            this.fn(true);
        },

        $_setAssessments() {
            this.fn();
        },

        $_openAssessment(value) {
            if (value.list && value.list.length > 0) {
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

        $_delete(index) {
            this.entity.list = this.entity?.list.filter(
                (x) => x.userId != index
            );
            this.key++;
        },

        $_setBodyRequest() {
            return {
                usuarioIdList:
                    this.entity?.list && this.entity?.list.map((x) => x.userId),
                pruebaId: this.form.assessmentId,
                usuarioModificaId: this.user.userId,
                organizacionId: this.entity?.companyId,
            };
        },

        $_sendToApi() {
            this.loading = true;
            httpService
                .post('usuarioPrueba/assign', this.$_setBodyRequest())
                .then((response) => {
                    if (response != undefined) {
                        this.$_close();
                    }
                    this.loading = false;
                });
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
            <div slot="Content" v-if="entity">
                <BaseSkeletonLoader v-if="loading" type="article, actions" />

                <BaseForm
                    v-else
                    :cancel="$_close"
                    labelBtn="Asignar"
                    :method="$_sendToApi"
                >
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
                                            v-model.number="
                                                form.assessmentTypeId
                                            "
                                            itemText="nombre"
                                            itemChildren="subTipos"
                                            :endpoint="`tipoPrueba/findAllTree/${entity.companyId}`"
                                            :validate="['requiered']"
                                        />
                                    </v-col>
                                    <v-col cols="12">
                                        <BaseInputDataTable
                                            v-if="entity"
                                            label="Assessment"
                                            :setting="assessmentSetting"
                                            :extraParams="extraParams"
                                            itemText="nombre"
                                            :readonly="!form.assessmentTypeId"
                                            v-model.number="form.assessmentId"
                                            :validate="['requiered']"
                                            :key="componentKey"
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
                                                entity.list &&
                                                entity?.list.length > 0
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
                                                        ) in entity.list"
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
                                        <section class="text-left" v-else>
                                            <v-list-item
                                                Two-line
                                                class="buo-headerAbility-position"
                                            >
                                                <v-list-item-avatar size="45">
                                                    <v-icon
                                                        color="primary"
                                                        size="45"
                                                        >mdi-alert-circle-outline</v-icon
                                                    >
                                                </v-list-item-avatar>
                                                <v-list-item-content
                                                    class="ms-n2"
                                                >
                                                    <v-list-item-title
                                                        ><span
                                                            class="BUO-Paragraph-Medium-SemiBold buo-white-space"
                                                            :class="[
                                                                app
                                                                    ? 'white--text'
                                                                    : 'grey700--text',
                                                            ]"
                                                        >
                                                            Asignación masiva de
                                                            assessment</span
                                                        >
                                                    </v-list-item-title>
                                                    <v-list-item-subtitle
                                                        style="
                                                            white-space: normal !important;
                                                        "
                                                    >
                                                        <section
                                                            class="BUO-Label-XSmall buo-word-break"
                                                            :class="[
                                                                app
                                                                    ? 'blueProgress600--text'
                                                                    : 'grey600--text',
                                                            ]"
                                                        >
                                                            El assessment
                                                            selecionado se
                                                            asignará a todos los
                                                            colaboradores de la
                                                            empresa.
                                                        </section>
                                                    </v-list-item-subtitle>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </section>
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

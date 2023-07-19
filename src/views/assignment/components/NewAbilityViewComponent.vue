<script>
/**
 * Descripción: Pantalla Busqueda de talento
 *
 * @displayName FilterViewComponent
 *
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import { baseFilterSettingsHelper } from '@/helpers/baseFilterSettingsHelper';

import baseConfigHelper from '@/helpers/baseConfigHelper';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

const BaseInputDataTable = () =>
    import('@/components/core/forms/BaseInputDataTable');

const BaseInputTreeview = () =>
    import('@/components/core/treeview/BaseInputTreeview');

export default {
    name: 'NewAbilityViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },

        fn: {
            type: Function,
            requiered: true,
        },
    },

    components: {
        BaseCustomsButtonsGrid,
        BaseInputDataTable,
        BaseInputTreeview,
    },

    data() {
        return {
            form: this.$_Object(),
            needTutor: false,
            key: 0,
            view: 0,
            loading: false,
            formModal: 1,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        ...mapGetters('authentication', ['user']),

        extraParams() {
            return (
                this.entity.companyId &&
                baseFilterSettingsHelper.$_setExtraParams({
                    companyId: this.entity.companyId,
                })
            );
        },

        userSetting() {
            return baseFilterSettingsHelper.$_setUserSetting({
                companyId: this.entity.companyId,
                departmentId: this.entity.departmentId,
                singleSelect: false,
            });
        },

        statusList() {
            return [
                {
                    name: 'Sin validar',
                    id: baseConfigHelper.$_statusCode.uncertified,
                },
                {
                    name: 'Validando',
                    id: baseConfigHelper.$_statusCode.certifying,
                },
                {
                    name: 'Validado',
                    id: baseConfigHelper.$_statusCode.certificate,
                },
                {
                    name: 'Rechazado',
                    id: baseConfigHelper.$_statusCode.rejected,
                },
            ];
        },
    },

    methods: {
        $_Object() {
            return {
                comment: undefined,
                statusID: undefined,
                sendNotification: true,
                useAllEmployees: true,
                tutors: undefined,
                ability: {
                    definicion: undefined,
                    categoriaId: undefined,
                },
            };
        },

        $_setUserIdList() {
            this.form.userIds = this.entity.selected.userList.map(
                (x) => x.userId
            );
        },

        $_setObject() {
            delete this.form.userIds;

            this.$_setUserIdList();
        },

        $_requestObject() {
            return {
                organizacionId: this.entity.companyId,
                userIds: this.form.userIds,
                ability: {
                    definicion: this.form.ability.definicion,
                    categoriaId: this.form.ability.categoriaId,
                },
                estadoId: this.form.statusID,
                comentario: this.form.comment,
                enviarNotificacion: this.form.sendNotification === true,
                useAllEmployees: !this.form.userIds.length > 0,
                tutors: this.needTutor
                    ? this.form.tutors.length > 0 && this.form.tutors
                    : undefined,
                usuarioModificaId: this.user.userId,
            };
        },

        $_sendRequest() {
            this.loading = true;

            httpService
                .post('wallet/assignAndCreate', this.$_requestObject())
                .then((response) => {
                    this.loading = false;
                    if (response != undefined) {
                        if (this.$refs['popUp'].$_checkStatus()) {
                            this.$_open();
                        }
                    }
                });
        },

        $_validateTutors() {
            if (!this.needTutor) {
                delete this.form.tutors;
                return false;
            }

            return this.form.userIds.some((r) => this.form.tutors.includes(r));
        },

        $_sendToApi() {
            this.$_setObject();

            if (this.$_validateTutors()) {
                baseNotificationsHelper.Message(
                    true,
                    '¡Cuidado!, No puedes asignar un supervisor si lo has seleccionado previamente para asignar un indicador.'
                );
                return;
            }

            this.$_sendRequest();
        },

        $_tryOpen() {
            this.fn();
            if (
                this.entity &&
                this.entity?.selected?.userList &&
                this.entity?.selected?.userList.length > 0
            ) {
                this.$_open();
                this.$_changeModal(true);
            }
        },

        $_open() {
            this.form = this.$_Object();
            this.view++;
            this.$refs['popUp'].$_openModal();
        },

        $_delete(index) {
            this.entity.selected.userList =
                this.entity.selected.userList.filter((x) => x.userId != index);
            this.key++;
        },

        $_changeModal(value) {
            this.formModal = value;
        },

        $_massiveOpen() {
            this.$_changeModal(false);
            this.$_open();
        },

        $_setUserListEmpty() {
            const result = this.entity?.selected?.userList != undefined;
            if (result) {
                this.entity.selected.userList = [];
            } else {
                this.entity.selected = {
                    userList: [],
                };
            }
        },

        $_massiveUserToNewAbility() {
            this.$_setUserListEmpty();
            this.$_changeModal(true);
        },

        $_massiveUserToAbility() {
            this.$_setUserListEmpty();
            this.$_open();
            this.entity.step = 1;
        },
    },
};
</script>

<template>
    <section v-if="entity.companyId">
        <BasePopUp
            ref="popUp"
            :maxWidth="$vuetify.breakpoint.mobile ? '100%' : '600'"
            scrollable
        >
            <div slot="Content" :key="view">
                <div v-if="formModal">
                    <BaseSkeletonLoader
                        v-if="loading"
                        type="article, actions"
                    />
                    <BaseForm :method="$_sendToApi" :cancel="$_open" v-else>
                        <div slot="body" :key="view">
                            <section
                                class="text-left BUO-Heading-Small mb-2"
                                :class="[
                                    app
                                        ? 'blueProgress600--text'
                                        : 'blue900--text',
                                ]"
                            >
                                Crear nuevo Indicador
                            </section>
                            <v-card outlined flat class="rounded-lg mb-5">
                                <v-card-text>
                                    <v-row dense>
                                        <v-col cols="12">
                                            <BaseInput
                                                label="Definición"
                                                :max="200"
                                                v-model.trim="
                                                    form.ability.definicion
                                                "
                                                :validate="['text']"
                                            />
                                        </v-col>
                                        <v-col cols="12">
                                            <BaseInputTreeview
                                                label="Categoría"
                                                v-model.number="
                                                    form.ability.categoriaId
                                                "
                                                :readonly="!entity.companyId"
                                                :editText="
                                                    form.ability.nombreCategoria
                                                "
                                                itemText="nombre"
                                                itemChildren="subCategorias"
                                                :endpoint="`categoria/findAllTree/${entity.companyId}`"
                                                :validate="['requiered']"
                                            />
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                            <section
                                class="text-left BUO-Heading-Small mb-2"
                                :class="[
                                    app
                                        ? 'blueProgress600--text'
                                        : 'blue900--text',
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
                                                    entity?.selected?.userList
                                                        .length > 0
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
                                                            ) in entity.selected
                                                                .userList"
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
                                                label="Asignar el nuevo
                                                indicador a todos sus
                                                colaboradores."
                                            />
                                        </v-col>
                                        <v-col cols="12">
                                            <BaseSwitch
                                                v-model="needTutor"
                                                label="Delegar Supervisión."
                                            />
                                        </v-col>
                                        <v-col cols="12" v-if="needTutor">
                                            <BaseInputDataTable
                                                label="Supervisor(es)"
                                                :extraParams="extraParams"
                                                :readonly="!extraParams"
                                                itemText="nombreCompleto"
                                                :setting="userSetting"
                                                v-model="form.tutors"
                                                :validate="['requiered']"
                                            />
                                        </v-col>
                                        <v-col cols="12">
                                            <BaseTextArea
                                                label="Comentario"
                                                v-model.trim="form.comment"
                                                :validate="['optionalText']"
                                                :max="255"
                                                :min="1"
                                                counter="255"
                                            />
                                        </v-col>
                                        <v-col cols="12">
                                            <v-tooltip top>
                                                <template
                                                    v-slot:activator="{
                                                        on,
                                                        attrs,
                                                    }"
                                                >
                                                    <div
                                                        v-bind="attrs"
                                                        v-on="on"
                                                    >
                                                        <BaseSwitch
                                                            v-model="
                                                                form.sendNotification
                                                            "
                                                            label="Enviar notificación."
                                                        />
                                                    </div>
                                                </template>
                                                <span
                                                    >La opción de enviar
                                                    notificación a los
                                                    colaboradores
                                                    <strong
                                                        >solo se tomará en
                                                        cuenta si el estado es
                                                        sin validar
                                                    </strong></span
                                                >
                                            </v-tooltip>
                                        </v-col>
                                        <v-col cols="12">
                                            <BaseRadioGroup
                                                v-model="form.statusID"
                                                :endpoint="statusList"
                                                :validate="['requiered']"
                                            />
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </div>
                    </BaseForm>
                </div>
                <section class="pt-5" v-else>
                    <section
                        class="text-left BUO-Heading-Small mb-2"
                        :class="[
                            app ? 'blueProgress600--text' : 'blue900--text',
                        ]"
                    >
                        Asignación Masiva
                    </section>
                    <section
                        class="text-left BUO-Paragraph-Medium black--text mb-2"
                        :class="[app ? 'white--text' : 'black--text']"
                    >
                        La asignación masiva de colaboradores permite asignar o
                        reasignar nuevos indicadores o indicadores existentes de
                        una manera eficaz.
                    </section>
                    <v-card outlined flat class="rounded-lg mt-5">
                        <v-card-subtitle class="text-left">
                            Sí desea asignar a todos sus colaboradores, debe
                            seleccionar alguna de las siguientes opciones.
                        </v-card-subtitle>
                        <v-card-text>
                            <BaseCustomsButtonsGrid
                                :outlined="false"
                                label="Asignar nuevo Indicador"
                                :fnMethod="$_massiveUserToNewAbility"
                                icon="mdi-shield-plus"
                                block
                            />

                            <BaseCustomsButtonsGrid
                                :outlined="false"
                                label="Asignar Indicador existente"
                                :fnMethod="$_massiveUserToAbility"
                                icon="mdi-shield"
                                block
                                class="mt-5"
                            />
                        </v-card-text>
                    </v-card>
                </section>
            </div>
        </BasePopUp>

        <BaseCustomsButtonsGrid
            label="Crear nuevo Indicador"
            :fnMethod="$_tryOpen"
            icon="mdi-shield"
            :color="app ? 'blueProgress600' : 'blue800'"
        />

        <BaseCustomsButtonsGrid
            label="Asignación Masiva"
            :fnMethod="$_massiveOpen"
            icon="mdi-office-building-plus"
            :color="app ? 'blueProgress600' : 'blue800'"
        />
    </section>
</template>

<script>
/**
 * Descripción: Pantalla Busqueda de talento
 *
 * @displayName FilterViewComponent
 *
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import baseConfigHelper from '@/helpers/baseConfigHelper';

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

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
        BaseInputTreeview,
    },

    data() {
        return {
            form: this.$_Object(),
            key: 0,
            view: 0,
            loading: false,
            formModal: 1,
        };
    },

    computed: {
        ...mapGetters('authentication', ['user']),

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
                organizacionId: this.entity.organizacionId,
                userIds: this.form.userIds,
                ability: {
                    definicion: this.form.ability.definicion,
                    categoriaId: this.form.ability.categoriaId,
                },
                estadoId: this.form.statusID,
                comentario: this.form.comment,
                enviarNotificacion: this.form.sendNotification,
                useAllEmployees: !this.form.userIds.length > 0,
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

        $_sendToApi() {
            this.$_setObject();

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
    <div v-if="entity.organizacionId">
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
                            <div
                                class="text-left BUO-Heading-Small blue900--text mb-2"
                            >
                                Crear nuevo Indicador
                            </div>
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
                                                :readonly="
                                                    !entity.organizacionId
                                                "
                                                :editText="
                                                    form.ability.nombreCategoria
                                                "
                                                itemText="nombre"
                                                itemChildren="subCategorias"
                                                :endpoint="`categoria/findAllTree/${entity.organizacionId}`"
                                                :validate="['requiered']"
                                            />
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                            <div
                                class="text-left BUO-Heading-Small blue900--text mb-2"
                            >
                                Detalles de asignación
                            </div>
                            <v-card outlined flat class="rounded-lg">
                                <v-card-text>
                                    <v-row dense>
                                        <v-col cols="12">
                                            <div
                                                v-if="
                                                    entity?.selected?.userList
                                                        .length > 0
                                                "
                                                :key="key"
                                            >
                                                <div
                                                    class="text-left BUO-Paragraph-Large black--text"
                                                >
                                                    Colaboradores
                                                </div>
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
                                                                class="py-1 black--text BUO-Label-Small"
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
                                            </div>
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
                                            <BaseSwitch
                                                v-model="form.sendNotification"
                                                label="Enviar notificación."
                                            />
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
                <div class="pt-5" v-else>
                    <div class="text-left BUO-Heading-Small blue900--text mb-2">
                        Asignación Masiva
                    </div>
                    <div
                        class="text-left BUO-Paragraph-Medium black--text mb-2"
                    >
                        La asignación masiva de colaboradores permite asignar o
                        reasignar nuevos indicadores o indicadores existentes de
                        una manera eficaz.
                    </div>
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
                </div>
            </div>
        </BasePopUp>
        <BaseCustomsButtonsGrid
            label="Crear nuevo Indicador"
            :fnMethod="$_tryOpen"
            icon="mdi-shield"
        />

        <BaseCustomsButtonsGrid
            label="Asignación Masiva"
            :fnMethod="$_massiveOpen"
            icon="mdi-office-building-plus"
        />
    </div>
</template>

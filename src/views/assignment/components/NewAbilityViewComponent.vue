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

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

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
        };
    },

    computed: {
        ...mapGetters('authentication', ['user']),

        statusList() {
            return [
                {
                    name: 'Sin certificar',
                    id: baseConfigHelper.$_statusCode.uncertified,
                },
                {
                    name: 'Certificando',
                    id: baseConfigHelper.$_statusCode.certifying,
                },
                {
                    name: 'Certificado',
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
                ability: {
                    definicion: undefined,
                    categoriaId: undefined,
                },
            };
        },

        $_validateEntity() {
            let result =
                this.form.userIds.length > 0 &&
                this.entity.selected.userList.length > 0;

            return result;
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

            if (this.$_validateEntity()) {
                this.$_sendRequest();
            } else {
                baseNotificationsHelper.Message(
                    true,
                    'Es requerido al menos un colaborador para realizar la acción'
                );
            }
        },

        $_tryOpen() {
            this.fn();
            if (this.entity && this.entity?.selected?.userList.length > 0) {
                this.form = this.$_Object();
                this.$_open();
                this.view++;
            }
        },

        $_open() {
            this.$refs['popUp'].$_openModal();
        },

        $_delete(index) {
            this.entity.selected.userList =
                this.entity.selected.userList.filter((x) => x.userId != index);
            this.key++;
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
            <div slot="Content">
                <BaseSkeletonLoader v-if="loading" type="article, actions" />
                <BaseForm :method="$_sendToApi" :cancel="$_open" v-else>
                    <div slot="body" :key="view">
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
                                            :readonly="!entity.organizacionId"
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
                        <v-card outlined flat class="rounded-lg">
                            <v-card-text>
                                <v-row dense>
                                    <v-col
                                        cols="12"
                                        v-if="
                                            entity?.selected?.userList.length >
                                            0
                                        "
                                        :key="key"
                                    >
                                        <div class="text-left">
                                            Colaboradores
                                        </div>
                                        <div>
                                            <v-chip-group column>
                                                <div
                                                    v-for="(item, i) in entity
                                                        .selected.userList"
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
                                    </v-col>
                                    <v-col cols="12">
                                        <BaseTextArea
                                            label="Comentario"
                                            v-model.trim="form.comment"
                                            :validate="['text']"
                                            :max="255"
                                            :min="1"
                                            counter="255"
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
        </BasePopUp>
        <BaseCustomsButtonsGrid
            label="Crear nueva habilidad"
            :fnMethod="$_tryOpen"
            icon="mdi-shield"
        />
    </div>
</template>

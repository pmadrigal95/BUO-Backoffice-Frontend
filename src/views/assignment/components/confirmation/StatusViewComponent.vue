<script>
/**
 * Descripción: Pantalla
 *
 * @displayName UserListViewComponent
 *
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import baseConfigHelper from '@/helpers/baseConfigHelper';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

export default {
    name: 'StatusViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    components: {
        BaseCustomsButtonsGrid,
    },

    data() {
        return {
            form: this.$_Object(),
            pendingList: [],
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
            };
        },

        $_goBack() {
            delete this.entity.selected.abilityIdList;
            delete this.entity.selected.abilityList;
            this.entity.step = 1;
        },

        $_validateEntity() {
            let result =
                this.form.userIds.length > 0 && this.form.ability.length > 0;

            return result;
        },

        $_setUserIdList() {
            this.form.userIds = this.entity.selected.userList.map(
                (x) => x.userId
            );
        },

        $_setAbilityMicro() {
            this.form.ability = [];
            this.entity.selected.abilityList.filter((x) => {
                const microAbilities = x.competencias.some(
                    (element) => element.check == true
                );

                if (microAbilities) {
                    this.form.ability.push({
                        id: x.id,
                        microAbilities: x.competencias
                            .filter((element) => element.check == true)
                            .map((item) => item.id),
                    });
                    return true;
                } else {
                    this.pendingList.push(x.definicion);
                }

                return false;
            });
        },

        $_setObject() {
            delete this.form.userIds;
            delete this.form.ability;
            this.pendingList = [];

            this.$_setUserIdList();

            this.$_setAbilityMicro();
        },

        $_open() {
            this.$refs['popUp'].$_openModal();
        },

        $_sendToApi() {
            this.$_setObject();

            if (this.$_validateEntity()) {
                if (this.pendingList.length > 0) {
                    this.$_open();
                } else {
                    this.$_sendRequest();
                }
            } else {
                baseNotificationsHelper.Message(
                    true,
                    'Es requerido al menos un colaborador y un indicador para realizar la acción'
                );
            }
        },

        $_requestObject() {
            return {
                organizacionId: this.entity.organizacionId,
                userIds: this.form.userIds,
                abilities: this.form.ability,
                estadoId: this.form.statusID,
                comentario: this.form.comment,
                usuarioModificaId: this.user.userId,
            };
        },

        $_sendRequest() {
            this.loading = true;

            httpService
                .post('wallet/assignMultiple', this.$_requestObject())
                .then((response) => {
                    this.loading = false;
                    if (response != undefined) {
                        if (this.$refs['popUp'].$_checkStatus()) {
                            this.$_open();
                        }
                        location.reload();
                    }
                });
        },
    },
};
</script>

<template>
    <div>
        <BasePopUp
            ref="popUp"
            :maxWidth="$vuetify.breakpoint.mobile ? '100%' : '600'"
            scrollable
            :isDrawer="false"
        >
            <div slot="Content">
                <v-card
                    flat
                    height="100%"
                    width="100%"
                    v-if="pendingList.length > 0"
                >
                    <v-card-title> Habilidades pendientes </v-card-title>
                    <v-card-subtitle>
                        Las siguientes habilidades no poseen ninguna
                        microhabilidad seleccionada
                    </v-card-subtitle>
                    <v-card-text>
                        <v-list>
                            <v-list-item
                                v-for="(item, i) in pendingList"
                                :key="i"
                            >
                                <v-list-item-avatar>
                                    <v-icon
                                        class="pb-1 pl-4"
                                        color="yellowWarning900"
                                        >mdi-alert-circle-outline</v-icon
                                    >
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title>{{
                                        item
                                    }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card-text>

                    <v-card-actions>
                        <v-row justify="end">
                            <BaseCustomsButtonsGrid
                                label="Cancelar"
                                :fnMethod="$_open"
                                icon="mdi-close-circle-outline"
                            />
                            <BaseCustomsButtonsGrid
                                label="Omitir y continuar"
                                :outlined="false"
                                :fnMethod="$_sendRequest"
                                icon="mdi-check-circle-outline"
                            />
                        </v-row>
                    </v-card-actions>
                </v-card>
            </div>
        </BasePopUp>
        <BaseSkeletonLoader v-if="loading" type="article, actions" />
        <BaseForm
            :method="$_sendToApi"
            :cancel="$_goBack"
            lblCancel="Regresar"
            v-else
        >
            <div slot="body">
                <v-row dense>
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
            </div>
        </BaseForm>
    </div>
</template>

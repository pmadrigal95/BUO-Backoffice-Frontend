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
                sendNotification: true,
                comment: undefined,
                statusID: undefined,
            };
        },

        $_goBack() {
            delete this.entity.selected.abilityIdList;
            delete this.entity.selected.abilityList;
            this.entity.step = 1;
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

            if (this.pendingList.length > 0) {
                this.$_open();
            } else {
                this.$_sendRequest();
            }
        },

        $_requestObject() {
            return {
                organizacionId: this.entity.organizacionId,
                userIds: this.form.userIds,
                abilities: this.form.ability,
                estadoId: this.form.statusID,
                comentario: this.form.comment,
                enviarNotificacion: this.form.sendNotification === true,
                useAllEmployees: !this.form.userIds.length > 0,
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
                    <v-card-title>
                        ¡Atención indicadores pendientes!
                    </v-card-title>
                    <v-card-subtitle>
                        Para continuar con el proceso debe tomar en cuenta lo
                        siguiente:
                    </v-card-subtitle>

                    <v-card-text>
                        <p>
                            {{
                                form.ability.length > 0
                                    ? 'Los siguientes Indicadores no poseen ningún micro-indicador seleccionado,por lo tanto se van a omitir'
                                    : 'Los siguientes Indicadores no poseen ningún micro-indicador seleccionado, debe seleccionar un indicador que posea al menos un micro-indicador.'
                            }}
                        </p>

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
                                label="Cerrar"
                                :fnMethod="$_open"
                                icon="mdi-close-circle-outline"
                            />
                            <BaseCustomsButtonsGrid
                                v-if="form.ability.length > 0"
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
            </div>
        </BaseForm>
    </div>
</template>

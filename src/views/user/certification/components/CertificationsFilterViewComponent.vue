<script>
/**
 * Descripción: Pantalla Filtro Competencias
 *
 * @displayName CompetenceFilterViewComponent
 *
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import baseConfigHelper from '@/helpers/baseConfigHelper';

import baseLocalHelper from '@/helpers/baseLocalHelper.js';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

export default {
    name: 'CompetenceFilterViewComponent',

    props: {
        /**
         * Status code of ability
         */
        statusCode: {
            type: Number,
            required: true,
        },

        organizacionId: {
            type: Number,
            required: false,
        },
    },

    components: {
        BaseServerDataTable,
        BaseCustomsButtonsGrid,
    },

    data() {
        return {
            entity: this.$_Object(),
            search: 0,
            componentKey: 0,
            loading: false,
            comment: undefined,
            newStatusCode: undefined,
        };
    },

    computed: {
        ...mapGetters('authentication', ['user', 'buoId']),
        /**
         * Configuracion BaseServerDataTable
         */
        setting() {
            return {
                endpoint: 'empleadoCompetencia/findBy',
                columns: [
                    {
                        text: 'Nombre Empleado',
                        align: 'start',
                        value: 'nombreEmpleado',
                        show: true,
                    },
                    {
                        text: 'Habilidad',
                        align: 'start',
                        value: 'definicionCualificacion',
                        show: true,
                    },
                    {
                        text: 'Microhabilidad',
                        align: 'start',
                        value: 'definicionCompetencia',
                        show: true,
                    },
                    {
                        text: 'Empresa',
                        align: 'start',
                        value: 'nombreOrganizacion',
                        show: this.user.companyId === this.buoId,
                    },
                    {
                        text: 'Área / Departamento',
                        align: 'start',
                        value: 'nombreDepartamento',
                        show: this.entity.departamentoId != undefined,
                    },
                    {
                        text: 'Comentario',
                        align: 'start',
                        value: 'comentario',
                        show: false,
                    },
                    {
                        text: 'Comentario Usuario',
                        align: 'start',
                        value: 'comentarioUsuario',
                        show: false,
                    },
                    {
                        text: 'Estado',
                        align: 'center',
                        value: 'nombreEstado',
                        show: false,
                    },
                    {
                        text: 'Carga Masiva',
                        type: 'bool',
                        align: 'center',
                        value: 'esCargaMasiva',
                        show: false,
                    },
                ],
                key: 'id',
                singleSelect: false,
            };
        },

        extraParams() {
            let array = [];
            if (this.user.companyId != this.buoId) {
                array.push({
                    name: 'organizacionId',
                    value: this.user.companyId,
                });
            } else if (this.entity.organizacionId) {
                array.push({
                    name: 'organizacionId',
                    value: this.entity.organizacionId,
                });
            }

            if (this.statusCode) {
                array.push({
                    name: 'estadoId',
                    value: this.statusCode,
                });
            }

            if (this.user.companyId != this.buoId && this.user.userId) {
                array.push({
                    name: 'userId',
                    value: this.user.userId,
                });
            }

            return array.length > 0 ? array : undefined;
        },

        permission() {
            const result = baseSecurityHelper.$_ReadPermission(
                this.$router.currentRoute.meta.module,
                [baseSecurityHelper.$_write, baseSecurityHelper.$_upload]
            );
            return result;
        },

        showBottonApprove() {
            return this.statusCode ===
                baseConfigHelper.$_statusCode.certifying ||
                this.statusCode === baseConfigHelper.$_statusCode.rejected
                ? true
                : false;
        },

        showBottonDecline() {
            return this.statusCode ===
                baseConfigHelper.$_statusCode.certifying ||
                this.statusCode === baseConfigHelper.$_statusCode.certificate
                ? true
                : false;
        },
    },

    created() {
        if (
            this.organizacionId != undefined &&
            this.user.companyId != this.organizacionId
        ) {
            this.entity.organizacionId = this.organizacionId;
        } else {
            this.entity.organizacionId = this.user.companyId;
        }
    },

    methods: {
        /**
         * Entity Object
         */
        $_Object() {
            return {
                id: undefined,
                organizacionId: undefined,
                personaId: undefined,
                competenciaId: undefined,
                cualificacionId: undefined,
                usuarioId: undefined,
                comentario: undefined,
                estadoId: this.statusCode,
                newEstadoId: undefined,
            };
        },

        /**
         * Open a modal
         */
        $_open() {
            this.$refs['popUp'].$_openModal();
        },

        /**
         * Close a modal
         */
        $_close() {
            if (this.$refs['popUp'].$_checkStatus()) {
                this.$_open();
            }
        },

        /**
         * Get a registry
         */
        $_GetRow() {
            return this.$refs.CertificationFilter.$data.selected;
        },

        /**
         * Verify that select some ability
         */
        $_verifyAbility() {
            const rows = this.$_GetRow().length;

            switch (true) {
                case rows == 0:
                    baseNotificationsHelper.Message(
                        true,
                        baseLocalHelper.$_MsgRowNotSelected
                    );
                    break;
                case rows >= 1:
                    this.$_open();
                    break;
            }
        },

        /**
         * Set a certificate state for an ability
         */
        $_approveAbility() {
            this.$_verifyAbility();
            this.newStatusCode = baseConfigHelper.$_statusCode.certificate;
        },

        /**
         * Set a rejected state for an ability
         */
        $_rejectedAbility() {
            this.$_verifyAbility();
            this.newStatusCode = baseConfigHelper.$_statusCode.rejected;
        },

        /**
         * Set a information to ability or several
         */
        $_setAbility() {
            let data = [];
            this.$_GetRow().map((item) => {
                item.usuarioId = this.user.userId;
                item.newEstadoId = this.newStatusCode;
                item.comentario = this.comment;
                data.push(item);
            });
            this.entity = data;
        },

        $_sendToApi() {
            this.loading = true;

            this.$_setAbility();

            httpService
                .post(`empleadoCompetencia/updateStatusList`, this.entity)
                .then((response) => {
                    this.loading = false;
                    if (response != undefined) {
                        this.$refs.CertificationFilter.$_ParamsToAPI();
                        this.comment = undefined;
                        this.newStatusCode = undefined;
                        this.componentKey++;
                        this.$_close();
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
        >
            <div slot="Content">
                <v-card flat height="100%" width="100%">
                    <v-card-title class="BUO-Heading-Small buo-word-break"
                        >Competencias
                    </v-card-title>
                    <v-card-text>
                        <BaseSkeletonLoader
                            v-if="loading"
                            type="article, actions"
                        />
                        <BaseForm
                            :method="$_sendToApi"
                            :cancel="$_close"
                            v-else
                        >
                            <div slot="body">
                                <v-row dense>
                                    <v-col cols="12">
                                        <BaseTextArea
                                            label="Comentario"
                                            v-model.trim="comment"
                                            :validate="['text']"
                                            :max="255"
                                            :min="1"
                                            counter="255"
                                            required
                                            rows="10"
                                        />
                                    </v-col>
                                </v-row>
                            </div>
                        </BaseForm>
                    </v-card-text>
                </v-card>
            </div>
        </BasePopUp>
        <BaseServerDataTable
            ref="CertificationFilter"
            :key="componentKey"
            :setting="setting"
            :extraParams="extraParams"
        >
            <div slot="btns">
                <BaseCustomsButtonsGrid
                    v-if="permission && showBottonApprove"
                    label="Aprobar"
                    :fnMethod="$_approveAbility"
                    icon="mdi-thumb-up-outline"
                    color="greenB900"
                />

                <BaseCustomsButtonsGrid
                    v-if="permission && showBottonDecline"
                    label="Rechazar"
                    :fnMethod="$_rejectedAbility"
                    icon="mdi-thumb-down-outline"
                    color="redError900"
                />
            </div>
        </BaseServerDataTable>
    </div>
</template>

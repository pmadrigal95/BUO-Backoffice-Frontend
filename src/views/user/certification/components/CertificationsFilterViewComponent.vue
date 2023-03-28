<script>
/**
 * Descripción: Pantalla Filtro Competencias
 *
 * @displayName CompetenceFilterViewComponent
 *
 */
import { mapGetters } from 'vuex';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

import baseLocalHelper from '@/helpers/baseLocalHelper.js';

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
            bulkLoad: false,
            loading: false,
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
            if (this.user.companyId != this.buoId && !this.organizacionId) {
                array.push({
                    name: 'organizacionId',
                    value: this.user.companyId,
                });
            } else if (this.organizacionId) {
                array.push({
                    name: 'organizacionId',
                    value: this.organizacionId,
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
            return this.statusCode === 4 || this.statusCode === 6
                ? true
                : false;
        },

        showBottonDecline() {
            return this.statusCode === 4 || this.statusCode === 5
                ? true
                : false;
        },
    },

    watch: {
        /**
         * Actualizar
         */
        'entity.organizacionId': {
            handler(newValue, oldValue) {
                if (oldValue != newValue) {
                    this.entity.categoriaId = undefined;
                }
            },
            immediate: true,
        },
    },
    methods: {
        /**
         * Entity Object
         */
        $_Object() {
            return {
                id: undefined,
                organizacionId: undefined,
                nombreOrganizacion: undefined,
                departamentoId: undefined,
                nombreDepartamento: undefined,
                personaId: undefined,
                nombreEmpleado: undefined,
                competenciaId: undefined,
                definicionCompetencia: undefined,
                cualificacionId: undefined,
                definicionCualificacion: undefined,
                usuarioId: undefined,
                comentario: undefined,
                estadoId: this.statusCode,
                newEstadoId: undefined,
            };
        },

        /**
         * Get a registry
         */
        $_GetRow() {
            return this.$refs.CertificationFilter.$data.selected;
        },

        /**
         * Open a modal
         */
        $_open() {
            this.$refs['popUp'].$_openModal();
        },

        $_setToUser() {
            this.entity.usuarioId = this.user.userId;
        },

        $_changeStatusCompetence() {
            const data = [];

            switch (data.length) {
                case 0:
                    baseNotificationsHelper.Message(
                        true,
                        baseLocalHelper.$_MsgRowNotSelected
                    );
                    break;
                case 1:
                    this.$_GetRow().forEach((element) =>
                        data.push(element[this.setting.key])
                    );

                    this.$_GetRow().length > 0
                        ? (this.bulkLoad = true)
                        : (this.entity = data);

                    this.$_open();
                    break;
            }
        },

        $_approveAbility() {
            this.$_changeStatusCompetence();
        },

        $_declineAbility() {
            this.$_changeStatusCompetence();
        },

        $_sendToApi() {},
    },
};
</script>

<template>
    <div slot="body">
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
                        <BaseForm :method="$_sendToApi" v-else>
                            <div slot="body">
                                <v-row dense>
                                    <v-col cols="12">
                                        <BaseInput
                                            label="Empresa"
                                            v-model.trim="
                                                entity.nombreOrganizacion
                                            "
                                            :validate="['text']"
                                            readonly
                                            v-if="
                                                this.user.companyId ===
                                                    this.buoId &&
                                                entity.nombreOrganizacion &&
                                                !bulkLoad
                                            "
                                        />
                                    </v-col>

                                    <v-col cols="12">
                                        <BaseInput
                                            label="Área / Departamento"
                                            v-model.trim="
                                                entity.nombreDepartamento
                                            "
                                            :validate="['text']"
                                            readonly
                                            v-if="
                                                entity.nombreDepartamento &&
                                                !bulkLoad
                                            "
                                        />
                                    </v-col>

                                    <v-col cols="12">
                                        <BaseInput
                                            label="Nombre Empleado"
                                            v-model.trim="entity.nombreEmpleado"
                                            :validate="['text']"
                                            v-if="
                                                entity.nombreEmpleado &&
                                                !bulkLoad
                                            "
                                            readonly
                                        />
                                    </v-col>

                                    <v-col cols="12">
                                        <BaseTextArea
                                            label="Competencia"
                                            v-model.trim="
                                                entity.definicionCompetencia
                                            "
                                            :validate="['text']"
                                            counter="1000"
                                            readonly
                                            v-if="
                                                entity.definicionCompetencia &&
                                                !bulkLoad
                                            "
                                        />
                                    </v-col>

                                    <v-col cols="12">
                                        <BaseTextArea
                                            label="Cualificación"
                                            v-model.trim="
                                                entity.definicionCualificacion
                                            "
                                            :validate="['text']"
                                            counter="1000"
                                            v-if="
                                                entity.definicionCualificacion &&
                                                !bulkLoad
                                            "
                                            readonly
                                        />
                                    </v-col>

                                    <v-col cols="12">
                                        <BaseTextArea
                                            label="Comentario"
                                            v-model.trim="entity.comentario"
                                            :validate="['text']"
                                            :max="1000"
                                            :min="1"
                                            counter="1000"
                                            required
                                        />
                                    </v-col>
                                </v-row>
                            </div>
                        </BaseForm>
                    </v-card-text>
                </v-card>
            </div>
        </BasePopUp>
        <BaseSkeletonLoader v-if="!user && !buoId" type="list-item" />
        <BaseServerDataTable
            ref="CertificationFilter"
            :setting="setting"
            :extraParams="extraParams"
            v-else
        >
            <div slot="btns">
                <BaseCustomsButtonsGrid
                    v-if="permission && showBottonApprove"
                    label="Aprobar"
                    :fnMethod="$_approveAbility"
                    icon="mdi-check-outline"
                />

                <BaseCustomsButtonsGrid
                    v-if="permission && showBottonDecline"
                    label="Rechazar"
                    :fnMethod="$_declineAbility"
                    icon="mdi-delete-outline"
                />
            </div>
        </BaseServerDataTable>
    </div>
</template>

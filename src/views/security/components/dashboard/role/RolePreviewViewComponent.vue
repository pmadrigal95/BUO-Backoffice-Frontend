<script>
/**
 * Descripción: Pantalla  Seguridad
 *
 * @displayName RolePreviewViewComponent
 *
 */

import { mapGetters } from 'vuex';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid.vue');

export default {
    name: 'RolePreviewViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    components: { BaseCustomsButtonsGrid },

    computed: {
        ...mapGetters('theme', ['app']),

        write() {
            const result = baseSecurityHelper.$_ReadPermission(
                'SecurityViewComponent',
                baseSecurityHelper.$_write
            );
            return result;
        },
    },

    methods: {
        $_fnEdit() {
            this.entity.step = 1;
        },
    },
};
</script>

<template>
    <v-slide-x-transition appear>
        <v-card flat class="pa-6">
            <v-row class="pb-5 pt-8">
                <v-col cols="12" md="8" class="d-flex align-self-end">
                    <section
                        class="BUO-Heading-Small"
                        :class="[
                            app ? 'blueProgress600--text' : 'blue900--text',
                        ]"
                    >
                        {{ entity.form.nombre }}
                    </section>
                </v-col>
                <v-col cols="12" md="4" class="d-flex justify-end" v-if="write">
                    <BaseCustomsButtonsGrid
                        label="Editar"
                        :fnMethod="$_fnEdit"
                        icon="mdi-square-edit-outline"
                        :color="app ? 'blueProgress600' : 'blue800'"
                    />
                </v-col>
            </v-row>

            <v-row justify="start">
                <v-col cols="12" md="12">
                    <section
                        class="BUO-Paragraph-Large-SemiBold"
                        :class="[app ? 'white--text' : 'grey700--text']"
                    >
                        Información del permiso: {{ entity.form.nombre }}
                    </section>
                </v-col>
            </v-row>

            <v-row justify="start">
                <v-col cols="12" md="6" v-if="entity.form.nombreOrganizacion">
                    <v-tooltip right>
                        <template v-slot:activator="{ on, attrs }">
                            <section
                                class="BUO-Label-Small pb-2"
                                :class="[
                                    app
                                        ? 'blueProgress600--text'
                                        : 'black--text',
                                ]"
                                v-bind="attrs"
                                v-on="on"
                            >
                                <v-icon class="pr-1"> mdi-domain </v-icon>
                                {{ entity.form.nombreOrganizacion }}
                            </section>
                        </template>
                        <span>Empresa</span>
                    </v-tooltip>
                    <v-divider></v-divider>
                </v-col>

                <v-col cols="12" md="6" v-if="entity.form.estadoId">
                    <v-tooltip right>
                        <template v-slot:activator="{ on, attrs }">
                            <section
                                class="BUO-Label-Small pb-2"
                                :class="[
                                    app
                                        ? 'blueProgress600--text'
                                        : 'black--text',
                                ]"
                                v-bind="attrs"
                                v-on="on"
                            >
                                <v-icon class="pr-1">
                                    mdi-toggle-switch-off-outline
                                </v-icon>
                                {{ entity.form.nombreEstado }}
                            </section>
                        </template>
                        <span>Estado</span>
                    </v-tooltip>
                    <v-divider></v-divider>
                </v-col>

                <v-col cols="12" md="12" v-if="entity.form.descripcion">
                    <v-tooltip left>
                        <template v-slot:activator="{ on, attrs }">
                            <section
                                class="BUO-Label-Small pb-2"
                                :class="[
                                    app
                                        ? 'blueProgress600--text'
                                        : 'black--text',
                                ]"
                                v-bind="attrs"
                                v-on="on"
                            >
                                <v-icon class="pr-1"> mdi-text </v-icon>
                                {{ entity.form.descripcion }}
                            </section>
                        </template>
                        <span>Descripción</span>
                    </v-tooltip>
                    <v-divider></v-divider>
                </v-col>

                <v-col
                    cols="12"
                    md="6"
                    v-if="
                        entity.form.nombreUsuarioCrea &&
                        entity.form.fechaCreacionFormato
                    "
                >
                    <v-tooltip right>
                        <template v-slot:activator="{ on, attrs }">
                            <section
                                class="BUO-Label-Small pb-2"
                                :class="[
                                    app
                                        ? 'blueProgress600--text'
                                        : 'black--text',
                                ]"
                                v-bind="attrs"
                                v-on="on"
                            >
                                <v-icon class="pr-1">
                                    mdi-content-save-outline
                                </v-icon>
                                {{
                                    `${entity.form.nombreUsuarioCrea} ~ ${entity.form.fechaCreacionFormato}`
                                }}
                            </section>
                        </template>
                        <span>Creado Por</span>
                    </v-tooltip>
                    <v-divider></v-divider>
                </v-col>

                <v-col
                    cols="12"
                    md="6"
                    v-if="
                        entity.form.nombreUsuarioModifica &&
                        entity.form.fechaModificacionFormato
                    "
                >
                    <v-tooltip right>
                        <template v-slot:activator="{ on, attrs }">
                            <section
                                class="BUO-Label-Small pb-2"
                                :class="[
                                    app
                                        ? 'blueProgress600--text'
                                        : 'black--text',
                                ]"
                                v-bind="attrs"
                                v-on="on"
                            >
                                <v-icon class="pr-1">
                                    mdi-content-save-edit-outline
                                </v-icon>
                                {{
                                    `${entity.form.nombreUsuarioModifica} ~ ${entity.form.fechaModificacionFormato}`
                                }}
                            </section>
                        </template>
                        <span>Actualizado Por</span>
                    </v-tooltip>
                    <v-divider></v-divider>
                </v-col>
            </v-row>
        </v-card>
    </v-slide-x-transition>
</template>

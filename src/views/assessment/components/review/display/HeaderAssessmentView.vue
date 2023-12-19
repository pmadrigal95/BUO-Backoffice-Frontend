<script>
/**
 * Descripción: Pantalla Pruebas
 *
 * @displayName HeaderAssessmentView
 */

import { mapGetters } from 'vuex';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid.vue');

export default {
    name: 'HeaderAssessmentView',

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
                'AssessmentViewComponent',
                baseSecurityHelper.$_write
            );
            return result;
        },
    },

    methods: {
        $_fnEdit() {
            console.log(this.entity.step.headerStep);
            this.entity.step.headerStep = 1;
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
                        {{ entity.header.nombre }}
                        <div
                            v-if="entity.header.descripcion"
                            class="BUO-Label-XSmall"
                            :class="[
                                app ? 'blueProgress600--text' : 'grey600--text',
                            ]"
                        >
                            {{ entity.header.descripcion }}
                        </div>
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
                <v-col cols="12" md="6" v-if="entity.header.nombreOrganizacion">
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
                                {{ entity.header.nombreOrganizacion }}
                            </section>
                        </template>
                        <span>Empresa</span>
                    </v-tooltip>
                    <v-divider></v-divider>
                </v-col>

                <v-col cols="12" md="6" v-if="entity.header.nombreDepartamento">
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
                                    mdi-checkbox-multiple-blank-outline
                                </v-icon>
                                {{ entity.header.nombreDepartamento }}
                            </section>
                        </template>
                        <span>Departamento</span>
                    </v-tooltip>
                    <v-divider></v-divider>
                </v-col>

                <v-col cols="12" md="6" v-if="entity.header.nombreTipoPrueba">
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
                                    mdi-shape-plus-outline
                                </v-icon>
                                {{ entity.header.nombreTipoPrueba }}
                            </section>
                        </template>
                        <span>Tipo de Prueba</span>
                    </v-tooltip>
                    <v-divider></v-divider>
                </v-col>

                <v-col cols="12" md="6" v-if="entity.header.enlace">
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
                                <v-icon class="pr-1"> mdi-link </v-icon>
                                {{ entity.header.enlace }}
                            </section>
                        </template>
                        <span>Enlace</span>
                    </v-tooltip>
                    <v-divider></v-divider>
                </v-col>

                <v-col cols="12" md="6" v-if="entity.header.estadoId">
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
                                {{ entity.header.nombreEstado }}
                            </section>
                        </template>
                        <span>Estado</span>
                    </v-tooltip>
                    <v-divider></v-divider>
                </v-col>

                <v-col cols="12" md="6" v-if="entity.header.nombreUsuarioCrea">
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
                                {{ entity.header.nombreUsuarioCrea }}
                            </section>
                        </template>
                        <span>Creado Por</span>
                    </v-tooltip>
                    <v-divider></v-divider>
                </v-col>

                <v-col
                    cols="12"
                    md="6"
                    v-if="entity.header.nombreUsuarioModifica"
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
                                {{ entity.header.nombreUsuarioModifica }}
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

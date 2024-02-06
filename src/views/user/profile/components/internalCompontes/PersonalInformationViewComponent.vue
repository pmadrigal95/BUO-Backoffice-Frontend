<script>
/**
 * Descripción: Componente Informacion Personal
 *
 * @displayName PersonalInformationViewComponent
 */

import { mapGetters } from 'vuex';

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper';

export default {
    name: 'PersonalInformationViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    computed: {
        age() {
            return this.entity.fechaNacimiento
                ? baseSharedFnHelper.$_getAge(
                      new Date(this.entity.fechaNacimiento)
                  )
                : null;
        },

        ...mapGetters('theme', ['app']),
    },
};
</script>

<template>
    <v-card flat class="pa-6">
        <v-row justify="start" class="pb-2">
            <v-col cols="12" md="8">
                <section
                    class="BUO-Heading-Small"
                    :class="[app ? 'blueProgress600--text' : 'blue900--text']"
                >
                    {{ entity.nombreCompleto }}
                </section>
            </v-col>
        </v-row>

        <v-row justify="start">
            <v-col cols="12" md="12">
                <section
                    class="BUO-Paragraph-Large-SemiBold"
                    :class="[app ? 'white--text' : 'grey700--text']"
                >
                    Información personal
                </section>
            </v-col>
        </v-row>

        <v-row justify="start">
            <v-col cols="12" md="6" v-if="entity.username">
                <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                        <section
                            class="BUO-Label-XSmall pb-2"
                            :class="[
                                app ? 'blueProgress600--text' : 'black--text',
                            ]"
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon small class="pr-1"> mdi-account </v-icon>
                            {{ entity.username }}
                        </section>
                    </template>
                    <span>Cuenta</span>
                </v-tooltip>
                <v-divider></v-divider>
            </v-col>

            <v-col cols="12" md="6" v-if="entity.correo">
                <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                        <section
                            class="BUO-Label-XSmall pb-2"
                            :class="[
                                app ? 'blueProgress600--text' : 'black--text',
                            ]"
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon small class="pr-1">
                                mdi-email-outline
                            </v-icon>
                            {{ entity.correo }}
                        </section>
                    </template>
                    <span>Correo electrónico</span>
                </v-tooltip>
                <v-divider></v-divider>
            </v-col>

            <v-col cols="12" md="6" v-if="entity.fechaNacimiento">
                <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                        <section
                            class="BUO-Label-XSmall pb-2"
                            :class="[
                                app ? 'blueProgress600--text' : 'black--text',
                            ]"
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon small class="pr-1">
                                mdi-cake-variant-outline
                            </v-icon>
                            {{ age }}
                        </section>
                    </template>
                    <span>Edad</span>
                </v-tooltip>
                <v-divider></v-divider>
            </v-col>

            <v-col cols="12" md="6" v-if="entity.nombreGenero">
                <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                        <section
                            class="BUO-Label-XSmall pb-2"
                            :class="[
                                app ? 'blueProgress600--text' : 'black--text',
                            ]"
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon small class="pr-1">
                                mdi-gender-male-female
                            </v-icon>
                            {{ entity.nombreGenero }}
                        </section>
                    </template>
                    <span>Género</span>
                </v-tooltip>
                <v-divider></v-divider>
            </v-col>

            <v-col cols="12" md="6" v-if="entity.telefono">
                <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                        <section
                            class="BUO-Label-XSmall pb-2"
                            :class="[
                                app ? 'blueProgress600--text' : 'black--text',
                            ]"
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon small class="pr-1">
                                mdi-phone-outline
                            </v-icon>
                            {{ entity.telefono }}
                        </section>
                    </template>
                    <span>Teléfono</span>
                </v-tooltip>
                <v-divider></v-divider>
            </v-col>

            <v-col cols="12" md="6" v-if="entity.nombreOrganizacion">
                <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                        <section
                            class="BUO-Label-XSmall pb-2"
                            :class="[
                                app ? 'blueProgress600--text' : 'black--text',
                            ]"
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon small class="pr-1">
                                mdi-office-building
                            </v-icon>
                            {{ entity.nombreOrganizacion }}
                        </section>
                    </template>
                    <span>Organización</span>
                </v-tooltip>
                <v-divider></v-divider>
            </v-col>

            <v-col cols="12" md="6" v-if="entity.nombreDepartamento">
                <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                        <section
                            class="BUO-Label-XSmall pb-2"
                            :class="[
                                app ? 'blueProgress600--text' : 'black--text',
                            ]"
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon small class="pr-1">
                                mdi-checkbox-multiple-blank
                            </v-icon>
                            {{ entity.nombreDepartamento }}
                        </section>
                    </template>
                    <span>Departamento</span>
                </v-tooltip>
                <v-divider></v-divider>
            </v-col>

            <v-col cols="12" md="6" v-if="entity.nombrePais">
                <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                        <section
                            class="BUO-Label-XSmall pb-2"
                            :class="[
                                app ? 'blueProgress600--text' : 'black--text',
                            ]"
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon small class="pr-1"> mdi-earth </v-icon>
                            {{ entity.nombrePais }}
                        </section>
                    </template>
                    <span>País</span>
                </v-tooltip>
                <v-divider></v-divider>
            </v-col>

            <v-col cols="12" md="6" v-if="entity.fechaIngresoFormato">
                <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                        <section
                            class="BUO-Label-XSmall pb-2"
                            :class="[
                                app ? 'blueProgress600--text' : 'black--text',
                            ]"
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon small class="pr-1">
                                mdi-calendar-start
                            </v-icon>
                            {{ entity.fechaIngresoFormato }}
                        </section>
                    </template>
                    <span>Fecha de ingreso</span>
                </v-tooltip>
                <v-divider></v-divider>
            </v-col>

            <v-col
                cols="12"
                md="6"
                v-if="entity.antiguedad && entity.antiguedad != 'N/A'"
            >
                <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                        <section
                            class="BUO-Label-XSmall pb-2"
                            :class="[
                                app ? 'blueProgress600--text' : 'black--text',
                            ]"
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon small class="pr-1">
                                mdi-account-clock
                            </v-icon>
                            {{ entity.antiguedad }}
                        </section>
                    </template>
                    <span>Antigüedad</span>
                </v-tooltip>
                <v-divider></v-divider>
            </v-col>

            <v-col cols="12" md="6" v-if="entity.fechaTerminacionFormato">
                <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                        <section
                            class="BUO-Label-XSmall pb-2"
                            :class="[
                                app ? 'blueProgress600--text' : 'black--text',
                            ]"
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon small class="pr-1">
                                mdi-calendar-end
                            </v-icon>
                            {{ entity.fechaTerminacionFormato }}
                        </section>
                    </template>
                    <span>Fecha de salida</span>
                </v-tooltip>
                <v-divider></v-divider>
            </v-col>

            <v-col cols="12" md="6" v-if="entity.esRenuncia">
                <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                        <section
                            class="BUO-Label-XSmall pb-2"
                            :class="[
                                app ? 'blueProgress600--text' : 'black--text',
                            ]"
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon small class="pr-1">
                                mdi-account-cancel
                            </v-icon>
                            Renuncio
                        </section>
                    </template>
                    <span>Renuncia</span>
                </v-tooltip>
                <v-divider></v-divider>
            </v-col>
        </v-row>
    </v-card>
</template>

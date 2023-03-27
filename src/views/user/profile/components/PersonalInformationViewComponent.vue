<script>
/**
 * Descripción: Componente Informacion Personal
 *
 * @displayName PersonalInformationViewComponent
 */

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
            return baseSharedFnHelper.$_getAge(
                new Date(this.entity.fechaNacimiento)
            );
        },
    },
};
</script>

<template>
    <v-card flat class="pa-6">
        <v-row justify="start" class="pb-2">
            <v-col cols="12" md="8">
                <div class="BUO-Heading-Small blue900--text">
                    {{ entity.nombreCompleto }}
                </div>
            </v-col>
        </v-row>

        <v-row justify="start">
            <v-col cols="12" md="12">
                <div class="BUO-Paragraph-Large-SemiBold grey700--text">
                    Información personal
                </div>
            </v-col>
        </v-row>

        <v-row justify="start">
            <v-col cols="12" md="6" v-if="entity.username">
                <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                        <div
                            class="BUO-Label-XSmall black--text pb-2"
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon small class="pr-1"> mdi-account </v-icon>
                            {{ entity.username }}
                        </div>
                    </template>
                    <span>Cuenta</span>
                </v-tooltip>
                <v-divider></v-divider>
            </v-col>

            <v-col cols="12" md="6" v-if="entity.correo">
                <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                        <div
                            class="BUO-Label-XSmall black--text pb-2"
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon small class="pr-1">
                                mdi-email-outline
                            </v-icon>
                            {{ entity.correo }}
                        </div>
                    </template>
                    <span>Correo electrónico</span>
                </v-tooltip>
                <v-divider></v-divider>
            </v-col>

            <v-col cols="12" md="6" v-if="entity.fechaNacimiento">
                <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                        <div
                            class="BUO-Label-XSmall black--text pb-2"
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon small class="pr-1">
                                mdi-cake-variant-outline
                            </v-icon>
                            {{ age }}
                        </div>
                    </template>
                    <span>Edad</span>
                </v-tooltip>
                <v-divider></v-divider>
            </v-col>

            <v-col cols="12" md="6" v-if="entity.nombreGenero">
                <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                        <div
                            class="BUO-Label-XSmall black--text pb-2"
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon small class="pr-1">
                                mdi-gender-male-female
                            </v-icon>
                            {{ entity.nombreGenero }}
                        </div>
                    </template>
                    <span>Género</span>
                </v-tooltip>
                <v-divider></v-divider>
            </v-col>

            <v-col cols="12" md="6" v-if="entity.telefono">
                <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                        <div
                            class="BUO-Label-XSmall black--text pb-2"
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon small class="pr-1">
                                mdi-phone-outline
                            </v-icon>
                            {{ entity.telefono }}
                        </div>
                    </template>
                    <span>Teléfono</span>
                </v-tooltip>
                <v-divider></v-divider>
            </v-col>

            <v-col cols="12" md="6" v-if="entity.nombreOrganizacion">
                <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                        <div
                            class="BUO-Label-XSmall black--text pb-2"
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon small class="pr-1">
                                mdi-office-building
                            </v-icon>
                            {{ entity.nombreOrganizacion }}
                        </div>
                    </template>
                    <span>Organización</span>
                </v-tooltip>
                <v-divider></v-divider>
            </v-col>

            <v-col cols="12" md="6" v-if="entity.nombreDepartamento">
                <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                        <div
                            class="BUO-Label-XSmall black--text pb-2"
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon small class="pr-1">
                                mdi-checkbox-multiple-blank
                            </v-icon>
                            {{ entity.nombreDepartamento }}
                        </div>
                    </template>
                    <span>Departamento</span>
                </v-tooltip>
                <v-divider></v-divider>
            </v-col>

            <v-col cols="12" md="6" v-if="entity.nombrePais">
                <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                        <div
                            class="BUO-Label-XSmall black--text pb-2"
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon small class="pr-1"> mdi-earth </v-icon>
                            {{ entity.nombrePais }}
                        </div>
                    </template>
                    <span>País</span>
                </v-tooltip>
                <v-divider></v-divider>
            </v-col>
        </v-row>
    </v-card>
</template>

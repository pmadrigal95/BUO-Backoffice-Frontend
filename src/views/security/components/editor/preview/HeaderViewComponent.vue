<script>
/**
 * Descripción: Pantalla  Seguridad
 *
 * @displayName HeaderViewComponent
 *
 */

import { mapGetters } from 'vuex';

export default {
    name: 'HeaderViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    computed: {
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
                    {{ entity.form.nombre }}
                </section>
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
            <v-col cols="12" md="12" v-if="entity.form.descripcion">
                <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                        <section
                            class="BUO-Label-Small pb-2"
                            :class="[
                                app ? 'blueProgress600--text' : 'black--text',
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

            <v-col cols="12" md="12" v-if="entity.form.estadoId">
                <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                        <section
                            class="BUO-Label-Small pb-2"
                            :class="[
                                app ? 'blueProgress600--text' : 'black--text',
                            ]"
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon class="pr-1">
                                mdi-toggle-switch-off-outline
                            </v-icon>
                            {{
                                entity.form.estadoId === 2
                                    ? 'Activo'
                                    : 'Inactivo'
                            }}
                        </section>
                    </template>
                    <span>Estado</span>
                </v-tooltip>
                <v-divider></v-divider>
            </v-col>
        </v-row>
    </v-card>
</template>

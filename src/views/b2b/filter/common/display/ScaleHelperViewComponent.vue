<script>
/**
 * Descripción: Escala de colores
 *
 * @displayName ScaleHelperViewComponent
 *
 */

import { mapGetters } from 'vuex';

import baseDataVisualizationColorsHelper from '@/helpers/baseDataVisualizationColorsHelper';

export default {
    name: 'ScaleHelperViewComponent',

    computed: {
        ...mapGetters('theme', ['app']),

        scale() {
            const palette =
                baseDataVisualizationColorsHelper.$_getColorByName('darkGreen');
            return [
                {
                    color: palette['secondary50'],
                    name: 'Sin Experiencia',
                    description: '0 micro indicadores completados.',
                },
                {
                    color: palette['secondary60'],
                    name: 'Aprendiz',
                    description:
                        'menos del 50% de micro indicadores completados.',
                },
                {
                    color: palette['secondary70'],
                    name: 'Intermedio',
                    description: '50% de micro indicadores completados.',
                },
                {
                    color: palette['secondary80'],
                    name: 'Avanzado',
                    description:
                        'más del 50% de micro indicadores completados.',
                },
                {
                    color: palette['main'],
                    name: 'Master',
                    description: '100% de micro indicadores completados.',
                },
            ];
        },
    },

    methods: {
        $_open() {
            this.$refs.popUp.$_openModal();
        },
    },
};
</script>

<template>
    <div>
        <!-- @Componente:  BaseDialog-->
        <BasePopUp
            ref="popUp"
            :maxWidth="$vuetify.breakpoint.mobile ? '100%' : '35%'"
            :isDrawer="false"
            scrollable
        >
            <div slot="Content">
                <v-card flat>
                    <v-card-title>Escala de Dominio</v-card-title>
                    <v-card-text :class="[app ? 'white--text' : 'black--text']">
                        <div class="pb-4">
                            Cada indicador en Buo está compuesto por micro
                            indicadores que permiten medir el nivel de dominio
                            de la persona.
                        </div>

                        <div class="pb-1">
                            La Escala de Dominio está definida de la siguiente
                            manera:
                        </div>

                        <div
                            v-for="(item, i) in scale"
                            :key="i"
                            class="px-2 pb-1 pt-1"
                        >
                            <v-icon :color="item.color" class="pb-1 pr-1" small
                                >mdi-circle</v-icon
                            >
                            <strong
                                :class="[app ? 'white--text' : 'black--text']"
                                >{{ item.name }} =
                            </strong>

                            <span
                                :class="[
                                    app
                                        ? 'blueProgress600--text'
                                        : 'black--text',
                                ]"
                                >{{ item.description }}</span
                            >
                        </div>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                            class="mt-5 no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                            elevation="0"
                            color="primary"
                            block
                            @click="$_open"
                            >Entendido
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </div>
        </BasePopUp>
        <v-row justify="center" align="center" class="py-3">
            <div v-for="(item, i) in scale" :key="i" class="px-1">
                <v-icon :color="item.color" class="pb-1 pr-1" small
                    >mdi-circle</v-icon
                >
                <span
                    :class="[app ? 'blueProgress600--text' : 'black--text']"
                    >{{ item.name }}</span
                >
            </div>
            <div class="px-1">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            fab
                            dark
                            x-small
                            class="mr-1"
                            elevation="0"
                            color="primary"
                            @click="$_open"
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon dark> mdi-progress-question </v-icon>
                        </v-btn>
                    </template>
                    <span>Ayuda</span>
                </v-tooltip>
            </div>
        </v-row>
    </div>
</template>

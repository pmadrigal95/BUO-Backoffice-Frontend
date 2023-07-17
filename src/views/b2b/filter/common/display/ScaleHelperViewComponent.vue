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

    props: {
        type: {
            type: String,
            default: 'talent',
        },
    },

    computed: {
        ...mapGetters('theme', ['app']),

        scale() {
            const palette =
                baseDataVisualizationColorsHelper.$_getColorByName('darkGreen');
            return {
                talent: {
                    title: 'Escala de Dominio',
                    description:
                        'Cada indicador en Buo está compuesto por micro indicadores que permiten medir el nivel de dominio de la persona.',
                    scale: 'La Escala de Dominio está definida de la siguiente manera:',
                    list: [
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
                            description:
                                '50% de micro indicadores completados.',
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
                            description:
                                '100% de micro indicadores completados.',
                        },
                    ],
                },
                assessment: {
                    title: 'Assessments',
                    // description: '',
                    scale: 'La Escala de resultados está definida de la siguiente manera:',
                    list: [
                        {
                            color: palette['secondary50'],
                            name: 'Principiante',
                            description:
                                'el colaborador está al inicio de su trayecto y comprende los conceptos básicos del indicador.',
                        },
                        {
                            color: palette['secondary70'],
                            name: 'Básico',
                            description:
                                'el colaborador ha adquirido algunas destrezas en el indicador y ha tenido algunas experiencias exitosas utilizándola.',
                        },
                        {
                            color: palette['secondary80'],
                            name: 'Intermedio',
                            description:
                                'el colaborador ha demostrado una sólida comprensión y aplicación de las técnicas necesarias en el indicador.',
                        },
                        {
                            color: palette['main'],
                            name: 'Avanzado',
                            description:
                                'el colaborador se destaca como un profesional altamente capacitado en el indicador.',
                        },
                    ],
                },
            };
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
                    <v-card-title v-if="scale[type].title">{{
                        scale[type].title
                    }}</v-card-title>
                    <v-card-text :class="[app ? 'white--text' : 'black--text']">
                        <div class="pb-4" v-if="scale[type].description">
                            {{ scale[type].description }}
                        </div>

                        <div class="pb-1" v-if="scale[type].scale">
                            {{ scale[type].scale }}
                        </div>

                        <div
                            v-for="(item, i) in scale[type].list"
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
            <div v-for="(item, i) in scale[type].list" :key="i" class="px-1">
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

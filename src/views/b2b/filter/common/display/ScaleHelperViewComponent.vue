<script>
/**
 * Descripción: Escala de colores
 *
 * @displayName ScaleHelperViewComponent
 *
 */

import baseDataVisualizationColorsHelper from '@/helpers/baseDataVisualizationColorsHelper';

export default {
    name: 'ScaleHelperViewComponent',

    computed: {
        scale() {
            const palette =
                baseDataVisualizationColorsHelper.$_getColorByName('darkGreen');
            return [
                {
                    color: palette['secondary50'],
                    name: 'Sin Experiencia',
                },
                {
                    color: palette['secondary60'],
                    name: 'Aprendiz',
                },
                {
                    color: palette['secondary70'],
                    name: 'Intermedio',
                },
                {
                    color: palette['secondary80'],
                    name: 'Avanzado',
                },
                {
                    color: palette['main'],
                    name: 'Master',
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
                    <v-card-title>Escala de habilidades</v-card-title>
                    <v-card-text class="black--text">
                        <div class="pb-4">
                            Cada habilidad tiene una escala de micro habilidades
                            específica que varía en número, según haya sido
                            definido.
                        </div>
                        <div>
                            Por ejemplo, tener dos micro habilidades no
                            representa la misma escala en otra habilidad.
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
                <span class="black--text">{{ item.name }}</span>
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

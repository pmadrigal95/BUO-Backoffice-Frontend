<script>
const BasePdaSlider = () => import('@/components/pda/BasePdaSlider');

export default {
    name: 'AxesViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    components: {
        BasePdaSlider,
    },
};
</script>

<template>
    <v-card flat>
        <v-card-title class="grey700--text BUO-Paragraph-Large-SemiBold"
            >Ejes de comportamiento</v-card-title
        >
        <v-card-text>
            <v-row>
                <v-col
                    cols="12"
                    md="6"
                    v-for="item in entity.ejePDADTOSet"
                    :key="item.id"
                >
                    <v-card flat>
                        <v-card-title
                            class="buo-word-break Buo-Black BUO-Label-Small-SemiBold"
                        >
                            {{ item.nombreUI }}
                        </v-card-title>
                        <v-card-subtitle
                            class="buo-word-break BUO-Label-Small pt-3"
                        >
                            {{ item.descripcionEje }}
                        </v-card-subtitle>
                        <v-card-text flat class="pt-3">
                            <BasePdaSlider
                                :value="item.valorEjeFormato"
                                :color="item.nombre.toLowerCase()"
                            />
                            <div
                                class="d-flex flex-no-wrap justify-space-between buo-word-break"
                                :class="[
                                    $vuetify.breakpoint.smAndDown
                                        ? 'BUO-Paragraph-Small'
                                        : 'BUO-Paragraph-Medium',
                                ]"
                            >
                                <span>
                                    {{ item.etiquetaIzquierda }}
                                </span>
                                <span>
                                    {{ item.etiquetaDerecha }}
                                </span>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

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

    computed: { ...mapGetters('theme', ['app']) },
};
</script>

<template>
    <v-card flat color="transparent">
        <v-card-title
            class="BUO-Paragraph-Large-SemiBold"
            :class="[app ? 'white--text' : 'grey700--text']"
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
                    <v-card flat color="transparent">
                        <v-card-title
                            class="buo-word-break BUO-Label-Small-SemiBold"
                            :class="[app ? 'white--text' : 'black--text']"
                        >
                            <span>{{ `${item.nombreUI}` }}</span>
                            <span class="BUO-Label-XSmall pl-2">
                                {{ `${item.valorEjeFormato}%` }}</span
                            >
                        </v-card-title>
                        <v-card-subtitle
                            class="buo-word-break BUO-Label-Small pt-3"
                            :class="[
                                app ? 'blueProgress600--text' : 'grey600--text',
                            ]"
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
                                <span
                                    class="BUO-Label-Small"
                                    :class="[
                                        app
                                            ? 'blueProgress600--text'
                                            : 'grey600--text',
                                    ]"
                                >
                                    {{ item.etiquetaIzquierda }}
                                </span>
                                <span
                                    class="BUO-Label-Small"
                                    :class="[
                                        app
                                            ? 'blueProgress600--text'
                                            : 'grey600--text',
                                    ]"
                                >
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

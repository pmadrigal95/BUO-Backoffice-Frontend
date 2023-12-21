<script>
/**
 * Descripción: Componente Lista Expandible
 *
 * @displayName BaseBodyView
 */

import { mapGetters } from 'vuex';

export default {
    name: 'BaseBodyView',

    props: {
        /**
         * Lista de Habilidades
         */
        question: {
            type: Object,
            required: true,
        },
    },

    computed: {
        ...mapGetters('theme', ['app']),
    },
};
</script>

<template>
    <v-card
        flat
        max-width="100%"
        max-height="100%"
        :color="app ? 'grey700' : 'grey200'"
        class="rounded-lg"
    >
        <v-card-text>
            <v-row dense>
                <v-col
                    v-for="(answer, i) in question.respuestas"
                    :key="i"
                    cols="12"
                >
                    <v-card
                        flat
                        :color="app ? 'blue700' : 'clouds'"
                        class="rounded-lg"
                    >
                        <section
                            class="d-flex flex-no-wrap justify-space-between"
                        >
                            <v-card-text>
                                <v-list-item
                                    Two-line
                                    class="buo-headerAbility-position"
                                >
                                    <v-list-item-content>
                                        <v-list-item-title
                                            ><span
                                                class="BUO-Paragraph-Medium-SemiBold buo-white-space"
                                                :class="[
                                                    app
                                                        ? 'white--text'
                                                        : 'grey700--text',
                                                ]"
                                            >
                                                {{ answer.texto }}</span
                                            >
                                        </v-list-item-title>
                                        <v-list-item-subtitle
                                            ><section
                                                class="BUO-Label-XSmall"
                                                :class="[
                                                    app
                                                        ? 'blueProgress600--text'
                                                        : 'grey600--text',
                                                ]"
                                            >
                                                {{ answer.valor }} Puntos
                                            </section>
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-card-text>
                        </section>
                    </v-card>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

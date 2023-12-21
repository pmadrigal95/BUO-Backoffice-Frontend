<script>
/**
 * Descripción: Componente Lista Expandible
 *
 * @displayName BaseHeaderView
 */

import { mapGetters } from 'vuex';

export default {
    name: 'BaseHeaderView',

    props: {
        /**
         * Lista de Preguntas
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
    <v-layout justify-start v-if="question">
        <v-list-item two-line class="buo-headerAbility-position">
            <v-list-item-avatar size="45">
                <v-img
                    src="https://buo-resources.s3.us-east-2.amazonaws.com/certification/Buo_Assessment_Award.svg"
                />
            </v-list-item-avatar>
            <v-list-item-content class="ms-n3">
                <v-list-item-title
                    ><span
                        class="BUO-Paragraph-Medium-SemiBold buo-white-space"
                        :class="[app ? 'white--text' : 'grey700--text']"
                        >{{ question.textoHtml }}</span
                    >
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-layout>
</template>

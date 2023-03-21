<script>
/**
 * Descripción: Pantalla BaseCardViewComponent
 *
 * @displayName BaseCardViewComponent
 */

export default {
    name: 'BaseCardViewComponent',

    props: {
        btnLabel: {
            type: String,
            default: 'Regresar',
        },

        btnAction: {
            type: Function,
            default: undefined,
        },

        title: {
            type: String,
            default: undefined,
        },

        subtitle: {
            type: String,
            default: undefined,
        },

        md: {
            type: String,
            default: '9',
        },

        offset: {
            type: String,
            default: '1',
        },
    },

    methods: {
        /**
         * Volver al pantalla anterior
         */
        $_return() {
            if (this.btnAction != undefined) {
                this.btnAction();
            }
        },
    },
};
</script>

<template>
    <v-row>
        <v-col cols="12" :md="md" :offset-md="offset">
            <v-card
                color="transparent"
                flat
                max-width="100%"
                max-height="100%"
                class="rounded-lg"
            >
                <v-row align-content="center">
                    <v-layout
                        justify-start
                        align-center
                        v-if="btnAction != undefined"
                    >
                        <v-btn
                            color="blue800"
                            class="ma-1 no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                            text
                            @click="$_return"
                        >
                            <v-icon left dark> mdi-chevron-left </v-icon
                            >{{ btnLabel }}</v-btn
                        >
                    </v-layout>

                    <slot name="top-actions"></slot>
                </v-row>

                <v-card-title
                    v-if="title"
                    class="buo-word-break"
                    :class="[
                        $vuetify.breakpoint.smAndDown
                            ? 'BUO-Heading-Small'
                            : 'BUO-Heading-Medium',
                    ]"
                >
                    {{ title }}
                </v-card-title>

                <v-card-title
                    v-if="!title"
                    class="buo-word-break"
                    :class="[
                        $vuetify.breakpoint.smAndDown
                            ? 'BUO-Heading-Small'
                            : 'BUO-Heading-Medium',
                    ]"
                >
                    <slot name="card-title"></slot>
                </v-card-title>

                <v-card-subtitle
                    v-if="subtitle"
                    :class="[
                        $vuetify.breakpoint.smAndDown
                            ? 'BUO-Paragraph-Small'
                            : 'BUO-Paragraph-Medium',
                    ]"
                >
                    {{ subtitle }}
                </v-card-subtitle>

                <v-card-subtitle
                    :class="[
                        $vuetify.breakpoint.smAndDown
                            ? 'BUO-Paragraph-Small'
                            : 'BUO-Paragraph-Medium',
                    ]"
                >
                    <slot name="card-subtitle"></slot>
                </v-card-subtitle>

                <v-card-text>
                    <slot name="card-text"></slot>
                </v-card-text>
            </v-card>
        </v-col>

        <v-col cols="12" :md="md" :offset-md="offset">
            <slot name="body"></slot>
        </v-col>
    </v-row>
</template>

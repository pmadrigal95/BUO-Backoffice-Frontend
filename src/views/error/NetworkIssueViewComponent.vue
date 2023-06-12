<script>
/**
 * Descripción: Pantalla de error NetworkIssue
 *
 * @displayName NetworkIssueViewComponent
 */

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

export default {
    name: 'NetworkIssueViewComponent',

    metaInfo: { title: 'Error 403' },

    methods: {
        $_goToModule() {
            const result = baseSecurityHelper.$_getFirstItem();
            this.$router.push({
                name: result ? result : 'LoginViewComponent',
            });
        },
    },
};
</script>

<template>
    <v-card elevation="20" width="100%" height="100%">
        <v-row justify="center" align-content="center">
            <v-col cols="12">
                <br />
                <v-img
                    contain
                    height="350"
                    src="https://buo-resources.s3.us-east-2.amazonaws.com/compartidos/403.png"
                    lazy-src="https://buo-resources.s3.us-east-2.amazonaws.com/compartidos/403.png"
                ></v-img>
            </v-col>

            <div>
                <v-card-title
                    :class="[
                        $vuetify.breakpoint.smAndDown
                            ? 'BUO-Heading-Small text-center buo-word-break'
                            : 'BUO-Heading-Medium text-center buo-word-break',
                    ]"
                >
                    <span>
                        ¡Acceso
                        <span class="font-weight-light">Denegado!</span></span
                    >
                </v-card-title>
            </div>

            <v-col cols="12">
                <v-card-text
                    :class="[
                        $vuetify.breakpoint.smAndDown
                            ? 'BUO-Paragraph-Small text-center'
                            : 'BUO-Paragraph-Medium text-center',
                    ]"
                >
                    Esta no es la página que buscas!
                </v-card-text>
            </v-col>

            <center>
                <v-btn
                    @click="$_goToModule"
                    outlined
                    text
                    block
                    class="no-uppercase rounded-lg"
                    >Volver al inicio</v-btn
                >
            </center>
        </v-row>
    </v-card>
</template>

<script>
/**
 * Descripción: Pantalla de error NetworkIssue
 *
 * @displayName NetworkIssueViewComponent
 */

export default {
    name: 'NetworkIssueViewComponent',

    metaInfo: { title: 'Error 403' },
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
                    :src="require('@/assets/errors/403.png')"
                    :lazy-src="require('@/assets/errors/403.png')"
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
                    Esta no es la pagina que buscas!
                </v-card-text>
            </v-col>

            <center>
                <v-btn
                    :to="{ name: 'HomeViewComponent' }"
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

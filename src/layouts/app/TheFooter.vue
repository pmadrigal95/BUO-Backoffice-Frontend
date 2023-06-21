<script>
/**
 * Descripción: componente Footer
 *
 * @displayName TheFooter
 */

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper';

export default {
    name: 'TheFooter',

    methods: {
        $_termsAndConditions() {
            baseSharedFnHelper.$_redirect('termsAndConditions.html');
        },

        $_landing() {
            baseSharedFnHelper.$_redirect('');
        },
    },
};
</script>

<template>
    <v-footer
        absolute
        app
        width="auto"
        dark
        color="blue900"
        :class="[$vuetify.breakpoint.smAndDown ? 'mobileBorderFooter' : null]"
    >
        <v-row style="margin-top: 1px !important">
            <v-col cols="12" md="11" class="BUO-Paragraph-XSmall">
                <p>Certificaciones Digitales Buo SA de CV</p>
                <p>©{{ new Date().getFullYear() }} Derechos Reservados</p>
                <p
                    v-if="$vuetify.breakpoint.mdAndUp"
                    @click="$_termsAndConditions"
                    style="cursor: pointer"
                >
                    Política de Privacidad | Términos del Servicio
                </p>
                <p
                    @click="$_termsAndConditions"
                    style="cursor: pointer"
                    v-if="$vuetify.breakpoint.mobile"
                >
                    Política de Privacidad
                </p>
                <p
                    @click="$_termsAndConditions"
                    style="cursor: pointer"
                    v-if="$vuetify.breakpoint.mobile"
                >
                    Términos del Servicio
                </p>
            </v-col>
            <v-col cols="1" v-if="$vuetify.breakpoint.mdAndUp">
                <v-layout align-end justify-end>
                    <v-img
                        contain
                        max-width="25%"
                        width="100%"
                        src="https://buo-resources.s3.us-east-2.amazonaws.com/compartidos/buoLogo.svg"
                        @click="$_landing"
                        style="cursor: pointer"
                    ></v-img>
                </v-layout>
            </v-col>
        </v-row>
    </v-footer>
</template>

<style scope>
.mobileBorderFooter {
    border-radius: 0px 0px 18px 18px !important;
}
</style>

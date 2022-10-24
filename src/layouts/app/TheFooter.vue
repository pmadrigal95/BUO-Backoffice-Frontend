<script>
/**
 * Descripción: componente Footer
 *
 * @displayName TheFooter
 */

export default {
    name: 'TheFooter',
};
</script>

<template>
    <v-footer
        absolute
        app
        width="auto"
        dark
        color="primary"
        :class="[$vuetify.breakpoint.smAndDown ? 'mobileBorderFooter' : null]"
    >
        <v-row style="margin-top: 1px !important">
            <v-col cols="12" md="11" class="BUO-Paragraph-XSmall">
                <p>Certificaciones Digitales Buo SA de CV</p>
                <p>©2022 Derechos Reservados</p>
                <p v-if="$vuetify.breakpoint.mdAndUp">
                    Política de Privacidad | Términos del Servicio
                </p>
                <p v-if="$vuetify.breakpoint.mobile">Política de Privacidad</p>
                <p v-if="$vuetify.breakpoint.mobile">Términos del Servicio</p>
            </v-col>
            <v-col cols="1" v-if="$vuetify.breakpoint.mdAndUp">
                <v-layout align-end justify-end>
                    <v-img
                        contain
                        max-width="25%"
                        width="100%"
                        :src="require('@/assets/app/common/buoLogo.svg')"
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

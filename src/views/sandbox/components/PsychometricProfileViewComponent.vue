<script>
/**
 * Descripción: Pantalla  CoincidenceCardViewComponent
 *
 * @displayName CoincidenceCardViewComponent
 *
 */

import { mapGetters } from 'vuex';

export default {
    name: 'PsychometricProfileViewComponent',

    props: {
        imageURL: {
            type: String,
            required: true,
        },

        fnCallback: {
            type: Function,
            default: () => {},
        },
    },

    computed: {
        ...mapGetters('theme', ['app']),
    },
};
</script>

<template>
    <v-card flat rounded="xl" width="235px" height="100%">
        <v-card-text class="d-flex flex-column align-center">
            <img height="124" width="109" :src="imageURL" />
            <section class="text-center pt-8 pb-11">
                <p
                    class="BUO-Paragraph-Small grey700--text ma-0 pb-1"
                    :class="[app ? 'white--text' : 'grey700--text']"
                >
                    El perfil de tu empresa es
                </p>
                <p
                    class="BUO-Heading-XSmall grey700--text ma-0 pb-6"
                    :class="[app ? 'white--text' : 'grey700--text']"
                >
                    Colaborador
                </p>
                <a
                    @click="fnCallback"
                    @click.stop
                    class="BUO-Label-XSmall blue900--text text-decoration-underline"
                    :class="[app ? 'blueProgress600--text' : 'blue900--text']"
                    >¿Qué significa esto?</a
                >
            </section>
        </v-card-text>
    </v-card>
</template>

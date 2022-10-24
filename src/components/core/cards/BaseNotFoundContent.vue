<script>
/**
 * Descripción: Pantalla Message
 *
 * @displayName BaseNotFoundContent
 */

export default {
    name: 'BaseNotFoundContent',

    props: {
        msg: {
            type: String,
            default: 'Tus habilidades te están esperando.',
        },

        fn: {
            type: Function,
            default: undefined,
        },

        img: {
            type: String,
            default: 'app/buoWallet/search.svg',
        },
    },
};
</script>

<template>
    <v-card
        flat
        max-width="100%"
        max-height="100%"
        class="text-center rounded-lg"
    >
        <br />
        <v-layout justify-center>
            <v-img
                :max-height="$vuetify.breakpoint.smAndDown ? '150px' : '250px'"
                :max-width="$vuetify.breakpoint.smAndDown ? '150px' : '250px'"
                :src="require(`@/assets/${img}`)"
                :lazy-src="require(`@/assets/${img}`)"
            >
            </v-img>
        </v-layout>

        <v-card-subtitle>
            <span v-if="!fn" class="BUO-Paragraph-Large">{{ msg }} </span>
            <span
                v-else
                @click="fn"
                style="cursor: pointer; color: #003f5e"
                class="BUO-Paragraph-Large"
                ><u>{{ msg }}</u>
            </span>
        </v-card-subtitle>
    </v-card>
</template>

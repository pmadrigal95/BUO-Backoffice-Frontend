<script>
/**
 * Descripción: Card con los tokens Disponibles
 *
 * @displayName BaseCardTokens
 */

import { mapGetters } from 'vuex';

export default {
    name: 'BaseCardTokens',

    computed: {
        /**
         * tokens
         */
        ...mapGetters('authentication', ['user']),
    },
};
</script>

<template>
    <v-card
        flat
        max-width="100%"
        max-height="100%"
        class="rounded-lg"
        color="transparent"
        elevation="8"
    >
        <div class="d-flex flex-no-wrap justify-space-between">
            <div>
                <v-card-title
                    :class="[
                        $vuetify.breakpoint.smAndDown
                            ? 'BUO-Display-Medium'
                            : 'BUO-Display-Medium',
                    ]"
                    >{{ user.tokens }}</v-card-title
                >

                <v-card-subtitle
                    :class="[
                        $vuetify.breakpoint.smAndDown
                            ? 'BUO-Paragraph-Small'
                            : 'BUO-Paragraph-Large',
                    ]"
                    >Balance de Tokens</v-card-subtitle
                >
            </div>

            <v-avatar
                class="ma-3"
                size="134"
                tile
                style="top: 23px; left: 11px"
            >
                <img :src="require('@/assets/app/buoWallet/tokenCard.svg')" />
            </v-avatar>
        </div>
    </v-card>
</template>

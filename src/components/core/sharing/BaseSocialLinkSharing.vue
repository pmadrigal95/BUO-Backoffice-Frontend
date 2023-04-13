<script>
/**
 * Descripción: Modal Compartir Links Social Media reutilizable
 *
 * @displayName BaseSocialLinkSharing
 */

export default {
    name: 'BaseSocialLinkSharing',

    props: {
        /**
         * link
         * Requerido
         */
        sharing: {
            type: Object,
            required: true,
            /**
             * sharing: {
                url: 'https://news.vuejs.org/issues/180',
                title: 'Say hi to Vite! A brand new, extremely fast development setup for Vue.',
                 },
             */
        },
    },

    data() {
        return {
            show: true,
            componentKey: 0,
        };
    },

    methods: {
        forceRerender() {
            this.componentKey += 1;
        },

        $_open() {
            this.$refs['popUp'].$_openModal();
            this.forceRerender();
        },

        $_copy() {
            if (this.sharing.copy) {
                this.sharing.copy();
            }
        },
    },
};
</script>

<template>
    <BasePopUp
        ref="popUp"
        :maxWidth="$vuetify.breakpoint.mobile ? '100%' : '60%'"
        :isDrawer="false"
    >
        <div slot="Content">
            <v-card flat v-if="sharing">
                <v-card-title class="BUO-Paragraph-Large buo-none-word-break">
                    Compartir {{ sharing.title }}
                </v-card-title>
                <v-card-subtitle
                    class="BUO-Paragraph-Small buo-none-word-break"
                >
                    BUO: Revolucioná la forma de certificar tus indicadores y
                    experiencias
                </v-card-subtitle>
                <v-card-text>
                    <v-layout justify-center :key="componentKey">
                        <share-it
                            :targets="sharing.socialNetworks"
                            dense
                            outline
                            round
                            :text="sharing.title"
                            :url="sharing.url"
                        />
                    </v-layout>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text>
                    <br />
                    <v-row justify="center">
                        <v-btn
                            class="ma-2"
                            fab
                            x-small
                            outlined
                            color="primary"
                            @click="show = !show"
                        >
                            <v-icon>
                                {{ show ? 'mdi-link-off' : 'mdi-link' }}
                            </v-icon>
                        </v-btn>
                        <v-text-field
                            @click="$_copy"
                            v-if="show"
                            :value="sharing.title"
                            append-icon="mdi-link-variant"
                            @click:append="$_copy"
                            single-line
                            solo
                            readonly
                        ></v-text-field>
                    </v-row>
                </v-card-text>
            </v-card>
        </div>
    </BasePopUp>
</template>

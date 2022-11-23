<script>
/**
 * Descripción: componente Layout para pags de Authentication
 *
 * @displayName TheAuthentication
 */

export default {
    name: 'TheAuthentication',

    props: {
        /**
         * Css Imagen
         * Default: custom
         */
        imgCss: {
            type: String,
            default:
                'https://buo-resources.s3.us-east-2.amazonaws.com/banners/Banners.003.svg',
        },

        isImg: {
            type: Boolean,
            default: true,
        },
    },

    data() {
        return {
            windowSize: {
                x: 0,
                y: 0,
            },
        };
    },

    components: {
        TheToolbar: () => import('@/layouts/authentication/TheAuthToolbar.vue'),
    },

    mounted() {
        this.onResize();
        this.$vuetify.theme.dark = false;
        this.$vuetify.theme.themes.light.background =
            this.$vuetify.theme.themes.light.white;
    },
    destroyed() {
        this.$vuetify.theme.themes.light.background =
            this.$vuetify.theme.themes.light.clouds;
    },

    methods: {
        onResize() {
            this.windowSize = { x: window.innerWidth, y: window.innerHeight };
        },
    },
};
</script>

<template>
    <div>
        <TheToolbar />
        <v-container
            class="px-0"
            :class="$vuetify.breakpoint.smAndDown && 'pt-0'"
        >
            <v-row align-content="center" class="mx-0" justify="space-around">
                <v-slide-x-transition
                    v-if="$vuetify.breakpoint.mdAndUp && isImg"
                    appear
                >
                    <v-col
                        cols="12"
                        md="5"
                        class="rounded-lg"
                        v-resize="onResize"
                    >
                        <v-img
                            contain
                            max-height="100%"
                            max-width="100%"
                            :height="windowSize.y - 100"
                            :width="windowSize.x"
                            class="rounded-lg"
                            :src="imgCss"
                            :lazy-src="imgCss"
                        ></v-img>
                    </v-col>
                </v-slide-x-transition>

                <v-slide-x-reverse-transition appear>
                    <v-col cols="12" :md="isImg ? 7 : 12" align-self="center">
                        <slot name="RenderBody"></slot>
                    </v-col>
                </v-slide-x-reverse-transition>
            </v-row>
        </v-container>
    </div>
</template>

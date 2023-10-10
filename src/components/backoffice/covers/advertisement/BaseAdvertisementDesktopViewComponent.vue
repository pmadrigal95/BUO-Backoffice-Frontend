<script>
/**
 * Descripción: Pantalla de anuncios para versión desktop
 *
 * @displayName BaseAdvertisementDesktopViewComponent
 */

export default {
    name: 'BaseAdvertisementDesktopViewComponent',

    props: {
        color: {
            type: String,
            default: 'bg-buo',
        },

        image: {
            type: String,
            required: false,
        },

        title: {
            type: String,
            required: true,
        },

        styleTitle: {
            type: String,
            default: 'BUO-Heading-Medium white--text',
        },

        description: {
            type: String,
            required: true,
        },

        styleDescription: {
            type: String,
            default: 'BUO-Paragraph-Medium white--text',
        },

        actions: {
            type: Array,
            required: false,
        },

        icon: {
            type: String,
            required: false,
        },

        iconColor: {
            type: String,
            default: 'white',
        },

        smallIcon: {
            type: Boolean,
            default: false,
        },

        largeIcon: {
            type: Boolean,
            default: false,
        },

        xLargeIcon: {
            type: Boolean,
            default: false,
        },

        fnIcon: {
            type: Function,
            required: false,
        },
    },

    data() {
        return {
            showAdvertisement: true,
        };
    },

    methods: {
        $_fnButton() {
            this.fnButton();
        },

        $_closeAdvertisement() {
            this.showAdvertisement = false;
        },

        $_fnIcon() {
            if (this.fnIcon) this.fnIcon();
            else this.$_closeAdvertisement();
        },
    },
};
</script>

<template>
    <v-hover v-slot="{ hover }" open-delay="200" v-if="showAdvertisement">
        <v-card
            :elevation="hover ? 8 : 3"
            class="rounded-lg"
            :class="`${color}`"
            max-height="210"
        >
            <v-img :src="image">
                <section class="d-flex flex-row justify-space-between">
                    <section min-width="70">
                        <article class="py-10 px-10">
                            <h2 :class="styleTitle">
                                {{ title }}
                            </h2>
                            <p :class="styleDescription">
                                {{ description }}
                            </p>
                        </article>
                    </section>

                    <section class="d-flex flex-column">
                        <section class="align-self-end mr-3">
                            <v-btn icon :color="iconColor" @click="$_fnIcon">
                                <v-icon
                                    :small="smallIcon"
                                    :x-large="xLargeIcon"
                                    :large="largeIcon"
                                    >mdi-{{ icon }}</v-icon
                                >
                            </v-btn>
                        </section>

                        <section
                            v-for="(action, index) in actions"
                            :key="index"
                        >
                            <section class="mr-14">
                                <v-btn
                                    dark
                                    block
                                    depressed
                                    :color="action.color"
                                    :class="action.style"
                                    @click="action.fn"
                                    :disabled="action.disabled"
                                >
                                    {{ action.name }}
                                </v-btn>
                            </section>
                        </section>
                    </section>
                </section>
            </v-img>
        </v-card>
    </v-hover>
</template>

<style scoped>
.bg-buo {
    background-image: linear-gradient(15deg, #13547a 0%, #80d0c7 100%);
}
</style>

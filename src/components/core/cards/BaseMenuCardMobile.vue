<script>
/**
 * Descripción: Pantalla Mis habilidades
 *
 * @displayName BaseMenuCardMobile
 */

export default {
    name: 'BaseMenuCardMobile',

    props: {
        menuItems: {
            type: Array,
            required: true,
        },

        height: {
            type: String,
            default: '240',
        },

        size: {
            type: String,
            default: '125',
        },
    },

    methods: {
        $_goToModule(module) {
            if (module && module != undefined) {
                this.$router.push({
                    name: module,
                });
            }
        },
    },
};
</script>

<template>
    <v-row v-if="$vuetify.breakpoint.mobile">
        <v-slide-group>
            <v-slide-item v-for="(item, i) in menuItems" :key="i">
                <v-card
                    hover
                    class="ma-4 rounded-lg"
                    elevation="14"
                    :height="height"
                    width="180"
                    @click="$_goToModule(item.module)"
                >
                    <v-avatar class="ma-3" :size="size" tile>
                        <v-img
                            contain
                            max-width="100%"
                            width="100%"
                            :src="require(`@/assets/app/${item.src}.svg`)"
                            :lazy-src="require(`@/assets/app/${item.src}.svg`)"
                        >
                        </v-img>
                    </v-avatar>

                    <div>
                        <v-card-title
                            class="BUO-Paragraph-Large"
                            v-text="item.title"
                        ></v-card-title>

                        <v-card-subtitle
                            v-if="item.subtitle"
                            class="BUO-Label-Large"
                            v-text="item.subtitle"
                        ></v-card-subtitle>
                    </div>
                </v-card>
            </v-slide-item>
        </v-slide-group>
    </v-row>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'ProfileViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    computed: { ...mapGetters('theme', ['app']) },
};
</script>

<template>
    <v-card flat class="pt-6" color="transparent">
        <v-card flat outlined class="rounded-lg">
            <v-card-title
                class="BUO-Paragraph-Large-SemiBold"
                :class="[app ? 'white--text' : 'grey700--text']"
                >Descripción del perfil</v-card-title
            >
            <v-card-subtitle
                class="BUO-Label-Small"
                :class="[app ? 'white--text' : 'black--text']"
                >{{ entity.perfilPDAVisual }}</v-card-subtitle
            >
            <v-card-text>
                <v-row dense>
                    <v-col cols="12" md="8">
                        <section
                            class="BUO-Label-Small"
                            :class="[app ? 'white--text' : 'black--text']"
                        >
                            {{ entity.descripcion }}
                        </section>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-layout justify-center align-center>
                            <v-img
                                contain
                                max-height="120"
                                v-if="entity.hotcakeSimpleURL"
                                :lazy-src="entity.hotcakeSimpleURL"
                                :src="entity.hotcakeSimpleURL"
                            />
                        </v-layout>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
        <v-row class="pt-6">
            <v-col cols="12" md="6">
                <section
                    class="BUO-Paragraph-Large"
                    :class="[app ? 'white--text' : 'grey700--text']"
                >
                    Características del perfil
                </section>
                <v-list dense flat color="transparent">
                    <v-list-item
                        class="buo-headerAbility-position"
                        v-for="(item, i) in entity.caracteristicas"
                        :key="i"
                    >
                        <v-list-item-avatar>
                            <v-icon :color="entity.perfilPDA.toLowerCase()"
                                >mdi-check-circle-outline</v-icon
                            >
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title
                                class="BUO-Paragraph-Small buo-word-break buo-white-space"
                                :class="[app ? 'white--text' : 'black--text']"
                                >{{ item }}</v-list-item-title
                            >
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-col>
            <v-col cols="12" md="6">
                <section
                    class="BUO-Paragraph-Large"
                    :class="[app ? 'white--text' : 'grey700--text']"
                >
                    Motivadores
                </section>
                <v-list dense flat color="transparent">
                    <v-list-item
                        class="buo-headerAbility-position"
                        v-for="(item, i) in entity.motivadores"
                        :key="i"
                    >
                        <v-list-item-avatar>
                            <v-icon :color="entity.perfilPDA.toLowerCase()"
                                >mdi-check-circle-outline</v-icon
                            >
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title
                                class="BUO-Paragraph-Small buo-word-break buo-white-space"
                                :class="[app ? 'white--text' : 'black--text']"
                                >{{ item }}</v-list-item-title
                            >
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-col>
        </v-row>
    </v-card>
</template>

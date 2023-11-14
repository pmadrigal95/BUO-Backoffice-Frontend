<script>
import { mapGetters } from 'vuex';

export default {
    name: 'HeaderViewComponent',

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
    <v-card flat color="transparent">
        <v-row justify="start" class="pb-5">
            <section
                class="BUO-Label-XSmall"
                :class="[app ? 'blueProgress600--text' : 'grey600--text']"
            >
                Reporte BUO - Buo Psychometric
            </section>
        </v-row>
        <v-row dense>
            <img
                v-if="entity.pda && entity.pda.hotcakeSimpleURL"
                height="95"
                width="70"
                :src="entity.pda.hotcakeSimpleURL"
            />
            <section class="px-10">
                <section
                    class="BUO-Heading-XSmall"
                    :class="[app ? 'white--text' : 'grey700--text']"
                >
                    {{ entity.nombreCompleto }}
                </section>
                <section class="pt-2">
                    <v-layout>
                        <section class="pr-3" v-if="entity.pda">
                            <section
                                class="BUO-Label-XSmall pb-1"
                                :class="[
                                    app
                                        ? 'blueProgress600--text'
                                        : 'grey600--text',
                                ]"
                            >
                                Eres una persona:
                            </section>
                            <v-chip
                                outlined
                                color="grey500"
                                class="BUO-Label-XSmall-SemiBold"
                            >
                                <span
                                    :class="[
                                        app
                                            ? 'blueProgress600--text'
                                            : 'grey600--text',
                                    ]"
                                    >{{ entity.pda.perfilPDAVisual }}</span
                                >
                            </v-chip>
                        </section>
                        <v-divider vertical></v-divider>
                        <div class="pl-3" v-if="entity.pda">
                            <section
                                class="BUO-Label-XSmall pb-1"
                                :class="[
                                    app
                                        ? 'blueProgress600--text'
                                        : 'grey600--text',
                                ]"
                            >
                                Tu super poder es:
                            </section>
                            <v-chip
                                color="grey500"
                                outlined
                                class="BUO-Label-XSmall-SemiBold"
                                ><span
                                    :class="[
                                        app
                                            ? 'blueProgress600--text'
                                            : 'grey600--text',
                                    ]"
                                    >{{ entity.pda.superpoder }}</span
                                >
                            </v-chip>
                        </div>
                    </v-layout>
                </section>
            </section>
        </v-row>
    </v-card>
</template>

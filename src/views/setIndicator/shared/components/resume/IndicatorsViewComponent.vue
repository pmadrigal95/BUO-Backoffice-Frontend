<script>
/**
 * Descripción: Pantalla ResumeViewComponent
 *
 * @displayName ResumeViewComponent
 *
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

export default {
    name: 'IndicatorsViewComponent',

    props: {
        abilityIdList: {
            type: Array,
            requiered: true,
        },

        entity: {
            type: Object,
            requiered: true,
        },
    },

    data() {
        return {
            key: 0,
            color: 0,
            panel: [],
            loading: false,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),
    },

    created() {
        this.$_setCompleteObject();
    },

    methods: {
        $_setCompleteObject() {
            this.loading = true;
            httpService
                .post('cualificacion/details', {
                    habilidadIds: this.abilityIdList,
                })
                .then((response) => {
                    this.loading = false;
                    if (response != undefined) {
                        // Encontro la entidad
                        this.entity.selected.abilityList = this.$_parseResponse(
                            Object.values(response.data)
                        );
                    }
                });
        },

        $_parseResponse(array) {
            let result = [];

            array.forEach((element, index) => {
                let item = {
                    id: element.habilidad.id,
                    definicion: element.habilidad.definicion,
                    nombreCategoria: element.habilidad.nombreCategoria,
                    competencias: element.competencias.map((x) => {
                        return {
                            id: x.id,
                            definicion: x.definicion,
                            check: true,
                        };
                    }),
                };

                result.push(item);
                this.panel.push(index);
            });

            return result;
        },
    },
};
</script>

<template>
    <section>
        <BaseSkeletonLoader v-if="loading" type="list-item" />
        <v-card
            flat
            :height="abilityIdList.length > 6 ? '550' : '100%'"
            class="overflow-auto"
            v-if="abilityIdList.length > 0 && entity.selected.abilityList"
        >
            <v-expansion-panels
                flat
                multiple
                v-model="panel"
                :key="key"
                v-if="entity?.selected?.abilityList.length > 0"
            >
                <v-expansion-panel
                    v-for="(item, i) in entity.selected.abilityList"
                    :key="i"
                >
                    <v-expansion-panel-header
                        class="buo-expansion-panel-header"
                    >
                        <v-list-item>
                            <v-list-item-avatar class="mr-1">
                                <v-img
                                    src="https://buo-resources.s3.us-east-2.amazonaws.com/certification/HabilityAwardBUO.svg"
                                    max-height="100%"
                                    max-width="100%"
                                    contain
                                />
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title
                                    class="BUO-Paragraph-Medium"
                                    >{{ item.definicion }}</v-list-item-title
                                >

                                <v-list-item-subtitle
                                    class="BUO-Label-XSmall"
                                    >{{
                                        item.nombreCategoria
                                    }}</v-list-item-subtitle
                                >
                            </v-list-item-content>

                            <v-list-item-action>
                                <v-btn
                                    icon
                                    @click="$_delete(item.id)"
                                    class="pb-1"
                                >
                                    <v-icon color="grey500"
                                        >mdi-close-circle-outline</v-icon
                                    >
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-item-group multiple>
                            <v-row dense>
                                <v-col
                                    v-for="(element, i) in item.competencias"
                                    :key="i"
                                    cols="12"
                                >
                                    <v-item
                                        :value="element.check"
                                        v-slot="{ toggle }"
                                    >
                                        <v-card
                                            flat
                                            :color="
                                                element.check
                                                    ? app
                                                        ? 'blue700'
                                                        : 'clouds'
                                                    : app
                                                    ? 'grey700'
                                                    : 'grey200'
                                            "
                                            class="rounded-lg"
                                            @click="toggle"
                                        >
                                            <section
                                                class="d-flex flex-no-wrap justify-space-between"
                                                @click="
                                                    element.check =
                                                        !element.check
                                                "
                                            >
                                                <v-card-title
                                                    class="BUO-Paragraph-Small buo-word-break"
                                                    :class="[
                                                        app
                                                            ? 'white--text'
                                                            : 'grey700--text',
                                                    ]"
                                                >
                                                    {{ element.definicion }}
                                                </v-card-title>

                                                <v-avatar class="ma-2" tile>
                                                    <v-icon
                                                        v-if="!element.check"
                                                        :color="
                                                            app
                                                                ? 'white'
                                                                : 'grey700'
                                                        "
                                                    >
                                                        mdi-radiobox-blank
                                                    </v-icon>

                                                    <v-icon
                                                        v-else
                                                        color="blue800"
                                                    >
                                                        mdi-check-circle
                                                    </v-icon>
                                                </v-avatar>
                                            </section>
                                        </v-card>
                                    </v-item>
                                </v-col>
                            </v-row>
                        </v-item-group>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-card>
    </section>
</template>

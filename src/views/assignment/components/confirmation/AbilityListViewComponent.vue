<script>
/**
 * Descripción: Pantalla
 *
 * @displayName AbilityListViewComponent
 *
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

export default {
    name: 'AbilityListViewComponent',

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
            panel: [],
            loading: false,
            key1: 0,
        };
    },

    computed: { ...mapGetters('theme', ['app']) },

    created() {
        this.$_setCompleteObject();
    },

    watch: {
        app: {
            handler() {
                this.key1++;
            },
        },
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

        $_delete(index) {
            this.entity.selected.abilityList =
                this.entity.selected.abilityList.filter((x) => x.id != index);
            this.key++;
        },

        $_parseResponse(array) {
            let result = [];

            array.forEach((element) => {
                let item = {
                    id: element.habilidad.id,
                    definicion: element.habilidad.definicion,
                    nombreCategoria: element.habilidad.nombreCategoria,
                    competencias: element.competencias.map((x) => {
                        return {
                            id: x.id,
                            definicion: x.definicion,
                            check: false,
                        };
                    }),
                };

                result.push(item);
            });

            return result;
        },
    },
};
</script>

<template>
    <BaseSkeletonLoader v-if="loading" type="list-item" />
    <v-expansion-panels
        flat
        multiple
        v-model="panel"
        v-else-if="!loading && this.entity.selected.abilityList"
        :key="key"
    >
        <v-expansion-panel
            v-for="(item, i) in entity.selected.abilityList"
            :key="i"
        >
            <v-expansion-panel-header class="buo-expansion-panel-header">
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
                        <v-list-item-title class="BUO-Paragraph-Medium">{{
                            item.definicion
                        }}</v-list-item-title>

                        <v-list-item-subtitle class="BUO-Label-XSmall">{{
                            item.nombreCategoria
                        }}</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                        <v-btn icon @click="$_delete(item.id)" class="pb-1">
                            <v-icon color="grey500"
                                >mdi-close-circle-outline</v-icon
                            >
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <v-list rounded>
                    <v-list-item-group
                        :active-class="
                            app ? 'blueProgress600--text' : 'blue800--text'
                        "
                        multiple
                        :key="key1"
                    >
                        <template v-for="element in item.competencias">
                            <v-list-item
                                :key="element.id"
                                @click="element.check = !element.check"
                            >
                                <template v-slot:default="{ active }">
                                    <v-list-item-content>
                                        <v-list-item-title>{{
                                            element.definicion
                                        }}</v-list-item-title>
                                    </v-list-item-content>

                                    <v-list-item-action>
                                        <v-icon v-if="!active" color="grey500">
                                            mdi-circle-outline
                                        </v-icon>

                                        <v-icon v-else color="primary">
                                            mdi-check-circle
                                        </v-icon>
                                    </v-list-item-action>
                                </template>
                            </v-list-item>
                        </template>
                    </v-list-item-group>
                </v-list>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

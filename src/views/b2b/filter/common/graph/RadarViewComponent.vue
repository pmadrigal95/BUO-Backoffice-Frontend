<script>
/**
 * Descripción: Pantalla Busqueda de talento
 *
 * @displayName RadarViewComponent
 *
 */

import { mapGetters } from 'vuex';

import baseFnChart from '@/components/pda/baseFnChart';

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

const MultiplePDARadarChart = () =>
    import('@/components/pda/MultiplePDARadarChart');

const BaseNotFoundContent = () =>
    import('@/components/core/cards/BaseNotFoundContent');

export default {
    name: 'RadarViewComponent',

    components: { MultiplePDARadarChart, BaseNotFoundContent },

    props: {
        usuarioIdList: {
            type: Array,
            requiered: true,
        },
    },

    data() {
        return {
            loading: false,
            list: undefined,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        chartData() {
            return baseFnChart.$_createObject(this.list);
        },
    },

    watch: {
        app: {
            handler() {
                this.key++;
            },
        },
    },

    created() {
        this.$_getObject();
    },

    methods: {
        /**
         * Determinar si Es nuevo / editor
         */
        $_getObject() {
            //HttpServices a la vista para obtener Vista
            this.loading = true;
            httpService
                .post('pda/getTestList', { usuarioIdList: this.usuarioIdList })
                .then((response) => {
                    this.loading = false;
                    if (response != undefined && response.data.length > 0) {
                        // Encontro la entidad
                        this.list = BaseArrayHelper.SetObject(
                            [],
                            response.data
                        );
                    }
                });
        },
    },
};
</script>

<template>
    <BaseSkeletonLoader v-if="loading" type="article, actions" />
    <div v-else-if="list && list.length > 0">
        <v-row justify="start" class="pl-3 pb-8">
            <v-col cols="12" md="8">
                <section
                    class="BUO-Heading-Small"
                    :class="[app ? 'blueProgress600--text' : 'blue900--text']"
                >
                    Comparación de indicadores PDA
                </section>
            </v-col>
        </v-row>

        <MultiplePDARadarChart
            :chartData="chartData"
            v-if="chartData != undefined && chartData.labels != null"
            :dark="app ? true : false"
            class="pb-3"
            :key="key"
        />
        <BaseNotFoundContent
            v-else
            msg="Actualmente los colaboradores seleccionados no poseen el test de PDA."
        />
    </div>
</template>

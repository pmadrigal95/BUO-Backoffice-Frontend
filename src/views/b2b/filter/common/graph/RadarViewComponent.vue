<script>
/**
 * Descripción: Pantalla Busqueda de talento
 *
 * @displayName RadarViewComponent
 *
 */
import baseFnChart from '@/components/pda/baseFnChart';

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

const MultiplePDARadarChart = () => import('@/components/pda/MultiplePDARadarChart');

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
        chartData() {
            return baseFnChart.$_createObject(this.list);
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
                <div class="BUO-Heading-Small blue900--text">
                    Comparación de habilidades PDA
                </div>
            </v-col>
        </v-row>

        <MultiplePDARadarChart
            :chartData="chartData"
            v-if="chartData != undefined && chartData.labels != null"
            class="py-2"
        />
        <BaseNotFoundContent
            v-else
            msg="Actualmente los colaboradores seleccionados no poseen el test de PDA."
        />
    </div>
</template>

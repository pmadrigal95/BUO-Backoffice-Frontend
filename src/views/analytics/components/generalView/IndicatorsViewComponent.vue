<script>
/**
 * Descripción: Pantalla Analytics
 *
 * @displayName IndicatorsViewComponent
 */

import { mapGetters } from 'vuex';

const BaseStadisticCard = () =>
    import('@/components/core/cards/BaseStadisticCard');

export default {
    name: 'IndicatorsViewComponent',

    components: {
        BaseStadisticCard,
    },

    computed: {
        /**
         * Nombre de Usuario
         */
        ...mapGetters('analytics', ['buoAnalytics']),
    },
};
</script>

<template>
    <v-row dens>
        <v-col v-for="(item, i) in buoAnalytics" :key="i" cols="12" md="6">
            <BaseStadisticCard
                :title="item.titulo"
                :subtitle="item.subtitulo"
                :icon="item.imagenUrl"
                :value="item.valor"
                :percentage="item.porcentaje"
                :previousValue="item.valorAnterior"
                :isUp="item.indicador"
            />
        </v-col>
    </v-row>
</template>

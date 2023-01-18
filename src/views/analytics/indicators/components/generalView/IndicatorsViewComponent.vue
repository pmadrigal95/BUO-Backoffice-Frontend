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
        ...mapGetters('analyticsIndicators', ['buoAnalytics']),

        list() {
            return this.buoAnalytics.filter((x) => x.indicadorId != 8);
        },

        codeList() {
            return this.buoAnalytics.filter((x) => x.indicadorId === 8);
        },
    },

    methods: {
        $_open() {
            this.codeList.length > 1 && this.$refs['popUp'].$_openModal();
        },
    },
};
</script>

<template>
    <div>
        <BasePopUp
            ref="popUp"
            :maxWidth="$vuetify.breakpoint.mobile ? '100%' : '80%'"
            scrollable
            :isDrawer="false"
        >
            <div slot="Content">
                <br />
                <v-row dens>
                    <v-col
                        v-for="(item, i) in codeList.slice(1)"
                        :key="i"
                        cols="12"
                        md="4"
                    >
                        <BaseStadisticCard
                            color="clouds"
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
            </div>
        </BasePopUp>

        <v-row>
            <v-col v-for="(item, i) in list" :key="i" cols="12" md="4">
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
            <v-col cols="12" md="4">
                <BaseStadisticCard
                    :fn="$_open"
                    :title="codeList[0].titulo"
                    :subtitle="codeList[0].subtitulo"
                    :icon="codeList[0].imagenUrl"
                    :value="codeList[0].valor"
                    :percentage="codeList[0].porcentaje"
                    :previousValue="codeList[0].valorAnterior"
                    :isUp="codeList[0].indicador"
                />
            </v-col>
        </v-row>
    </div>
</template>

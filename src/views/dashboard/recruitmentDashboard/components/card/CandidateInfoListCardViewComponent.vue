<script>
/**
 * Descripción: Pantalla  CandidateInfoListCardViewComponent
 *
 * @displayName CandidateInfoListCardViewComponent
 *
 */
const BaseBasicCardViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/card/BaseBasicCardViewComponent'
    );

const CandidateInfoCardViewComponent = () =>
    import(
        '@/views/dashboard/recruitmentDashboard/components/card/CandidateInfoCardViewComponent'
    );

export default {
    name: 'CandidateInfoListCardViewComponent',

    props: {
        cardList: {
            type: Array,
            requiered: true,
        },

        width: {
            type: String,
            default: '360px',
        },

        height: {
            type: String,
            default: '100%',
        },

        callback: {
            type: Function,
            required: true,
        },
    },

    components: { BaseBasicCardViewComponent, CandidateInfoCardViewComponent },
};
</script>

<template>
    <BaseBasicCardViewComponent
        title="Candidatos estrella"
        v-if="cardList.length > 0"
    >
        <section slot="card-text">
            <v-layout justify-center>
                <v-slide-group>
                    <v-slide-item v-for="(item, i) in cardList" :key="i">
                        <v-card
                            class="transparent pt-4 mx-2"
                            elevation="0"
                            flat
                            :height="height"
                            :width="width"
                        >
                            <CandidateInfoCardViewComponent
                                :chartData="item"
                                :callback="callback"
                                class="mx-2"
                            />
                        </v-card>
                    </v-slide-item>
                </v-slide-group>
            </v-layout>
        </section>
    </BaseBasicCardViewComponent>
</template>

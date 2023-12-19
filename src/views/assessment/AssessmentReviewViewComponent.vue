<script>
/**
 * Descripción: Pantalla Pruebas
 *
 * @displayName AssessmentReviewViewComponent
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const AssessmentReview = () =>
    import('@/views/assessment/components/review/AssessmentReview');

export default {
    name: 'AssessmentReviewViewComponent',

    components: {
        AssessmentReview,
        BaseCardViewComponent,
    },

    data() {
        return {
            loading: false,
            entity: undefined,
        };
    },

    computed: { ...mapGetters('theme', ['app']) },

    created() {
        this.$_getObject();
    },

    methods: {
        /**
         * Function to return the AssessmentFilterViewComponent
         */
        $_returnToFilter() {
            this.$router.push({
                name: 'AssessmentFilterViewComponent',
            });
        },

        /**
         * Determinar si Es nuevo / editor
         */
        $_getObject() {
            let data = this.$router.currentRoute.params.Id;
            if (data) {
                //HttpServices a la vista para obtener Vista
                this.loading = true;
                httpService.get(`prueba/${data}`).then((response) => {
                    this.loading = false;
                    if (response != undefined) {
                        // Encontro la entidad
                        this.entity = BaseArrayHelper.SetObject(
                            {},
                            response.data
                        );
                    }
                });
            } else {
                this.$_returnToFilter();
            }
        },
    },
};
</script>

<template>
    <BaseCardViewComponent :btnAction="$_returnToFilter">
        <div slot="top-actions">
            <v-layout justify-end>
                <v-btn
                    :color="app ? 'blueProgress600' : 'blue800'"
                    class="ma-1 no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                    text
                    @click="$_returnToFilter"
                >
                    Descargar
                    <v-icon right dark>
                        mdi-download-circle-outline</v-icon
                    ></v-btn
                >
            </v-layout>
        </div>
        <div slot="card-text">
            <BaseSkeletonLoader v-if="loading" type="article, actions" />
            <AssessmentReview :entity="entity" v-else-if="entity" />
        </div>
    </BaseCardViewComponent>
</template>

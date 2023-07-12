<script>
/**
 * Descripción: Pantalla ReportViewComponent
 *
 * @displayName ReportViewComponent
 *
 */

import { mapGetters } from 'vuex';

import baseFnFile from '@/helpers/baseFnFile';

import httpService from '@/services/axios/httpService';

// import baseSecurityHelper from '@/helpers/baseSecurityHelper';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

const PreviewHeaderViewComponent = () =>
    import(
        '@/views/reports/assessment/components/preview/PreviewHeaderViewComponent'
    );

const PreviewViewComponent = () =>
    import(
        '@/views/reports/assessment/components/preview/PreviewViewComponent'
    );

export default {
    name: 'ReportViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    components: {
        PreviewHeaderViewComponent,
        PreviewViewComponent,
    },

    data() {
        return {
            loading: false,
            componentKey: 0,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        errorMsg() {
            return 'Solo se podra generar el reporte de aquellos colaboradores que hayan completado el assessment asignado.';
        },
    },

    methods: {
        $_goBack() {
            delete this.entity.preview;
            this.entity.step = 0;
            this.componentKey++;
        },

        $_sendToApi() {
            if (!this.entity.preview) {
                baseNotificationsHelper.Message(true, this.errorMsg);
                return;
            }

            this.loading = true;
            httpService
                .post('pruebaResultado/pdf', {
                    organizacionId: this.entity.companyId,
                    idList: [this.entity.preview.id],
                })
                .then((response) => {
                    if (response != undefined) {
                        response.data == '' &&
                            baseNotificationsHelper.Message(
                                true,
                                this.errorMsg
                            );

                        baseFnFile.$_dowloadFile(
                            response.data.fileEncoded,
                            response.data.fileName,
                            baseFnFile.$_extensionsName.zip
                        );
                    }
                    this.loading = false;
                });
        },
    },
};
</script>

<template>
    <section v-if="entity.step == 1">
        <section>
            <v-layout justify-space-between align-center>
                <v-btn
                    @click="$_goBack"
                    :color="app ? 'blueProgress600' : 'blue800'"
                    class="ma-1 no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                    text
                >
                    <v-icon left dark> mdi-chevron-left </v-icon>Regresar</v-btn
                >

                <v-btn
                    @click="$_sendToApi"
                    :color="app ? 'blueProgress600' : 'blue800'"
                    class="ma-1 no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                    text
                    :loading="loading"
                >
                    Descargar
                    <v-icon right dark>
                        mdi-download-circle-outline
                    </v-icon></v-btn
                >
            </v-layout>
        </section>

        <section>
            <PreviewHeaderViewComponent :entity="entity" :key="componentKey" />

            <PreviewViewComponent :entity="entity" :key="componentKey + 1" />
        </section>
    </section>
</template>

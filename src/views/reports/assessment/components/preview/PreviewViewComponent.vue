<script>
/**
 * Descripción: Pantalla ReportViewComponent
 *
 * @displayName ReportViewComponent
 *
 */

import baseFnFile from '@/helpers/baseFnFile';

import httpService from '@/services/axios/httpService';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

export default {
    name: 'PreviewViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    data() {
        return {
            loading: false,
            data: undefined,
        };
    },

    computed: {
        errorMsg() {
            return 'Solo se podra generar el reporte de aquellos colaboradores que hayan completado el assessment asignado.';
        },
    },

    created() {
        this.loading = true;
        httpService
            .post('pruebaResultado/html', { id: this.entity?.preview?.id })
            .then((response) => {
                if (response != undefined) {
                    this.data = response.data;
                }
                this.loading = false;
            });
    },

    methods: {
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
    <BaseSkeletonLoader type="card, article" v-if="loading" />
    <v-hover v-slot="{ hover }" open-delay="200" v-else>
        <v-card
            light
            :elevation="hover ? 8 : 3"
            :class="{ 'on-hover': hover }"
            class="mx-2 rounded-lg"
            max-height="100%"
            max-width="100%"
            @click="$_sendToApi"
        >
            <section v-if="data" v-html="data.encabezado" />
            <section v-if="data" v-html="data.detalle" />
        </v-card>
    </v-hover>
</template>

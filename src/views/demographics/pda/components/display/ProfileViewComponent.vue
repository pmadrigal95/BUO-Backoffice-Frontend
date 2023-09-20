<script>
/**
 * Descripción: Pantalla
 *
 * @displayName ProfileViewComponent
 *
 */

import { mapGetters } from 'vuex';

import baseFnFile from '@/helpers/baseFnFile';
import httpService from '@/services/axios/httpService';
import baseSecurityHelper from '@/helpers/baseSecurityHelper';

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

export default {
    name: 'ProfileViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },

        profile: {
            Type: String,
            requiered: true,
        },

        profileUrl: {
            Type: String,
            requiered: true,
        },
    },

    components: {
        BaseCustomsButtonsGrid,
    },

    data() {
        return {
            loading: false,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        permission() {
            const result = baseSecurityHelper.$_ReadPermission(
                'BuoPdaDemographicsViewComponent',
                baseSecurityHelper.$_download
            );
            return result;
        },
    },

    methods: {
        $_showAdvFilter() {
            this.entity.show = !this.entity.show;
        },

        $_sendToApi() {
            this.loading = true;

            const object = {
                organizacionId: this.entity.companyId,
                departamentoId: this.entity.departmentId,
            };

            httpService.post('analytics/pdf/pda', object).then((response) => {
                if (response != undefined) {
                    baseFnFile.$_dowloadFile(
                        response.data.fileEncoded,
                        response.data.fileName,
                        baseFnFile.$_extensionsName.zip
                    );
                    this.loading = false;
                }
            });
        },
    },
};
</script>

<template>
    <v-card flat class="rounded-t-xl">
        <v-card-text>
            <v-row justify="end" class="pa-3">
                <BaseCustomsButtonsGrid
                    v-if="permission"
                    label="Descargar"
                    :outlined="false"
                    :fnMethod="$_sendToApi"
                    :loading="loading"
                    icon="mdi-download-circle-outline"
                />

                <BaseCustomsButtonsGrid
                    label="Filtro Avanzado"
                    :fnMethod="$_showAdvFilter"
                    :outlined="!entity.show"
                    icon="mdi-filter-cog-outline"
                />
            </v-row>
            <section class="pt-3">
                <v-layout justify-center>
                    <v-img
                        v-if="profileUrl"
                        contain
                        height="220"
                        width="151"
                        :src="profileUrl"
                        :lazy-src="profileUrl"
                        style="cursor: pointer"
                    />
                </v-layout>
                <v-card-subtitle
                    class="buo-word-break text-center"
                    v-if="profile"
                >
                    <section
                        class="BUO-Heading-XSmall"
                        :class="[
                            app ? 'blueProgress600--text' : 'grey700--text',
                        ]"
                    >
                        {{ profile }}
                    </section>
                    <section
                        class="BUO-Paragraph-Small"
                        :class="[app ? 'white--text' : 'black--text']"
                    >
                        Si tu
                        {{ this.entity.departmentId ? 'área' : 'empresa' }}
                        fuera una persona, este sería su perfil.
                    </section>
                </v-card-subtitle>
            </section>
        </v-card-text>
    </v-card>
</template>

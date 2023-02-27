<script>
/**
 * Descripción: Pantalla detalle de usuario BUO PDA
 *
 * @displayName BUOPDAUserDetailsReportViewComponent
 *
 */

import baseFnFile from '@/helpers/baseFnFile';

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

const HeaderViewComponent = () =>
    import('@/views/reports/buo-pda/components/HeaderViewComponent');

const ProfileViewComponent = () =>
    import('@/views/reports/buo-pda/components/ProfileViewComponent');

const AxesViewComponent = () =>
    import('@/views/reports/buo-pda/components/AxesViewComponent');

const AbilitiesViewComponent = () =>
    import('@/views/reports/buo-pda/components/AbilitiesViewComponent');

export default {
    name: 'BUOPDAUserDetailsReportViewComponent',

    components: {
        AxesViewComponent,
        BaseCardViewComponent,
        BaseCustomsButtonsGrid,
        HeaderViewComponent,
        ProfileViewComponent,
        AbilitiesViewComponent,
    },

    data() {
        return {
            entity: undefined,
            loading: false,
            loadingBtn: false,
        };
    },

    created() {
        /**
         * Set Info
         */
        this.$_getObject();

        //TODO: How to implement on vue router the background config
        this.$vuetify.theme.themes.light.background =
            this.$vuetify.theme.themes.light.white;
    },

    destroyed() {
        this.$vuetify.theme.themes.light.background =
            this.$vuetify.theme.themes.light.clouds;
    },

    methods: {
        /**
         * Function to return the BUOPDAReportViewComponent
         */
        $_returnToFilter() {
            this.$router.push({
                name: 'BUOPDAReportViewComponent',
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
                httpService.get(`user/${data}`).then((response) => {
                    this.loading = false;
                    if (response != undefined) {
                        // Encontro la entidad
                        this.entity = BaseArrayHelper.SetObject(
                            {},
                            response.data
                        );

                        this.$_reviewStatus();
                    }
                });
            }
        },

        $_reviewStatus() {
            this.loading = true;
            httpService
                .get(`/pda/getTest/${this.entity.username}`)
                .then((response) => {
                    if (response != undefined) {
                        if (response.data) {
                            this.entity.pda = BaseArrayHelper.SetObject(
                                {},
                                response.data
                            );
                        }
                    }
                    this.loading = false;
                });
        },

        $_sendToApi() {
            this.loadingBtn = true;

            const object = {
                organizacionId: this.entity.organizacionId,
                empleados: [this.entity.id],
            };

            httpService
                .post('buo_pda/reporte_resumen', object)
                .then((response) => {
                    if (response != undefined) {
                        baseFnFile.$_dowloadFile(
                            response.data.fileEncoded,
                            response.data.fileName,
                            baseFnFile.$_extensionsName.zip
                        );
                        this.loadingBtn = false;
                    }
                });
        },
    },
};
</script>

<template>
    <BaseCardViewComponent :btnAction="$_returnToFilter">
        <div slot="top-actions">
            <BaseCustomsButtonsGrid
                label="Descargar"
                :fnMethod="$_sendToApi"
                icon="mdi-download"
                :loading="loadingBtn"
            />
        </div>
        <div slot="card-text">
            <BaseSkeletonLoader v-if="loading" type="article, actions" />
            <v-card flat v-else>
                <v-card-text>
                    <HeaderViewComponent :entity="entity" />

                    <AbilitiesViewComponent :entity="entity.pda" />

                    <ProfileViewComponent :entity="entity.pda" />

                    <AxesViewComponent :entity="entity.pda" />
                </v-card-text>
            </v-card>
        </div>
    </BaseCardViewComponent>
</template>

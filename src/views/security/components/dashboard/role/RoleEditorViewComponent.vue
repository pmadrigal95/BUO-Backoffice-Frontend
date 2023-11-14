<script>
/**
 * Descripción: Pantalla  Seguridad
 *
 * @displayName RoleEditorViewComponent
 *
 */

import { mapGetters } from 'vuex';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

import httpService from '@/services/axios/httpService';

import {
    baseFilterSettingsHelper,
    baseDataTableColumnsHelper,
} from '@/helpers/baseFilterSettingsHelper';

export default {
    name: 'RoleEditorViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    data() {
        return {
            temp: undefined,
            loading: false,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        ...mapGetters('authentication', ['user', 'buoId']),

        ...mapGetters('filters', ['advfiltersBypageView', 'dialogViewById']),

        companyDialogView() {
            return this.dialogViewById('companyDialog');
        },

        /**
         * Configuracion BaseInputDataTable

         */
        settingOrganization() {
            return baseFilterSettingsHelper.$_setCompanySetting({
                isFilter: true,
                singleSelect: true,
                list: this.advfiltersBypageView(this.companyDialogView),
                pageView: this.companyDialogView,
            });
        },
    },

    created() {
        this.temp = BaseArrayHelper.SetObject({}, this.entity.form);
    },

    methods: {
        $_fnCancel() {
            this.entity.step = 0;
            this.entity.componentKey++;
        },

        $_setCompanyFilter() {
            baseDataTableColumnsHelper.$_setCompanyColumns({
                isFilter: true,
                pageView: this.companyDialogView,
            });
        },

        $_entityToDto() {
            return {
                id: this.temp.id,
                organizacionId: this.temp.organizacionId,
                nombre: this.temp.nombre,
                descripcion: this.temp.descripcion,
                estadoId: this.temp.estadoId,
            };
        },

        $_sendToApi() {
            this.loading = true;

            httpService
                .post('perfil/update', this.$_entityToDto())
                .then((response) => {
                    this.loading = false;

                    if (response != undefined) {
                        this.entity.form = BaseArrayHelper.SetObject(
                            {},
                            response.data
                        );
                        this.$_fnCancel();
                    }
                });
        },
    },
};
</script>

<template>
    <v-slide-x-transition appear>
        <v-card flat class="pa-6">
            <BaseSkeletonLoader v-if="loading" type="article, actions" />
            <BaseForm
                :block="$vuetify.breakpoint.mobile"
                :method="$_sendToApi"
                :cancel="$_fnCancel"
                v-else
            >
                <div slot="body">
                    <v-row dense>
                        <v-col cols="12" v-if="user.companyId === buoId">
                            <BaseInputDataTable
                                label="Empresa"
                                itemText="nombre"
                                :setting="settingOrganization"
                                :pageView="companyDialogView"
                                :editText="temp.nombreOrganizacion"
                                v-model.number="temp.organizacionId"
                                :fnResetConfig="$_setCompanyFilter"
                                :validate="['requiered']"
                            />
                        </v-col>
                        <v-col cols="12">
                            <BaseInput
                                label="Nombre"
                                v-model.trim="temp.nombre"
                                type="text"
                                :validate="['text']"
                            />
                        </v-col>
                        <v-col cols="12">
                            <BaseTextArea
                                label="Descripción"
                                :max="1000"
                                v-model.trim="temp.descripcion"
                                :validate="['text']"
                            />
                        </v-col>
                        <v-col cols="12">
                            <BaseRadioGroup
                                v-model="temp.estadoId"
                                endpoint="status"
                                :validate="['requiered']"
                            />
                        </v-col>
                    </v-row>
                </div>
            </BaseForm>
        </v-card>
    </v-slide-x-transition>
</template>

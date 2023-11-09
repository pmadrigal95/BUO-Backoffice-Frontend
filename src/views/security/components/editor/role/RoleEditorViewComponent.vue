<script>
/**
 * Descripción: Pantalla Editor roles
 *
 * @displayName RoleEditorViewComponent
 *
 */

import { mapGetters } from 'vuex';

import {
    baseFilterSettingsHelper,
    baseDataTableColumnsHelper,
} from '@/helpers/baseFilterSettingsHelper';

const StepViewComponent = () =>
    import('@/views/user/bulkLoad/components/StepViewComponent');

const BaseInputDataTable = () =>
    import('@/components/core/forms/BaseInputDataTable.vue');

export default {
    name: 'RoleEditorViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    components: {
        StepViewComponent,
        BaseInputDataTable,
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
        if (this.user.companyId != this.buoId) {
            this.entity.form.organizacionId = this.user.companyId;
        }
    },

    watch: {
        /**
         * Actualizar calendarios
         */
        'entity.form.organizacionId': {
            handler(newValue, oldValue) {
                if (oldValue) {
                    this.$_cleanList();
                }
            },
            immediate: true,
        },
    },

    methods: {
        $_setCompanyFilter() {
            baseDataTableColumnsHelper.$_setCompanyColumns({
                isFilter: true,
                pageView: this.companyDialogView,
            });
        },

        /**
         * Function to return the SecurityFilterViewComponent
         */
        $_returnToFilter() {
            this.$router.push({
                name: 'SecurityFilterViewComponent',
            });
        },

        $_nextStep() {
            this.entity.step = 1;
        },

        $_cleanList() {
            this.entity.form.tempAccionIds = [];
            this.entity.form.tempUsuarioIds = [];
            this.entity.form.usuarioIds = [];
            this.entity.form.accionIds = [];

            this.entity.componentKey++;
        },
    },
};
</script>

<template>
    <section class="mx-10 my-10">
        <v-layout justify-start>
            <StepViewComponent
                icon="mdi-numeric-1-circle"
                description="Ingresar la información del rol"
                iconColor="greenC900"
                :font="`BUO-Paragraph-Large-SemiBold ${
                    app ? 'white--text' : 'grey700--text'
                }`"
            />
        </v-layout>
        <BaseForm
            :block="$vuetify.breakpoint.mobile"
            labelBtn="Continuar"
            :method="$_nextStep"
            :cancel="$_returnToFilter"
        >
            <div slot="body">
                <v-row dense>
                    <v-col cols="12" v-if="user.companyId === buoId">
                        <BaseInputDataTable
                            label="Empresa"
                            itemText="nombre"
                            :setting="settingOrganization"
                            :pageView="companyDialogView"
                            :editText="entity.form.nombreOrganizacion"
                            v-model.number="entity.form.organizacionId"
                            :fnResetConfig="$_setCompanyFilter"
                            :validate="['requiered']"
                        />
                    </v-col>
                    <v-col cols="12">
                        <BaseInput
                            label="Nombre"
                            v-model.trim="entity.form.nombre"
                            type="text"
                            :validate="['text']"
                        />
                    </v-col>
                    <v-col cols="12">
                        <BaseTextArea
                            label="Descripción"
                            :max="1000"
                            v-model.trim="entity.form.descripcion"
                            :validate="['text']"
                        />
                    </v-col>
                    <v-col cols="12">
                        <BaseRadioGroup
                            v-model="entity.form.estadoId"
                            endpoint="status"
                            :validate="['requiered']"
                        />
                    </v-col>
                </v-row>
            </div>
        </BaseForm>
    </section>
</template>

<script>
/**
 * Descripción: Pantalla para información del empleado
 *
 * @displayName EmployeeInfoViewComponent
 *
 */

import { mapGetters } from 'vuex';

import {
    baseFilterSettingsHelper,
    baseDataTableColumnsHelper,
} from '@/helpers/baseFilterSettingsHelper';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

const BaseInputDataTable = () =>
    import('@/components/core/forms/BaseInputDataTable.vue');

export default {
    name: 'EmployeeInfoViewComponent',

    props: {
        entity: {
            type: Object,
            required: true,
        },

        enabledWatcher: {
            type: Boolean,
            requered: true,
        },
    },

    components: {
        BaseInputDataTable,
    },

    data() {
        return {
            componentKey: 0,
        };
    },

    computed: {
        ...mapGetters('filters', [
            'filtersBypageView',
            'pageViewById',
            'dialogViewById',
            'advfiltersBypageView',
        ]),

        ...mapGetters('authentication', ['user', 'buoId']),

        msg() {
            return 'Lo siento, pero no puedes seleccionarte a ti mismo como supervisor. Por favor, elige a otra persona.';
        },

        userDialogView() {
            return this.dialogViewById('userDialog');
        },

        jobDialogView() {
            return this.dialogViewById('jobDialog');
        },


        /**
         * Configuracion BaseServerDataTable
         */
        userSetting() {
            return baseFilterSettingsHelper.$_setUserSetting({
                companyId: this.user.companyId,
                isFilter: true,
                singleSelect: true,
                list: this.advfiltersBypageView(this.userDialogView),
                pageView: this.userDialogView,
            });
        },

        /**
         * Configuracion BaseServerDataTable
         */
        jobSetting() {
            return baseFilterSettingsHelper.$_setJobSetting({
                companyId: this.user.companyId,
                isFilter: true,
                singleSelect: true,
                list: this.advfiltersBypageView(this.jobDialogView),
                pageView: this.jobDialogView,
            });
        },

        /**
         * Extra Params
         */
        extraParams() {
            return baseFilterSettingsHelper.$_setExtraParams({
                companyId: this.entity.organizacionId,
                isCandidate: this.entity.esCandidato,
            });
        },
    },

    watch: {
        /**
         * Actualizar BaseInputDataTable
         */
        'entity.supervisorId': {
            handler(newValue, oldValue) {
                if ((newValue || oldValue) === this.entity.id) {
                    baseNotificationsHelper.Message(false, this.msg);
                    this.componentKey++;
                }
            },
            immediate: true,
        },

        /**
         * Actualizar BaseInputDataTable
         */
        'entity.esCandidato': {
            handler(newValue, oldValue) {
                if (oldValue != newValue) {
                    this.componentKey++;
                }
            },
            immediate: true,
        },
    },

    methods: {
        $_setUserFilter() {
            baseDataTableColumnsHelper.$_setUserColumns({
                companyId: this.user.companyId,
                isFilter: true,
                pageView: this.userDialogView,
            });
        },
    },
};
</script>

<template>
    <v-row dense>
        <v-col cols="12">
            <BaseInputDataTable
                label="Supervisor"
                v-if="userSetting"
                :pageView="userDialogView"
                :setting="userSetting"
                :extraParams="extraParams"
                itemText="nombreCompleto"
                :readonly="extraParams.length == 0"
                :editText="entity.nombreSupervisor"
                v-model="entity.supervisorId"
                :fnResetConfig="$_setUserFilter"
                :key="componentKey"
            />
        </v-col>

        <v-col cols="12">
            <BaseInputDataTable
                label="Puesto"
                v-if="jobSetting"
                :pageView="jobDialogView"
                :setting="jobSetting"
                :extraParams="extraParams"
                itemText="nombre"
                :readonly="extraParams.length == 0"
                :editText="entity.nombrePuesto"
                v-model="entity.puestoId"
            />
        </v-col>

        <v-col cols="12">
            <BaseSwitch label="Candidato" v-model="entity.esCandidato" />
        </v-col>
    </v-row>
</template>

<script>
/**
 * Descripción: Pantalla para información del empleado
 *
 * @displayName EmployeeInfoViewComponent
 *
 */

import { mapGetters } from 'vuex';

import { baseFilterSettingsHelper } from '@/helpers/baseFilterSettingsHelper';

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

        workSupervisorDialogView() {
            return this.dialogViewById('workSupervisorDialog');
        },

        jobDialogView() {
            return this.dialogViewById('jobDialog');
        },

        /**
         * Configuracion BaseServerDataTable
         */
        workSupervisorSetting() {
            return baseFilterSettingsHelper.$_setWorkSupervisorSetting({
                companyId: this.user.companyId,
                isFilter: true,
                singleSelect: true,
                list: this.advfiltersBypageView(this.workSupervisorDialogView),
                pageView: this.workSupervisorSettingDialogView,
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
                    if (this.entity.esCandidato && this.entity.esSupervisor) {
                        this.entity.supervisorId = undefined;
                        this.esSupervisor = false;
                    }
                }
            },
            immediate: true,
        },

        /**
         * Actualizar BaseInputDataTable
         */
        'entity.esSupervisor': {
            handler(newValue, oldValue) {
                if (oldValue != newValue) {
                    if (this.entity.esSupervisor && this.entity.esCandidato) {
                        this.esCandidato = false;
                    }
                }
            },
            immediate: true,
        },
    },
};
</script>

<template>
    <v-row dense>
        <v-col cols="12">
            <BaseInputDataTable
            label="Supervisor"
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

        <v-col cols="12" class="pl-3">
            <BaseSwitch label="Supervisor" v-model="entity.esSupervisor" />
        </v-col>

        <v-col cols="12" class="pl-3">
            <BaseSwitch label="Candidato" v-model="entity.esCandidato" />
        </v-col>
    </v-row>
</template>

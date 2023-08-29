<script>
/**
 * Descripción: Pantalla FilterViewComponent
 *
 * @displayName FilterViewComponent
 *
 */

import { mapGetters } from 'vuex';

import baseLocalHelper from '@/helpers/baseLocalHelper';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

import { baseFilterSettingsHelper } from '@/helpers/baseFilterSettingsHelper';

import { baseAssessmentHelper } from '@/views/user/user/components/baseAssessmentHelper';

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

const StepViewComponent = () =>
    import('@/views/user/bulkLoad/components/StepViewComponent');

const NewAbilityViewComponent = () =>
    import('@/views/assignment/components/NewAbilityViewComponent');

const AssessmentViewComponent = () =>
    import('@/views/user/user/components/AssessmentViewComponent');

export default {
    name: 'FilterViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    data() {
        return {
            assessment: {},
        };
    },

    components: {
        BaseServerDataTable,
        StepViewComponent,
        NewAbilityViewComponent,
        AssessmentViewComponent,
    },

    computed: {
        ...mapGetters('theme', ['app']),

        ...mapGetters('authentication', ['user', 'buoId']),

        extraParams() {
            return (
                this.entity.companyId &&
                baseFilterSettingsHelper.$_setExtraParams({
                    companyId: this.entity.companyId,
                })
            );
        },

        /**
         * Configuracion BaseServerDataTable
         */
        setting() {
            return baseFilterSettingsHelper.$_setUserSetting({
                companyId: this.entity.companyId,
                departmentId: this.entity.departmentId,
                singleSelect: false,
            });
        },

        abilityPermission() {
            const result = baseSecurityHelper.$_ReadPermission(
                'AbilityViewComponent'
            );
            return result;
        },

        assessmentPermission() {
            const result = baseSecurityHelper.$_ReadPermission(
                'AssessmentControlViewComponent',
                baseSecurityHelper.$_assessment
            );
            return result;
        },
    },

    methods: {
        /**
         * Get a registry
         */
        $_GetRow() {
            return this.$refs.filter.$data.selected;
        },

        $_setUserList(array) {
            this.entity?.selected?.userList &&
                delete this.entity.selected.userList;

            this.entity.selected = {
                userList: array,
            };

            this.entity.step = 1;
        },

        $_setList(params) {
            const row =
                Array.isArray(params) || params.selected
                    ? params.selected
                        ? [params.selected]
                        : params
                    : this.$_GetRow();

            switch (true) {
                case row.length == 0:
                    baseNotificationsHelper.Message(
                        true,
                        baseLocalHelper.$_MsgRowNotSelected
                    );
                    break;

                case row.length > 0: {
                    const array = row.map((element) => {
                        return {
                            userId: element.id,
                            name: element.nombreCompleto,
                            departamentId: element.nombreDepartamento,
                        };
                    });

                    this.$_setUserList(array);

                    break;
                }
            }
        },

        $_newAbility() {
            if (this.entity.step !== 0) return;

            this.entity?.selected?.userList &&
                delete this.entity.selected.userList;
            const row = this.$_GetRow();

            switch (true) {
                case row.length == 0:
                    baseNotificationsHelper.Message(
                        true,
                        baseLocalHelper.$_MsgRowNotSelected
                    );
                    break;

                case row.length > 0:
                    this.entity.selected = {
                        userList: row.map((element) => {
                            return {
                                userId: element.id,
                                name: element.nombreCompleto,
                                departamentId: element.nombreDepartamento,
                            };
                        }),
                    };
                    break;
            }
        },

        $_setAssessmentByType(type) {
            this.assessment = {};
            this.assessment = baseAssessmentHelper.$_setAssessmentByType({
                type,
                getRow: this.$_GetRow,
                UserCompanyId: this.user.companyId,
                filterCompanyId: this.entity.companyId,
            });
        },
    },
};
</script>

<template>
    <section>
        <v-layout justify-start>
            <StepViewComponent
                :icon="`mdi-numeric-${entity.step === 0 ? '1' : '3'}-circle`"
                :description="`Seleccionar ${
                    entity.step === 0 ? 'colaboradores' : 'Evaluadores'
                }`"
                iconColor="greenC900"
                :font="`BUO-Paragraph-Large-SemiBold ${
                    app ? 'white--text' : 'grey700--text'
                }`"
            />
        </v-layout>

        <BaseServerDataTable
            v-if="entity"
            ref="filter"
            :setting="setting"
            :extraParams="extraParams"
            :fnDoubleClick="$_setList"
            :footerMethod="entity.step === 0 ? $_setList : undefined"
            labelBtn="Continuar"
            cancellabelBtn="Regresar"
            :cancel="entity.step !== 0 ? $_goBack : undefined"
        >
            <div slot="btns">
                <v-row class="pl-3 pt-3" v-if="entity.companyId">
                    <AssessmentViewComponent
                        :entity="assessment"
                        :organizacionId="entity.companyId"
                        :fn="$_setAssessmentByType"
                        v-if="entity.step === 0 && assessmentPermission"
                    />

                    <NewAbilityViewComponent
                        :entity="entity"
                        :fn="$_newAbility"
                        v-if="abilityPermission && entity.step === 0"
                    />

                    <v-btn
                        fab
                        x-small
                        elevation="0"
                        class="mx-1"
                        color="primary"
                        @click="$_goBack"
                        :disabled="entity.step === 0"
                    >
                        <v-icon dark> mdi-chevron-left </v-icon>
                    </v-btn>

                    <v-btn
                        fab
                        x-small
                        color="primary"
                        @click="$_setList"
                        elevation="0"
                        class="mx-1"
                    >
                        <v-icon dark> mdi-chevron-right </v-icon>
                    </v-btn>
                </v-row>
            </div>
        </BaseServerDataTable>
    </section>
</template>

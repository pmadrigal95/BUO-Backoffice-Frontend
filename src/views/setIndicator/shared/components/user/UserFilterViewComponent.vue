<script>
/**
 * Descripción: Pantalla UserFilterViewComponent
 *
 * @displayName UserFilterViewComponent
 *
 */

import { mapGetters } from 'vuex';

import baseLocalHelper from '@/helpers/baseLocalHelper';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

import {
    baseFilterSettingsHelper,
    baseDataTableColumnsHelper,
} from '@/helpers/baseFilterSettingsHelper';

import { baseAssessmentHelper } from '@/views/user/user/components/shared/assessment/baseAssessmentHelper';

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

const StepViewComponent = () =>
    import('@/views/user/bulkLoad/components/StepViewComponent');

const AssessmentViewComponent = () =>
    import(
        '@/views/user/user/components/shared/assessment/AssessmentViewComponent'
    );

const CreateAndSetIndicatorViewComponent = () =>
    import(
        '@/views/setIndicator/shared/components/actions/CreateAndSetIndicatorViewComponent'
    );

export default {
    name: 'UserFilterViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },

        requiredTutors: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            key: 0,
            assessment: {},
        };
    },

    components: {
        BaseServerDataTable,
        StepViewComponent,
        AssessmentViewComponent,
        CreateAndSetIndicatorViewComponent,
    },

    computed: {
        ...mapGetters('theme', ['app']),

        ...mapGetters('authentication', ['user', 'buoId']),

        ...mapGetters('filters', ['filtersBypageView', 'pageViewById']),

        pageView() {
            return this.pageViewById('setIndicadorUserFilter');
        },

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
                list: this.filtersBypageView(this.pageView),
                pageView: this.pageView,
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
        $_setFilter() {
            baseDataTableColumnsHelper.$_setUserColumns({
                companyId: this.entity.companyId,
                departmentId: this.entity.departmentId,
                pageView: this.pageView,
            });
            this.key++;
        },

        /**
         * Get a registry
         */
        $_GetRow() {
            return this.$refs[this.pageView].$data.selected;
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
                icon="mdi-numeric-1-circle"
                :description="`Seleccionar colaboradores ${
                    requiredTutors ? 'a evaluar' : ''
                }`"
                iconColor="greenC900"
                :font="`BUO-Paragraph-Large-SemiBold ${
                    app ? 'white--text' : 'grey700--text'
                }`"
            />
        </v-layout>

        <BaseServerDataTable
            :key="key"
            v-if="entity && setting"
            :ref="pageView"
            :pageView="pageView"
            :setting="setting"
            :extraParams="extraParams"
            :fnDoubleClick="$_setList"
            :footerMethod="$_setList"
            labelBtn="Continuar"
            :fnResetConfig="$_setFilter"
            :needExportToExcel="false"
        >
            <div slot="btns">
                <v-row class="pl-3 pt-3" v-if="entity.companyId">
                    <CreateAndSetIndicatorViewComponent
                        :entity="entity"
                        :requiredTutors="requiredTutors"
                        :fn="$_newAbility"
                        v-if="abilityPermission"
                    />

                    <v-btn
                        fab
                        x-small
                        elevation="0"
                        class="mx-1"
                        color="primary"
                        disabled
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

                    <AssessmentViewComponent
                        :entity="assessment"
                        :organizacionId="entity.companyId"
                        :fn="$_setAssessmentByType"
                        v-if="assessmentPermission"
                    />
                </v-row>
            </div>
        </BaseServerDataTable>
    </section>
</template>

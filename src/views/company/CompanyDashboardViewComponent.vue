<script>
/**
 * Descripción: Pantalla Dashboard Empresas
 *
 * @displayName CompanyDashboardViewComponent
 *
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const UserFilterViewComponent = () =>
    import('@/views/user/users/UserFilterViewComponent');

const AbilityFilterViewComponent = () =>
    import('@/views/ability/AbilityFilterViewComponent');

const DepartmentTreeViewComponent = () =>
    import('@/views/department/DepartmentTreeViewComponent');

export default {
    name: 'CompanyDashboardViewComponent',

    components: {
        BaseCardViewComponent,
        UserFilterViewComponent,
        AbilityFilterViewComponent,
        DepartmentTreeViewComponent,
    },

    data() {
        return {
            panel: [0, 1, 2],
            entity: undefined,
            loading: false,
        };
    },

    computed: {
        ...mapGetters('authentication', ['user', 'buoId']),

        companyPermission() {
            const result = baseSecurityHelper.$_ReadPermission(
                'CompanyViewComponent',
                baseSecurityHelper.$_write
            );
            return result;
        },

        userPermission() {
            const result =
                baseSecurityHelper.$_ReadPermission('UserViewComponent');
            return result;
        },
    },

    created() {
        /**
         * Determinar si Es nuevo / editor
         */
        if (
            this.user.companyId != this.buoId &&
            this.user.companyId != this.$router.currentRoute.params.Id
        ) {
            this.$router.push({
                name: '403',
            });
        }

        this.$_getObject();
    },

    methods: {
        /**
         * Determinar si Es nuevo / editor
         */
        $_getObject() {
            let data = this.$router.currentRoute.params.Id;
            if (data) {
                //HttpServices a la vista para obtener Vista
                this.loading = true;
                httpService.get(`organizacion/${data}`).then((response) => {
                    this.loading = false;
                    if (response != undefined) {
                        // Encontro la entidad
                        this.entity = BaseArrayHelper.SetObject(
                            {},
                            response.data
                        );
                    }
                });
            }
        },

        /**
         * Function to return the CompanyFilterViewComponent
         */
        $_returnToFilter() {
            this.$router.push({
                name: 'CompanyFilterViewComponent',
            });
        },

        /**
         * Pantalla Editor
         */
        $_companyEditor() {
            this.$router.push({
                name: 'CompanyEditorViewComponent',
                params: this.$router.currentRoute.params.Id && {
                    Id: this.$router.currentRoute.params.Id,
                },
            });
        },
    },
};
</script>

<template>
    <div>
        <BaseSkeletonLoader v-if="loading" type="article" />
        <BaseCardViewComponent
            v-else
            :title="entity.nombre"
            :btnAction="user.companyId == buoId ? $_returnToFilter : undefined"
        >
            <div slot="top-actions">
                <v-layout justify-end align-center v-if="companyPermission">
                    <v-btn
                        color="blue800"
                        class="ma-1 no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                        text
                        @click="$_companyEditor"
                    >
                        Editar
                        <v-icon right dark>
                            mdi-square-edit-outline
                        </v-icon></v-btn
                    >
                </v-layout>
            </div>
            <div slot="card-text">
                <v-expansion-panels multiple flat v-model="panel">
                    <v-expansion-panel v-if="userPermission">
                        <v-expansion-panel-header color="clouds"
                            ><div
                                :class="[
                                    $vuetify.breakpoint.smAndDown
                                        ? 'BUO-Paragraph-Large'
                                        : 'BUO-Heading-Small',
                                ]"
                            >
                                Colaboradores
                            </div></v-expansion-panel-header
                        >
                        <v-expansion-panel-content color="clouds">
                            <UserFilterViewComponent
                                :organizacionId="$router.currentRoute.params.Id"
                            />
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-header color="clouds"
                            ><div
                                :class="[
                                    $vuetify.breakpoint.smAndDown
                                        ? 'BUO-Paragraph-Large'
                                        : 'BUO-Heading-Small',
                                ]"
                            >
                                Habilidades
                            </div></v-expansion-panel-header
                        >
                        <v-expansion-panel-content color="clouds">
                            <AbilityFilterViewComponent
                                :organizacionId="$router.currentRoute.params.Id"
                            />
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-header color="clouds"
                            ><div
                                :class="[
                                    $vuetify.breakpoint.smAndDown
                                        ? 'BUO-Paragraph-Large'
                                        : 'BUO-Heading-Small',
                                ]"
                            >
                                Estructura Organizacional
                            </div></v-expansion-panel-header
                        >
                        <v-expansion-panel-content color="clouds">
                            <DepartmentTreeViewComponent
                                :organizacionId="$router.currentRoute.params.Id"
                            />
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </div>
        </BaseCardViewComponent>
    </div>
</template>

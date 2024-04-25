<script>
/**
 * Descripción: Pantalla para editar usuarios
 *
 * @displayName ContainerViewComponent
 *
 */
import { mapGetters } from 'vuex';

import baseDateHelper from '@/helpers/baseDateHelper';

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

/*const NotifierViewComponent = () =>
    import(
        '@/views/user/user/components/editor/sections/NotifierViewComponent.vue'
    );*/

const PersonalInfoViewComponent = () =>
    import(
        '@/views/user/user/components/editor/sections/PersonalInfoViewComponent'
    );

const CorporateInfoViewComponent = () =>
    import(
        '@/views/user/user/components/editor/sections/CorporateInfoViewComponent'
    );

const AccountInfoViewComponent = () =>
    import(
        '@/views/user/user/components/editor/sections/AccountInfoViewComponent'
    );

const AccessSettingsViewComponent = () =>
    import(
        '@/views/user/user/components/editor/sections/AccessSettingsViewComponent'
    );

export default {
    name: 'ContainerViewComponent',

    components: {
        //NotifierViewComponent,
        BaseCardViewComponent,
        AccountInfoViewComponent,
        PersonalInfoViewComponent,
        CorporateInfoViewComponent,
        AccessSettingsViewComponent,
    },

    data() {
        return {
            tab: null,
            entity: this.$_Object(),
            loading: false,
            tabSettings: [
                {
                    id: 0,
                    name: 'Información personal',
                    component: 'PersonalInfoViewComponent',
                    disabled: false,
                },
                {
                    id: 1,
                    name: 'Información de la cuenta',
                    component: 'AccountInfoViewComponent',
                    disabled: true,
                },
                {
                    id: 2,
                    name: 'Configuración de acceso',
                    component: 'AccessSettingsViewComponent',
                    disabled: true,
                },
                {
                    id: 3,
                    name: 'Información Corporativa',
                    component: 'CorporateInfoViewComponent',
                    disabled: true,
                },
            ],
        };
    },

    computed: {
        ...mapGetters('authentication', ['user', 'buoId']),

        isLastTab() {
            return this.tab === 3;
        },

        isNewUser() {
            return !this.$router.currentRoute.params.Id;
        },
    },

    created() {
        /**
         * Determinar si Es nuevo / editor
         */
        this.$_getObject();

        this.$_reviewQueryParams();

        //TODO: How to implement on vue router the background config
        this.$vuetify.theme.themes.light.background =
            this.$vuetify.theme.themes.light.white;
    },

    destroyed() {
        this.$vuetify.theme.themes.light.background =
            this.$vuetify.theme.themes.light.clouds;
    },

    methods: {
        activeTab() {
            this.tabSettings[this.tab].disabled =
                !this.tabSettings[this.tab].disabled;
        },

        prevTab() {
            this.tab = this.tab + 1;
            this.activeTab();
        },

        /**
         * Function to return the UserFilterViewComponent
         */
        $_returnToFilter() {
            this.$router.back();
        },

        $_Object() {
            return {
                id: 0,
                nombre: undefined,
                primerApellido: undefined,
                segundoApellido: undefined,
                identificacion: undefined,
                paisId: undefined,
                ciudad: undefined,
                correo: undefined,
                username: undefined,
                generoId: undefined,
                fechaNacimiento: undefined,
                telefono: undefined,
                nombreOrganizacion: undefined,
                organizacionId: undefined,
                nombreDepartamento: undefined,
                departamentoId: undefined,
                estadoId: 2,
                tipoUsuarioId: 0,
                usuarioModificaId: undefined,
                perfilIds: undefined,
                fechaIngreso: undefined,
                fechaIngresoDepartamento: undefined,
                fechaTerminacion: undefined,
                esRenuncia: false,
            };
        },

        $_reviewQueryParams() {
            if (this.$router.currentRoute.query.organizacionId) {
                this.entity.organizacionId =
                    this.$router.currentRoute.query.organizacionId;
            }

            if (this.user.companyId != this.buoId) {
                this.entity.organizacionId = this.user.companyId;
            }
        },

        $_setRoleListToEditor() {
            this.entity.roleNames =
                this.entity?.perfilList &&
                this.entity?.perfilList.map((x) => {
                    return { id: x.id, nombre: x.nombre };
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

                        this.entity.fechaNacimiento =
                            baseSharedFnHelper.$_parseArrayToDateISOString(
                                this.entity.fechaNacimiento
                            );

                        this.entity.fechaIngreso =
                            baseSharedFnHelper.$_parseArrayToDateISOString(
                                this.entity.fechaIngreso
                            );

                        this.entity.fechaIngresoDepartamento =
                            baseSharedFnHelper.$_parseArrayToDateISOString(
                                this.entity.fechaIngresoDepartamento
                            );

                        this.entity.fechaTerminacion =
                            baseSharedFnHelper.$_parseArrayToDateISOString(
                                this.entity.fechaTerminacion
                            );

                        this.$_setRoleListToEditor();
                    }
                });
            } else {
                this.entity.fechaIngreso = baseDateHelper.$_setCurrentDate();
            }
        },

        $_setToUser() {
            this.entity.usuarioModificaId = this.user.userId;
        },

        $_sendToApi() {
            alert('sent to api');
            /*this.loading = true;
            this.$_setToUser();
            let object = BaseArrayHelper.SetObject({}, this.entity);
            httpService.post('user/saveUserForm', object).then((response) => {
                this.loading = false;

                if (response != undefined) {
                    //Logica JS luego de la acción exitosa!!!
                    this.$_returnToFilter();
                }
            });*/
        },
    },
};
</script>

<template>
    <section>
        <!--<NotifierViewComponent v-if="!notifier" />-->
        <BaseCardViewComponent
            title="Colaborador"
            :btnAction="$_returnToFilter"
            class="mx-auto"
            md="8"
            offset="2"
        >
            <div slot="card-text">
                <BaseSkeletonLoader v-if="loading" type="article, actions" />
                <BaseForm
                    :method="
                        isNewUser
                            ? isLastTab
                                ? $_sendToApi
                                : prevTab
                            : $_sendToApi
                    "
                    :labelBtn="
                        isNewUser
                            ? isLastTab
                                ? 'Guardar'
                                : 'Siguiente'
                            : 'Guardar'
                    "
                    :cancel="$_returnToFilter"
                    v-else
                >
                    <div slot="body">
                        <v-tabs v-model="tab" left show-arrows height="34">
                            <v-tabs-slider color="transparent"></v-tabs-slider>
                            <v-tab
                                v-for="(tabItem, index) in tabSettings"
                                :key="index"
                                :disabled="tabItem.disabled"
                                class="rounded-pill no-uppercase mr-3"
                                active-class="tab-active-blue"
                            >
                                <p class="BUO-Label-Small pt-4">
                                    {{ tabItem.name }}
                                </p>
                            </v-tab>
                        </v-tabs>

                        <v-tabs-items v-model="tab" class="mt-4 mb-2 pt-4">
                            <v-tab-item
                                v-for="(tabItem, index) in tabSettings"
                                :key="index"
                            >
                                <component
                                    :is="tabItem.component"
                                    :entity="entity"
                                />
                            </v-tab-item>
                        </v-tabs-items>

                        <!--   <v-tabs v-model="tab" left show-arrows height="34">
                            <v-tabs-slider color="transparent"></v-tabs-slider>
                            <v-tab
                                class="rounded-pill no-uppercase mr-3"
                                active-class="tab-active-blue"
                                ><p class="BUO-Label-Small pt-4">
                                    Información personal
                                </p>
                            </v-tab>

                            <v-tab
                                class="rounded-pill no-uppercase mr-3"
                                active-class="tab-active-blue"
                                ><p class="BUO-Label-Small pt-4">
                                    Información de la cuenta
                                </p>
                            </v-tab>

                            <v-tab
                                class="rounded-pill no-uppercase mr-3"
                                active-class="tab-active-blue"
                                ><p class="BUO-Label-Small pt-4">
                                    Configuración de acceso
                                </p>
                            </v-tab>

                            <v-tab
                                class="rounded-pill no-uppercase mr-3"
                                active-class="tab-active-blue"
                                ><p class="BUO-Label-Small pt-4">
                                    Información corporativa
                                </p>
                            </v-tab>
                        </v-tabs>

                        <v-tabs-items v-model="tab" class="mt-4 mb-2 pt-4">
                            <v-tab-item>
                                <PersonalInfoViewComponent :entity="entity" />
                            </v-tab-item>
                            <v-tab-item>
                                <AccountInfoViewComponent :entity="entity" />
                            </v-tab-item>
                            <v-tab-item>
                                <AccessSettingsViewComponent :entity="entity" />
                            </v-tab-item>
                            <v-tab-item>
                                <CorporateInfoViewComponent :entity="entity" />
                            </v-tab-item>
                        </v-tabs-items>-->
                    </div>
                </BaseForm>
            </div>
        </BaseCardViewComponent>
    </section>
</template>

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

const PersonalInfoViewComponent = () =>
    import(
        '@/views/user/user/components/editor/sections/PersonalInfoViewComponent'
    );

const WorkInfoViewComponent = () =>
    import(
        '@/views/user/user/components/editor/sections/WorkInfoViewComponent'
    );

const EmployeeInfoViewComponent = () =>
    import(
        '@/views/user/user/components/editor/sections/EmployeeInfoViewComponent'
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
        BaseCardViewComponent,
        WorkInfoViewComponent,
        AccountInfoViewComponent,
        PersonalInfoViewComponent,
        EmployeeInfoViewComponent,
        AccessSettingsViewComponent,
    },

    data() {
        return {
            tab: null,
            entity: this.$_Object(),
            loading: false,
            componentKey: 0,
            enabledWatcher: true,
        };
    },

    computed: {
        ...mapGetters('authentication', ['user', 'buoId']),

        tabSettings() {
            return [
                {
                    name: 'Información personal',
                    component: 'PersonalInfoViewComponent',
                    disabled: false,
                },
                {
                    name: 'Información de la cuenta',
                    component: 'AccountInfoViewComponent',
                    disabled: true,
                },
                /*{
                    name: 'Configuración de acceso',
                    component: 'AccessSettingsViewComponent',
                    disabled: true,
                },
                /*{
                    name: 'Información del empleado',
                    component: 'EmployeeInfoViewComponent',
                    disabled: true,
                    enabledWatcher: this.enabledWatcher,
                },
                /*{
                    name: 'Información laboral',
                    component: 'WorkInfoViewComponent',
                    disabled: true,
                    enabledWatcher: this.enabledWatcher,
                },*/
            ];
        },

        isLastTab() {
            return this.tab === this.tabSettings.length - 1;
        },

        isNewUser() {
            return !this.$router.currentRoute.params.Id;
        },

        getLabelBtn() {
            return this.isNewUser
                ? this.isLastTab
                    ? 'Guardar'
                    : 'Siguiente'
                : 'Guardar';
        },

        getFunctionSave() {
            return this.isNewUser
                ? this.isLastTab
                    ? this.$_sendToApi
                    : this.configureTabs
                : this.$_sendToApi;
        },

        getFunctionCancel() {
            return this.isNewUser
                ? this.isLastTab
                    ? this.$_returnToFilter
                    : undefined
                : this.$_returnToFilter;
        },
    },

    watch: {
        tab: {
            handler() {
                if (this.isLastTab) {
                    this.componentKey++;
                }
            },
            immediate: true,
        },
    },

    created() {
        /**
         * Determinar si Es nuevo / editor
         */
        this.$_getObject();

        this.$_reviewQueryParams();

        !this.isNewUser && this.activeAllTabs();

        //TODO: How to implement on vue router the background config
        this.$vuetify.theme.themes.light.background =
            this.$vuetify.theme.themes.light.white;
    },

    destroyed() {
        this.$vuetify.theme.themes.light.background =
            this.$vuetify.theme.themes.light.clouds;
    },

    methods: {
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
                supervisorId: undefined,
                puestoId: undefined,
                esCandidato: false,
            };
        },

        activeAllTabs() {
            this.tabSettings
                .filter((element) => element.disabled === true)
                .map((element) => {
                    element.disabled = false;
                });
        },

        activeCurrentTab() {
            console.log(this.tabSettings[this.tab].disabled);
            this.tabSettings[this.tab].disabled = false;
        },

        nextTab() {
            console.log(this.tab + 1);
            this.tab = this.tab + 1;
        },

        configureTabs() {
            console.log('prueba');
            this.nextTab();
            this.activeCurrentTab();
        },

        toggleWatcher() {
            this.enabledWatcher = !this.enabledWatcher;
        },
        /**
         * Function to return the UserFilterViewComponent
         */
        $_returnToFilter() {
            this.toggleWatcher();
            this.$router.back();
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
            this.loading = true;
            this.$_setToUser();
            let object = BaseArrayHelper.SetObject({}, this.entity);
            httpService.post('user/saveUserForm', object).then((response) => {
                this.loading = false;

                if (response != undefined) {
                    //Logica JS luego de la acción exitosa!!!
                    this.$_returnToFilter();
                }
            });
        },
    },
};
</script>

<template>
    <section>
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
                    :key="componentKey"
                    :method="getFunctionSave"
                    :labelBtn="getLabelBtn"
                    :cancel="getFunctionCancel"
                    v-else
                >
                    <div slot="body">
                        <v-tabs v-model="tab" left show-arrows height="34">
                            <v-tabs-slider color="transparent"></v-tabs-slider>
                            <v-tab
                                v-for="(element, index) in tabSettings"
                                :key="index"
                                :disabled="element.disabled"
                                class="rounded-pill no-uppercase mr-3"
                                active-class="tab-active-blue"
                            >
                                <p class="BUO-Label-Small pt-4">
                                    {{ element.name }}
                                </p>
                            </v-tab>
                        </v-tabs>

                        <v-tabs-items v-model="tab" class="mt-4 mb-2 pt-4 pl-3">
                            <v-tab-item
                                v-for="(element, index) in tabSettings"
                                :key="index"
                            >
                                <component
                                    :is="element.component"
                                    :entity="entity"
                                    :enabledWatcher="element.enabledWatcher"
                                />
                            </v-tab-item>
                        </v-tabs-items>
                    </div>
                </BaseForm>
            </div>
        </BaseCardViewComponent>
    </section>
</template>

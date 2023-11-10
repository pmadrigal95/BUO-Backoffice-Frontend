<script>
/**
 * Descripción: Pantalla  Seguridad
 *
 * @displayName PreviewViewComponent
 *
 */

import httpService from '@/services/axios/httpService';

const HeaderViewComponent = () =>
    import('@/views/security/components/editor/preview/HeaderViewComponent');

const ActionListViewComponent = () =>
    import(
        '@/views/security/components/editor/preview/ActionListViewComponent'
    );

const UserListViewComponent = () =>
    import('@/views/security/components/editor/preview/UserListViewComponent');

export default {
    name: 'PreviewViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    components: {
        HeaderViewComponent,
        ActionListViewComponent,
        UserListViewComponent,
    },

    data() {
        return {
            loading: false,
        };
    },

    methods: {
        $_returnToFilter() {
            this.entity.form.tempUsuarioIds = [];
            this.entity.form.usuarioIds = [];

            this.entity.step = 2;
        },

        $_entityToDto() {
            return {
                organizacionId: this.entity.form.organizacionId,
                nombre: this.entity.form.nombre,
                descripcion: this.entity.form.descripcion,
                estadoId: this.entity.form.estadoId,
                usuarioIds: this.entity.form.tempUsuarioIds.map((element) => {
                    return element.userId;
                }),
                accionIds: this.entity.form.tempAccionIds.map((element) => {
                    return element.id;
                }),
            };
        },

        $_sendToApi() {
            this.loading = true;

            httpService
                .post('perfil/create', this.$_entityToDto())
                .then((response) => {
                    this.loading = false;

                    if (response != undefined) {
                        //Logica JS luego de la acción exitosa!!!
                        console.log(response);
                        // response.data.id
                    }
                });
        },
    },
};
</script>

<template>
    <section class="mx-10 my-10">
        <BaseSkeletonLoader v-if="loading" type="article, actions" />
        <BaseForm
            :block="$vuetify.breakpoint.mobile"
            :method="$_sendToApi"
            :cancel="$_returnToFilter"
            lblCancel="Regresar"
            v-else
        >
            <div slot="body">
                <HeaderViewComponent :entity="entity" />

                <v-expansion-panels multiple flat>
                    <v-expansion-panel
                        v-if="entity.form.tempAccionIds.length > 0"
                    >
                        <v-expansion-panel-header
                            ><section
                                :class="[
                                    $vuetify.breakpoint.smAndDown
                                        ? 'BUO-Paragraph-Large'
                                        : 'BUO-Heading-XSmall',
                                ]"
                            >
                                <span
                                    >Acciones ({{
                                        entity.form.tempAccionIds.length
                                    }})</span
                                >
                            </section></v-expansion-panel-header
                        >
                        <v-expansion-panel-content>
                            <ActionListViewComponent
                                :entity="entity"
                                v-if="entity.form.tempAccionIds.length > 0"
                            />
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel
                        v-if="entity.form.tempUsuarioIds.length > 0"
                    >
                        <v-expansion-panel-header
                            ><section
                                :class="[
                                    $vuetify.breakpoint.smAndDown
                                        ? 'BUO-Paragraph-Large'
                                        : 'BUO-Heading-XSmall',
                                ]"
                            >
                                <span
                                    >Colaboradores ({{
                                        entity.form.tempUsuarioIds.length
                                    }})</span
                                >
                            </section></v-expansion-panel-header
                        >
                        <v-expansion-panel-content>
                            <UserListViewComponent
                                :entity="entity"
                                v-if="entity.form.tempUsuarioIds.length > 0"
                            />
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </div>
        </BaseForm>
    </section>
</template>

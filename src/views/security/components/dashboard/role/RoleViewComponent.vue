<script>
/**
 * Descripción: Pantalla  Seguridad
 *
 * @displayName SecurityEditorViewComponent
 *
 */

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

const RolePreviewViewComponent = () =>
    import(
        '@/views/security/components/dashboard/role/RolePreviewViewComponent'
    );

const RoleEditorViewComponent = () =>
    import(
        '@/views/security/components/dashboard/role/RoleEditorViewComponent'
    );

const RoleListsViewComponent = () =>
    import('@/views/security/components/dashboard/role/RoleListsViewComponent');

export default {
    name: 'RoleViewComponent',

    props: {
        id: {
            type: Number,
            requiered: true,
        },
    },

    components: {
        RolePreviewViewComponent,
        RoleEditorViewComponent,
        RoleListsViewComponent,
    },

    data() {
        return {
            entity: this.$_Object(),
            loading: false,
        };
    },

    created() {
        this.$_getObject();
    },

    methods: {
        /**
         * Entity Object
         */
        $_Object() {
            return {
                step: 0,
                componentKey: 0,
                form: {},
            };
        },

        $_returnToFilter() {
            this.$router.push({
                name: 'SecurityFilterViewComponent',
            });
        },

        /**
         * Determinar si Es nuevo / editor
         */
        $_getObject() {
            if (this.id) {
                //HttpServices a la vista para obtener Vista
                this.loading = true;
                httpService.get(`perfil/${this.id}`).then((response) => {
                    this.loading = false;
                    if (response != undefined) {
                        // Encontro la entidad
                        this.entity.form = BaseArrayHelper.SetObject(
                            {},
                            response.data
                        );
                    } else {
                        this.$_returnToFilter();
                    }
                });
            } else {
                this.$_returnToFilter();
            }
        },
    },
};
</script>

<template>
    <v-card flat class="rounded-t-xl">
        <v-card-text>
            <section>
                <BaseSkeletonLoader v-if="loading" type="article, actions" />
                <v-window v-model="entity.step" touchless v-else>
                    <v-window-item :value="0">
                        <RolePreviewViewComponent :entity="entity" />
                    </v-window-item>

                    <v-window-item :value="1" :key="entity.componentKey">
                        <RoleEditorViewComponent :entity="entity" />
                    </v-window-item>
                </v-window>
            </section>
            <section v-if="entity.form.id">
                <RoleListsViewComponent :entity="entity.form" />
            </section>
        </v-card-text>
    </v-card>
</template>

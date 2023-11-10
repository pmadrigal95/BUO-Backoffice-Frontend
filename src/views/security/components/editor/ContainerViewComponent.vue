<script>
/**
 * Descripción: Pantalla  Seguridad
 *
 * @displayName SecurityEditorViewComponent
 *
 */

const RoleEditorViewComponent = () =>
    import('@/views/security/components/editor/role/RoleEditorViewComponent');

const ActionFilterViewComponent = () =>
    import(
        '@/views/security/components/editor/actions/ActionFilterViewComponent'
    );

const UserFilterViewComponent = () =>
    import('@/views/security/components/editor/users/UserFilterViewComponent');

const PreviewViewComponent = () =>
    import('@/views/security/components/editor/preview/PreviewViewComponent');

export default {
    name: 'ContainerViewComponent',

    components: {
        RoleEditorViewComponent,
        ActionFilterViewComponent,
        UserFilterViewComponent,
        PreviewViewComponent,
    },

    data() {
        return {
            entity: this.$_Object(),
        };
    },

    methods: {
        /**
         * Entity Object
         */
        $_Object() {
            return {
                step: 0,
                componentKey: 0,
                form: {
                    organizacionId: undefined,
                    nombre: undefined,
                    descripcion: undefined,
                    estadoId: 2,
                    tempAccionIds: [],
                    tempUsuarioIds: [],
                    usuarioIds: [],
                    accionIds: [],
                },
            };
        },
    },
};
</script>

<template>
    <v-card flat class="rounded-t-xl">
        <v-card-text>
            <v-window v-model="entity.step" touchless>
                <v-window-item :value="0">
                    <RoleEditorViewComponent :entity="entity" />
                </v-window-item>

                <v-window-item :value="1" :key="entity.componentKey">
                    <ActionFilterViewComponent :entity="entity" />
                </v-window-item>

                <v-window-item :value="2" :key="entity.componentKey + 1">
                    <UserFilterViewComponent :entity="entity" />
                </v-window-item>

                <v-window-item :value="3">
                    <PreviewViewComponent :entity="entity" />
                </v-window-item>
            </v-window>
        </v-card-text>
    </v-card>
</template>

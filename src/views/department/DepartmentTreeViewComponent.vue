<script>
/**
 * Descripción: Pantalla Filtro Departamentos
 *
 * @displayName DepartmentTreeViewComponent
 *
 */

import { mapGetters } from 'vuex';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

const BaseTreeview = () => import('@/components/core/treeview/BaseTreeview');

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

export default {
    name: 'DepartmentTreeViewComponent',

    props: {
        organizacionId: {
            type: [Number, String],
        },
    },

    components: { BaseTreeview, BaseCustomsButtonsGrid },

    data() {
        return {
            department: undefined,
        };
    },

    computed: {
        ...mapGetters('authentication', ['user', 'buoId']),

        initials() {
            const usernameSplit = this.department.nombreUsuarioAdmin
                ? this.department.nombreUsuarioAdmin.split(' ')
                : undefined;

            let username;

            if (usernameSplit && usernameSplit.length > 0) {
                username =
                    usernameSplit.length === 1
                        ? usernameSplit[0]
                        : `${usernameSplit[0].charAt(
                              0
                          )}${usernameSplit[1].charAt(0)}`;
            }

            return username;
        },

        write() {
            const result = baseSecurityHelper.$_ReadPermission(
                'DepartmentViewComponent',
                baseSecurityHelper.$_write
            );
            return result;
        },
    },

    methods: {
        $_edit() {},
    },
};
</script>

<template>
    <div>
        <v-layout justify-end class="pb-4">
            <BaseCustomsButtonsGrid
                label="Agregar Departamento"
                :outlined="false"
                :fnMethod="$_edit"
                icon="mdi-plus"
            />
        </v-layout>
        <v-row>
            <v-col cols="12" md="4">
                <BaseTreeview
                    v-model="department"
                    itemText="nombre"
                    itemChildren="subDepartamentos"
                    :endpoint="`departamento/findAllTree/${organizacionId}`"
                />
            </v-col>

            <v-col cols="12" md="8" v-if="department">
                <v-card class="rounded-lg" flat height="450" width="100%">
                    <v-layout justify-end class="pt-2 pr-1">
                        <BaseCustomsButtonsGrid
                            label="Editar"
                            :fnMethod="$_edit"
                            icon="mdi-square-edit-outline"
                        />
                        <BaseCustomsButtonsGrid
                            label="Eliminar"
                            :fnMethod="$_edit"
                            icon="mdi-delete-outline"
                        />
                    </v-layout>
                    <v-card-title
                        class="BUO-Paragraph-Large buo-none-word-break"
                    >
                        <v-icon
                            :color="
                                department.nombreEstado == 'Activo'
                                    ? 'success'
                                    : 'error'
                            "
                            class="pr-1"
                            small
                            >mdi-circle</v-icon
                        >
                        <div>{{ department.nombre }}</div>
                    </v-card-title>

                    <v-card-text>
                        <v-layout justify-space-between>
                            <v-card
                                flat
                                height="300"
                                width="100%"
                                class="overflow-hidden"
                            >
                                <v-card-text>
                                    <div
                                        class="pb-2 black--text BUO-Paragraph-Small"
                                    >
                                        Descripcion
                                    </div>
                                    <v-divider></v-divider>
                                    <div class="py-2">
                                        <div
                                            class="py-1grey500--text BUO-Label-Small"
                                            v-if="department.nombreUsuarioAdmin"
                                        >
                                            Administrador:
                                        </div>
                                        <v-list-item
                                            class="px-2"
                                            v-if="department.nombreUsuarioAdmin"
                                        >
                                            <v-list-item-avatar>
                                                <v-avatar
                                                    :color="user.colorAvatar"
                                                >
                                                    <span
                                                        class="white--text BUO-Paragraph-Medium-SemiBold"
                                                        >{{ initials }}</span
                                                    >
                                                </v-avatar>
                                            </v-list-item-avatar>

                                            <v-list-item-content>
                                                <v-list-item-title
                                                    class="black--text BUO-Label-Small-SemiBold"
                                                    >{{
                                                        department.nombreUsuarioAdmin
                                                    }}</v-list-item-title
                                                >
                                            </v-list-item-content>
                                        </v-list-item>
                                        <div
                                            class="py-1 black--text BUO-Label-Small"
                                        >
                                            <v-layout justify-space-between>
                                                <div
                                                    v-if="
                                                        department.correoUsuarioAdmin
                                                    "
                                                >
                                                    <v-icon
                                                        class="pb-1"
                                                        color="primary"
                                                        small
                                                        >mdi-email-outline</v-icon
                                                    >
                                                    {{
                                                        department.correoUsuarioAdmin
                                                    }}
                                                </div>
                                                <div
                                                    v-if="
                                                        department.telefonoUsuarioAdmin
                                                    "
                                                >
                                                    <v-icon
                                                        class="pb-1"
                                                        color="primary"
                                                        small
                                                        >mdi-cellphone</v-icon
                                                    >
                                                    {{
                                                        department.telefonoUsuarioAdmin
                                                    }}
                                                </div>
                                            </v-layout>
                                        </div>
                                    </div>
                                    <v-divider
                                        v-if="department.nombreUsuarioAdmin"
                                    ></v-divider>
                                    <div
                                        class="py-2"
                                        v-if="department.cantidadColaboradores"
                                    >
                                        <div
                                            class="py-1 grey500--text BUO-Label-Small"
                                        >
                                            Colaboradores:
                                        </div>
                                        <div
                                            class="py-1 black--text BUO-Label-Small"
                                        >
                                            <v-icon
                                                class="pb-1"
                                                color="primary"
                                                small
                                                >mdi-account</v-icon
                                            >
                                            {{
                                                `${department.cantidadColaboradores} Colaboradores`
                                            }}
                                        </div>
                                    </div>
                                    <v-divider
                                        v-if="department.cantidadColaboradores"
                                    ></v-divider>
                                </v-card-text>
                            </v-card>
                            <v-card
                                flat
                                height="300"
                                width="70%"
                                class="overflow-hidden pl-1"
                                v-if="
                                    department.subDepartamentos &&
                                    department.subDepartamentos.length > 0
                                "
                            >
                                <v-card-text>
                                    <div
                                        class="py-2 black--text BUO-Paragraph-Small-SemiBold"
                                    >
                                        Sub-Niveles
                                    </div>
                                    <div>
                                        <div
                                            v-for="(
                                                item, i
                                            ) in department.subDepartamentos"
                                            :key="i"
                                            class="py-2"
                                        >
                                            <v-chip
                                                class="py-1 black--text BUO-Label-Small"
                                                style="
                                                    height: auto;
                                                    white-space: normal;
                                                "
                                            >
                                                {{ item.nombre }}
                                            </v-chip>
                                        </div>
                                    </div>
                                </v-card-text></v-card
                            >
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

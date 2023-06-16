<script>
/**
 * Descripción: Pantalla Filtro Departamentos
 *
 * @displayName DepartmentTreeViewComponent
 *
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

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
            loading: false,
        };
    },

    computed: {
        ...mapGetters('authentication', ['user', 'buoId']),

        ...mapGetters('theme', ['app']),

        write() {
            const result = baseSecurityHelper.$_ReadPermission(
                'DepartmentViewComponent',
                baseSecurityHelper.$_write
            );
            return result;
        },
    },

    methods: {
        $_add() {
            this.$router.push({
                name: 'DepartmentEditorViewComponent',
                query: { organizacionId: this.organizacionId },
            });
        },

        $_delete() {
            this.loading = true;
            httpService
                .post('departamento/deactivate', {
                    userId: this.user.userId,
                    id: this.department.id,
                })
                .then((response) => {
                    if (response != undefined) {
                        this.department = undefined;
                    }
                    this.loading = false;
                });
        },

        fnClick(row) {
            if (row.length > 0) {
                this.department = BaseArrayHelper.SetObject({}, row[0]);
            }
        },

        /**
         * Pantalla Editor
         */
        $_Editor() {
            this.$router.push({
                name: 'DepartmentEditorViewComponent',
                params: { Id: this.department.id },
            });
        },

        $_setInitials(name) {
            const usernameSplit = name ? name.split(' ') : undefined;

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
    },
};
</script>

<template>
    <div>
        <v-layout justify-end class="pb-4">
            <BaseCustomsButtonsGrid
                label="Agregar Departamento"
                :outlined="false"
                :fnMethod="$_add"
                icon="mdi-plus"
            />
        </v-layout>
        <BaseSkeletonLoader v-if="loading" type="list-item" />
        <v-row v-else>
            <v-col cols="12" md="4">
                <BaseTreeview
                    :fnClick="fnClick"
                    v-model="department"
                    itemText="nombre"
                    itemChildren="subDepartamentos"
                    :endpoint="`departamento/findAllTree/${organizacionId}`"
                />
            </v-col>

            <v-col cols="12" md="8" v-if="department">
                <v-card
                    class="rounded-lg"
                    flat
                    :height="$vuetify.breakpoint.mobile ? '100%' : 450"
                    width="100%"
                >
                    <v-layout justify-end class="pt-2 pr-1">
                        <BaseCustomsButtonsGrid
                            label="Editar"
                            :fnMethod="$_Editor"
                            icon="mdi-square-edit-outline"
                            :color="app ? 'blueProgress600' : 'blue800'"
                        />
                        <BaseCustomsButtonsGrid
                            :color="app ? 'blueProgress600' : 'blue800'"
                            label="Eliminar"
                            :fnMethod="$_delete"
                            icon="mdi-delete-outline"
                        />
                    </v-layout>
                    <v-card-title
                        class="BUO-Paragraph-Large buo-none-word-break"
                    >
                        <v-icon
                            :color="
                                department.nombreEstado == 'Activo'
                                    ? 'greenA800'
                                    : 'grey500'
                            "
                            class="pr-1"
                            small
                            >mdi-circle</v-icon
                        >
                        <div>{{ department.nombre }}</div>
                    </v-card-title>

                    <v-card-text>
                        <v-row v-if="$vuetify.breakpoint.mdAndUp">
                            <v-col cols="8">
                                <v-card
                                    flat
                                    height="300"
                                    width="100%"
                                    class="overflow-auto"
                                >
                                    <v-card-text>
                                        <section v-if="department.descripcion">
                                            <div
                                                class="pb-2 BUO-Paragraph-Small"
                                                :class="[
                                                    app
                                                        ? 'white--text'
                                                        : 'black--text',
                                                ]"
                                            >
                                                Descripción
                                            </div>
                                            <div
                                                class="pb-2 BUO-Label"
                                                :class="[
                                                    app
                                                        ? 'white--text'
                                                        : 'black--text',
                                                ]"
                                            >
                                                {{ department.descripcion }}
                                            </div>
                                            <v-divider></v-divider>
                                        </section>

                                        <section
                                            v-if="
                                                department.adminsDepartamento &&
                                                department.adminsDepartamento
                                                    .length > 0
                                            "
                                        >
                                            <div class="py-2">
                                                <div
                                                    class="py-1 BUO-Label-Small"
                                                    :class="[
                                                        app
                                                            ? 'blueProgress600--text'
                                                            : 'grey500--text',
                                                    ]"
                                                >
                                                    {{
                                                        department
                                                            .adminsDepartamento
                                                            .length > 1
                                                            ? 'Administradores'
                                                            : 'Administrador'
                                                    }}
                                                </div>
                                                <section
                                                    v-if="
                                                        department
                                                            .adminsDepartamento
                                                            .length === 1
                                                    "
                                                >
                                                    <v-list-item class="px-2">
                                                        <v-list-item-avatar>
                                                            <v-avatar
                                                                :color="
                                                                    user.colorAvatar
                                                                "
                                                            >
                                                                <span
                                                                    class="white--text BUO-Paragraph-Medium-SemiBold"
                                                                    >{{
                                                                        $_setInitials(
                                                                            department
                                                                                .adminsDepartamento[0]
                                                                                .nombre
                                                                        )
                                                                    }}</span
                                                                >
                                                            </v-avatar>
                                                        </v-list-item-avatar>

                                                        <v-list-item-content>
                                                            <v-list-item-title
                                                                class="BUO-Label-Small-SemiBold"
                                                                :class="[
                                                                    app
                                                                        ? 'white--text'
                                                                        : 'black--text',
                                                                ]"
                                                                >{{
                                                                    department
                                                                        .adminsDepartamento[0]
                                                                        .nombre
                                                                }}</v-list-item-title
                                                            >
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                    <div
                                                        class="py-1 BUO-Label-Small"
                                                        :class="[
                                                            app
                                                                ? 'white--text'
                                                                : 'black--text',
                                                        ]"
                                                    >
                                                        <v-layout
                                                            justify-space-between
                                                        >
                                                            <div
                                                                v-if="
                                                                    department
                                                                        .adminsDepartamento[0]
                                                                        .correo
                                                                "
                                                            >
                                                                <v-icon
                                                                    class="pb-1"
                                                                    color="primary"
                                                                    small
                                                                    >mdi-email-outline</v-icon
                                                                >
                                                                {{
                                                                    department
                                                                        .adminsDepartamento[0]
                                                                        .correo
                                                                }}
                                                            </div>
                                                            <div
                                                                v-if="
                                                                    department
                                                                        .adminsDepartamento[0]
                                                                        .telefono
                                                                "
                                                            >
                                                                <v-icon
                                                                    class="pb-1"
                                                                    color="primary"
                                                                    small
                                                                    >mdi-cellphone</v-icon
                                                                >
                                                                {{
                                                                    department
                                                                        .adminsDepartamento[0]
                                                                        .telefono
                                                                }}
                                                            </div>
                                                        </v-layout>
                                                    </div>
                                                </section>
                                                <section v-else>
                                                    <v-expansion-panels
                                                        flat
                                                        focusable
                                                    >
                                                        <v-expansion-panel
                                                            v-for="admin in department.adminsDepartamento"
                                                            :key="
                                                                admin.usuarioId
                                                            "
                                                        >
                                                            <v-expansion-panel-header
                                                                class="pa-0"
                                                            >
                                                                <v-list-item
                                                                    class="buo-headerAbility-position"
                                                                >
                                                                    <v-list-item-avatar>
                                                                        <v-avatar
                                                                            size="35"
                                                                            :color="
                                                                                user.colorAvatar
                                                                            "
                                                                        >
                                                                            <span
                                                                                class="white--text BUO-Paragraph-Medium-SemiBold"
                                                                                >{{
                                                                                    $_setInitials(
                                                                                        admin.nombre
                                                                                    )
                                                                                }}</span
                                                                            >
                                                                        </v-avatar>
                                                                    </v-list-item-avatar>

                                                                    <v-list-item-content>
                                                                        <v-list-item-title
                                                                            class="BUO-Label-Small-SemiBold"
                                                                            :class="[
                                                                                app
                                                                                    ? 'white--text'
                                                                                    : 'black--text',
                                                                            ]"
                                                                            >{{
                                                                                admin.nombre
                                                                            }}</v-list-item-title
                                                                        >
                                                                    </v-list-item-content>
                                                                </v-list-item>
                                                            </v-expansion-panel-header>
                                                            <v-expansion-panel-content>
                                                                <div
                                                                    class="py-1 BUO-Label-Small"
                                                                    :class="[
                                                                        app
                                                                            ? 'white--text'
                                                                            : 'black--text',
                                                                    ]"
                                                                >
                                                                    <v-layout
                                                                        justify-space-between
                                                                    >
                                                                        <div
                                                                            v-if="
                                                                                admin.correo
                                                                            "
                                                                        >
                                                                            <v-icon
                                                                                class="pb-1"
                                                                                color="primary"
                                                                                small
                                                                                >mdi-email-outline</v-icon
                                                                            >
                                                                            {{
                                                                                admin.correo
                                                                            }}
                                                                        </div>
                                                                        <div
                                                                            v-if="
                                                                                admin.telefono
                                                                            "
                                                                        >
                                                                            <v-icon
                                                                                class="pb-1"
                                                                                color="primary"
                                                                                small
                                                                                >mdi-cellphone</v-icon
                                                                            >
                                                                            {{
                                                                                admin.telefono
                                                                            }}
                                                                        </div>
                                                                    </v-layout>
                                                                </div>
                                                            </v-expansion-panel-content>
                                                        </v-expansion-panel>
                                                    </v-expansion-panels>
                                                </section>
                                            </div>
                                            <v-divider></v-divider>
                                        </section>
                                        <section
                                            v-if="
                                                department.cantidadColaboradores
                                            "
                                        >
                                            <div class="py-2">
                                                <div
                                                    class="py-1 BUO-Label-Small"
                                                    :class="[
                                                        app
                                                            ? 'blueProgress600--text'
                                                            : 'grey500--text',
                                                    ]"
                                                >
                                                    Colaboradores:
                                                </div>
                                                <div
                                                    class="py-1 BUO-Label-Small"
                                                    :class="[
                                                        app
                                                            ? 'white--text'
                                                            : 'grey700--text',
                                                    ]"
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
                                            <v-divider></v-divider>
                                        </section>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            <v-col cols="4">
                                <v-card
                                    flat
                                    height="300"
                                    width="100%"
                                    class="overflow-auto pr-1"
                                    v-if="
                                        department.subDepartamentos &&
                                        department.subDepartamentos.length > 0
                                    "
                                >
                                    <v-card-text>
                                        <section
                                            class="py-2 BUO-Paragraph-Small-SemiBold"
                                            :class="[
                                                app
                                                    ? 'white--text'
                                                    : 'black--text',
                                            ]"
                                        >
                                            Sub-Niveles
                                        </section>
                                        <div>
                                            <div
                                                v-for="(
                                                    item, i
                                                ) in department.subDepartamentos"
                                                :key="i"
                                                class="py-2"
                                            >
                                                <v-chip
                                                    class="py-2 BUO-Label-Small"
                                                    :class="[
                                                        app
                                                            ? 'white--text'
                                                            : 'black--text',
                                                    ]"
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
                            </v-col>
                        </v-row>
                        <v-row v-else-if="$vuetify.breakpoint.mobile" dense>
                            <v-col cols="12" v-if="department.descripcion">
                                <div
                                    class="pb-2 BUO-Paragraph-Small"
                                    :class="[
                                        app ? 'white--text' : 'black--text',
                                    ]"
                                >
                                    Descripcion
                                </div>
                                <div
                                    class="pb-2 BUO-Label"
                                    :class="[
                                        app ? 'white--text' : 'black--text',
                                    ]"
                                >
                                    {{ department.descripcion }}
                                </div>
                                <v-divider></v-divider>
                            </v-col>
                            <v-col
                                cols="12"
                                v-if="
                                    department.adminsDepartamento &&
                                    department.adminsDepartamento.length > 0
                                "
                            >
                                <div class="py-2">
                                    <div
                                        class="py-1 grey500--text BUO-Label-Small"
                                        :class="[
                                            app
                                                ? 'blueProgress600--text'
                                                : 'grey500--text',
                                        ]"
                                    >
                                        {{
                                            department.adminsDepartamento
                                                .length > 1
                                                ? 'Administradores'
                                                : 'Administrador'
                                        }}
                                    </div>
                                    <section
                                        v-if="
                                            department.adminsDepartamento
                                                .length === 1
                                        "
                                    >
                                        <v-list-item class="px-2">
                                            <v-list-item-avatar>
                                                <v-avatar
                                                    :color="user.colorAvatar"
                                                >
                                                    <span
                                                        class="white--text BUO-Paragraph-Medium-SemiBold"
                                                        >{{
                                                            $_setInitials(
                                                                department
                                                                    .adminsDepartamento[0]
                                                                    .nombre
                                                            )
                                                        }}</span
                                                    >
                                                </v-avatar>
                                            </v-list-item-avatar>

                                            <v-list-item-content>
                                                <v-list-item-title
                                                    class="BUO-Label-Small-SemiBold"
                                                    :class="[
                                                        app
                                                            ? 'white--text'
                                                            : 'black--text',
                                                    ]"
                                                    >{{
                                                        department
                                                            .adminsDepartamento[0]
                                                            .nombre
                                                    }}</v-list-item-title
                                                >
                                            </v-list-item-content>
                                        </v-list-item>
                                        <div
                                            class="py-1 BUO-Label-Small"
                                            :class="[
                                                app
                                                    ? 'white--text'
                                                    : 'black--text',
                                            ]"
                                        >
                                            <v-row>
                                                <v-col
                                                    cols="12"
                                                    v-if="
                                                        department
                                                            .adminsDepartamento[0]
                                                            .correo
                                                    "
                                                >
                                                    <v-icon
                                                        class="pb-1"
                                                        color="primary"
                                                        small
                                                        >mdi-email-outline</v-icon
                                                    >
                                                    {{
                                                        department
                                                            .adminsDepartamento[0]
                                                            .correo
                                                    }}
                                                </v-col>
                                                <v-col
                                                    cols="12"
                                                    v-if="
                                                        department
                                                            .adminsDepartamento[0]
                                                            .telefono
                                                    "
                                                >
                                                    <v-icon
                                                        class="pb-1"
                                                        color="primary"
                                                        small
                                                        >mdi-cellphone</v-icon
                                                    >
                                                    {{
                                                        department
                                                            .adminsDepartamento[0]
                                                            .telefono
                                                    }}
                                                </v-col>
                                            </v-row>
                                        </div>
                                    </section>
                                    <section v-else>
                                        <v-expansion-panels flat>
                                            <v-expansion-panel
                                                v-for="admin in department.adminsDepartamento"
                                                :key="admin.usuarioId"
                                                class="buo-headerAbility-position"
                                            >
                                                <v-expansion-panel-header>
                                                    <v-list-item class="px-2">
                                                        <v-list-item-avatar>
                                                            <v-avatar
                                                                :color="
                                                                    user.colorAvatar
                                                                "
                                                            >
                                                                <span
                                                                    class="white--text BUO-Paragraph-Medium-SemiBold"
                                                                    >{{
                                                                        $_setInitials(
                                                                            admin.nombre
                                                                        )
                                                                    }}</span
                                                                >
                                                            </v-avatar>
                                                        </v-list-item-avatar>

                                                        <v-list-item-content>
                                                            <v-list-item-title
                                                                class="BUO-Label-Small-SemiBold"
                                                                :class="[
                                                                    app
                                                                        ? 'white--text'
                                                                        : 'black--text',
                                                                ]"
                                                                >{{
                                                                    admin.nombre
                                                                }}</v-list-item-title
                                                            >
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </v-expansion-panel-header>
                                                <v-expansion-panel-content>
                                                    <div
                                                        class="py-1 BUO-Label-Small"
                                                        :class="[
                                                            app
                                                                ? 'white--text'
                                                                : 'black--text',
                                                        ]"
                                                    >
                                                        <v-row>
                                                            <v-col
                                                                cols="12"
                                                                v-if="
                                                                    admin.correo
                                                                "
                                                            >
                                                                <v-icon
                                                                    class="pb-1"
                                                                    color="primary"
                                                                    small
                                                                    >mdi-email-outline</v-icon
                                                                >
                                                                {{
                                                                    admin.correo
                                                                }}
                                                            </v-col>
                                                            <v-col
                                                                cols="12"
                                                                v-if="
                                                                    admin.telefono
                                                                "
                                                            >
                                                                <v-icon
                                                                    class="pb-1"
                                                                    color="primary"
                                                                    small
                                                                    >mdi-cellphone</v-icon
                                                                >
                                                                {{
                                                                    admin.telefono
                                                                }}
                                                            </v-col>
                                                        </v-row>
                                                    </div>
                                                </v-expansion-panel-content>
                                            </v-expansion-panel>
                                        </v-expansion-panels>
                                    </section>
                                </div>
                                <v-divider></v-divider>
                            </v-col>
                            <v-col cols="12">
                                <div
                                    class="py-2"
                                    v-if="department.cantidadColaboradores"
                                >
                                    <div
                                        class="py-1 BUO-Label-Small"
                                        :class="[
                                            app
                                                ? 'blueProgress600--text'
                                                : 'grey500--text',
                                        ]"
                                    >
                                        Colaboradores:
                                    </div>
                                    <div
                                        class="py-1 BUO-Label-Small"
                                        :class="[
                                            app ? 'white--text' : 'black--text',
                                        ]"
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
                            </v-col>
                            <v-col
                                cols="12"
                                v-if="
                                    department.subDepartamentos &&
                                    department.subDepartamentos.length > 0
                                "
                            >
                                <div
                                    class="py-2 BUO-Paragraph-Small-SemiBold"
                                    :class="[
                                        app ? 'white--text' : 'black--text',
                                    ]"
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
                                            class="py-1 BUO-Label-Small"
                                            :class="[
                                                app
                                                    ? 'white--text'
                                                    : 'black--text',
                                            ]"
                                            style="
                                                height: auto;
                                                white-space: normal;
                                            "
                                        >
                                            {{ item.nombre }}
                                        </v-chip>
                                    </div>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

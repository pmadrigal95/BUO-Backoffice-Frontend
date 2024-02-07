<script>
/**
 * Descripción: Atajos BUO
 *
 * @displayName BaseShortcutImpl
 */

import { v4 as uuidv4 } from 'uuid';

import { mapState, mapActions } from 'vuex';

import baseConfigHelper from '@/helpers/baseConfigHelper';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

const BaseShortcut = () => import('@/components/core/Keyboard/BaseShortcut');

export default {
    name: 'BaseShortcutImpl',

    components: {
        BaseShortcut,
    },

    computed: {
        ...mapState('theme', ['app']),

        permissionList() {
            return baseSecurityHelper.$_setMenu();
        },

        list() {
            return [
                {
                    id: uuidv4(),
                    title: 'Inicio',
                    hotkey: 'ctrl+H',
                    handler: () => {
                        const route = 'HomeViewComponent';

                        if (this.$router.currentRoute.name !== route) {
                            this.$router.push({
                                name: route,
                            });
                        }
                    },
                },
                ...this.$_setList(this.permissionList),
                {
                    id: uuidv4(),
                    title: 'Cambiar tema',
                    section: 'Acciones',
                    hotkey: 'ctrl+D',
                    handler: () => {
                        this.$_changeTheme();
                    },
                },
            ];
        },
    },

    methods: {
        ...mapActions('theme', ['change_mode']),

        $_changeTheme() {
            this.change_mode([baseConfigHelper.$_app, !this.app]);
        },

        $_setChildren(array, section) {
            return array.map((element) => {
                return {
                    id: uuidv4(),
                    section: section,
                    title: element.nombreUI,
                    handler: () => {
                        const route = element.rutaURL;

                        if (this.$router.currentRoute.name !== route) {
                            this.$router.push({
                                name: route,
                            });
                        }
                    },
                };
            });
        },

        $_setList(array) {
            let result = [];
            array.map((element) => {
                result = [
                    ...result,
                    ...this.$_setChildren(element.list, element.name),
                ];
            });

            return result;
        },
    },
};
</script>

<template>
    <BaseShortcut :hotkeys="list" />
</template>

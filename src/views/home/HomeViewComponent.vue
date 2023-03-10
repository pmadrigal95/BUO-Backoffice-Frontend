<script>
/**
 * Descripción: Pantalla Inicio
 *
 * @displayName HomeViewComponent
 */

import { mapGetters } from 'vuex';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const CardActivitiesViewComponent = () =>
    import('@/views/home/components/CardActivitiesViewComponent');

export default {
    name: 'HomeViewComponent',

    data() {
        return {
            md: undefined,
            offset: undefined,
            width: undefined,
            windowSize: {
                x: 0,
                y: 0,
            },
        };
    },

    components: {
        BaseCardViewComponent,
        CardActivitiesViewComponent,
    },

    computed: {
        ...mapGetters('security', ['permissionList', 'loadingSecurity']),

        filterList() {
            let originalList = JSON.parse(JSON.stringify(this.permissionList));
            originalList = originalList.filter(
                (x) =>
                    x.acciones.filter(
                        (item) => item === baseSecurityHelper.$_read
                    ) &&
                    x.activo &&
                    x.rutaURL != null &&
                    x.nombre != 'HomeViewComponent'
            );

            originalList.push({
                nombreUI: 'Cerrar sesión',
                icono: 'login-variant',
                rutaURL: 'LoginViewComponent',
            });

            return originalList;
        },

        editorList() {
            let originalList = JSON.parse(JSON.stringify(this.permissionList));

            originalList = originalList
                .filter(
                    (x) =>
                        x.acciones.filter(
                            (item) => item === baseSecurityHelper.$_write
                        ) &&
                        x.activo &&
                        x.rutaURL != null &&
                        x.nombre != 'HomeViewComponent'
                )
                .map((x) => {
                    x.rutaURL = x.rutaURL.replace('Filter', 'Editor');
                    x.nombreUI = `Agregar ${x.nombreUI}`;
                    return x;
                });

            return originalList;
        },
    },

    mounted() {
        this.onResize();
    },

    methods: {
        onResize() {
            this.windowSize = { x: window.innerWidth, y: window.innerHeight };

            if (this.windowSize.x > 1200) {
                this.md = '9';
                this.offset = '1';
                this.width = '354';
            } else {
                this.md = '12';
                this.offset = '0';
                this.width = '325';
            }
        },
    },
};
</script>

<template>
    <div id="app" v-resize="onResize">
        <BaseCardViewComponent
            :md="md"
            :offset="offset"
            title="¡Hola!"
            subtitle="¿Qué quieres hacer hoy?"
        >
            <div slot="card-text">
                <CardActivitiesViewComponent
                    :menuItems="filterList"
                    :min-width="width"
                    :max-width="width"
                    :large="true"
                    :fontTypeSubtitle="'BUO-Paragraph-Medium-SemiBold Buo-Black'"
                    iconColor="blue900"
                    bottonDisplay="Ver más"
                />
            </div>
        </BaseCardViewComponent>
    </div>
</template>

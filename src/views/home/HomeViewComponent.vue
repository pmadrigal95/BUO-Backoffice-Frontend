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
            originalList = originalList.filter(
                (x) =>
                    x.acciones.filter(
                        (item) => item === baseSecurityHelper.$_write
                    ) &&
                    x.activo &&
                    x.rutaURL != null &&
                    x.nombre != 'HomeViewComponent'
            );

            originalList.forEach(function (item, index) {
                originalList[index].rutaURL = item.rutaURL.replace(
                    'Filter',
                    'Editor'
                );
                originalList[index].nombreUI = `Agregar ${item.nombreUI}`;
            });

            return originalList;
        },
    },

    methods: {},
};
</script>

<template>
    <BaseCardViewComponent title="BUO BackOffice" md="12" offset="0">
        <div slot="card-text">
            <CardActivitiesViewComponent
                :menuItems="editorList"
                md="3"
                minWidth="280px"
                minHeight="100px"
                size="small"
                position="start"
                :fontTypeSubtitle="'BUO-Paragraph-Medium-SemiBold Buo-Black'"
                iconColor="blue800"
                :movil="true"
            />

            <h2 class="BUO-Heading-XSmall Buo-Black pb-4 pl-2 pt-8">
                Actividad Principal
            </h2>

            <CardActivitiesViewComponent
                :menuItems="filterList"
                md="3"
                minWidth="280px"
                minHeight="258px"
                size="x-large"
                position="start"
                :fontTypeSubtitle="'BUO-Heading-XSmall Buo-Black'"
                iconColor="grey500"
                :movil="false"
            />
        </div>
    </BaseCardViewComponent>
</template>

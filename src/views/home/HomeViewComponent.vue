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
};
</script>

<template>
    <BaseCardViewComponent title="BUO BackOffice" md="12" offset="0">
        <div slot="card-text">
            <CardActivitiesViewComponent
                :menuItems="editorList"
                md="3"
                min-width="276"
                max-width="276"
                :small="true"
                :large="false"
                position="start"
                :fontTypeSubtitle="'BUO-Paragraph-Small-SemiBold  Buo-Black'"
                iconColor="greenB900"
                :slider="true"
                bottonDisplay="Ver más"
            />

            <h2 class="BUO-Heading-XSmall Buo-Black pb-4 pl-2 pt-8">
                Actividad Principal
            </h2>

            <CardActivitiesViewComponent
                :menuItems="filterList"
                md="3"
                min-width="276"
                max-width="276"
                :large="true"
                position="start"
                :fontTypeSubtitle="'BUO-Heading-XSmall Buo-Black'"
                iconColor="blue900"
                bottonDisplay="Ver más"
            />
        </div>
    </BaseCardViewComponent>
</template>
